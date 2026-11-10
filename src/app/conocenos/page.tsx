"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Truck, Facebook, Instagram, Twitter, Phone, Mail, MapPin, ArrowRight,
  ChevronDown, Target, Eye, Users, ShieldCheck, Ruler, Navigation, Info
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PublicNavigation } from '@/components/PublicNavigation';

export default function ConocenosPage() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 300]);
  const yHistory = useTransform(scrollY, [1500, 3000], [0, 250]);

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

  const vehicles = [
    {
      title: "Chevrolet - Modelo 2024",
      dims: "7.20 M largo x 2.40 ancho x 2.65 alto",
      cap: "45 mts cúbicos, furgón estacas",
      img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80"
    },
    {
      title: "Chevrolet - Modelo 2021",
      dims: "7.50 M largo x 2.60 ancho x 2.60 alto",
      cap: "50 mts cúbicos, furgón estacas",
      img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80"
    },
    {
      title: "Foton - Modelo 2024",
      dims: "7.50 M largo x 2.60 ancho x 2.60 alto",
      cap: "50 mts cúbicos, furgón estacas",
      img: "https://images.unsplash.com/photo-1586191582155-738942b08272?auto=format&fit=crop&q=80"
    },
    {
      title: "JMC - Modelo 2024",
      dims: "7.50 M largo x 2.60 ancho x 2.60 alto",
      cap: "50 mts cúbicos, furgón estacas",
      img: "https://images.unsplash.com/photo-1610499092497-6a40a232f7bd?auto=format&fit=crop&q=80"
    }
  ];

  const stats = [
    { num: "1,550+", label: "Mudanzas realizadas" },
    { num: "4,300+", label: "Clientes Satisfechos" },
    { num: "2,380+", label: "Envíos a nivel nacional" },
    { num: "13,500+", label: "Objetos empacados" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-body selection:bg-primary/20 overflow-hidden">
      
      {/* Navbar Premium */}
      <PublicNavigation scrolled={scrolled} />

      {/* Hero Section (Parallax) */}
      <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: yHero }} className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" 
            alt="" 
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-[#5e3c79]/90 mix-blend-multiply" />
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center mt-20">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-tight drop-shadow-2xl">
              QUIÉNES <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">SOMOS</span>
            </motion.h1>
            <motion.div variants={fadeInUp} className="w-24 h-1.5 bg-white/30 mx-auto rounded-full" />
          </motion.div>
        </div>
        
        {/* Bottom curve */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-none z-20">
          <svg className="relative block w-full h-[60px] md:h-[100px] text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,120 V60 C300,120 900,0 1200,60 V120 H0 Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      {/* Section 1: Conoce el Team */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tighter uppercase">Conoce el team que hace todo posible</h2>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 space-y-6"
            >
              <h3 className="text-3xl font-black text-slate-800 uppercase">Johanna Herrera</h3>
              <p className="text-primary font-bold tracking-widest text-sm uppercase">Gerente General y Fundadora de Transmudanzas JH</p>
              
              <div className="space-y-4 text-slate-600 leading-relaxed font-medium">
                <p>
                  Johanna es la fuerza impulsora y el corazón estratégico de Transmudanzas JH. Con más de 25 años de experiencia en el sector del transporte, ha liderado el crecimiento de la empresa asegurando una cultura de excelencia, seguridad y servicio al cliente.
                </p>
                <p>
                  Su visión es entregar la mejor calidad y servicio, por eso todos nuestros clientes cuentan con su apoyo directo y constante.
                </p>
                <p className="text-slate-800 font-semibold italic border-l-4 border-primary pl-4 py-2">
                  "Ella nos ha enseñado que cada mudanza es más que trasladar objetos, es mover ilusiones y sueños con el mayor cuidado y profesionalismo."
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-3xl transform translate-x-6 translate-y-6" />
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image src="https://www.transmudanzasjh.com/wp-content/uploads/2025/09/Imagen-de-WhatsApp-2025-09-03-a-las-20.10.22_9b3c0849-200x300.jpg" alt="Johanna Herrera" fill className="object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: El Equipo que nos mueve */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tighter uppercase">El equipo que nos mueve</h2>
          </div>
          
          <div className="flex flex-col-reverse md:flex-row items-center gap-16">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 relative group"
            >
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl">
                <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" alt="Nuestro Equipo" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-xl max-w-sm hidden lg:block border border-slate-100">
                <Users size={40} className="text-primary mb-4" />
                <p className="font-bold text-slate-800 leading-tight">
                  "Contamos con personal capacitado, honesto, responsable y amable. En Transmudanzas JH cuidamos de tus pertenencias como si fueran nuestras."
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 space-y-6"
            >
              <div className="space-y-6 text-slate-600 leading-relaxed font-medium">
                <p>
                  EN TRANSMUDANZAS JH nuestro diferenciador es el personal que nos compone. Contamos con un equipo altamente capacitado y comprometido de empacadores, conductores y personal logístico que se esfuerza día a día por brindar la mejor atención y un servicio ágil y de excelencia.
                </p>
                <p>
                  Un equipo en constante capacitación que trabaja como una familia, con la promesa de cuidar de tus pertenencias como si fueran propias. Los valores de confianza, honestidad y responsabilidad son los pilares fundamentales que rigen nuestras operaciones.
                </p>
              </div>
              
              {/* Mobile Quote */}
              <div className="bg-white p-6 rounded-2xl shadow-md lg:hidden border border-slate-100 mt-8">
                <Users size={32} className="text-primary mb-3" />
                <p className="font-bold text-slate-800 text-sm">
                  "Contamos con personal capacitado, honesto, responsable y amable. En Transmudanzas JH cuidamos de tus pertenencias como si fueran nuestras."
                </p>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Section 3: Nuestros Vehículos */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tighter uppercase mb-6">Nuestros Vehículos</h2>
            <p className="text-slate-600 font-medium max-w-2xl mx-auto">
              Nuestra flota de vehículos cuenta con tecnología de rastreo satelital en tiempo real para brindarte mayor tranquilidad. Además, contamos con una flota de vehículos de diferentes tamaños para adaptarnos a tus necesidades.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {vehicles.map((v, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx} 
                className="flex flex-col sm:flex-row items-center bg-slate-50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 group"
              >
                <div className="w-full sm:w-2/5 h-48 sm:h-full relative overflow-hidden">
                  <Image src={v.img} alt={v.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="w-full sm:w-3/5 p-8 space-y-4">
                  <h4 className="font-black text-xl text-slate-800">{v.title}</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-sm text-slate-600">
                      <Ruler size={18} className="text-primary shrink-0 mt-0.5" />
                      <span>{v.dims}</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-slate-600">
                      <Info size={18} className="text-primary shrink-0 mt-0.5" />
                      <span>{v.cap}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Historia (Parallax) */}
      <section className="relative py-32 overflow-hidden">
        <motion.div style={{ y: yHistory }} className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80" 
            alt="Historia Warehouse" 
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
        </motion.div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center text-white space-y-12">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase drop-shadow-lg">
            Descubre nuestra historia y aquello que nos mueve
          </h2>
          
          <div className="space-y-6 text-lg md:text-xl font-medium text-white/90 leading-relaxed backdrop-blur-sm bg-black/10 p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl text-left">
            <p>
              En Transmudanzas JH llevamos más de 25 años dedicados al transporte de mudanzas, encomiendas y mercancías a nivel nacional. Nuestra trayectoria nos ha consolidado como una empresa líder en el sector, gracias a nuestro compromiso con la excelencia y la satisfacción de nuestros clientes.
            </p>
            <p>
              Nuestra historia comenzó con un pequeño camión y grandes sueños. Hoy, contamos con una flota de vehículos modernos y un equipo humano excepcional.
            </p>
            <p>
              Creemos que el éxito de nuestra empresa se basa en la confianza mutua y en la promesa inquebrantable de cuidar cada objeto como si fuera nuestro. Por ello, hemos desarrollado protocolos de empaque, transporte y descargue sumamente seguros y eficientes.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Misión y Visión */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-100 hover:-translate-y-2 transition-transform duration-500"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
              <Target size={32} className="text-primary" />
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-6 uppercase">Misión</h3>
            <div className="space-y-4 text-slate-600 leading-relaxed font-medium">
              <p>Nuestra misión es brindar servicios de mudanzas, transporte y logística que superen las expectativas de nuestros clientes.</p>
              <p>Nos enfocamos en ofrecer soluciones personalizadas, ágiles y seguras, adaptándonos a las necesidades de cada cliente, garantizando la integridad de sus pertenencias y la puntualidad en los tiempos de entrega acordados.</p>
              <p>Buscamos ser el aliado estratégico de nuestros clientes, facilitando sus procesos de traslado y mudanza mediante el uso de tecnología y de las mejores prácticas de la industria. <strong className="text-primary">¡Tu tranquilidad es nuestro objetivo!</strong></p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-100 hover:-translate-y-2 transition-transform duration-500"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-8">
              <Eye size={32} className="text-purple-600" />
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-6 uppercase">Visión</h3>
            <div className="space-y-4 text-slate-600 leading-relaxed font-medium">
              <p>Ser reconocidos como la empresa de mudanzas y transporte logístico líder a nivel nacional, por nuestra excelencia y profesionalismo.</p>
              <p>Proyectamos un crecimiento sostenido, ampliando nuestra cobertura y flota de vehículos, para llegar a más hogares y empresas en todo el país, manteniendo siempre los más altos estándares de calidad.</p>
              <p>Nos visualizamos como una empresa innovadora, que implementa soluciones tecnológicas de vanguardia para optimizar nuestras operaciones y brindar un servicio cada vez más eficiente.</p>
              <p>Mantendremos nuestro compromiso inquebrantable con el cuidado del medio ambiente, implementando prácticas sostenibles en nuestras operaciones diarias.</p>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* Section 6: Stats */}
      <section className="py-20 bg-[#5e3c79] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-white/20">
            {stats.map((stat, i) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={i} 
                className="space-y-2 px-4"
              >
                <div className="text-4xl md:text-5xl font-black tracking-tighter drop-shadow-md">{stat.num}</div>
                <div className="text-sm font-semibold uppercase tracking-wider text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
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
