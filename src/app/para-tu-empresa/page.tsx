"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Facebook, Instagram, Twitter, Phone, Mail, MapPin, Truck, ChevronDown, 
  Briefcase, ShieldCheck, Clock, Target, Zap, Building2, CheckCircle2, Factory, Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PublicNavigation } from '@/components/PublicNavigation';

export default function ParaTuEmpresaPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

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
      transition: { staggerChildren: 0.2 }
    }
  };

  const services = [
    { 
      title: "Asesoría Completa", 
      desc: "Evaluamos las necesidades de tu empresa para diseñar una estrategia de traslado a la medida, optimizando recursos y tiempos.",
      icon: <Target size={32} />,
      img: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=2070&auto=format&fit=crop"
    },
    { 
      title: "Planificación Estratégica", 
      desc: "Cronogramas milimétricos diseñados para reducir a cero el tiempo de inactividad operativo durante la mudanza corporativa.",
      icon: <Clock size={32} />,
      img: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?q=80&w=2070&auto=format&fit=crop"
    },
    { 
      title: "Respaldo Especializado", 
      desc: "Ingenieros y técnicos expertos en desconexión, traslado y reconexión de servidores y equipos de alta sensibilidad.",
      icon: <ShieldCheck size={32} />,
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
    },
    { 
      title: "Montaje Integral", 
      desc: "Entregamos tus nuevas instalaciones listas para operar. Armado de estaciones de trabajo, salas de juntas y redes.",
      icon: <Building2 size={32} />,
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
    },
  ];

  const productsGrid = [
    {
      title: "Mobiliario Corporativo",
      desc: "Estaciones de trabajo, salas de juntas y sillería ergonómica con protección de grado industrial.",
      img: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=2069&auto=format&fit=crop",
      span: "col-span-1 md:col-span-2 row-span-2"
    },
    {
      title: "Data Centers",
      desc: "Servidores y racks con embalaje antiestático y climatizado.",
      img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
      span: "col-span-1 row-span-1"
    },
    {
      title: "Archivo y Documentos",
      desc: "Gestión documental con cadena de custodia garantizada.",
      img: "https://images.unsplash.com/photo-1581337204873-ef36aa186caa?q=80&w=1995&auto=format&fit=crop",
      span: "col-span-1 row-span-1"
    },
    {
      title: "Material Publicitario",
      desc: "Stands, pendones y vitrinas para tus eventos con cuidado extremo.",
      img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
      span: "col-span-1 md:col-span-3 row-span-1"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-body selection:bg-primary/20">
      
      {/* Navbar Premium */}
      <PublicNavigation scrolled={scrolled} />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
            alt="Corporate Office Background"
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-20">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="space-y-8 text-white"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-5 py-2 rounded-full text-sm font-bold tracking-widest shadow-xl">
              <Briefcase size={16} /> SOLUCIONES CORPORATIVAS B2B
            </motion.div>
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] drop-shadow-2xl">
              Elevamos el <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                estándar de tu mudanza.
              </span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-white/90 font-medium leading-relaxed max-w-lg drop-shadow-md">
              Diseñamos estrategias logísticas de alta precisión. Mudanzas corporativas sin interrupciones operativas, garantizando la seguridad de tus activos más valiosos.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="rounded-full bg-white text-primary hover:bg-gray-100 hover:scale-105 transition-all text-lg font-black px-10 h-14 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Cotizar Ahora
              </Button>
              <a href="#servicios" className="inline-flex items-center justify-center rounded-full bg-transparent border-2 border-white text-white hover:bg-white/10 hover:scale-105 transition-all text-lg font-bold px-8 h-14 backdrop-blur-sm">
                Descubrir Servicios
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative h-[500px] w-full hidden lg:block"
          >
            <div className="absolute inset-0 bg-white/10 rounded-[2.5rem] transform rotate-3" />
            <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border border-white/20 shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="Corporate Team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              
              {/* Floating glassmorphism card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Zap className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">0% Tiempo de Inactividad</h4>
                    <p className="text-sm text-white/90 font-medium">Operaciones continuas garantizadas</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100 relative shadow-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
          {[
            { num: "500+", label: "Empresas Aliadas" },
            { num: "10k+", label: "Traslados Exitosos" },
            { num: "100%", label: "Seguridad Garantizada" },
            { num: "24/7", label: "Soporte Corporativo" },
          ].map((stat, i) => (
            <div key={i} className="text-center px-4">
              <div className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 mb-2">
                {stat.num}
              </div>
              <div className="text-sm text-gray-500 font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Services Section */}
      <section id="servicios" className="py-32 relative bg-slate-50 overflow-hidden">
        {/* Decorative blur */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <div className="inline-block bg-primary/10 text-primary font-bold px-4 py-2 rounded-full text-sm uppercase tracking-widest mb-4">Nuestra Experiencia</div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
              Servicios de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Alto Rendimiento</span>
            </h2>
            <div className="w-24 h-1.5 bg-primary/20 mx-auto mt-6 rounded-full" />
            <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium mt-6">
              Soluciones integrales diseñadas específicamente para el ecosistema corporativo, abarcando cada etapa del proceso de reubicación.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Tab selectors */}
            <div className="space-y-4">
              {services.map((service, index) => (
                <div 
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 border ${
                    activeTab === index 
                      ? "bg-white border-primary/20 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] scale-[1.02]" 
                      : "bg-transparent border-transparent hover:bg-white/60"
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <div className={`p-4 rounded-2xl transition-all duration-300 ${activeTab === index ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-primary/10 text-primary"}`}>
                      {service.icon}
                    </div>
                    <div>
                      <h3 className={`text-2xl font-black mb-2 transition-colors ${activeTab === index ? "text-slate-800" : "text-slate-600"}`}>
                        {service.title}
                      </h3>
                      <p className={`text-base leading-relaxed transition-colors font-medium ${activeTab === index ? "text-gray-600" : "text-gray-500"}`}>
                        {service.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Dynamic Image */}
            <div className="relative h-[600px] rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] group border border-gray-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={services[activeTab].img} 
                    alt={services[activeTab].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  
                  {/* Title overlay inside image for extra premium feel */}
                  <div className="absolute bottom-8 left-8 right-8">
                     <h3 className="text-3xl font-black text-white drop-shadow-lg">{services[activeTab].title}</h3>
                     <div className="w-12 h-1 bg-primary mt-4 rounded-full" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Bento Grid for Products */}
      <section className="py-32 bg-white relative border-t border-gray-100 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-16 md:flex justify-between items-end">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-800 mb-6 leading-tight">
                Especialistas en <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Activos Corporativos</span>
              </h2>
              <p className="text-gray-500 text-lg font-medium leading-relaxed">
                Nuestra flota y personal están equipados para manejar mobiliario, tecnología sensible y archivos confidenciales con protocolos de seguridad militar.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {productsGrid.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative group rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 bg-slate-100 ${item.span}`}
              >
                <Image 
                  src={item.img} 
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-black text-white mb-2 group-hover:text-primary-100 transition-colors drop-shadow-md">{item.title}</h3>
                  <p className="text-gray-200 font-medium text-sm max-w-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 drop-shadow-sm">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-primary mt-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-10">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            ¿LISTO PARA LLEVAR TU EMPRESA AL <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">SIGUIENTE NIVEL?</span>
          </h2>
          <p className="text-xl text-white/90 font-medium">
            Agenda una consultoría gratuita con nuestros expertos logísticos y descubre cómo podemos optimizar tu próximo traslado.
          </p>
          <a href="https://wa.me/573000000000" target="_blank" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary rounded-full font-black text-lg hover:scale-105 hover:shadow-[0_10px_40px_rgba(255,255,255,0.3)] transition-all duration-300">
            Agendar Consultoría <ArrowRight size={20} />
          </a>
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
             <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-sm">Ingeniería en logística y mudanzas. Llevando tus activos corporativos a su nuevo destino con seguridad, tecnología y confianza absoluta.</p>
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
             <h4 className="font-bold text-slate-800 uppercase tracking-widest">Enlaces Rápidos</h4>
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
