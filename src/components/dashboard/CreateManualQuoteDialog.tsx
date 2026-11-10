"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { createManualQuote } from '@/lib/quotes';
import { toast } from '@/hooks/use-toast';
import { Loader2, Copy, Check, MessageCirclePlus } from 'lucide-react';

export function CreateManualQuoteDialog({ onQuoteCreated }: { onQuoteCreated: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [credentials, setCredentials] = useState<{ id: string, clientDocument: string } | null>(null);

  const [formData, setFormData] = useState({
    clientName: '',
    clientDocument: '',
    clientPhone: '',
    origin: '',
    destination: '',
    leadSource: 'whatsapp'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createManualQuote(formData);
      setCredentials(res);
      onQuoteCreated();
      toast({
        title: "Cotización Creada",
        description: "Envía estos datos al cliente para que ingrese al portal."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo crear la cotización manual."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = () => {
    if (!credentials) return;
    const portalUrl = `${window.location.origin}/portal-cliente/${credentials.id}?doc=${credentials.clientDocument}`;
    const textToCopy = `¡Hola ${formData.clientName}! 👋\n\nAquí tienes el acceso a tu portal de cotización interactivo de TransMudanzas.\n\n🔗 *Ingresa directamente aquí:* ${portalUrl}\n\nAllí podrás subir tus fotos, documentos y comunicarte con nosotros. ¡Estamos en contacto!`;
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCredentials(null);
    setFormData({
      clientName: '',
      clientDocument: '',
      clientPhone: '',
      origin: '',
      destination: '',
      leadSource: 'whatsapp'
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open && credentials) handleReset();
    }}>
      <DialogTrigger asChild>
        <Button className="rounded-xl shadow-lg shadow-primary/20 gap-2">
          <MessageCirclePlus size={18} /> Crear Cotización Manual
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md rounded-[2rem] p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold">Nueva Cotización Manual</DialogTitle>
          <DialogDescription>
            Crea un portal interactivo para un lead (ej. de WhatsApp).
          </DialogDescription>
        </DialogHeader>

        {!credentials ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Nombre del Cliente</Label>
              <Input 
                required 
                placeholder="Ej. Juan Pérez" 
                className="rounded-xl"
                value={formData.clientName}
                onChange={e => setFormData({...formData, clientName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Documento de Identidad</Label>
              <Input 
                required 
                placeholder="Ej. 1010123456" 
                className="rounded-xl"
                value={formData.clientDocument}
                onChange={e => setFormData({...formData, clientDocument: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Teléfono / WhatsApp</Label>
              <Input 
                required 
                placeholder="Ej. +57 300 000 0000" 
                className="rounded-xl"
                value={formData.clientPhone}
                onChange={e => setFormData({...formData, clientPhone: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Origen</Label>
                <Input 
                  required 
                  placeholder="Ej. Bogotá" 
                  className="rounded-xl"
                  value={formData.origin}
                  onChange={e => setFormData({...formData, origin: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Destino</Label>
                <Input 
                  required 
                  placeholder="Ej. Medellín" 
                  className="rounded-xl"
                  value={formData.destination}
                  onChange={e => setFormData({...formData, destination: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Canal de Origen</Label>
              <select 
                className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={formData.leadSource}
                onChange={e => setFormData({...formData, leadSource: e.target.value})}
              >
                <option value="whatsapp">WhatsApp</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="phone">Llamada Telefónica</option>
              </select>
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit" disabled={loading} className="w-full rounded-xl gap-2">
                {loading ? <Loader2 className="animate-spin" size={18} /> : null}
                Generar Portal de Cliente
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6 text-center py-4">
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} />
            </div>
            <h3 className="text-xl font-bold">¡Portal Creado con Éxito!</h3>
            <p className="text-muted-foreground text-sm">
              Copia el siguiente mensaje y envíaselo a {formData.clientName} por WhatsApp.
            </p>

            <div className="bg-muted/50 p-4 rounded-xl text-left border border-muted relative">
              <p className="text-xs font-bold text-muted-foreground uppercase mb-2">Mensaje para el cliente</p>
              <p className="text-sm font-mono whitespace-pre-wrap text-foreground">
                ¡Hola {formData.clientName}! 👋<br/><br/>
                Aquí tienes el acceso a tu portal de cotización interactivo de TransMudanzas.<br/><br/>
                🔗 <b>Ingresa directamente aquí:</b><br/> 
                <span className="text-primary truncate block mt-1">{window.location.origin}/portal-cliente/{credentials.id}?doc={credentials.clientDocument}</span><br/>
                Allí podrás subir tus fotos, documentos y comunicarte con nosotros. ¡Estamos en contacto!
              </p>
            </div>

            <Button 
              onClick={handleCopyText} 
              variant={copied ? "default" : "outline"} 
              className={`w-full rounded-xl gap-2 ${copied ? "bg-green-600 hover:bg-green-700 text-white" : ""}`}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "¡Copiado!" : "Copiar Mensaje al Portapapeles"}
            </Button>

            <Button variant="ghost" onClick={handleReset} className="w-full rounded-xl">
              Cerrar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
