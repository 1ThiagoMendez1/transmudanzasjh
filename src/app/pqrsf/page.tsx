"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Facebook, Instagram, Twitter, Phone, Mail, MapPin, Truck, ChevronDown, CheckCircle2, Star, Send
} from 'lucide-react';
import Link from 'next/link';
import { submitPqrsf, TipoServicio, TipoSolicitud } from '@/lib/pqrsf';
import { PublicNavigation } from '@/components/PublicNavigation';

export default function PQRSFPage() {
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    fecha_servicio: '',
    tipo_servicio: '' as TipoServicio,
    tipo_solicitud: '' as TipoSolicitud,
    puntualidad: 0,
    cuidado: 0,
    amabilidad: 0,
    seguridad: 0,
    agilidad: 0,
    mensaje: ''
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRating = (field: keyof typeof formData, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate required fields
    if (!formData.tipo_servicio || !formData.tipo_solicitud) {
      setError('Por favor completa el tipo de servicio y tipo de solicitud.');
      setLoading(false);
      return;
    }

    try {
      await submitPqrsf(formData);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Hubo un error al enviar el formulario.');
    } finally {
      setLoading(false);
    }
  };

  const RatingField = ({ title, field }: { title: string, field: keyof typeof formData }) => {
    const value = formData[field] as number;
    return (
      <div className="mb-6 bg-slate-50 p-6 rounded-2xl border border-gray-100">
        <label className="block text-sm font-bold text-slate-800 uppercase tracking-widest mb-1">{title}</label>
        <p className="text-xs text-gray-500 mb-4 font-medium">Califica de 1 a 5 (donde 1 es muy insatisfecho y 5 es muy satisfecho)</p>
        <div className="flex items-center gap-2 sm:gap-4 justify-between sm:justify-start max-w-sm">
          {[1, 2, 3, 4, 5].map(star => (
            <div key={star} className="flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-gray-400">{star}</span>
              <button
                type="button"
                onClick={() => handleRating(field, star)}
                className={`transition-all hover:scale-110 ${value >= star ? 'text-amber-400 drop-shadow-md' : 'text-gray-300'}`}
              >
                <Star size={32} fill={value >= star ? 'currentColor' : 'none'} strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-body selection:bg-primary/20">
      {/* Navbar Premium */}
      <PublicNavigation scrolled={scrolled} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-tight drop-shadow-xl mb-4">
            Formulario PQRSF
          </h1>
          <p className="text-lg sm:text-xl font-medium text-white/90">
            Peticiones, Quejas, Reclamos, Sugerencias y Felicitaciones
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 relative z-20 max-w-3xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white border-t-8 border-t-primary border-x border-b border-gray-100 shadow-2xl rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          {success ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-3xl font-black text-slate-800 mb-4">¡Formulario Enviado!</h2>
              <p className="text-gray-600 text-lg mb-8">
                Gracias por ayudarnos a mejorar. Hemos recibido tu PQRSF y le daremos trámite a la mayor brevedad posible.
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/30"
              >
                Enviar otra solicitud
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="mb-10">
                <h2 className="text-2xl font-black text-slate-800 mb-3">Formulario PQRSF – Transmudanzas JH</h2>
                <p className="text-gray-600 font-medium">
                  Queremos escucharte. En Transmudanzas JH tu opinión es muy importante para seguir mejorando y ofrecerte un servicio cada vez más seguro, ágil y confiable. Por favor diligencia este formulario y cuéntanos tu experiencia.
                </p>
                {error && <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl font-bold border border-red-100">{error}</div>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nombre *</label>
                  <input required type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" placeholder="Tu respuesta" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Correo electrónico *</label>
                  <input required type="email" name="correo" value={formData.correo} onChange={handleChange} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" placeholder="Tu respuesta" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Número de teléfono *</label>
                  <input required type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" placeholder="Tu respuesta" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Fecha del servicio *</label>
                  <input required type="date" name="fecha_servicio" value={formData.fecha_servicio} onChange={handleChange} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <label className="block text-lg font-black text-slate-800 mb-4">Tipo de servicio *</label>
                <div className="space-y-3">
                  {['Mudanza residencial', 'Mudanza empresarial', 'Transporte de vehículos', 'Envío nacional', 'Otro'].map(opt => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${formData.tipo_servicio === opt ? 'border-primary' : 'border-gray-300 group-hover:border-primary/50'}`}>
                        {formData.tipo_servicio === opt && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                      </div>
                      <input type="radio" name="tipo_servicio" value={opt} onChange={handleChange} className="hidden" />
                      <span className="text-gray-700 font-medium group-hover:text-slate-900 transition-colors">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <label className="block text-lg font-black text-slate-800 mb-4">Tipo de solicitud *</label>
                <div className="space-y-3">
                  {[
                    'Petición (solicitud de información o servicio)',
                    'Queja (inconformidad con la atención recibida)',
                    'Reclamo (el servicio no se cumplió o se cumplió mal)',
                    'Felicitación (reconocimiento a nuestro equipo o servicio)'
                  ].map(opt => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${formData.tipo_solicitud === opt ? 'border-primary' : 'border-gray-300 group-hover:border-primary/50'}`}>
                        {formData.tipo_solicitud === opt && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                      </div>
                      <input type="radio" name="tipo_solicitud" value={opt} onChange={handleChange} className="hidden" />
                      <span className="text-gray-700 font-medium group-hover:text-slate-900 transition-colors">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <label className="block text-lg font-black text-slate-800 mb-6">Evaluación del servicio</label>
                <RatingField title="Puntualidad" field="puntualidad" />
                <RatingField title="Cuidado de los bienes" field="cuidado" />
                <RatingField title="Amabilidad del personal" field="amabilidad" />
                <RatingField title="Seguridad y confianza" field="seguridad" />
                <RatingField title="Agilidad del servicio" field="agilidad" />
              </div>

              <div className="pt-6 border-t border-gray-100">
                <label className="block text-lg font-black text-slate-800 mb-2">Tu mensaje *</label>
                <p className="text-sm text-gray-500 mb-4">Por favor cuéntanos tu experiencia de forma detallada.</p>
                <textarea required name="mensaje" value={formData.mensaje} onChange={handleChange} rows={5} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none" placeholder="Escribe tu respuesta aquí..." />
              </div>

              <div className="pt-8 flex justify-end">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-primary text-white px-10 py-4 rounded-full font-black text-lg hover:scale-105 transition-all shadow-xl shadow-primary/30 flex items-center gap-3 disabled:opacity-70 disabled:hover:scale-100"
                >
                  {loading ? 'Enviando...' : (
                    <>Enviar Formulario <Send size={20} /></>
                  )}
                </button>
              </div>

            </form>
          )}
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
    </div>
  );
}
