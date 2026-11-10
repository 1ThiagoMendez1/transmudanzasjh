"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, ArrowRight, Facebook, Instagram, Twitter, Phone, Mail, MapPin, Truck, ChevronDown, Plus, Minus, MessageCircleQuestion
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PublicNavigation } from '@/components/PublicNavigation';

export default function FAQPage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

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

  const faqItems = [
    {
      question: "¿QUÉ SERVICIOS OFRECEN?",
      answer: "Ofrecemos servicios de mudanza local en Bogotá y mudanzas a nivel nacional, embalaje, transporte, carga y descarga. También contamos con opciones de bodegaje temporal y suministros de embalaje."
    },
    {
      question: "¿CON CUÁNTO TIEMPO DE ANTICIPACIÓN DEBO RESERVAR MI MUDANZA?",
      answer: "Recomendamos reservar con al menos 5 a 7 días de anticipación para garantizar disponibilidad, especialmente en fines de semana y a final de mes."
    },
    {
      question: "¿QUÉ ARTÍCULOS NO TRANSPORTAN?",
      answer: "Por seguridad no transportamos materiales inflamables, sustancias químicas, armas de fuego, animales vivos ni alimentos."
    },
    {
      question: "¿QUÉ PASA SI NECESITO REPROGRAMAR MI MUDANZA?",
      answer: "Puedes reprogramar tu mudanza sin costo adicional avisando con mínimo 24 horas de anticipación."
    },
    {
      question: "¿CUÁNTO TARDA UNA MUDANZA EN BOGOTÁ?",
      answer: "Depende de la distancia y volumen. Una mudanza local en promedio toma entre 3 y 5 horas. Las mudanzas nacionales varían según la ciudad destino."
    },
    {
      question: "¿CÓMO PUEDO SOLICITAR UNA COTIZACIÓN?",
      answer: "Puedes solicitar tu cotización a través de nuestro formulario en la web, por WhatsApp o llamándonos directamente. Solo necesitamos la dirección de origen, destino y una lista aproximada de los objetos a transportar."
    },
    {
      question: "¿REALIZAN EMBALAJE DE LOS OBJETOS?",
      answer: "Sí. Contamos con personal especializado y materiales de alta calidad (cajas, plástico burbuja, cinta, cobijas, etc.) para proteger tus pertenencias durante el transporte. Adicional contamos con servicio de armado y desarmado para que tu mudanza sea más fácil y sencilla."
    },
    {
      question: "¿MIS PERTENENCIAS ESTÁN ASEGURADAS DURANTE LA MUDANZA?",
      answer: "Sí. Tenemos alianza con Sura. Se debe realizar el pago directamente con ellos y se paga el 4% del valor declarado. Se deben presentar facturas para determinar el valor de los muebles y electrodomésticos a asegurar."
    },
    {
      question: "¿OFRECEN BODEGAJE TEMPORAL?",
      answer: "Sí, contamos con bodegas seguras y monitoreadas para guardar tus pertenencias el tiempo que necesites."
    },
    {
      question: "¿PUEDO PAGAR CON TARJETA O SOLO EN EFECTIVO?",
      answer: "Aceptamos pagos en efectivo, transferencia bancaria, nequi."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-body selection:bg-primary/20">
      
      {/* Navbar Premium */}
      <PublicNavigation scrolled={scrolled} />

      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[450px] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image & Purple Overlay */}
        <div className="absolute inset-0 z-0 scale-105">
          <Image 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
            alt="Interior del Hogar" 
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
            <MessageCircleQuestion size={18} /> CENTRO DE AYUDA
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-tight drop-shadow-2xl uppercase"
          >
            PREGUNTAS <br className="hidden sm:block" />
            <span className="text-white/90">FRECUENTES (FAQ)</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl font-medium text-white/80 drop-shadow-md leading-relaxed mt-4 max-w-2xl mx-auto"
          >
            Resolvemos tus dudas para que tu experiencia de mudanza sea completamente transparente y tranquila.
          </motion.p>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="py-20 -mt-20 relative z-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="space-y-4"
          >
            {faqItems.map((item, i) => (
              <motion.div key={i} variants={fadeIn} className="bg-white rounded-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                  className={`w-full text-left px-6 py-6 flex items-center justify-between font-black text-sm md:text-base transition-colors ${
                    activeAccordion === i ? "bg-primary text-white" : "bg-white text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  <span className="pr-4 leading-tight">{item.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${activeAccordion === i ? "bg-white/20 rotate-180" : "bg-primary/10 text-primary rotate-0"}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                <AnimatePresence>
                  {activeAccordion === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="bg-white overflow-hidden"
                    >
                      <div className="p-6 pt-4 text-slate-600 text-base font-medium leading-relaxed border-t border-gray-100 bg-slate-50/50">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 pattern-dots pointer-events-none opacity-50" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center space-y-8 bg-white glass-card border border-primary/10 rounded-[3rem] p-12 md:p-20 shadow-[0_20px_60px_-15px_rgba(139,92,246,0.15)]">
          
          <div className="inline-flex items-center gap-3 text-primary font-black text-xl md:text-3xl bg-primary/10 px-6 py-3 rounded-full">
            <Phone size={28} className="animate-pulse" />
            <span>+57 3132159686</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-slate-800 uppercase tracking-tighter leading-none">
            HAGAMOS DE TU MUDANZA <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">ALGO FÁCIL</span>
          </h2>
          
          <div className="pt-8">
            <Link href="/solicitar-cotizacion" className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 text-white font-black px-12 h-16 shadow-[0_10px_30px_rgba(139,92,246,0.3)] text-xl hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(139,92,246,0.4)] transition-all group">
              COTIZA AQUÍ
              <ArrowRight size={24} className="ml-3 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-slate-50 pt-20 pb-10 border-t border-gray-200">
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
