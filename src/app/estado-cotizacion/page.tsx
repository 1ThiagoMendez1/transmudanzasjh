"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getQuoteByCredentials, WebQuote } from '@/lib/quotes';
import { Search, MapPin, Calendar, Package, ArrowRight, Loader2, CheckCircle2, Circle, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

const STATUS_STEPS = [
  { id: 'Recibida', label: 'Recibida', description: 'Hemos recibido tu solicitud' },
  { id: 'En Análisis', label: 'En Análisis', description: 'Evaluando inventario y ruta' },
  { id: 'Cotizada', label: 'Cotizada', description: 'Tenemos una propuesta para ti' },
  { id: 'Aceptada', label: 'Aceptada', description: '¡Viaje programado!' }
];

export default function QuoteStatusPage() {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ id: '', secretCode: '' });
  const [quote, setQuote] = useState<WebQuote | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.id || !credentials.secretCode) {
      toast({
        variant: "destructive",
        title: "Datos requeridos",
        description: "Ingresa tu número de cotización y código secreto."
      });
      return;
    }

    setLoading(true);
    try {
      const result = await getQuoteByCredentials(credentials.id.toUpperCase(), credentials.secretCode.toUpperCase());
      if (result) {
        setQuote(result);
        toast({
          title: "Cotización encontrada",
          description: `Mostrando estado para ${result.id}`
        });
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

  const getStatusIndex = (status: string) => {
    // If rejected, just return -1 or handle specially
    if (status === 'Rechazada') return -1;
    return STATUS_STEPS.findIndex(s => s.id === status);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-orange-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-3xl relative z-10">
        
        <AnimatePresence mode="wait">
          {!quote ? (
            <motion.div key="search" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                  <Search className="text-primary" size={32} /> Rastrear Cotización
                </h1>
                <p className="text-muted-foreground text-lg">Ingresa los datos que te dimos al solicitar la mudanza.</p>
              </div>

              <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl p-8 max-w-md mx-auto">
                <form onSubmit={handleSearch} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-base">Número de Cotización</Label>
                    <Input 
                      placeholder="Ej: TRANS-1234" 
                      className="rounded-xl h-14 text-lg text-center uppercase"
                      value={credentials.id}
                      onChange={e => setCredentials({...credentials, id: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-base flex items-center justify-between">
                      Código Secreto
                    </Label>
                    <Input 
                      type="text"
                      placeholder="Ej: A7X9B2" 
                      className="rounded-xl h-14 text-lg text-center uppercase tracking-widest font-mono"
                      value={credentials.secretCode}
                      onChange={e => setCredentials({...credentials, secretCode: e.target.value})}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-14 rounded-xl text-lg gap-2 shadow-lg shadow-primary/20"
                    disabled={loading || !credentials.id || !credentials.secretCode}
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
                    {loading ? "Buscando..." : "Consultar Estado"}
                  </Button>

                  <div className="text-center pt-4">
                    <Link href="/solicitar-cotizacion" className="text-sm text-primary hover:underline">
                      ¿Aún no tienes una cotización? Solicítala aquí
                    </Link>
                  </div>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div key="status" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden">
              
              <div className="bg-primary/10 p-8 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-primary uppercase tracking-wider mb-1">Cotización Encontrada</p>
                  <h2 className="text-3xl font-black">{quote.id}</h2>
                </div>
                <Button variant="outline" onClick={() => setQuote(null)} className="rounded-xl">
                  Consultar Otra
                </Button>
              </div>

              <div className="p-8">
                
                {quote.status === 'Rechazada' ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search size={40} />
                    </div>
                    <h3 className="text-2xl font-bold">Solicitud Declinada</h3>
                    <p className="text-muted-foreground mt-2">Lo sentimos, no pudimos proceder con esta cotización. Por favor contáctanos para más detalles.</p>
                  </div>
                ) : (
                  <div className="mb-12">
                    <h3 className="text-xl font-bold mb-8 text-center">Estado Actual</h3>
                    
                    <div className="relative max-w-2xl mx-auto">
                      {/* Timeline Line */}
                      <div className="absolute top-6 left-8 right-8 h-1 bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-primary" 
                          initial={{ width: 0 }}
                          animate={{ width: `${(getStatusIndex(quote.status) / (STATUS_STEPS.length - 1)) * 100}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>

                      {/* Timeline Steps */}
                      <div className="relative flex justify-between">
                        {STATUS_STEPS.map((step, index) => {
                          const isActive = getStatusIndex(quote.status) >= index;
                          const isCurrent = getStatusIndex(quote.status) === index;
                          
                          return (
                            <div key={step.id} className="flex flex-col items-center w-24">
                              <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.2 }}
                                className={`w-12 h-12 rounded-full flex items-center justify-center border-4 relative z-10 bg-background transition-colors duration-500 ${
                                  isActive ? 'border-primary text-primary' : 'border-muted text-muted-foreground'
                                } ${isCurrent ? 'shadow-[0_0_20px_rgba(var(--primary),0.4)]' : ''}`}
                              >
                                {isActive ? <Check size={20} className={isCurrent ? "animate-pulse" : ""} /> : <Circle size={12} />}
                              </motion.div>
                              <div className="text-center mt-3">
                                <p className={`text-sm font-bold ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{step.label}</p>
                                {isCurrent && <p className="text-xs text-primary mt-1">{step.description}</p>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Details Card */}
                <div className="bg-muted/30 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="text-primary mt-1" size={20} />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-bold">Ruta</p>
                        <p className="font-medium">{quote.origin} <ArrowRight className="inline mx-1 text-muted-foreground" size={14} /> {quote.destination}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="text-primary mt-1" size={20} />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-bold">Fecha Estimada</p>
                        <p className="font-medium">{quote.estimatedDate || 'No especificada'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Package className="text-primary mt-1" size={20} />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-bold">Inventario</p>
                        <p className="text-sm opacity-90 line-clamp-3">{quote.description}</p>
                      </div>
                    </div>
                    
                    {quote.status === 'Cotizada' && quote.estimatedValue && (
                      <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/20 mt-4">
                        <p className="text-xs font-bold text-green-600 uppercase mb-1">Valor Propuesto</p>
                        <p className="text-2xl font-black text-foreground">${quote.estimatedValue.toLocaleString()}</p>
                        <Button className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20">
                          Aceptar Cotización
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
