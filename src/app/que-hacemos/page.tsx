"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, Facebook, Instagram, Twitter, Phone, Mail, MapPin, ArrowRight,
  ChevronDown, Key, Package, Building, ShieldCheck
} from 'lucide-react';
import { PublicNavigation } from '@/components/PublicNavigation';

export default function QueHacemosPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
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
      title: "ALMACENAMIENTO",
      subtitle: "Seguro",
      icon: Key,
      description: "Te ofrecemos un servicio de bodegaje personalizado, ideal para resguardar tu mudanza durante el tiempo que necesites. Contamos con estrictos estándares de almacenamiento que garantizan la seguridad y conservación de tus pertenencias, evitando cualquier tipo de daño.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80",
      color: "from-purple-500 to-indigo-600",
      bgLight: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      title: "EMBALAJE",
      subtitle: "Empaque de alta calidad",
      icon: Package,
      description: "Tu mudanza merece el máximo cuidado por eso usamos materiales de embalaje de alta calidad —como vinipel, burbuja, cartón corrugado y cajas plásticas que puedes alquilar en cualquier momento— para proteger tus pertenencias. Añadimos protección extra con mantas y cobijas. ¡Así garantizamos que todo llegue impecable!",
      image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80",
      color: "from-blue-500 to-cyan-500",
      bgLight: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      title: "ENVÍOS",
      subtitle: "Servicio puerta a puerta",
      icon: Truck,
      description: "Sabemos que al enviar correspondencia, el cuidado y la puntualidad son clave. Por eso, te ofrecemos un servicio puerta a puerta confiable, ideal tanto para envíos pequeños como para grandes superficies y eventos corporativos. Cumplimos con todas las condiciones y garantizamos tiempos de entrega.",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80",
      color: "from-emerald-500 to-teal-500",
      bgLight: "bg-emerald-50",
      iconColor: "text-emerald-600"
    },
    {
      title: "MVTO POR FACHADA",
      subtitle: "Técnicas especializadas",
      icon: Building,
      description: "Cada traslado es único y requiere una atención personalizada. Ofrecemos el servicio de movimiento de muebles por fachada para aquellos objetos que no alcancen a pasar por puertas, escaleras o ascensores. Realizamos el traslado de forma segura a través de ventanas o balcones.",
      image: "https://images.unsplash.com/photo-1541888001859-994c502b48d9?auto=format&fit=crop&q=80",
      color: "from-orange-500 to-red-500",
      bgLight: "bg-orange-50",
      iconColor: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-body selection:bg-primary/20 overflow-hidden">
      
      {/* Navbar Premium */}
      <PublicNavigation scrolled={scrolled} />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden pt-32 pb-40">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80" 
            alt="Mudanzas" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-purple-900/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_15s_infinite_linear]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center mt-10 md:mt-0">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
            <motion.div variants={fadeInUp} className="inline-block bg-white/20 backdrop-blur-md text-white font-bold px-6 py-2 rounded-full text-sm uppercase tracking-widest border border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              Nuestro Portafolio
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-tight drop-shadow-2xl">
              ¿QUÉ <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">HACEMOS?</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-white/90 font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-md">
              En Transmudanzas ofrecemos un portafolio integral de servicios que facilitan tu traslado: bodegaje seguro, empaque y embalaje profesional, envíos confiables y movimiento especializado de muebles. Todo lo que necesitas para una experiencia ágil y sin complicaciones.
            </motion.p>
          </motion.div>
        </div>
        
        {/* Curved Bottom Separator */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-none z-20">
          <svg className="relative block w-full h-[60px] md:h-[100px] text-slate-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,120 V60 C300,120 900,0 1200,60 V120 H0 Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      {/* Services Section - Modern Zig-Zag Layout */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-32">
            {services.map((service, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                key={index} 
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}
              >
                {/* Image Side */}
                <div className="w-full lg:w-1/2 relative group perspective-1000">
                  <div className={`absolute inset-0 bg-gradient-to-tr ${service.color} rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700`} />
                  <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-white/50 transform-gpu group-hover:rotate-y-2 group-hover:-translate-y-2 transition-all duration-700">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out" />
                    
                    {/* Floating Badge */}
                    <div className="absolute top-6 left-6 z-20">
                      <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl flex items-center justify-center transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <service.icon size={28} className={service.iconColor} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Side */}
                <div className="w-full lg:w-1/2 space-y-8 relative">
                  <div className={`inline-flex items-center gap-2 ${service.bgLight} ${service.iconColor} px-5 py-2.5 rounded-full font-bold text-sm tracking-wide shadow-sm border border-white`}>
                    <ShieldCheck size={18} />
                    {service.subtitle}
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter leading-none">
                    {service.title}
                  </h2>
                  
                  <div className="w-20 h-1.5 rounded-full bg-gradient-to-r ${service.color}" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}></div>
                  
                  <p className="text-lg text-slate-600 leading-relaxed font-medium">
                    {service.description}
                  </p>

                  <a href="/solicitar-cotizacion" className="group flex items-center gap-3 text-slate-800 font-bold hover:text-primary transition-colors">
                    Solicitar este servicio
                    <span className="w-10 h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all group-hover:scale-110">
                      <ArrowRight size={18} />
                    </span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-primary mt-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574359411659-15573a27fd0c?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-10">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            ¿LISTO PARA TU PRÓXIMO <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">MOVIMIENTO?</span>
          </h2>
          <p className="text-xl text-white/90 font-medium">
            Déjanos encargarnos de todo. Obtén una cotización personalizada en minutos.
          </p>
          <a href="/solicitar-cotizacion" className="inline-block px-10 py-5 bg-white text-primary rounded-full font-black text-lg hover:scale-105 hover:shadow-[0_10px_40px_rgba(255,255,255,0.3)] transition-all duration-300">
            Cotizar mi mudanza
          </a>
        </div>
      </section>

      {/* Footer (Matches Premium Layout) */}
      <footer className="bg-slate-50 pt-24 pb-12 border-t border-gray-200">
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
