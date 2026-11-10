"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from "@/components/ui/badge";
import { getQuoteById, updateQuoteStatus, addQuoteMessage, lockQuote, WebQuote, QuoteStatus } from '@/lib/quotes';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Send, Lock, FileText, Image as ImageIcon, Loader2, Info } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function QuoteAdminDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [quote, setQuote] = useState<WebQuote | null>(null);
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState('');
  const [sending, setSending] = useState(false);
  
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchQuote();
  }, [id]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [quote?.messages]);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const data = await getQuoteById(id);
      setQuote(data);
    } catch (e) {
      toast({ title: "Error", description: "No se pudo cargar la cotización", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !quote) return;

    setSending(true);
    try {
      await addQuoteMessage(quote.id, quote.messages || [], {
        text: messageText,
        sender: 'admin'
      });
      setMessageText('');
      await fetchQuote();
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: "No se pudo enviar el mensaje" });
    } finally {
      setSending(false);
    }
  };

  const handleLockPortal = async () => {
    if (!quote) return;
    try {
      await lockQuote(quote.id);
      await fetchQuote();
      toast({ title: "Portal Cerrado", description: "El cliente ya no tiene acceso a este portal." });
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: "No se pudo bloquear el portal" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen px-4 pb-24 pt-8 md:pl-[140px] md:pr-8 md:py-8 bg-background max-w-[100vw] flex justify-center items-center">
        <Navigation />
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="min-h-screen px-4 pb-24 pt-8 md:pl-[140px] md:pr-8 md:py-8 bg-background max-w-[100vw]">
        <Navigation />
        <div className="text-center py-20">Cotización no encontrada.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 pb-24 pt-8 md:pl-[140px] md:pr-8 md:py-8 bg-background max-w-[100vw] overflow-x-hidden">
      <Navigation />
      
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Button variant="ghost" size="icon" onClick={() => router.push('/quotes')} className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center gap-2">
              Gestión de Portal: {quote.id}
            </h1>
            {quote.isLocked && <Badge variant="destructive" className="ml-2 gap-1"><Lock size={12}/> Cerrado</Badge>}
          </div>
          <p className="text-muted-foreground text-sm md:text-base ml-14">Cliente: {quote.clientName} ({quote.clientPhone})</p>
        </div>
        
        <div className="flex gap-2">
          {!quote.isLocked && (
            <Button variant="outline" className="rounded-xl border-red-200 text-red-500 hover:bg-red-50" onClick={handleLockPortal}>
              <Lock size={16} className="mr-2" /> Cerrar Portal al Cliente
            </Button>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Chat */}
        <div className="lg:col-span-2 flex flex-col h-[70vh] bg-white dark:bg-zinc-900 border rounded-[2rem] shadow-sm overflow-hidden relative">
          <div className="p-4 border-b bg-muted/20 flex justify-between items-center">
            <h2 className="font-bold">Chat con Cliente</h2>
            <div className="text-xs text-muted-foreground bg-background px-3 py-1 rounded-full border">
              Código Secreto: <span className="font-mono font-bold text-foreground">{quote.secretCode}</span>
            </div>
          </div>
          
          <div ref={chatRef} className="flex-1 p-6 overflow-y-auto space-y-4">
            {(quote.messages || []).length === 0 ? (
              <div className="text-center text-muted-foreground pt-10 flex flex-col items-center">
                <Info size={30} className="mb-2 opacity-50" />
                No hay mensajes aún. Inicia la conversación.
              </div>
            ) : (
              (quote.messages || []).map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-2xl px-5 py-3 ${
                    msg.sender === 'admin' 
                      ? 'bg-primary text-white rounded-tr-none shadow-md shadow-primary/10' 
                      : 'bg-muted text-foreground rounded-tl-none border'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-[10px] mt-1 text-right ${msg.sender === 'admin' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="p-4 bg-muted/20 border-t">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input 
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder={quote.isLocked ? "Portal cerrado, no se pueden enviar mensajes" : "Escribe un mensaje al cliente..."}
                className="rounded-xl flex-1 bg-background"
                disabled={quote.isLocked || sending}
              />
              <Button type="submit" disabled={quote.isLocked || sending || !messageText.trim()} className="rounded-xl bg-primary shadow-lg shadow-primary/20">
                {sending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              </Button>
            </form>
          </div>
        </div>

        {/* Right Column: Files & Info */}
        <div className="space-y-6">
          
          <div className="bg-white dark:bg-zinc-900 border rounded-[2rem] p-6 shadow-sm">
            <h2 className="font-bold flex items-center gap-2 mb-4"><ImageIcon className="text-primary" size={18}/> Fotos del Inventario</h2>
            {(quote.photos || []).length === 0 ? (
              <p className="text-sm text-muted-foreground italic">El cliente aún no ha subido fotos.</p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {(quote.photos || []).map((url, i) => (
                  <a key={i} href={url} target="_blank" rel="noreferrer" className="block relative aspect-square rounded-xl overflow-hidden border hover:opacity-80 transition-opacity">
                    <img src={url} alt={`Foto ${i}`} className="w-full h-full object-cover" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-zinc-900 border rounded-[2rem] p-6 shadow-sm">
            <h2 className="font-bold flex items-center gap-2 mb-4"><FileText className="text-secondary" size={18}/> Documentos del Cliente</h2>
            {(quote.documents || []).length === 0 ? (
              <p className="text-sm text-muted-foreground italic">El cliente aún no ha subido documentos.</p>
            ) : (
              <div className="space-y-2">
                {(quote.documents || []).map((doc) => (
                  <a key={doc.id} href={doc.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl border hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-red-100 text-red-500 flex items-center justify-center shrink-0">
                      <FileText size={20} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium truncate">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{new Date(doc.timestamp).toLocaleDateString()}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
