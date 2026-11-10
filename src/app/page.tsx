"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Building, Home, Briefcase, MapPin, CheckCircle2, ArrowRight, Facebook, Instagram, Twitter, Phone, Mail, Package, ShieldCheck, Truck, Factory, Cable, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PublicNavigation } from '@/components/PublicNavigation';

export default function LandingPage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <div className="min-h-screen bg-white text-slate-800 font-body selection:bg-primary/20">
      
      {/* Navbar Premium */}
      <PublicNavigation scrolled={scrolled} />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image & Purple Overlay */}
        <div className="absolute inset-0 z-0 scale-105">
          <Image 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
            alt="Mudanza" 
            fill 
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-primary/75 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/50 to-primary/90" />
        </div>

        <div className="relative z-10 text-center text-white space-y-8 max-w-5xl px-6 mt-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-5 py-2 rounded-full text-sm font-bold tracking-widest shadow-xl mb-4"
          >
            <ShieldCheck size={18} /> OPERADOR LOGÍSTICO CERTIFICADO
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1] drop-shadow-2xl px-2"
          >
            TRANSMUDANZAS JH
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg sm:text-xl md:text-3xl font-light text-white/90 drop-shadow-md max-w-sm sm:max-w-3xl mx-auto leading-relaxed"
          >
            Te mudamos a tu nuevo hogar con seguridad.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
            className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button className="rounded-full bg-white text-primary hover:bg-gray-100 hover:scale-105 transition-all text-xl font-black px-12 h-16 shadow-[0_0_40px_rgba(255,255,255,0.4)]">
              Cotizar ahora
            </Button>
            <Button variant="outline" className="rounded-full bg-transparent border-2 border-white text-white hover:bg-white/10 hover:scale-105 transition-all text-lg font-bold px-10 h-16 backdrop-blur-sm">
              Saber más
            </Button>
          </motion.div>
        </div>

        {/* Floating elements for beauty */}
        <div className="absolute bottom-10 w-full flex justify-center z-10 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center p-2">
            <div className="w-1.5 h-3 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <div className="bg-slate-50 py-10 border-b border-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between opacity-60">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 md:mb-0 text-center md:text-left">Cientos de familias confían en nosotros</p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 text-gray-400">
            <div className="flex items-center gap-2 font-black text-xl"><ShieldCheck/> SEGURO TOTAL</div>
            <div className="flex items-center gap-2 font-black text-xl"><CheckCircle2/> 5 ESTRELLAS</div>
            <div className="flex items-center gap-2 font-black text-xl"><Truck/> FLOTA MODERNA</div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-28 bg-white relative overflow-hidden">
        {/* Decorative subtle background blurs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="space-y-10"
          >
            <motion.div variants={fadeIn}>
              <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight mb-4">
                Mudanzas diseñadas para tu <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">tranquilidad.</span>
              </h2>
            </motion.div>

            {[
              { title: "Seguridad Garantizada", desc: "Cuidamos tus pertenencias como si fueran nuestras. Embalaje premium y pólizas a todo riesgo." },
              { title: "Rapidez y Eficiencia", desc: "Tiempos de entrega matemáticamente optimizados para que no pierdas un solo minuto de tu valioso tiempo." },
              { title: "Personal Capacitado", desc: "Expertos en logística, manejo de cargas frágiles, embalaje, carga y descarga profesional." }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeIn} className="flex items-start gap-6 group cursor-default bg-white p-6 rounded-3xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-gray-50">
                <div className="shrink-0 bg-primary/10 rounded-2xl p-3 group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-primary">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h4>
                  <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="relative flex justify-center items-center h-full min-h-[500px]">
            {/* Premium composition floating */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-[4rem] transform rotate-6 scale-105" />
            <div className="absolute inset-0 bg-white border border-gray-100 rounded-[4rem] shadow-2xl transform -rotate-3 transition-transform duration-700 hover:rotate-0" />
            
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-8 p-12">
              <div className="flex gap-6">
                 <div className="w-28 h-28 rounded-3xl bg-blue-50 flex items-center justify-center text-blue-500 shadow-lg animate-[float_4s_ease-in-out_infinite]"><Package size={50}/></div>
                 <div className="w-28 h-28 rounded-3xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/40 -translate-y-8 animate-[float_5s_ease-in-out_infinite_reverse]"><Truck size={50}/></div>
              </div>
              <div className="w-28 h-28 rounded-3xl bg-purple-50 flex items-center justify-center text-primary shadow-lg animate-[float_4.5s_ease-in-out_infinite]"><ShieldCheck size={50}/></div>
            </div>
          </div>
        </div>
      </section>

      {/* "¿TE VAS A MUDAR?" Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop" 
            alt="Fondo Mudanza" 
            fill 
            className="object-cover object-center scale-110"
          />
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter drop-shadow-lg">¿TE VAS A MUDAR?</h2>
            <div className="w-20 h-1.5 bg-white/40 mx-auto mt-8 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Building, title: "APARTAMENTOS", desc: "Servicio especializado en maniobras de edificios, protección de ascensores y manejo de espacios reducidos con cuidado extremo." },
              { icon: Home, title: "CASAS", desc: "Cuidamos cada detalle de tu hogar. Traslados completos con embalaje premium para absolutamente todas tus pertenencias." },
              { icon: Briefcase, title: "OFICINAS", desc: "Minimizamos el tiempo de inactividad de tu empresa. Traslado seguro de equipos informáticos, mobiliario y documentos." }
            ].map((item, i) => (
              <div key={i} className="glass-card rounded-[2.5rem] p-12 text-center text-white flex flex-col items-center group hover:bg-white/30 hover:scale-[1.02] transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                <div className="w-24 h-24 bg-white/10 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500 shadow-inner">
                  <item.icon size={48} className="text-white drop-shadow-md" />
                </div>
                <h3 className="text-3xl font-black mb-6 tracking-wide drop-shadow-sm">{item.title}</h3>
                <div className="w-10 h-1 bg-white/30 mb-8 rounded-full transition-all group-hover:w-20" />
                <p className="text-white/80 text-lg leading-relaxed font-medium mb-10 flex-grow">{item.desc}</p>
                <Button className="rounded-full bg-white text-primary hover:bg-gray-100 hover:scale-105 font-black px-10 py-6 text-lg shadow-[0_10px_30px_rgba(255,255,255,0.2)]">
                  Cotizar
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-32 bg-slate-50 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <div className="inline-block bg-primary/10 text-primary font-bold px-4 py-2 rounded-full text-sm uppercase tracking-widest mb-4">Nuestros Servicios</div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-800 uppercase tracking-tighter">
              ¿CÓMO PODEMOS <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">AYUDARTE?</span>
            </h2>
            <div className="w-24 h-1.5 bg-primary/20 mx-auto mt-8 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { title: "ALMACENAMIENTO Y BODEGAJE", icon: Factory, color: "bg-gradient-to-br from-blue-50 to-blue-100" },
              { title: "EMPAQUE Y EMBALAJE", icon: Package, color: "bg-gradient-to-br from-amber-50 to-amber-100" },
              { title: "ENVÍOS NACIONALES", icon: Truck, color: "bg-gradient-to-br from-green-50 to-emerald-100" },
              { title: "MUDANZA POR FACHADA", icon: Cable, color: "bg-gradient-to-br from-purple-50 to-fuchsia-100" }
            ].map((service, i) => (
              <div key={i} className="card-premium overflow-hidden group cursor-pointer flex flex-col sm:flex-row shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)]">
                <div className={`w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto ${service.color} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] group-hover:bg-[position:100%_100%] transition-all duration-1000" />
                  <service.icon size={80} className="text-slate-300 group-hover:scale-125 group-hover:text-primary transition-all duration-700 drop-shadow-md z-10" />
                </div>
                <div className="p-10 sm:w-3/5 flex flex-col justify-center items-start bg-white z-10">
                  <h3 className="text-2xl font-black text-slate-800 mb-6 group-hover:text-primary transition-colors leading-tight">{service.title}</h3>
                  <Button className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold px-8 shadow-lg shadow-primary/30 group-hover:translate-x-2 transition-transform">
                    Cotizar servicio <ArrowRight size={18} className="ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section id="cobertura" className="py-32 bg-white overflow-hidden relative border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          
          <div className="relative flex justify-center">
             <div className="relative w-full aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] group">
               <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay" />
               <img 
                 src="https://www.transmudanzasjh.com/wp-content/uploads/2025/09/Ruta-de-entrega-en-Colombia-1-1024x683.png" 
                 alt="Ruta de entrega en Colombia"
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute bottom-4 left-4 right-4 md:right-auto md:bottom-6 md:left-6 z-20 bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-2xl shadow-xl flex items-center justify-center md:justify-start gap-3 md:gap-4">
                  <div className="bg-primary/10 p-2 md:p-3 rounded-xl text-primary"><MapPin size={24} className="w-5 h-5 md:w-6 md:h-6" /></div>
                  <div>
                    <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">Tracking Satelital</p>
                    <p className="font-black text-slate-800 text-base md:text-lg leading-tight">Rutas Nacionales</p>
                  </div>
               </div>
             </div>
          </div>

          <div className="text-center md:text-left space-y-8">
            <h2 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tighter leading-[0.95] uppercase">
              NOS MOVEMOS <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">POR TODO <br/> COLOMBIA</span>
            </h2>
            <div className="w-20 h-1.5 bg-primary/20 mx-auto md:mx-0 rounded-full" />
            <p className="text-xl text-gray-500 font-medium max-w-md mx-auto md:mx-0 leading-relaxed">
              No importa dónde estés o a dónde vayas, nuestra red logística de primer nivel cubre todo el territorio nacional con la misma garantía de seguridad y eficiencia.
            </p>
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white font-black px-12 h-16 shadow-[0_10px_30px_rgba(139,92,246,0.3)] text-lg hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(139,92,246,0.4)] transition-all">
              Cotizar ruta nacional
            </Button>
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
