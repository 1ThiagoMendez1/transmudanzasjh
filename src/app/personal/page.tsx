"use client";

import React, { useState, useEffect } from 'react';
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
  Briefcase, 
  Award, 
  Wallet, 
  Search,
  Plus,
  Star,
  Clock,
  FileText,
  Loader2,
  Key
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getStaff, createStaffMember, StaffMember } from '@/lib/staff';
import { createUser } from '@/lib/users';
import { useToast } from '@/hooks/use-toast';

export default function PersonalDashboard() {
  const [activeTab, setActiveTab] = useState('plantilla');
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    role: 'Conductor NPR',
    status: 'Activo',
    phone: '',
    document_id: ''
  });

  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isGeneratingCreds, setIsGeneratingCreds] = useState(false);
  const [generatedCreds, setGeneratedCreds] = useState<{email: string, password: string} | null>(null);

  const { toast } = useToast();

  const tabs = [
    { id: 'plantilla', label: 'Plantilla', icon: Users },
    { id: 'nominas', label: 'Nóminas', icon: FileText },
    { id: 'incentivos', label: 'Incentivos', icon: Award },
    { id: 'auxiliares', label: 'Auxiliares', icon: Briefcase },
  ];

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const data = await getStaff();
      setStaff(data);
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "No se pudo cargar el personal", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleAddStaff = async () => {
    if (!newStaff.name || !newStaff.document_id) return;

    try {
      await createStaffMember({
        name: newStaff.name,
        role: newStaff.role,
        status: newStaff.status,
        phone: newStaff.phone,
        document_id: newStaff.document_id
      });
      toast({ title: "Empleado agregado", description: "El registro se guardó correctamente." });
      setIsDialogOpen(false);
      setNewStaff({ name: '', role: 'Conductor NPR', status: 'Activo', phone: '', document_id: '' });
      fetchStaff();
    } catch (error) {
      toast({ title: "Error", description: "No se pudo guardar el registro.", variant: "destructive" });
    }
  };

  const handleOpenDetails = (emp: StaffMember) => {
    setSelectedStaff(emp);
    setGeneratedCreds(null);
    setIsDetailModalOpen(true);
  };

  const handleGenerateCredentials = async () => {
    if (!selectedStaff) return;
    setIsGeneratingCreds(true);
    try {
      const names = selectedStaff.name.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ');
      const email = names.length > 1 
        ? `${names[0]}.${names[1]}@transmudanzas.com` 
        : `${names[0]}@transmudanzas.com`;
      
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$*';
      let password = '';
      for (let i = 0; i < 8; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      
      let systemRole: 'ayudante' | 'conductor' | 'administrador' | 'contador' = 'ayudante';
      const r = selectedStaff.role.toLowerCase();
      if (r.includes('conductor')) systemRole = 'conductor';
      else if (r.includes('admin') || r.includes('coord')) systemRole = 'administrador';
      else if (r.includes('conta')) systemRole = 'contador';

      const { createSystemUserAction } = await import('@/app/actions/auth');
      const result = await createSystemUserAction({
        name: selectedStaff.name,
        email: email,
        password_raw: password,
        role: systemRole,
        status: 'Activo'
      });

      if (!result.success) throw new Error(result.error);

      setGeneratedCreds({ email, password });
      toast({ title: "Credenciales Creadas", description: "El usuario ya puede acceder al sistema." });

    } catch (error: any) {
      toast({ title: "Error", description: error.message || "No se pudieron generar las credenciales.", variant: "destructive" });
    } finally {
      setIsGeneratingCreds(false);
    }
  };

  return (
    <div className="min-h-screen px-4 pb-24 pt-8 md:pl-[140px] md:pr-8 md:py-8 bg-background max-w-[100vw] overflow-x-hidden">
      <Navigation />
      
      <header className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Recursos Humanos</h1>
          <p className="text-muted-foreground">Gestión de personal, nóminas, incentivos y colaboradores externos.</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl gap-2 shadow-lg shadow-primary/20">
                <Plus size={16} /> Agregar Personal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Empleado</DialogTitle>
                <DialogDescription>
                  Ingresa los datos del nuevo miembro del equipo.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="empName" className="text-right">Nombre</Label>
                  <Input 
                    id="empName" 
                    placeholder="Ej. Juan Pérez" 
                    className="col-span-3"
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="empDoc" className="text-right">Cédula</Label>
                  <Input 
                    id="empDoc" 
                    placeholder="Documento de identidad" 
                    className="col-span-3"
                    value={newStaff.document_id}
                    onChange={(e) => setNewStaff({...newStaff, document_id: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="empPhone" className="text-right">Teléfono</Label>
                  <Input 
                    id="empPhone" 
                    placeholder="Número de celular" 
                    className="col-span-3"
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="empRole" className="text-right">Cargo</Label>
                  <select 
                    id="empRole" 
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    value={newStaff.role}
                    onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                  >
                    <option value="Conductor NPR">Conductor NPR</option>
                    <option value="Conductor NHR">Conductor NHR</option>
                    <option value="Coordinador Logístico">Coordinador Logístico</option>
                    <option value="Auxiliar Administrativo">Auxiliar Administrativo</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="empStatus" className="text-right">Estado</Label>
                  <select 
                    id="empStatus" 
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    value={newStaff.status}
                    onChange={(e) => setNewStaff({...newStaff, status: e.target.value})}
                  >
                    <option value="Activo">Activo</option>
                    <option value="Incapacidad">Incapacidad</option>
                    <option value="Vacaciones">Vacaciones</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleAddStaff} disabled={!newStaff.name || !newStaff.document_id}>Guardar Empleado</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* KPIs vacíos - a conectar en el futuro con cálculos reales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <Card className="glass-card border-white/20 dark:border-white/10 h-full">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Users size={24} />
              </div>
            </div>
            <div>
              <h3 className="text-muted-foreground text-sm font-medium mb-1">Total Plantilla</h3>
              <p className="text-3xl font-bold text-foreground mb-1">{staff.length}</p>
              <p className="text-xs text-muted-foreground">Empleados registrados</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-white/20 dark:border-white/10 h-full">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                <Wallet size={24} />
              </div>
            </div>
            <div>
              <h3 className="text-muted-foreground text-sm font-medium mb-1">Nómina Mensual</h3>
              <p className="text-3xl font-bold text-foreground mb-1">$0</p>
              <p className="text-xs text-muted-foreground">Proyección actual</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/20 dark:border-white/10 h-full">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
                <Award size={24} />
              </div>
            </div>
            <div>
              <h3 className="text-muted-foreground text-sm font-medium mb-1">Incentivos Pagados</h3>
              <p className="text-3xl font-bold text-foreground mb-1">$0</p>
              <p className="text-xs text-muted-foreground">Mes en curso</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/20 dark:border-white/10 h-full">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
                <Briefcase size={24} />
              </div>
            </div>
            <div>
              <h3 className="text-muted-foreground text-sm font-medium mb-1">Auxiliares (Mes)</h3>
              <p className="text-3xl font-bold text-foreground mb-1">0</p>
              <p className="text-xs text-muted-foreground">Turnos pagados</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 mb-6 pb-2 hide-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all whitespace-nowrap",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              )}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          
          {/* PLANTILLA TAB */}
          {activeTab === 'plantilla' && (
            <motion.div
              key="plantilla"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input placeholder="Buscar empleado..." className="pl-10 rounded-xl bg-background/50 backdrop-blur-sm border-white/20" />
                </div>
              </div>

              {loading ? (
                <div className="text-center py-12 text-muted-foreground">Cargando plantilla...</div>
              ) : staff.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">No hay empleados registrados.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {staff.map(emp => (
                    <Card 
                      key={emp.id} 
                      className="glass-card hover:border-primary/30 transition-colors cursor-pointer group"
                      onClick={() => handleOpenDetails(emp)}
                    >
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-white font-bold text-lg shadow-md">
                            {emp.name.charAt(0)}
                          </div>
                          <span className={cn(
                            "text-[10px] font-bold px-2 py-1 rounded-full uppercase",
                            emp.status === 'Activo' ? "bg-green-500/10 text-green-500" :
                            emp.status === 'Vacaciones' ? "bg-primary/10 text-primary" :
                            "bg-amber-500/10 text-amber-500"
                          )}>
                            {emp.status}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg truncate" title={emp.name}>{emp.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{emp.role}</p>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-white/10">
                          <div className="flex items-center gap-1">
                            CC: {emp.document_id}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* NÓMINAS TAB */}
          {activeTab === 'nominas' && (
            <motion.div
              key="nominas"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-xl">Historial de Nóminas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    Aún no hay nóminas registradas.
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* INCENTIVOS TAB */}
          {activeTab === 'incentivos' && (
            <motion.div
              key="incentivos"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-xl">Incentivos Asignados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    Aún no hay incentivos asignados a conductores.
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* AUXILIARES TAB */}
          {activeTab === 'auxiliares' && (
            <motion.div
              key="auxiliares"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl">Pagos a Destajo y Auxiliares</CardTitle>
                  <Button size="sm" className="rounded-xl gap-2"><Plus size={16} /> Registrar Pago</Button>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    No hay registros de pagos a auxiliares.
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-[2rem]">
          <DialogHeader>
            <DialogTitle>Detalles del Empleado</DialogTitle>
          </DialogHeader>
          
          {selectedStaff && (
            <div className="py-4 space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-2xl">
                  {selectedStaff.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-xl">{selectedStaff.name}</h3>
                  <p className="text-muted-foreground text-sm">{selectedStaff.role}</p>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-xl space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Documento:</span>
                  <span className="font-medium">{selectedStaff.document_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Teléfono:</span>
                  <span className="font-medium">{selectedStaff.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estado:</span>
                  <span className="font-medium">{selectedStaff.status}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="font-bold text-sm mb-3">Acceso al Sistema</h4>
                {generatedCreds ? (
                  <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl space-y-2">
                    <p className="text-xs text-green-700 font-bold mb-2">¡Credenciales Generadas Exitosamente!</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-bold select-all">{generatedCreds.email}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Contraseña:</span>
                      <span className="font-bold select-all">{generatedCreds.password}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-2">Copia estos datos y entrégaselos al empleado.</p>
                  </div>
                ) : (
                  <Button 
                    onClick={handleGenerateCredentials} 
                    disabled={isGeneratingCreds}
                    className="w-full rounded-xl gap-2 shadow-lg shadow-primary/20 bg-primary/10 text-primary hover:bg-primary hover:text-white"
                  >
                    {isGeneratingCreds ? <Loader2 className="animate-spin" size={16} /> : <Key size={16} />}
                    Generar Credenciales Automáticas
                  </Button>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailModalOpen(false)} className="rounded-xl w-full">Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
