"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Building, Home, Briefcase, MapPin, CheckCircle2, ArrowRight, Facebook, Instagram, Twitter, Phone, Mail, Package, ShieldCheck, Truck, Factory, Cable, ChevronDown, Wrench, PackageCheck, Monitor, Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PublicNavigation } from '@/components/PublicNavigation';

// --- Real Images ---
const imageList = {
  asesoria: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80",
  desarme: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80",
  embalaje: "https://images.unsplash.com/photo-1555626906-fcf10d6851b4?auto=format&fit=crop&q=80",
  transporte: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80",
  descarga: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
};

export default function HogarPage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-body selection:bg-primary/20">
      
      {/* Navbar Premium */}
      <PublicNavigation scrolled={scrolled} />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex flex-col items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 scale-105">
          <Image 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop" 
            alt="Mudanza Hogar" 
            fill 
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-primary/75 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/60 to-primary/95" />
        </div>

        <div className="relative z-10 text-center text-white space-y-6 max-w-4xl px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter drop-shadow-2xl uppercase"
          >
            PARA TU HOGAR
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl font-medium text-white/90 drop-shadow-md leading-relaxed"
          >
            En Transmudanzas conocemos el cuidado que merecen los enseres de tu hogar, por esta razón protegemos con material de empaque diseñado a la medida para garantizar que tus pertenencias lleguen intactas a su destino.
          </motion.p>
        </div>
      </section>

      {/* Intro Title Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-10">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-black text-primary uppercase text-center md:text-right max-w-sm tracking-tight leading-tight"
          >
            CONOCE CÓMO SERÁ <br/> TU MUDANZA
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            className="w-40 h-40 bg-purple-50 rounded-[3rem] shadow-xl flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform duration-500"
          >
            <Truck size={60} className="text-primary" />
          </motion.div>
        </div>
      </section>

      {/* Zig Zag Sections */}
      <div className="flex flex-col">
        
        {/* Row 1: Asesoría (Purple) */}
        <section className="py-24 bg-primary text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
              <div className="w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[4/3] rounded-[2rem] relative overflow-hidden shadow-2xl border border-white/20">
                <Image src={imageList.asesoria} alt="Asesoría" fill className="object-cover" />
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
              </div>
            </motion.div>
            <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="space-y-6">
              <h3 className="text-3xl font-black uppercase tracking-wide">Asesoría</h3>
              <div className="w-16 h-1.5 bg-white/30 rounded-full" />
              <p className="text-lg text-white/80 font-medium leading-relaxed">
                Nuestros asesores están altamente capacitados para guiarte en todo el proceso. Realizamos una visita sin costo a tu lugar de origen y analizamos el volumen de tu mudanza para ofrecerte la solución perfecta.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Row 2: Desarme (White) */}
        <section className="py-24 bg-white text-slate-800 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="space-y-6 order-2 md:order-1">
              <h3 className="text-3xl font-black uppercase tracking-wide text-primary">Desarme y Empaque</h3>
              <div className="w-16 h-1.5 bg-primary/20 rounded-full" />
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                Nos encargamos del desarme integral de todo tu mobiliario. Empacamos con meticuloso cuidado cada enser utilizando materiales especializados para evitar daños.
              </p>
            </motion.div>
            <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="order-1 md:order-2">
              <div className="w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[4/3] rounded-[2rem] relative overflow-hidden shadow-2xl border border-gray-100">
                <Image src={imageList.desarme} alt="Desarme" fill className="object-cover" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Row 3: Embalaje (Purple) */}
        <section className="py-24 bg-primary text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
              <div className="w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[4/3] rounded-[2rem] relative overflow-hidden shadow-2xl border border-white/20">
                <Image src={imageList.embalaje} alt="Embalaje" fill className="object-cover" />
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
              </div>
            </motion.div>
            <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="space-y-6">
              <h3 className="text-3xl font-black uppercase tracking-wide">Embalaje y Carga</h3>
              <div className="w-16 h-1.5 bg-white/30 rounded-full" />
              <p className="text-lg text-white/80 font-medium leading-relaxed">
                Todo tu mobiliario es protegido con mantas de algodón especiales. Nuestro equipo logístico realiza la carga de forma estratégica en los vehículos para garantizar la estabilidad.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Row 4: Transporte (White) */}
        <section className="py-24 bg-white text-slate-800 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="space-y-6 order-2 md:order-1">
              <h3 className="text-3xl font-black uppercase tracking-wide text-primary">Transporte</h3>
              <div className="w-16 h-1.5 bg-primary/20 rounded-full" />
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                Trasladamos tus pertenencias en vehículos equipados con la más alta tecnología en rastreo satelital. Tus bienes viajan seguros, monitorizados en tiempo real y con pólizas a todo riesgo.
              </p>
            </motion.div>
            <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="order-1 md:order-2">
              <div className="w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[4/3] rounded-[2rem] relative overflow-hidden shadow-2xl border border-gray-100">
                <Image src={imageList.transporte} alt="Transporte" fill className="object-cover" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Row 5: Descarga (Purple) */}
        <section className="py-24 bg-primary text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
              <div className="w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[4/3] rounded-[2rem] relative overflow-hidden shadow-2xl border border-white/20">
                <Image src={imageList.descarga} alt="Descarga" fill className="object-cover" />
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
              </div>
            </motion.div>
            <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="space-y-6">
              <h3 className="text-3xl font-black uppercase tracking-wide leading-tight">Descarga y Posicionamiento</h3>
              <div className="w-16 h-1.5 bg-white/30 rounded-full" />
              <p className="text-lg text-white/80 font-medium leading-relaxed">
                Ubicamos cada mueble en el lugar exacto que nos indiques. Procedemos al desempaque, armado y verificación del correcto funcionamiento de todos los equipos. Dejamos tu nuevo hogar listo para ser disfrutado.
              </p>
            </motion.div>
          </div>
        </section>

      </div>

      {/* CTA Section */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-sm aspect-square bg-white rounded-full shadow-2xl border border-gray-100 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
              <ShieldCheck size={120} className="text-primary/40 absolute drop-shadow-lg" />
              <Users size={80} className="text-primary relative z-10" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center md:text-left space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight leading-tight">
              Toma el control del servicio e inspecciona que no falte nada. <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">Garantizamos una experiencia 5 estrellas.</span>
            </h2>
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white font-black px-12 h-16 shadow-[0_10px_30px_rgba(139,92,246,0.3)] text-lg hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(139,92,246,0.4)] transition-all">
              Contáctanos
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-white pt-20 pb-10 border-t border-gray-200">
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
               <li className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl shadow-sm border border-gray-100"><Phone size={18} className="text-primary"/> <span className="font-bold text-slate-800">+57 300 000 0000</span></li>
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
          <p>Hecho con precisión.</p>
        </div>
      </footer>
      
      {/* WhatsApp Premium Floating Widget */}
      <a href="https://wa.me/573000000000" target="_blank" rel="noreferrer" className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 group flex items-end sm:items-center gap-4 flex-col sm:flex-row">
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
