
"use client";

import React, { useState } from 'react';
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
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LandingPage() {
  const router = useRouter();
  const [trackingId, setTrackingId] = useState('');
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-logistics');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      router.push(`/tracking/${trackingId}`);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
              T
            </div>
            <span className="text-xl font-bold tracking-tight">TransmudanzasJH</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Características</a>
            <a href="#quote" className="text-sm font-medium hover:text-primary transition-colors">Cotizar</a>
            <a href="#track" className="text-sm font-medium hover:text-primary transition-colors">Rastrear</a>
            <Button onClick={() => router.push('/dashboard')} variant="outline" className="rounded-full px-6">
              Acceso Empleados
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-60 md:pb-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles size={14} /> Logística impulsada por IA
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
                Tus pertenencias, <br />
                <span className="text-primary">seguras y a tiempo.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Reinventamos las mudanzas en Colombia con tecnología de punta, rastreo en tiempo real y cotizaciones inteligentes en segundos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-2xl h-14 px-8 text-lg gap-2 shadow-xl shadow-primary/20">
                  Cotizar Ahora <ArrowRight size={20} />
                </Button>
                <Button size="lg" variant="outline" onClick={() => document.getElementById('track')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-2xl h-14 px-8 text-lg">
                  Rastrear Guía
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl z-10">
                <Image 
                  src={heroImage?.imageUrl || ''} 
                  alt="Logística Moderna" 
                  fill 
                  className="object-cover"
                  data-ai-hint="modern logistics truck"
                />
              </div>
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary/30 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tracking Section */}
      <section id="track" className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">¿Dónde está tu carga?</h2>
            <p className="text-muted-foreground">Ingresa el número de tu guía para ver el estado en tiempo real.</p>
          </div>
          <Card className="glass-card border-none p-2 rounded-[2rem] max-w-2xl mx-auto shadow-2xl">
            <form onSubmit={handleTrack} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input 
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Ej: GUIA-000842" 
                  className="h-16 pl-12 rounded-2xl border-none text-lg focus-visible:ring-0" 
                />
              </div>
              <Button type="submit" className="h-16 px-8 rounded-2xl font-bold">
                Buscar
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Quote Section */}
      <section id="quote" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">Cotiza con IA en un clic</h2>
                <p className="text-muted-foreground text-lg">
                  Nuestra inteligencia artificial analiza el volumen de tus objetos para darte el precio más justo y el vehículo adecuado.
                </p>
              </div>

              <div className="space-y-8">
                {[
                  { icon: ShieldCheck, title: "Seguro Todo Riesgo", desc: "Tus bienes protegidos desde el cargue hasta la entrega." },
                  { icon: Clock, title: "Puntualidad Extrema", desc: "Si llegamos tarde, te devolvemos un porcentaje del valor." },
                  { icon: Camera, title: "Análisis Fotográfico", desc: "Sube una foto de tu carga y nuestra IA estimará el espacio." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                      <item.icon size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="glass-card border-none rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Package size={100} />
              </div>
              <CardContent className="space-y-6 p-0 relative z-10">
                <div className="space-y-2">
                  <Label className="text-lg font-bold">¿Qué vas a transportar?</Label>
                  <Textarea 
                    placeholder="Describe tus objetos (ej: 2 camas, 10 cajas, nevera...)" 
                    className="rounded-2xl min-h-[120px] text-lg p-4 border-muted"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-bold">Origen</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                      <Input placeholder="Ciudad" className="pl-10 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold">Destino</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                      <Input placeholder="Ciudad" className="pl-10 rounded-xl" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="font-bold block">Evidencia Fotográfica (Opcional)</Label>
                  <div className="border-2 border-dashed border-primary/20 rounded-[2rem] p-8 text-center hover:bg-primary/5 transition-colors cursor-pointer group">
                    <Camera className="mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" size={40} />
                    <p className="text-sm font-medium">Sube fotos de tus objetos para una cotización más precisa</p>
                    <p className="text-xs text-muted-foreground mt-2">JPG, PNG hasta 5MB</p>
                    <input type="file" className="hidden" />
                  </div>
                </div>

                <Button className="w-full h-16 rounded-2xl text-xl font-bold bg-primary shadow-xl shadow-primary/30 group">
                  Obtener Cotización IA <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-20 mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold">
                T
              </div>
              <span className="text-2xl font-bold">TransmudanzasJH</span>
            </div>
            <p className="text-background/60 max-w-sm">
              Líderes en logística de mudanzas inteligentes en Colombia. Seguridad, rapidez y transparencia en cada kilómetro.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Servicios</h4>
            <ul className="space-y-2 text-background/60 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Mudanzas Nacionales</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Bodegaje Inteligente</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Embalaje Profesional</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Transporte Empresarial</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Contacto</h4>
            <ul className="space-y-2 text-background/60 text-sm">
              <li>Bogotá, Colombia</li>
              <li>+57 300 000 0000</li>
              <li>soporte@transmudanzasjh.com</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-background/10 text-center text-sm text-background/40">
          © 2024 TransmudanzasJH. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
