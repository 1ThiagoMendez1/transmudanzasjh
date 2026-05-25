"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { submitWebQuote } from '@/lib/quotes';
import { MapPin, User, PackageOpen, Camera, CheckCircle2, ArrowRight, ArrowLeft, Truck, Copy, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function RequestQuotePage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [result, setResult] = useState<{ id: string, secretCode: string } | null>(null);

  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    estimatedDate: '',
    clientName: '',
    clientPhone: '',
    description: '',
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    if (!formData.origin || !formData.destination || !formData.description || !formData.clientName) {
      toast({
        variant: "destructive",
        title: "Campos incompletos",
        description: "Por favor completa toda la información requerida."
      });
      return;
    }

    setLoading(true);
    try {
      const res = await submitWebQuote({
        origin: formData.origin,
        destination: formData.destination,
        estimatedDate: formData.estimatedDate,
        clientName: formData.clientName,
        clientPhone: formData.clientPhone,
        description: formData.description,
        photos: [] // mock photos
      });
      setResult(res);
      setStep(5); // Success step
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al enviar",
        description: "Hubo un problema procesando tu solicitud."
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: 'id' | 'code') => {
    navigator.clipboard.writeText(text);
    if (type === 'id') {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 flex items-center justify-center p-4">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        
        {step < 5 && (
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
              <Truck className="text-primary" /> Cotiza tu Mudanza
            </h1>
            <p className="text-muted-foreground">Rápido, seguro y sin compromisos.</p>
            
            {/* Progress Bar */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`h-2 rounded-full transition-all duration-300 ${step >= i ? 'w-8 bg-primary' : 'w-4 bg-muted'}`} />
              ))}
            </div>
          </div>
        )}

        <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden p-8">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Ruta */}
            {step === 1 && (
              <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl"><MapPin size={24} /></div>
                  <div>
                    <h2 className="text-xl font-bold">Ruta del Viaje</h2>
                    <p className="text-sm text-muted-foreground">¿De dónde a dónde te mudas?</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Ciudad de Origen</Label>
                    <Input 
                      placeholder="Ej: Bogotá" 
                      className="rounded-xl h-12 bg-white/50 dark:bg-black/20"
                      value={formData.origin}
                      onChange={e => setFormData({...formData, origin: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Ciudad de Destino</Label>
                    <Input 
                      placeholder="Ej: Medellín" 
                      className="rounded-xl h-12 bg-white/50 dark:bg-black/20"
                      value={formData.destination}
                      onChange={e => setFormData({...formData, destination: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha Estimada</Label>
                    <Input 
                      type="date"
                      className="rounded-xl h-12 bg-white/50 dark:bg-black/20"
                      value={formData.estimatedDate}
                      onChange={e => setFormData({...formData, estimatedDate: e.target.value})}
                    />
                  </div>
                </div>

                <Button 
                  className="w-full h-12 rounded-xl text-lg gap-2 mt-4" 
                  onClick={nextStep}
                  disabled={!formData.origin || !formData.destination}
                >
                  Continuar <ArrowRight size={20} />
                </Button>
              </motion.div>
            )}

            {/* Step 2: Cliente */}
            {step === 2 && (
              <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl"><User size={24} /></div>
                  <div>
                    <h2 className="text-xl font-bold">Tus Datos</h2>
                    <p className="text-sm text-muted-foreground">Para contactarte con la propuesta.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nombre Completo</Label>
                    <Input 
                      placeholder="Ej: Juan Pérez" 
                      className="rounded-xl h-12 bg-white/50 dark:bg-black/20"
                      value={formData.clientName}
                      onChange={e => setFormData({...formData, clientName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Teléfono / WhatsApp</Label>
                    <Input 
                      type="tel"
                      placeholder="Ej: 300 123 4567" 
                      className="rounded-xl h-12 bg-white/50 dark:bg-black/20"
                      value={formData.clientPhone}
                      onChange={e => setFormData({...formData, clientPhone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-4">
                  <Button variant="outline" className="h-12 rounded-xl px-4" onClick={prevStep}>
                    <ArrowLeft size={20} />
                  </Button>
                  <Button 
                    className="flex-1 h-12 rounded-xl text-lg gap-2" 
                    onClick={nextStep}
                    disabled={!formData.clientName}
                  >
                    Continuar <ArrowRight size={20} />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Inventario */}
            {step === 3 && (
              <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl"><PackageOpen size={24} /></div>
                  <div>
                    <h2 className="text-xl font-bold">¿Qué vamos a llevar?</h2>
                    <p className="text-sm text-muted-foreground">Describe los objetos principales.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Descripción del Inventario</Label>
                    <Textarea 
                      placeholder="Ej: 1 cama doble, 1 nevera, 1 lavadora, 1 comedor de 6 puestos, 2 televisores y aprox. 20 cajas medianas..." 
                      className="rounded-xl min-h-[150px] bg-white/50 dark:bg-black/20 resize-none"
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-4">
                  <Button variant="outline" className="h-12 rounded-xl px-4" onClick={prevStep}>
                    <ArrowLeft size={20} />
                  </Button>
                  <Button 
                    className="flex-1 h-12 rounded-xl text-lg gap-2" 
                    onClick={nextStep}
                    disabled={!formData.description}
                  >
                    Continuar <ArrowRight size={20} />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Fotos */}
            {step === 4 && (
              <motion.div key="step4" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl"><Camera size={24} /></div>
                  <div>
                    <h2 className="text-xl font-bold">Evidencia Visual</h2>
                    <p className="text-sm text-muted-foreground">Sube fotos de tus cosas (Opcional, pero recomendado)</p>
                  </div>
                </div>

                <div className="border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
                  <Camera className="mx-auto text-primary/50 mb-4" size={48} />
                  <p className="font-medium text-foreground">Haz clic o arrastra tus fotos aquí</p>
                  <p className="text-xs text-muted-foreground mt-2">Soporta JPG, PNG (Max 5MB)</p>
                  <Button variant="secondary" className="mt-4 rounded-xl">Seleccionar Archivos</Button>
                </div>

                <div className="flex gap-4 mt-4">
                  <Button variant="outline" className="h-12 rounded-xl px-4" onClick={prevStep}>
                    <ArrowLeft size={20} />
                  </Button>
                  <Button 
                    className="flex-1 h-12 rounded-xl text-lg gap-2 shadow-lg shadow-primary/30" 
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Procesando..." : "Solicitar Cotización"} <CheckCircle2 size={20} />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Éxito */}
            {step === 5 && result && (
              <motion.div key="step5" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8 text-center py-8">
                <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} />
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold mb-2">¡Solicitud Recibida!</h2>
                  <p className="text-muted-foreground">Nuestro equipo analizará tu requerimiento y te contactará pronto.</p>
                </div>

                <div className="bg-muted/50 p-6 rounded-2xl max-w-sm mx-auto text-left space-y-6">
                  <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
                    <p className="text-xs font-bold uppercase text-primary mb-1">Nº de Cotización</p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-black tracking-wider text-foreground">{result.id}</p>
                      <button onClick={() => copyToClipboard(result.id, 'id')} className="text-muted-foreground hover:text-primary transition-colors">
                        {copiedId ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="bg-orange-500/10 p-4 rounded-xl border border-orange-500/20">
                    <p className="text-xs font-bold uppercase text-orange-600 mb-1 flex items-center gap-1">
                      Código Secreto <span className="text-[10px] bg-orange-500/20 px-2 py-0.5 rounded-full">No lo compartas</span>
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold tracking-[0.2em] text-foreground">{result.secretCode}</p>
                      <button onClick={() => copyToClipboard(result.secretCode, 'code')} className="text-muted-foreground hover:text-orange-500 transition-colors">
                        {copiedCode ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mt-4">
                  Guarda estos datos. Podrás usarlos para consultar el estado de tu cotización.
                </p>

                <div className="flex justify-center gap-4 mt-8">
                  <Link href="/">
                    <Button variant="outline" className="h-12 rounded-xl px-8">Volver al Inicio</Button>
                  </Link>
                  <Link href="/estado-cotizacion">
                    <Button className="h-12 rounded-xl px-8 shadow-lg shadow-primary/20">
                      Rastrear Estado <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
