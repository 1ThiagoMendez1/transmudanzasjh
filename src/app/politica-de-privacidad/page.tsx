"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Facebook, Instagram, Twitter, Phone, Mail, MapPin, Truck, ChevronDown, ShieldCheck 
} from 'lucide-react';
import Link from 'next/link';
import { PublicNavigation } from '@/components/PublicNavigation';

export default function PoliticaDePrivacidadPage() {
  const [scrolled, setScrolled] = useState(false);

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

      {/* Hero Section Simple */}
      <section className="pt-40 pb-16 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-sm font-bold tracking-widest shadow-xl mb-6">
            <ShieldCheck size={18} /> PRIVACIDAD Y PROTECCIÓN
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-tight drop-shadow-xl mb-4 uppercase">
            Política de Privacidad
          </h1>
          <p className="text-xl font-medium text-white/90">
            TRANSMUDANZAS JH
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 relative z-20 max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2.5rem] p-8 md:p-16 backdrop-blur-xl"
        >
          <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-headings:text-slate-800 prose-strong:text-slate-800">
            
            <h3 className="text-2xl font-black text-primary mb-2">Políticas de Privacidad y Protección de Datos – Transmudanzas JH</h3>
            <p className="mb-8 text-gray-500 font-medium">
              En Transmudanzas JH valoramos tu confianza y protegemos tu información personal con el máximo cuidado. Estas políticas explican cómo recolectamos, usamos, almacenamos y protegemos los datos de nuestros clientes, en cumplimiento de la Ley 1581 de 2012 y normas relacionadas.
            </p>

            <div className="space-y-8">
              {/* Cláusula 1 */}
              <div>
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center text-sm">1</span> 
                  Responsable del tratamiento de la información
                </h4>
                <ul className="list-disc pl-10 mt-2 space-y-1 text-gray-600">
                  <li><strong>Nombre de la empresa:</strong> TRANSMUDANZAS JH</li>
                  <li><strong>Dirección:</strong> Calle 88 No. 95 F - 16</li>
                  <li><strong>Correo electrónico:</strong> contacto@transmudanzasjh.com</li>
                  <li><strong>Teléfono:</strong> 3132159686</li>
                </ul>
              </div>

              {/* Cláusula 2 */}
              <div>
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center text-sm">2</span> 
                  Información que recolectamos
                </h4>
                <p className="text-gray-600 mb-2 pl-10">Podemos solicitar datos personales como:</p>
                <ul className="list-disc pl-10 mt-2 space-y-1 text-gray-600">
                  <li>Nombre completo y documento de identidad.</li>
                  <li>Teléfono, dirección y correo electrónico.</li>
                  <li>Información de facturación y pago.</li>
                  <li>Datos relacionados con el servicio contratado (mudanzas, envíos, bodegaje, etc.).</li>
                </ul>
              </div>

              {/* Cláusula 3 */}
              <div>
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center text-sm">3</span> 
                  Finalidad del tratamiento de datos
                </h4>
                <p className="text-gray-600 mb-2 pl-10">La información recolectada se utilizará para:</p>
                <ul className="list-disc pl-10 mt-2 space-y-1 text-gray-600">
                  <li>Prestar adecuadamente los servicios de mudanza, transporte y envíos.</li>
                  <li>Procesar solicitudes, PQRF y contratos.</li>
                  <li>Contactarte para confirmaciones, recordatorios y novedades del servicio.</li>
                  <li>Informar sobre promociones, encuestas y mejoras (previa autorización).</li>
                  <li>Cumplir obligaciones legales, contables y tributarias.</li>
                </ul>
              </div>

              {/* Cláusula 4 */}
              <div>
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center text-sm">4</span> 
                  Derechos de los titulares de la información
                </h4>
                <p className="text-gray-600 mb-2 pl-10">Como cliente, tienes derecho a:</p>
                <ul className="list-disc pl-10 mt-2 space-y-1 text-gray-600">
                  <li>Conocer, actualizar y rectificar tus datos personales.</li>
                  <li>Solicitar prueba de la autorización otorgada.</li>
                  <li>Ser informado sobre el uso que se da a tus datos.</li>
                  <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC).</li>
                  <li>Revocar la autorización o solicitar la supresión de los datos cuando no se respeten los principios y derechos constitucionales.</li>
                </ul>
              </div>

              {/* Cláusula 5 */}
              <div>
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center text-sm">5</span> 
                  Canales de atención para ejercer tus derechos
                </h4>
                <p className="text-gray-600 mb-2 pl-10">Puedes ejercer tus derechos de consulta, reclamo o supresión de datos a través de:</p>
                <ul className="list-disc pl-10 mt-2 space-y-1 text-gray-600">
                  <li><strong>Correo electrónico:</strong> contacto@transmudanzasjh.com</li>
                  <li><strong>Teléfono:</strong> 3132159686</li>
                  <li><strong>Dirección física:</strong> Calle 88 No. 95 F - 16</li>
                </ul>
              </div>

              {/* Cláusula 6 */}
              <div>
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center text-sm">6</span> 
                  Seguridad de la información
                </h4>
                <p className="text-gray-600 pl-10">
                  Implementamos medidas técnicas, humanas y administrativas para proteger tu información contra pérdida, acceso no autorizado, uso indebido o alteración.
                </p>
              </div>

              {/* Cláusula 7 */}
              <div>
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center text-sm">7</span> 
                  Vigencia
                </h4>
                <p className="text-gray-600 pl-10">
                  Estas políticas entran en vigencia desde su publicación y estarán disponibles para consulta en todo momento.
                </p>
              </div>

              <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/20 text-center">
                <p className="text-primary-800 font-bold mb-2">Aceptación de Términos</p>
                <p className="text-gray-600 italic">
                  “Autorizo de manera expresa a Transmudanzas JH el tratamiento de mis datos personales de acuerdo con la Ley 1581 de 2012 y las Políticas de Privacidad aquí descritas.”
                </p>
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
               <li><Link href="/terminos-y-condiciones" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight size={14}/> Términos y Condiciones</Link></li>
               <li><Link href="/politica-de-privacidad" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight size={14}/> Política de Privacidad</Link></li>
               <li><Link href="/pqrsf" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight size={14}/> Radicar PQRSF</Link></li>
               <li><a href="/tracking" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight size={14}/> Rastrea tu envío</a></li>
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
