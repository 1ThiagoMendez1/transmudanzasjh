"use client";

import React, { useEffect, useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Users, 
  Search,
  Plus,
  MoreVertical,
  ShieldAlert,
  UserCog,
  User,
  Truck,
  Calculator,
  Trash2,
  Edit
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getUsers, createUser, deleteUser, SystemUser, UserRole, UserStatus } from '@/lib/users';
import { useToast } from '@/hooks/use-toast';

export default function UsuariosDashboard() {
  const [users, setUsers] = useState<SystemUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { toast } = useToast();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'ayudante' as UserRole,
    status: 'Activo' as UserStatus
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los usuarios.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast({ title: "Error", description: "Todos los campos son obligatorios", variant: "destructive" });
      return;
    }

    try {
      const { createSystemUserAction } = await import('@/app/actions/auth');
      const result = await createSystemUserAction({
        name: formData.name,
        email: formData.email,
        password_raw: formData.password,
        role: formData.role,
        status: formData.status
      });
      
      if (!result.success) throw new Error(result.error);
      
      toast({ title: "Éxito", description: "Usuario creado correctamente." });
      setIsDialogOpen(false);
      setFormData({ name: '', email: '', password: '', role: 'ayudante', status: 'Activo' });
      fetchUsers();
    } catch (error) {
      toast({ title: "Error", description: "Ocurrió un problema al crear el usuario.", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
      try {
        await deleteUser(id);
        toast({ title: "Éxito", description: "Usuario eliminado." });
        fetchUsers();
      } catch (error) {
        toast({ title: "Error", description: "No se pudo eliminar el usuario.", variant: "destructive" });
      }
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'administrador': return <ShieldAlert size={16} />;
      case 'conductor': return <Truck size={16} />;
      case 'contador': return <Calculator size={16} />;
      default: return <User size={16} />; // ayudante
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'administrador': return "bg-red-500/10 text-red-500 border-red-500/20";
      case 'conductor': return "bg-primary/10 text-primary border-primary/20";
      case 'contador': return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      default: return "bg-purple-500/10 text-purple-500 border-purple-500/20"; // ayudante
    }
  };

  return (
    <div className="min-h-screen px-4 pb-24 pt-8 md:pl-[140px] md:pr-8 md:py-8 bg-background max-w-[100vw] overflow-x-hidden">
      <Navigation />
      
      <header className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <UserCog className="text-primary" size={32} />
            Usuarios del Sistema
          </h1>
          <p className="text-muted-foreground">Gestión de accesos, roles y credenciales de la plataforma.</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl gap-2 shadow-lg shadow-primary/20">
                <Plus size={16} /> Nuevo Usuario
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Crear Usuario</DialogTitle>
                <DialogDescription>
                  Ingresa las credenciales y el rol del nuevo usuario para darle acceso al sistema.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateUser}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Ej. Ana Martínez" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="ana@ejemplo.com" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Contraseña (Temporal)</Label>
                    <Input id="password" type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="role">Rol de Acceso</Label>
                      <select id="role" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value as UserRole})} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        <option value="ayudante">Ayudante</option>
                        <option value="conductor">Conductor</option>
                        <option value="contador">Contador</option>
                        <option value="administrador">Administrador</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="status">Estado</Label>
                      <select id="status" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value as UserStatus})} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                      </select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Guardar Usuario</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Buscar por nombre o correo..." 
            className="pl-10 rounded-xl bg-background/50 backdrop-blur-sm border-white/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-left text-sm text-muted-foreground bg-muted/30">
                <th className="p-4 font-medium">Usuario</th>
                <th className="p-4 font-medium">Rol de Acceso</th>
                <th className="p-4 font-medium">Estado</th>
                <th className="p-4 font-medium">Fecha Creación</th>
                <th className="p-4 text-right font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">Cargando usuarios...</td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">No se encontraron usuarios.</td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/20 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border",
                        getRoleColor(user.role)
                      )}>
                        {getRoleIcon(user.role)}
                        <span className="capitalize">{user.role}</span>
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-1 rounded-full uppercase",
                        user.status === 'Activo' ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                      )}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-red-500"
                          onClick={() => user.id && handleDelete(user.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
