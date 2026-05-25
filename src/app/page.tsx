"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Camera, 
  MapPin,
  Package,
  Box,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { LoadingScreen } from '@/components/LoadingScreen';

export default function LandingPage() {
  const router = useRouter();
  const [trackingId, setTrackingId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      router.push(`/tracking/${trackingId}`);
    }
  };

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-lg border-b border-border shadow-sm">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
                <Truck size={24} className="fill-current text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-primary">TransmudanzasJH</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-bold hover:text-secondary transition-colors">Beneficios</a>
              <a href="#quote" className="text-sm font-bold hover:text-secondary transition-colors">Cotizar</a>
              <a href="#track" className="text-sm font-bold hover:text-secondary transition-colors">Rastrear</a>
              <Button onClick={() => router.push('/dashboard')} variant="default" className="rounded-full px-8 bg-primary hover:bg-primary/90 font-bold shadow-lg shadow-primary/20">
                Acceso Personal
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          {/* Animated Background Elements */}
          <motion.div 
            animate={{ y: [0, 20, 0], rotate: [0, 5, 0] }} 
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute top-40 left-10 text-primary/10 -z-10"
          >
            <Box size={120} />
          </motion.div>
          <motion.div 
            animate={{ y: [0, -30, 0], rotate: [0, -10, 0] }} 
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            className="absolute bottom-20 right-10 text-secondary/10 -z-10"
          >
            <Package size={160} />
          </motion.div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: isLoading ? 0 : 1, x: isLoading ? -50 : 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="space-y-8"
              >
                <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary border border-secondary/20 px-4 py-2 rounded-full text-sm font-bold tracking-wide">
                  <Sparkles size={16} /> Movimientos seguros e inteligentes
                </div>
                <h1 className="text-6xl md:text-7xl font-black leading-[1.1] text-foreground">
                  Tu mudanza, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">sin estrés.</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg leading-relaxed font-medium">
                  Cuidamos cada caja como si fuera nuestra. Cotiza en segundos, empacamos con cuidado y rastrea tu camión en tiempo real.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-2xl h-16 px-8 text-xl font-bold gap-3 bg-secondary hover:bg-secondary/90 text-white shadow-xl shadow-secondary/30">
                    Cotizar Mudanza <ArrowRight size={24} />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => document.getElementById('track')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-2xl h-16 px-8 text-xl font-bold border-2 hover:bg-primary/5">
                    Rastrear Camión
                  </Button>
                </div>
                
                <div className="flex items-center gap-6 pt-4 text-sm font-bold text-muted-foreground">
                  <div className="flex items-center gap-2"><CheckCircle2 className="text-primary" size={20} /> Seguro Incluido</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="text-primary" size={20} /> Embalaje Profesional</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 0.9 : 1, rotate: isLoading ? 5 : 0 }}
                transition={{ duration: 1, delay: 0.8, type: "spring" }}
                className="relative"
              >
                <div className="relative aspect-square md:aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-gray-900 z-10">
                  <Image 
                    src="/loading_truck.png" 
                    alt="Mudanza Profesional" 
                    fill 
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -top-12 -right-12 w-72 h-72 bg-primary/20 rounded-full blur-3xl -z-10" />
                <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-secondary/30 rounded-full blur-3xl -z-10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tracking Section */}
        <section id="track" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
          <div className="max-w-4xl mx-auto px-6 text-center space-y-10 relative z-10">
            <div className="space-y-4">
              <Truck size={48} className="mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Sigue tu Mudanza en Vivo</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">Ingresa tu número de guía para ver exactamente dónde está tu camión en el mapa.</p>
            </div>
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-3 rounded-[2.5rem] max-w-2xl mx-auto shadow-2xl">
              <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50" size={24} />
                  <Input 
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="Ej: MUD-00842" 
                    className="h-20 pl-16 rounded-[2rem] bg-white/5 border-none text-xl text-white placeholder:text-white/50 focus-visible:ring-2 focus-visible:ring-white/50" 
                  />
                </div>
                <Button type="submit" className="h-20 px-10 rounded-[2rem] text-xl font-bold bg-white text-primary hover:bg-gray-100 shadow-xl">
                  Rastrear
                </Button>
              </form>
            </Card>
          </div>
        </section>

        {/* Quote Section */}
        <section id="quote" className="py-32 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-12">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold">
                    <Camera size={16} /> Cotización Inteligente
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black">Tu presupuesto,<br/>rápido y exacto.</h2>
                  <p className="text-muted-foreground text-xl">
                    Nuestra tecnología analiza tus necesidades. Sube fotos de tus cosas y te daremos el precio más justo y el camión perfecto para ti.
                  </p>
                </div>

                <div className="space-y-8">
                  {[
                    { icon: ShieldCheck, title: "Todo Asegurado", desc: "Desde el vaso más frágil hasta tu sofá favorito." },
                    { icon: Clock, title: "Tiempo Exacto", desc: "Planificamos la ruta para llegar justo a tiempo." },
                    { icon: Package, title: "Embalaje Premium", desc: "Materiales especiales para proteger cada objeto." }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 10 }}
                      className="flex gap-6 items-center p-4 rounded-3xl hover:bg-white dark:hover:bg-gray-900 transition-colors shadow-sm"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center text-primary shrink-0">
                        <item.icon size={32} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* The "Shipping Label" Quote Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-white dark:bg-card border-2 border-border rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full" />
                  <div className="absolute top-8 right-8 rotate-12 text-secondary/20">
                    <Box size={80} />
                  </div>
                  
                  <CardContent className="space-y-8 p-0 relative z-10">
                    <div className="border-b-2 border-dashed border-border pb-6">
                      <h3 className="text-3xl font-black">Solicitar Mudanza</h3>
                      <p className="text-muted-foreground font-medium mt-2">Completa los datos para tu cotización.</p>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-lg font-bold">¿Qué mudaremos hoy?</Label>
                      <Textarea 
                        placeholder="Ej: 1 nevera, cama doble, 15 cajas, lavadora..." 
                        className="rounded-2xl min-h-[120px] text-lg p-5 border-2 border-muted bg-muted/50 focus-visible:bg-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="font-bold text-lg">Origen</Label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                          <Input placeholder="Dirección actual" className="h-14 pl-12 rounded-2xl border-2 border-muted bg-muted/50 font-medium" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label className="font-bold text-lg">Destino</Label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={20} />
                          <Input placeholder="Nueva dirección" className="h-14 pl-12 rounded-2xl border-2 border-muted bg-muted/50 font-medium" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="font-bold text-lg block">Fotos de la carga (Recomendado)</Label>
                      <div className="border-3 border-dashed border-primary/30 rounded-[2rem] p-8 text-center hover:bg-primary/5 transition-colors cursor-pointer group bg-primary/5">
                        <Camera className="mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" size={48} />
                        <p className="text-base font-bold text-primary">Haz clic para subir fotos</p>
                        <p className="text-sm text-muted-foreground mt-2 font-medium">Esto nos ayuda a enviar el camión correcto.</p>
                        <input type="file" className="hidden" />
                      </div>
                    </div>

                    <Button className="w-full h-16 rounded-2xl text-xl font-bold bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/30 group mt-4">
                      Obtener Precio Exacto <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-foreground text-background py-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white">
                  <Truck size={24} className="fill-current" />
                </div>
                <span className="text-3xl font-black tracking-tight">TransmudanzasJH</span>
              </div>
              <p className="text-background/60 max-w-sm text-lg font-medium">
                Mudanzas inteligentes, seguras y sin estrés. Cuidamos lo que más valoras en cada kilómetro del trayecto.
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-xl">Servicios</h4>
              <ul className="space-y-3 text-background/70 font-medium">
                <li><a href="#" className="hover:text-primary transition-colors">Mudanzas Residenciales</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Mudanzas Corporativas</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Bodegaje Seguro</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Empaque Premium</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-xl">Contacto</h4>
              <ul className="space-y-3 text-background/70 font-medium">
                <li className="flex items-center gap-2"><MapPin size={18}/> Bogotá, Colombia</li>
                <li className="flex items-center gap-2"><Truck size={18}/> +57 300 000 0000</li>
                <li>soporte@transmudanzasjh.com</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-background/10 text-center font-medium text-background/40">
            © {new Date().getFullYear()} TransmudanzasJH. Todos los derechos reservados.
          </div>
        </footer>
      </div>
    </>
  );
}
