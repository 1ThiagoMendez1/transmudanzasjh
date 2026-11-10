"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getQuoteByCredentials, addQuoteMessage, addQuoteDocument, updateQuotePhotos, WebQuote } from '@/lib/quotes';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { Loader2, Send, UploadCloud, LogOut, CheckCircle2, Circle, Check, FileText, Image as ImageIcon, MapPin, Map } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const STATUS_STEPS = [
  { id: 'Recibida', label: 'Recibida', description: 'Revisando tu solicitud' },
  { id: 'En Análisis', label: 'En Análisis', description: 'Evaluando inventario' },
  { id: 'Cotizada', label: 'Cotizada', description: '¡Propuesta lista!' },
  { id: 'Aceptada', label: 'Aceptada', description: 'Viaje programado' }
];

export default function ClientPortalDashboard() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  
  const id = params.id as string;
  const clientDocument = searchParams.get('doc');

  const [quote, setQuote] = useState<WebQuote | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Chat state
  const [messageText, setMessageText] = useState('');
  const [sendingMsg, setSendingMsg] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  // Upload states (Simulated)
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  useEffect(() => {
    if (!id || !clientDocument) {
      router.push('/portal-cliente');
      return;
    }
    fetchData(id, clientDocument);
  }, [id, clientDocument]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [quote?.messages]);

  const fetchData = async (quoteId: string, doc: string) => {
    try {
      const data = await getQuoteByCredentials(quoteId, doc);
      if (!data || data.isLocked) {
        toast({ variant: "destructive", title: "Acceso Denegado", description: "El portal ha sido cerrado o las credenciales son inválidas." });
        router.push('/portal-cliente');
        return;
      }
      setQuote(data);
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: "No se pudo cargar la información." });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    router.push('/portal-cliente');
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !quote) return;
    setSendingMsg(true);
    try {
      await addQuoteMessage(quote.id, quote.messages || [], { text: messageText, sender: 'client' });
      setMessageText('');
      if (id && clientDocument) await fetchData(id, clientDocument);
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: "No se pudo enviar el mensaje" });
    } finally {
      setSendingMsg(false);
    }
  };

  const simulateDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length || !quote) return;
    setUploadingDoc(true);
    const file = e.target.files[0];
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 1500));
    
    try {
      // Here you would upload to Supabase Storage and get the URL
      // We simulate it using a dummy URL
      const dummyUrl = URL.createObjectURL(file);
      await addQuoteDocument(quote.id, quote.documents || [], dummyUrl, file.name);
      if (id && clientDocument) await fetchData(id, clientDocument);
      toast({ title: "Documento Subido", description: "El archivo ha sido guardado correctamente." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "No se pudo subir el documento." });
    } finally {
      setUploadingDoc(false);
    }
  };

  const simulatePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length || !quote) return;
    setUploadingPhoto(true);
    const file = e.target.files[0];
    
    await new Promise(r => setTimeout(r, 1500));
    
    try {
      // Simulate image upload
      const dummyUrl = URL.createObjectURL(file);
      const newPhotos = [...(quote.photos || []), dummyUrl];
      await updateQuotePhotos(quote.id, newPhotos);
      if (id && clientDocument) await fetchData(id, clientDocument);
      toast({ title: "Foto Subida", description: "La imagen ha sido agregada a tu inventario." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "No se pudo subir la foto." });
    } finally {
      setUploadingPhoto(false);
    }
  };

  const getStatusIndex = (status: string) => {
    return STATUS_STEPS.findIndex(s => s.id === status);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex justify-center items-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (!quote) return null;

  return (
    <div className="min-h-screen bg-background pb-12">
      
      {/* Header */}
      <header className="bg-white dark:bg-zinc-900 border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">M</div>
            <span className="font-bold hidden sm:inline">TransMudanzas</span>
            <span className="text-muted-foreground ml-2 text-sm border-l pl-2">Portal de Cliente</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Hola, {quote.clientName.split(' ')[0]}</span>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="rounded-full hover:bg-red-50 hover:text-red-500">
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Status & Uploads */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Status Card */}
          <div className="bg-white dark:bg-zinc-900 border rounded-[2rem] p-6 shadow-sm">
            <h3 className="font-bold mb-6 text-lg">Estado de tu Mudanza</h3>
            <div className="relative pl-4 space-y-6">
              {/* Timeline Line */}
              <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-muted"></div>
              <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-primary origin-top transition-all duration-1000" style={{ transform: `scaleY(${Math.max(0, getStatusIndex(quote.status)) / (STATUS_STEPS.length - 1)})` }}></div>

              {STATUS_STEPS.map((step, index) => {
                const isActive = getStatusIndex(quote.status) >= index;
                const isCurrent = getStatusIndex(quote.status) === index;
                
                return (
                  <div key={step.id} className="relative z-10 flex gap-4">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isActive ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                    }`}>
                      {isActive ? <Check size={14} /> : <Circle size={8} />}
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{step.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <p className="text-xs font-bold text-muted-foreground uppercase mb-2">Ruta</p>
              <div className="flex items-center gap-2 text-sm font-medium">
                <MapPin size={16} className="text-primary"/> {quote.origin} 
                <span className="text-muted-foreground mx-1">→</span> 
                {quote.destination}
              </div>
            </div>
          </div>

          {/* Uploads */}
          <div className="bg-white dark:bg-zinc-900 border rounded-[2rem] p-6 shadow-sm space-y-6">
            
            <div>
              <h3 className="font-bold flex items-center gap-2 mb-2"><ImageIcon className="text-primary" size={18}/> Fotos del Inventario</h3>
              <p className="text-xs text-muted-foreground mb-4">Sube fotos de tus muebles o cajas para una cotización más precisa.</p>
              
              <label className="border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer min-h-[100px]">
                {uploadingPhoto ? (
                  <Loader2 className="animate-spin text-primary mb-2" size={24} />
                ) : (
                  <UploadCloud className="text-primary mb-2" size={24} />
                )}
                <span className="text-sm font-medium text-primary">Subir foto (.jpg, .png)</span>
                <input type="file" accept="image/*" className="hidden" onChange={simulatePhotoUpload} disabled={uploadingPhoto} />
              </label>

              {(quote.photos || []).length > 0 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {quote.photos?.map((url, i) => (
                    <img key={i} src={url} alt="Carga" className="w-16 h-16 rounded-xl object-cover shrink-0 border" />
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-bold flex items-center gap-2 mb-2"><FileText className="text-secondary" size={18}/> Documentos Legales</h3>
              <p className="text-xs text-muted-foreground mb-4">Sube documentos solicitados (ej. paz y salvo, autorizaciones).</p>
              
              <label className="border-2 border-dashed border-secondary/30 bg-secondary/5 hover:bg-secondary/10 transition-colors rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer min-h-[100px]">
                {uploadingDoc ? (
                  <Loader2 className="animate-spin text-secondary mb-2" size={24} />
                ) : (
                  <UploadCloud className="text-secondary mb-2" size={24} />
                )}
                <span className="text-sm font-medium text-secondary">Subir archivo (.pdf, .doc)</span>
                <input type="file" className="hidden" onChange={simulateDocumentUpload} disabled={uploadingDoc} />
              </label>

              {(quote.documents || []).length > 0 && (
                <div className="space-y-2 mt-4">
                  {quote.documents?.map((doc) => (
                    <div key={doc.id} className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded-lg">
                      <FileText size={16} className="text-muted-foreground shrink-0"/>
                      <span className="truncate flex-1">{doc.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Right Column: Chat */}
        <div className="lg:col-span-2 flex flex-col h-[80vh] lg:h-[calc(100vh-8rem)] bg-white dark:bg-zinc-900 border rounded-[2rem] shadow-sm overflow-hidden relative">
          <div className="p-4 border-b bg-muted/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h2 className="font-bold text-lg">Asesor TransMudanzas</h2>
              <p className="text-xs text-muted-foreground">Estamos aquí para resolver tus dudas</p>
            </div>
            {quote.status === 'Cotizada' && quote.estimatedValue && (
              <div className="bg-green-500/10 text-green-600 px-3 py-1 rounded-xl border border-green-500/20 text-sm font-bold">
                Valor Propuesto: ${quote.estimatedValue.toLocaleString()}
              </div>
            )}
          </div>
          
          <div ref={chatRef} className="flex-1 p-6 overflow-y-auto space-y-4 bg-[url('/chat-pattern.png')] bg-repeat bg-[length:200px] bg-opacity-5">
            {(quote.messages || []).length === 0 ? (
              <div className="text-center text-muted-foreground pt-10">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Map size={24} className="text-primary" />
                </div>
                <p className="font-medium">Bienvenido a tu portal interactivo.</p>
                <p className="text-sm">Escríbenos cualquier duda que tengas sobre tu mudanza.</p>
              </div>
            ) : (
              (quote.messages || []).map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] md:max-w-[60%] rounded-2xl px-5 py-3 ${
                    msg.sender === 'client' 
                      ? 'bg-primary text-white rounded-tr-none shadow-md shadow-primary/20' 
                      : 'bg-white dark:bg-zinc-800 text-foreground rounded-tl-none shadow-sm border'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className={`text-[10px] mt-1 text-right ${msg.sender === 'client' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="p-4 bg-white dark:bg-zinc-900 border-t">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input 
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Escribe tu mensaje aquí..."
                className="rounded-full h-12 px-6 bg-muted/50 border-transparent focus-visible:ring-primary/50"
                disabled={sendingMsg}
              />
              <Button type="submit" disabled={sendingMsg || !messageText.trim()} className="rounded-full w-12 h-12 p-0 shrink-0 bg-primary shadow-lg shadow-primary/20">
                {sendingMsg ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} className="ml-1" />}
              </Button>
            </form>
          </div>
        </div>

      </main>
    </div>
  );
}
