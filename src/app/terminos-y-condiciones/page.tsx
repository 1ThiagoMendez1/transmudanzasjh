"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Facebook, Instagram, Twitter, Phone, Mail, MapPin, Truck, ChevronDown, ShieldCheck 
} from 'lucide-react';
import Link from 'next/link';
import { PublicNavigation } from '@/components/PublicNavigation';

export default function TerminosYCondicionesPage() {
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
            <ShieldCheck size={18} /> AVISO LEGAL
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-tight drop-shadow-xl mb-4">
            GARANTÍAS, TÉRMINOS Y CONDICIONES
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
            
            <h3 className="text-2xl font-black text-primary mb-2">Contrato de Transporte y Bodegaje de Muebles, Enseres y Carga en General</h3>
            <p className="mb-8 text-gray-500 font-medium">
              Este documento regula la relación contractual entre la empresa transportadora (en adelante LA EMPRESA) y el remitente o usuario del servicio (en adelante EL CLIENTE), con respecto al transporte y/o bodegaje de muebles, enseres y mercancías, bajo las siguientes cláusulas:
            </p>

            <div className="space-y-8">
              {/* Cláusula 1 */}
              <div>
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center text-sm">1</span> 
                  Responsabilidad de LA EMPRESA
                </h4>
                <ul className="list-none space-y-2 pl-10 text-gray-600">
                  <li><strong>1.1.</strong> LA EMPRESA se compromete a transportar la mercancía objeto del presente contrato en las condiciones acordadas.</li>
                  <li><strong>1.2.</strong> LA EMPRESA se exonera de toda responsabilidad por pérdidas, averías o daños derivados de:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Deficiente embalaje realizado por EL CLIENTE.</li>
                      <li>Fallas en aparatos eléctricos, electrónicos o electrodomésticos no imputables a negligencia de LA EMPRESA.</li>
                      <li>Disposiciones de ley o actos de gobierno.</li>
                      <li>Caso fortuito o fuerza mayor.</li>
                      <li>Transporte de objetos prohibidos como dinero, joyas, metales preciosos, documentos valores, obras de arte, armas, explosivos, drogas o mercancías de importación restringida.</li>
                    </ul>
                  </li>
                </ul>
              </div>

              {/* Cláusula 2 */}
              <div>
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center text-sm">2</span> 
                  Declaraciones de EL CLIENTE
                </h4>
                <ul className="list-none space-y-2 pl-10 text-gray-600">
                  <li><strong>2.1.</strong> EL CLIENTE declara conocer y aceptar que LA EMPRESA no verifica el contenido de las cajas, bultos o paquetes transportados, registrándose estos “sin verificar contenido”.</li>
                  <li><strong>2.2.</strong> EL CLIENTE se responsabiliza por la veracidad de la declaración de bienes entregados para transporte y/o bodegaje.</li>
                  <li><strong>2.3.</strong> EL CLIENTE exonera a LA EMPRESA de cualquier reclamación por contenidos no declarados o cuya naturaleza infrinja la ley.</li>
                </ul>
              </div>

              {/* Cláusula 3 */}
              <div>
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center text-sm">3</span> 
                  Entrega y Recepción
                </h4>
                <ul className="list-none space-y-2 pl-10 text-gray-600">
                  <li><strong>3.1.</strong> El recibido de la mercancía en el lugar de destino, sin observaciones, constituye aceptación plena y cumplimiento del contrato.</li>
                  <li><strong>3.2.</strong> EL CLIENTE podrá autorizar a un tercero para recibir la mercancía, quien actuará en nombre del remitente.</li>
                </ul>
              </div>

              {/* Cláusula 4 */}
              <div>
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center text-sm">4</span> 
                  Bodegaje
                </h4>
                <ul className="list-none space-y-2 pl-10 text-gray-600">
                  <li><strong>4.1.</strong> El servicio de bodegaje se presta con inventario firmado por ambas partes.</li>
                  <li><strong>4.2.</strong> Transcurridos 3 meses sin cancelación de la deuda por concepto de transporte y bodegaje, LA EMPRESA podrá disponer de los bienes para cubrir sus costos, quedando EL CLIENTE a paz y salvo.</li>
                  <li><strong>4.3.</strong> El bodegaje se cobrará por mes o fracción, con base en la tarifa vigente.</li>
                </ul>
              </div>

              {/* Cláusula 5 */}
              <div>
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center text-sm">5</span> 
                  Fletes y Cancelaciones
                </h4>
                <ul className="list-none space-y-2 pl-10 text-gray-600">
                  <li><strong>5.1.</strong> Los fletes se pagarán en el sitio de descarga al momento de la entrega.</li>
                  <li><strong>5.2.</strong> En caso de cancelación del servicio ya ejecutado, EL CLIENTE deberá pagar los fletes y gastos ocasionados, incluidos bodegaje y transporte adicional.</li>
                </ul>
              </div>

              {/* Cláusula 6 */}
              <div>
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center text-sm">6</span> 
                  Seguro
                </h4>
                <ul className="list-none space-y-2 pl-10 text-gray-600">
                  <li><strong>6.1.</strong> EL CLIENTE podrá contratar directamente un seguro contra pérdida total de mercancía.</li>
                  <li><strong>6.2.</strong> En caso de no hacerlo, LA EMPRESA no reconocerá indemnizaciones por pérdida, hurto o daños, quedando libre de toda responsabilidad.</li>
                </ul>
              </div>

              {/* Cláusula 7 */}
              <div>
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center text-sm">7</span> 
                  Reclamaciones
                </h4>
                <ul className="list-none space-y-2 pl-10 text-gray-600">
                  <li><strong>7.1.</strong> Toda reclamación deberá hacerse por escrito al momento de la entrega.</li>
                  <li><strong>7.2.</strong> No se aceptarán reclamaciones posteriores que no correspondan con el inventario inicial.</li>
                  <li><strong>7.3.</strong> En caso de discrepancia entre el inventario y la reclamación, prevalecerá lo consignado en el inventario firmado.</li>
                </ul>
              </div>

              {/* Cláusula 8 */}
              <div>
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center text-sm">8</span> 
                  Exoneraciones adicionales
                </h4>
                <ul className="list-none space-y-2 pl-10 text-gray-600">
                  <li><strong>8.1.</strong> LA EMPRESA no se hace responsable por:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Envejecimiento natural de muebles y enseres.</li>
                      <li>Mercancías decomisadas en aduanas por falta de nacionalización.</li>
                      <li>Daños derivados de embalaje inadecuado, humedad, manipulación de terceros no autorizados o almacenamiento prolongado.</li>
                    </ul>
                  </li>
                </ul>
              </div>

              {/* Cláusula 9 */}
              <div>
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center text-sm">9</span> 
                  Diferencias contractuales
                </h4>
                <ul className="list-none space-y-2 pl-10 text-gray-600">
                  <li><strong>9.1.</strong> Toda diferencia o controversia que surja entre las partes por interpretación del presente contrato será resuelta en primera instancia de manera directa entre LA EMPRESA y EL CLIENTE.</li>
                </ul>
              </div>

              {/* Cláusula 10 */}
              <div>
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center text-sm">10</span> 
                  Vigencia
                </h4>
                <ul className="list-none space-y-2 pl-10 text-gray-600">
                  <li><strong>10.1.</strong> El presente documento tendrá validez desde el momento de la firma por EL CLIENTE y LA EMPRESA, y se aplicará a cada servicio de transporte y/o bodegaje solicitado.</li>
                </ul>
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
               <li><a href="/politica-de-privacidad" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight size={14}/> Política de Privacidad</a></li>
               <li><a href="/pqrsf" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight size={14}/> Radicar PQRSF</a></li>
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
