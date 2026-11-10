"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, Facebook, Instagram, Twitter, Phone, Mail, MapPin, Truck, ChevronDown, 
  CheckCircle2, Download, FileText, Share2, Bookmark
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PublicNavigation } from '@/components/PublicNavigation';

export default function BlogPostPage() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-body selection:bg-primary/20">
      
      {/* Navbar Premium */}
      <PublicNavigation scrolled={scrolled} />

      {/* Hero Section Parallax */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end justify-center overflow-hidden pb-16">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?q=80&w=2070&auto=format&fit=crop"
            alt="Checklist de Mudanza"
            fill
            className="object-cover opacity-80"
            priority
          />
          {/* Overlay Premium */}
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-xs font-bold uppercase tracking-widest shadow-lg">
                Guías y Consejos
              </span>
              <span className="text-white/80 text-sm font-bold">10 Minutos de lectura</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] mb-6 drop-shadow-2xl text-white">
              ¿CÓMO MUDARSE Y NO <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                MORIR EN EL INTENTO?
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="relative z-20 -mt-10 mb-20 max-w-4xl mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2.5rem] p-8 md:p-16 backdrop-blur-xl"
        >
          {/* Actions Bar */}
          <div className="flex items-center justify-between pb-8 mb-8 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 relative shadow-sm">
                <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" alt="Author" fill className="object-cover" />
              </div>
              <div>
                <p className="font-black text-slate-800">Equipo Transmudanzas JH</p>
                <p className="text-xs text-gray-500 font-bold">12 de Octubre, 2026</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-primary transition-colors shadow-sm">
                <Share2 size={18} />
              </button>
              <button className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-primary transition-colors shadow-sm">
                <Bookmark size={18} />
              </button>
            </div>
          </div>

          {/* Article Text */}
          <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-a:text-primary hover:prose-a:text-primary/80">
            <p className="text-xl font-medium text-slate-700 mb-8 leading-relaxed">
              Mudarse puede convertirse en un verdadero desafío: cajas por todos lados, muebles difíciles de mover y la preocupación constante de que algo se dañe durante el traslado. Sin embargo, con algunos consejos prácticos y el apoyo adecuado, es posible vivir una mudanza sin estrés.
            </p>

            <ul className="space-y-8 my-10 list-none pl-0">
              {[
                { 
                  title: "Planificación anticipada", 
                  text: "Es clave para que todo salga bien. Lo ideal es empacar con mínimo una semana de antelación, clasificar los objetos por habitaciones y etiquetar cada caja de manera clara. Esto no solo ahorra tiempo el día de la mudanza, sino que facilita la organización al llegar al nuevo hogar." 
                },
                { 
                  title: "Materiales de embalaje", 
                  text: "Marcan la diferencia. Utilizar cajas firmes, asegurar cada una con cinta resistente y proteger los objetos frágiles con plástico burbuja son pasos que ayudan a evitar daños en el traslado." 
                },
                { 
                  title: "Apoyo profesional", 
                  text: "Es otro aspecto fundamental. Los expertos en mudanzas se encargan de la carga y descarga, lo que reduce el riesgo de lesiones, optimiza el tiempo y garantiza que todo llegue en perfecto estado." 
                }
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start bg-slate-50 p-6 rounded-2xl border border-gray-100">
                  <div className="mt-1 min-w-6 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-primary drop-shadow-sm" />
                  </div>
                  <div>
                    <strong className="text-slate-800 text-xl font-black block mb-2">{item.title}</strong>
                    <span className="text-gray-600 font-medium leading-relaxed block">{item.text}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="my-12 p-8 md:p-10 rounded-3xl bg-gradient-to-br from-primary/5 to-purple-500/10 border border-primary/20 relative overflow-hidden shadow-inner">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 text-primary/10">
                <Truck size={150} />
              </div>
              <p className="relative z-10 text-xl font-bold text-slate-700 italic m-0 leading-relaxed">
                "Existen además servicios premium que facilitan aún más el proceso. Entre ellos se encuentran el embalaje especializado, el desarme y armado de muebles y el transporte seguro a cualquier parte del país. Estas opciones hacen que la experiencia sea mucho más cómoda y organizada."
              </p>
            </div>

            <p className="mb-12 font-medium">
              Un buen tip es apoyarse en empresas como <strong className="text-primary font-black">Transmudanzas JH</strong>, que ofrecen un servicio integral para que cada mudanza sea rápida, eficiente y sin contratiempos.
            </p>

            {/* Download Checklist Card */}
            <div className="mt-16 group relative rounded-[2rem] overflow-hidden shadow-xl shadow-primary/20">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
                <div className="flex items-start md:items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-inner">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-2 m-0 drop-shadow-md">Checklist de Mudanza</h3>
                    <p className="text-white/90 font-medium m-0 text-sm md:text-base leading-relaxed drop-shadow-sm">
                      Y para que el proceso sea aún más sencillo, hemos preparado un Checklist en PDF con todos los pasos organizados para que no se pase nada por alto.
                    </p>
                  </div>
                </div>
                <a 
                  href="#" 
                  className="shrink-0 w-full md:w-auto px-8 py-4 bg-white text-primary font-black rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <Download size={20} /> Descargar Gratis
                </a>
              </div>
            </div>

          </div>
        </motion.div>
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
               <li className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100"><Phone size={18} className="text-primary"/> <span className="font-bold text-slate-800">+57 300 000 0000</span></li>
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
