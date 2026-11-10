'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Truck, Lock, Mail, Loader2, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loginAction } from '@/app/actions/auth';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await loginAction(email, password);
      
      if (result.success) {
        toast({ title: 'Bienvenido', description: 'Has iniciado sesión correctamente.' });
        if (result.role === 'conductor') {
          router.push('/conductores');
        } else {
          router.push('/dashboard');
        }
      } else {
        toast({ variant: 'destructive', title: 'Error', description: result.error });
      }
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Error', description: 'Hubo un error de conexión.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-xl shadow-primary/20 mb-6">
            <Truck className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">TransMudanzas JH</h1>
          <p className="text-muted-foreground">Ingresa tus credenciales para acceder a la plataforma.</p>
        </div>

        <div className="glass-card p-8 rounded-[2rem] border border-white/10 shadow-2xl relative z-10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground ml-1">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  type="email" 
                  placeholder="usuario@transmudanzasjh.com" 
                  className="pl-10 h-12 rounded-xl bg-background/50 border-white/10 focus-visible:ring-primary"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground ml-1">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-10 h-12 rounded-xl bg-background/50 border-white/10 focus-visible:ring-primary"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 text-base font-bold flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Iniciar Sesión <ArrowRight size={20} />
                </>
              )}
            </Button>
          </form>
        </div>
        
        <p className="text-center text-xs text-muted-foreground mt-8">
          © 2026 TransMudanzas JH. Todos los derechos reservados.
        </p>
      </motion.div>
    </div>
  );
}
