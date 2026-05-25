"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Navigation, 
  Clock, 
  CheckCircle2, 
  Package, 
  Map, 
  Plus, 
  Camera, 
  AlertTriangle,
  Truck,
  Upload,
  X,
  Loader2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type EventType = "asignada" | "llegada_origen" | "cargando" | "en_ruta" | "parada_tecnica" | "novedad" | "llegada_destino" | "descargando" | "finalizada";

interface RouteEvent {
  id: string;
  type: EventType;
  title: string;
  location: string;
  time: string;
  note?: string;
  photoUrl?: string;
}

const EVENT_TYPES = [
  { value: "llegada_origen", label: "Llegada a Origen", icon: MapPin, color: "text-blue-600", bg: "bg-blue-100" },
  { value: "cargando", label: "Cargando Vehículo", icon: Package, color: "text-indigo-600", bg: "bg-indigo-100" },
  { value: "en_ruta", label: "Saliendo a Ruta", icon: Truck, color: "text-green-600", bg: "bg-green-100" },
  { value: "parada_tecnica", label: "Parada Técnica / Descanso", icon: Clock, color: "text-orange-600", bg: "bg-orange-100" },
  { value: "novedad", label: "Novedad / Retraso", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100" },
  { value: "llegada_destino", label: "Llegada a Destino", icon: Navigation, color: "text-purple-600", bg: "bg-purple-100" },
  { value: "descargando", label: "Descargando", icon: Package, color: "text-cyan-600", bg: "bg-cyan-100" },
];

export default function RutasConductor() {
  const { toast } = useToast();
  
  // State for the timeline events
  const [events, setEvents] = useState<RouteEvent[]>([
    {
      id: "ev-1",
      type: "asignada",
      title: "Ruta Asignada",
      location: "Central Transmudanzas",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      note: "Viaje a Medellín asignado por central."
    }
  ]);

  // Modal States
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isConfirmFinishOpen, setIsConfirmFinishOpen] = useState(false);
  const [routeFinished, setRouteFinished] = useState(false);

  // Form States for new event
  const [eventType, setEventType] = useState<string>("");
  const [eventLocation, setEventLocation] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [eventNote, setEventNote] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeRoute = {
    id: "RT-8842",
    client: "Mudanzas Corporativas SA",
    origin: "Bogotá, Cundinamarca",
    destination: "Medellín, Antioquia",
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast({ title: "Error", description: "Tu navegador no soporta geolocalización.", variant: "destructive" });
      return;
    }
    
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // Reverse geocoding using free Nominatim API
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          
          if (data && data.display_name) {
            // Simplify the address a bit if it's too long
            const addressParts = data.display_name.split(", ");
            const shortAddress = addressParts.slice(0, 3).join(", ");
            setEventLocation(shortAddress);
          } else {
            setEventLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          }
        } catch (error) {
          setEventLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        toast({ title: "Error", description: "No se pudo obtener la ubicación. Verifica permisos.", variant: "destructive" });
      },
      { enableHighAccuracy: true }
    );
  };

  const handleSubmitEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventType || !eventLocation) {
      toast({
        title: "Faltan datos",
        description: "El tipo de evento y la ubicación son obligatorios.",
        variant: "destructive",
      });
      return;
    }

    const selectedTypeDef = EVENT_TYPES.find(t => t.value === eventType);
    if (!selectedTypeDef) return;

    const newEvent: RouteEvent = {
      id: `ev-${Date.now()}`,
      type: eventType as EventType,
      title: selectedTypeDef.label,
      location: eventLocation,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      note: eventNote,
      photoUrl: photoPreview || undefined,
    };

    setEvents([newEvent, ...events]); // Add to top of the timeline
    setIsEventModalOpen(false);
    
    // Reset Form
    setEventType("");
    setEventLocation("");
    setEventNote("");
    setPhoto(null);
    setPhotoPreview(null);

    toast({
      title: "Evento Registrado",
      description: "La bitácora se ha actualizado correctamente.",
    });
  };

  const handleFinishRoute = () => {
    setIsConfirmFinishOpen(false);
    
    // Add final event to timeline
    const finalEvent: RouteEvent = {
      id: `ev-${Date.now()}`,
      type: "finalizada",
      title: "Ruta Finalizada",
      location: activeRoute.destination,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      note: "Ruta completada exitosamente."
    };
    
    setEvents([finalEvent, ...events]);
    setRouteFinished(true);

    toast({
      title: "Ruta Finalizada con Éxito",
      description: "Has completado el viaje. Datos sincronizados con el Dashboard.",
      variant: "default",
    });
  };

  const getEventIconStyle = (type: EventType) => {
    if (type === "asignada") return { icon: Map, color: "text-slate-600", bg: "bg-slate-200" };
    if (type === "finalizada") return { icon: CheckCircle2, color: "text-white", bg: "bg-green-500" };
    const def = EVENT_TYPES.find(t => t.value === type);
    return def ? { icon: def.icon, color: def.color, bg: def.bg } : { icon: MapPin, color: "text-slate-600", bg: "bg-slate-200" };
  };

  if (routeFinished) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="flex flex-col items-center gap-4"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">¡Buen Trabajo!</h2>
          <p className="text-slate-500 max-w-[250px] mb-4">Has finalizado esta ruta y los datos ya están en el sistema.</p>
          <Button variant="outline" onClick={() => setRouteFinished(false)}>Ver Resumen de Bitácora</Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-md p-4 flex flex-col gap-5 pt-6 relative pb-24">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Ruta Activa</h1>
            <p className="text-sm text-slate-500 font-medium">{activeRoute.id}</p>
          </div>
          <Button 
            onClick={() => setIsEventModalOpen(true)}
            size="sm" 
            className="rounded-full bg-blue-600 shadow-md font-semibold"
          >
            <Plus className="w-4 h-4 mr-1" /> Evento
          </Button>
        </div>

        {/* Route Overview Card */}
        <Card className="border-none shadow-md bg-white overflow-hidden">
          <div className="bg-blue-600 p-4 text-white">
            <div className="flex flex-col gap-4 relative">
              {/* Origin */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-white relative z-10" />
                  <div className="w-0.5 h-10 bg-blue-400/50 -my-1" />
                </div>
                <div className="-mt-1">
                  <p className="text-xs text-blue-200 font-medium mb-0.5">Origen</p>
                  <p className="font-bold text-base leading-tight">{activeRoute.origin}</p>
                </div>
              </div>
              
              {/* Destination */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 relative z-10" />
                </div>
                <div className="-mt-1">
                  <p className="text-xs text-blue-200 font-medium mb-0.5">Destino</p>
                  <p className="font-bold text-base leading-tight">{activeRoute.destination}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Dynamic Timeline (Bitácora) */}
        <div className="mt-2">
          <h3 className="text-lg font-bold text-slate-800 mb-4 px-1">Bitácora de Viaje</h3>
          <div className="space-y-0 px-2">
            <AnimatePresence>
              {events.map((event, index) => {
                const isLast = index === events.length - 1;
                const IconDef = getEventIconStyle(event.type);
                const IconComp = IconDef.icon;
                
                return (
                  <motion.div 
                    key={event.id} 
                    initial={{ opacity: 0, x: -20, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: "auto" }}
                    className="flex gap-4"
                  >
                    {/* Timeline Line */}
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 shadow-sm ${IconDef.bg} ${IconDef.color}`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      {!isLast && (
                        <div className="w-0.5 h-full min-h-[40px] bg-slate-200 my-1" />
                      )}
                    </div>
                    
                    {/* Event Details */}
                    <div className={`pb-6 pt-1 flex-1 ${!isLast ? 'border-b border-slate-100 mb-2' : ''}`}>
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-bold text-slate-800 text-sm leading-tight">
                          {event.title}
                        </p>
                        <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                          {event.time}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mb-2">
                        <MapPin className="w-3 h-3" /> {event.location}
                      </p>
                      
                      {event.note && (
                        <div className="bg-slate-50 border border-slate-100 p-2 rounded-lg text-xs text-slate-600 mb-2">
                          {event.note}
                        </div>
                      )}

                      {event.photoUrl && (
                        <div className="mt-2 rounded-xl overflow-hidden border border-slate-200">
                          <img src={event.photoUrl} alt="Evidencia de evento" className="w-full h-32 object-cover" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Big Finish Button - Fixed at bottom of content */}
        {!routeFinished && (
          <div className="mt-8 mb-4">
            <Button 
              size="lg" 
              variant="outline"
              className="w-full py-6 text-lg font-bold rounded-xl border-2 border-green-500 text-green-600 hover:bg-green-50"
              onClick={() => setIsConfirmFinishOpen(true)}
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Finalizar Ruta
            </Button>
          </div>
        )}

      </div>

      {/* Registrar Evento Modal */}
      <Dialog open={isEventModalOpen} onOpenChange={setIsEventModalOpen}>
        <DialogContent className="w-[95vw] max-w-md rounded-2xl p-0 overflow-hidden bg-white max-h-[90vh] overflow-y-auto">
          <div className="h-2 w-full bg-blue-600"></div>
          
          <form onSubmit={handleSubmitEvent} className="p-6 flex flex-col gap-5">
            <DialogHeader className="text-left space-y-0 pb-2">
              <DialogTitle className="text-xl">Reportar Evento</DialogTitle>
              <DialogDescription>
                Registra tu progreso o cualquier novedad para el dashboard central.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-base font-semibold">Tipo de Evento</Label>
                <Select value={eventType} onValueChange={setEventType} required>
                  <SelectTrigger className="w-full py-6 text-base rounded-xl bg-slate-50">
                    <SelectValue placeholder="Selecciona lo que está pasando..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {EVENT_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value} className="py-3">
                        <div className="flex items-center gap-2">
                          <div className={`p-1 rounded-md ${type.bg} ${type.color}`}>
                            <type.icon className="w-4 h-4" />
                          </div>
                          <span className="font-medium">{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-base font-semibold">Ubicación Actual</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input 
                      placeholder="Ej. Peaje Siberia / Calle 100" 
                      className="pl-10 py-6 rounded-xl bg-slate-50 border-slate-200"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="shrink-0 h-[50px] w-[50px] rounded-xl border-slate-200 text-blue-600 bg-blue-50 hover:bg-blue-100"
                    onClick={handleGetLocation}
                    disabled={isLocating}
                  >
                    {isLocating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Navigation className="w-5 h-5" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-base font-semibold flex justify-between">
                  Evidencia Visual <span className="text-slate-400 font-normal text-sm">(Opcional)</span>
                </Label>
                
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handlePhotoCapture}
                />
                
                {!photoPreview ? (
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-8 border-dashed border-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Tomar o subir foto
                  </Button>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border border-slate-200">
                    <img src={photoPreview} alt="Evidencia" className="w-full h-32 object-cover" />
                    <Button 
                      type="button"
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-2 right-2 rounded-full w-8 h-8 opacity-90"
                      onClick={() => {
                        setPhoto(null);
                        setPhotoPreview(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-base font-semibold flex justify-between">
                  Notas / Detalles <span className="text-slate-400 font-normal text-sm">(Opcional)</span>
                </Label>
                <Textarea 
                  placeholder="Añade algún comentario para la oficina central..." 
                  className="resize-none rounded-xl bg-slate-50 border-slate-200"
                  value={eventNote}
                  onChange={(e) => setEventNote(e.target.value)}
                  rows={2}
                />
              </div>
            </div>

            <DialogFooter className="mt-4 flex-col sm:flex-col gap-2">
              <Button type="submit" className="w-full py-6 text-lg rounded-xl font-bold bg-blue-600 hover:bg-blue-700 shadow-md">
                Guardar en Bitácora
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation Finish Dialog */}
      <Dialog open={isConfirmFinishOpen} onOpenChange={setIsConfirmFinishOpen}>
        <DialogContent className="w-[90vw] max-w-sm rounded-2xl p-6">
          <DialogHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <DialogTitle className="text-2xl">¿Finalizar Ruta?</DialogTitle>
            <DialogDescription className="text-base pt-2">
              Asegúrate de haber registrado todas las paradas importantes en la bitácora antes de finalizar.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-col gap-3 mt-6">
            <Button size="lg" className="w-full text-lg font-bold bg-green-600 hover:bg-green-700" onClick={handleFinishRoute}>
              Sí, ruta completada
            </Button>
            <Button size="lg" variant="ghost" className="w-full text-slate-500" onClick={() => setIsConfirmFinishOpen(false)}>
              No, continuar viaje
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
