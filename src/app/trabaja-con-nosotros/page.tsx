"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Facebook, Instagram, Twitter, Phone, Mail, MapPin, Truck, ChevronDown, Users, Send, Briefcase, Star, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PublicNavigation } from '@/components/PublicNavigation';

export default function TrabajaConNosotrosPage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("¡Gracias por postularte! Hemos recibido tus datos correctamente.");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-body selection:bg-primary/20">
      
      {/* Navbar Premium */}
      <PublicNavigation scrolled={scrolled} />

      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[450px] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image & Purple Overlay */}
        <div className="absolute inset-0 z-0 scale-105">
          <Image 
            src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2072&auto=format&fit=crop" 
            alt="Equipo Logístico" 
            fill 
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/60 to-slate-50" />
        </div>

        <div className="relative z-10 text-center text-white space-y-4 max-w-4xl px-6 mt-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-5 py-2 rounded-full text-sm font-bold tracking-widest shadow-xl mb-6"
          >
            <Users size={18} /> ÚNETE A NUESTRO EQUIPO
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-tight drop-shadow-2xl uppercase"
          >
            TRABAJA CON <br />
            <span className="text-white/90">NOSOTROS</span>
          </motion.h1>
        </div>
      </section>

      {/* Content & Form Section */}
      <section className="py-20 -mt-20 relative z-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Inspirational Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 sticky top-32"
          >
            <div className="w-20 h-1.5 bg-primary/30 rounded-full" />
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight">
              Construye tu futuro <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">con los mejores.</span>
            </h2>
            
            <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
              <p>
                En <strong className="text-primary font-black">Transmudanzas</strong> creemos en el talento y en las ganas de crecer. Siempre estamos buscando personas apasionadas que quieran sumar su energía a <strong>nuestro equipo en todo el país.</strong>
              </p>
              <p>
                Si sueñas con ser parte de una gran familia y construir juntos nuevas oportunidades, déjanos tus datos y comencemos este camino.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col gap-3 hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Star size={24}/></div>
                <h4 className="font-bold text-slate-800">Crecimiento</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Oportunidades reales de desarrollo profesional.</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col gap-3 hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-primary"><Briefcase size={24}/></div>
                <h4 className="font-bold text-slate-800">Estabilidad</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Un ambiente laboral seguro y de confianza.</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Form */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white glass-card rounded-[2.5rem] p-10 md:p-12 shadow-[0_20px_60px_-15px_rgba(139,92,246,0.15)] border border-primary/10 relative overflow-hidden">
              {/* Decorative Blur */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-[50px] pointer-events-none" />
              
              <div className="relative z-10 mb-8">
                <h3 className="text-2xl font-black text-slate-800 mb-2">Aplica Ahora</h3>
                <p className="text-slate-500 text-sm font-medium">Completa el formulario y nos pondremos en contacto contigo.</p>
              </div>

              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nombre */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nombre <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      required
                      placeholder="Tu nombre"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                  {/* Apellidos */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Apellidos <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      required
                      placeholder="Tus apellidos"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Correo */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Correo electrónico <span className="text-red-500">*</span></label>
                  <input 
                    type="email" 
                    required
                    placeholder="ejemplo@correo.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm"
                  />
                </div>

                {/* Teléfono y Ciudad */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Teléfono de contacto</label>
                    <input 
                      type="tel" 
                      placeholder="+57 300 000 0000"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Ciudad de residencia</label>
                    <input 
                      type="text" 
                      placeholder="Ej. Bogotá"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Cargo */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Cargo al que aplica</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm appearance-none cursor-pointer"
                    >
                      <option value="" disabled selected>Selecciona un cargo</option>
                      <option value="conductor">Conductor</option>
                      <option value="auxiliar">Auxiliar de mudanza</option>
                      <option value="administrativo">Personal administrativo</option>
                      <option value="logistica">Logística y empaque</option>
                      <option value="otro">Otro</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>

                {/* Cuéntanos sobre ti */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Cuéntanos sobre ti</label>
                  <textarea 
                    rows={4}
                    placeholder="Escribe brevemente tu experiencia y motivación..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm resize-none"
                  ></textarea>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white font-black py-7 text-lg shadow-[0_10px_20px_rgba(139,92,246,0.2)] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(139,92,246,0.3)] transition-all flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Enviando datos...</span>
                  ) : (
                    <>
                      Enviar Postulación
                      <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
                
                <p className="text-center text-xs text-slate-400 font-medium mt-4">
                  Tus datos están seguros y serán tratados bajo nuestra política de privacidad.
                </p>
              </form>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-slate-50 pt-20 pb-10 border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 mb-16 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start space-y-6">
             <div className="flex items-center gap-3 font-black text-2xl text-primary tracking-tighter">
                <Truck size={28} />
                <span>TRANSMUDANZAS JH</span>
              </div>
             <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-sm">Llevando tus sueños a su nuevo destino con seguridad, tecnología y confianza absoluta.</p>
             <div className="flex gap-4 pt-4">
                <a href="#" className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:scale-110 hover:-translate-y-1 transition-all"><Facebook size={20}/></a>
                <a href="#" className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:scale-110 hover:-translate-y-1 transition-all"><Instagram size={20}/></a>
                <a href="#" className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:scale-110 hover:-translate-y-1 transition-all"><Twitter size={20}/></a>
             </div>
          </div>
          
          <div className="flex flex-col items-center md:items-start space-y-6">
             <h4 className="font-bold text-slate-800 uppercase tracking-widest">Contacto</h4>
             <ul className="space-y-4 text-gray-600 text-sm font-medium">
               <li className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100"><Phone size={18} className="text-primary"/> <span className="font-bold text-slate-800">+57 3132159686</span></li>
               <li className="flex items-center gap-3"><Mail size={18} className="text-primary"/> contacto@transmudanzasjh.com</li>
               <li className="flex items-center gap-3"><MapPin size={18} className="text-primary"/> Bogotá D.C., Colombia</li>
             </ul>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-6">
             <h4 className="font-bold text-slate-800 uppercase tracking-widest">Enlaces Rapidos</h4>
             <ul className="space-y-4 text-gray-600 text-sm font-medium">
               <li><a href="/terminos-y-condiciones" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight size={14}/> Términos y Condiciones</a></li>
               <li><a href="/politica-de-privacidad" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight size={14}/> Política de Privacidad</a></li>
               <li><a href="/pqrsf" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight size={14}/> Radicar PQRSF</a></li>
               <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight size={14}/> Rastrea tu envío</a></li>
             </ul>
          </div>
          
        </div>
        
        <div className="max-w-7xl mx-auto px-6 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <p>Copyright © {new Date().getFullYear()} Transmudanzas JH.</p>
          <p>Powered by Transmudanzas JH.</p>
        </div>
      </footer>
      
      {/* WhatsApp Premium Floating Widget */}
      <a href="https://wa.me/573132159686" target="_blank" rel="noreferrer" className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 group flex items-end sm:items-center gap-4 flex-col sm:flex-row">
        <div className="bg-white text-slate-800 px-5 py-3 rounded-2xl shadow-xl font-bold text-sm opacity-0 translate-y-4 sm:translate-y-0 sm:translate-x-4 group-hover:opacity-100 group-hover:translate-y-0 sm:group-hover:translate-x-0 transition-all duration-300 border border-gray-100">
          ¡Hola! 👋 ¿Necesitas una cotización?
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-60"></div>
          <div className="relative w-16 h-16 bg-gradient-to-tr from-green-600 to-emerald-400 rounded-full flex items-center justify-center text-white shadow-[0_10px_30px_rgba(34,197,94,0.4)] hover:scale-110 hover:shadow-[0_15px_40px_rgba(34,197,94,0.5)] transition-all duration-300">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
        </div>
      </a>
      
    </div>
  );
}
