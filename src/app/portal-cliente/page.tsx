"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getQuoteByCredentials } from '@/lib/quotes';
import { Search, Loader2, Globe, Lock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ClientPortalLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ id: '', clientDocument: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.id || !credentials.clientDocument) {
      toast({
        variant: "destructive",
        title: "Datos requeridos",
        description: "Ingresa tu documento y código de cotización."
      });
      return;
    }

    setLoading(true);
    try {
      const result = await getQuoteByCredentials(credentials.id.toUpperCase(), credentials.clientDocument.trim());
      
      if (result) {
        if (result.isLocked) {
          toast({
            variant: "destructive",
            title: "Acceso Denegado",
            description: "Esta cotización ha sido cerrada o finalizada. Contacta a soporte para más detalles."
          });
          return;
        }

        // Use localStorage or cookie to store the session temporarily for the dashboard
        localStorage.setItem('mivra_portal_auth', JSON.stringify({ id: result.id, clientDocument: result.clientDocument }));
        
        toast({ title: "Bienvenido", description: `Accediendo al portal de ${result.clientName}` });
        router.push('/portal-cliente/dashboard');

      } else {
        toast({
          variant: "destructive",
          title: "No encontrada",
          description: "Verifica el número y código e intenta de nuevo."
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Hubo un problema consultando el estado."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-orange-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe size={40} />
            </div>
            <h1 className="text-4xl font-bold mb-4">Portal de Cliente</h1>
            <p className="text-muted-foreground">Accede para gestionar tu mudanza, subir fotos y documentos.</p>
          </div>

          <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl rounded-[2rem] p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-base">Documento de Identidad</Label>
                <Input 
                  placeholder="Ej: 1010123456" 
                  className="rounded-xl h-14 text-lg text-center uppercase"
                  value={credentials.clientDocument}
                  onChange={e => setCredentials({...credentials, clientDocument: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-base flex items-center justify-between">
                  Código de Cotización
                </Label>
                <div className="relative">
                  <Input 
                    type="text"
                    placeholder="Ej: TRANS-1234" 
                    className="rounded-xl h-14 text-lg text-center uppercase tracking-widest font-mono"
                    value={credentials.id}
                    onChange={e => setCredentials({...credentials, id: e.target.value})}
                  />
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50" size={20} />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 rounded-xl text-lg gap-2 shadow-lg shadow-primary/20"
                disabled={loading || !credentials.id || !credentials.clientDocument}
              >
                {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
                {loading ? "Verificando..." : "Ingresar al Portal"}
              </Button>

              <div className="text-center pt-4">
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  ← Volver al inicio
                </Link>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
