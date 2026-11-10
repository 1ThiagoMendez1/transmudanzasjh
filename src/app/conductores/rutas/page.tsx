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
import { getSession } from "@/app/actions/auth";
import { getAllActiveJourneys, getNodesByJourney, ActiveJourney, JourneyNode } from "@/lib/routes";
import { supabase } from "@/lib/supabase";

type EventType = "llegada_origen" | "cargando" | "en_ruta" | "parada_tecnica" | "novedad" | "llegada_destino" | "descargando";

const EVENT_TYPES = [
  { value: "llegada_origen", label: "Llegada a Origen", icon: MapPin, color: "text-primary", bg: "bg-primary/10" },
  { value: "cargando", label: "Cargando Vehículo", icon: Package, color: "text-indigo-600", bg: "bg-indigo-100" },
  { value: "en_ruta", label: "Saliendo a Ruta", icon: Truck, color: "text-green-600", bg: "bg-green-100" },
  { value: "parada_tecnica", label: "Parada Técnica / Descanso", icon: Clock, color: "text-orange-600", bg: "bg-orange-100" },
  { value: "novedad", label: "Novedad / Retraso", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100" },
  { value: "llegada_destino", label: "Llegada a Destino", icon: Navigation, color: "text-purple-600", bg: "bg-purple-100" },
  { value: "descargando", label: "Descargando", icon: Package, color: "text-cyan-600", bg: "bg-cyan-100" },
  { value: "nueva_ruta", label: "Solicitar Nueva Parada/Ruta", icon: MapPin, color: "text-blue-600", bg: "bg-blue-100" },
];

export default function RutasConductor() {
  const { toast } = useToast();
  
  const [activeRoute, setActiveRoute] = useState<ActiveJourney | null>(null);
  const [events, setEvents] = useState<JourneyNode[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isConfirmFinishOpen, setIsConfirmFinishOpen] = useState(false);
  const [routeFinished, setRouteFinished] = useState(false);

  // Form States for new event
  const [eventType, setEventType] = useState<string>("");
  const [eventLocation, setEventLocation] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [eventNote, setEventNote] = useState("");
  const [routeSender, setRouteSender] = useState("");
  const [routeReceiver, setRouteReceiver] = useState("");
  const [routeIsCompany, setRouteIsCompany] = useState("no");
  const [routeNit, setRouteNit] = useState("");
  const [routeCargoDetails, setRouteCargoDetails] = useState("");
  const [routePickupLocation, setRoutePickupLocation] = useState("");
  const [routeDestination, setRouteDestination] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseLabel, setExpenseLabel] = useState("");
  const [expenseNote, setExpenseNote] = useState("");
  const [expensePhoto, setExpensePhoto] = useState<File | null>(null);
  const [expensePhotoPreview, setExpensePhotoPreview] = useState<string | null>(null);
  const expenseFileInputRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    async function loadData() {
      try {
        const session = await getSession();
        if (!session) return;
        
        const driverName = session.name;
        const allJourneys = await getAllActiveJourneys();
        
        // Find journey assigned to driver that is not finished
        const currentJourney = allJourneys.find(j => j.driver === driverName && j.status !== 'Finalizado' && j.status !== 'finalizada');
        
        if (currentJourney) {
          setActiveRoute(currentJourney);
          const nodes = await getNodesByJourney(currentJourney.id);
          // Reverse order to show newest events at top, and filter out pending approval or rejected
          setEvents(nodes.filter(n => n.status !== 'pending_approval' && n.status !== 'rejected').reverse());
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

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

    if (window.isSecureContext === false) {
      toast({ 
        title: "Conexión no segura", 
        description: "La ubicación automática en móviles requiere conexión segura (HTTPS). Si estás en WiFi local, puede fallar.", 
        variant: "destructive" 
      });
    }
    
    setIsLocating(true);
    
    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000
    };

    const successCallback = async (position: GeolocationPosition) => {
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
    };

    const errorCallback = (error: GeolocationPositionError) => {
      setIsLocating(false);
      let errorMsg = "No se pudo obtener la ubicación. Verifica permisos.";
      
      switch(error.code) {
        case error.PERMISSION_DENIED:
          errorMsg = "Permiso de ubicación denegado. Debes permitirlo en tu navegador.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMsg = "La información de ubicación no está disponible (problema de señal GPS).";
          break;
        case error.TIMEOUT:
          errorMsg = "Tiempo de espera agotado. Intenta de nuevo.";
          break;
      }
      
      toast({ title: "Error de Ubicación", description: errorMsg, variant: "destructive" });
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
  };

  const handleSubmitEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventType || !eventLocation || !activeRoute) {
      toast({
        title: "Faltan datos",
        description: "El tipo de evento y la ubicación son obligatorios.",
        variant: "destructive",
      });
      return;
    }

    const selectedTypeDef = EVENT_TYPES.find(t => t.value === eventType);
    if (!selectedTypeDef) return;

    try {
      let finalPhotoUrl = null;

      if (photo) {
        toast({ title: "Subiendo imagen...", description: "Por favor espera." });
        const fileExt = photo.name.split('.').pop() || 'jpg';
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${activeRoute.id}/${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('evidencias')
          .upload(filePath, photo);

        if (uploadError) {
          console.error("Error uploading photo:", uploadError);
          toast({ title: "Advertencia", description: "El evento se guardará pero la foto no pudo subirse.", variant: "destructive" });
        } else if (data) {
          const { data: publicUrlData } = supabase.storage
            .from('evidencias')
            .getPublicUrl(filePath);
          
          finalPhotoUrl = publicUrlData.publicUrl;
        }
      }

      const isRouteRequest = eventType === 'nueva_ruta';

      const newNode = {
        journey_id: activeRoute.id,
        node_id: isRouteRequest ? `req-${Date.now()}` : `ev-${Date.now()}`,
        type: isRouteRequest ? 'route_request' : 'stop',
        label: isRouteRequest ? `Solicitud Nueva Parada: ${routeDestination || eventLocation}` : selectedTypeDef.label,
        time_str: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: isRouteRequest ? 'pending_approval' : 'completed',
        sequence_order: Date.now(),
        details: {
          address: isRouteRequest ? routeDestination : eventLocation,
          description: eventNote,
          photoUrl: finalPhotoUrl,
          photosCount: finalPhotoUrl ? 1 : 0,
          ...(isRouteRequest ? {
            sender: routeSender,
            receiver: routeReceiver,
            isCompany: routeIsCompany === 'yes',
            nit: routeIsCompany === 'yes' ? routeNit : undefined,
            cargoDetails: routeCargoDetails,
            pickupLocation: routePickupLocation,
            destination: routeDestination,
          } : {})
        }
      };

      await supabase.from('journey_nodes').insert([newNode]);
      
      const newNodes = await getNodesByJourney(activeRoute.id);
      setEvents(newNodes.filter(n => n.status !== 'pending_approval' && n.status !== 'rejected').reverse());
      setIsEventModalOpen(false);
      setEventType("");
      setEventLocation("");
      setEventNote("");
      setRouteSender("");
      setRouteReceiver("");
      setRouteIsCompany("no");
      setRouteNit("");
      setRouteCargoDetails("");
      setRoutePickupLocation("");
      setRouteDestination("");
      setPhoto(null);
      setPhotoPreview(null);

      toast({
        title: isRouteRequest ? "Solicitud Enviada" : "Evento Registrado",
        description: isRouteRequest 
          ? "La solicitud de nueva parada ha sido enviada para aprobación central." 
          : "La bitácora se ha actualizado correctamente.",
      });
    } catch (e) {
      toast({ title: "Error", description: "No se pudo registrar el evento.", variant: "destructive" });
    }
  };

  const handleExpensePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setExpensePhoto(file);
      setExpensePhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmitExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseLabel || !expenseAmount || !activeRoute) {
      toast({
        title: "Faltan datos",
        description: "El tipo de gasto y el monto son obligatorios.",
        variant: "destructive",
      });
      return;
    }

    try {
      let finalPhotoUrl = null;

      if (expensePhoto) {
        toast({ title: "Subiendo evidencia...", description: "Por favor espera." });
        const fileExt = expensePhoto.name.split('.').pop() || 'jpg';
        const fileName = `exp_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${activeRoute.id}/${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('evidencias')
          .upload(filePath, expensePhoto);

        if (uploadError) {
          console.error("Error uploading photo:", uploadError);
          toast({ title: "Advertencia", description: "El gasto se guardará pero la foto no pudo subirse.", variant: "destructive" });
        } else if (data) {
          const { data: publicUrlData } = supabase.storage
            .from('evidencias')
            .getPublicUrl(filePath);
          
          finalPhotoUrl = publicUrlData.publicUrl;
        }
      }

      const amountNum = parseInt(expenseAmount, 10);
      const newNode = {
        journey_id: activeRoute.id,
        node_id: `exp-${Date.now()}`,
        type: 'expense',
        label: expenseLabel,
        time_str: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'completed',
        sequence_order: Date.now(),
        details: {
          description: expenseNote,
          photoUrl: finalPhotoUrl,
          photosCount: finalPhotoUrl ? 1 : 0,
          amount: amountNum
        }
      };

      await supabase.from('journey_nodes').insert([newNode]);
      
      const currentSpentStr = activeRoute.spent || "$0";
      const currentSpent = parseInt(currentSpentStr.replace(/[^\d-]/g, '') || '0', 10);
      const newSpent = currentSpent + amountNum;

      const currentFundStr = activeRoute.fund || "$0";
      const currentFund = parseInt(currentFundStr.replace(/[^\d-]/g, '') || '0', 10);
      const newFund = currentFund - amountNum;

      await supabase.from('active_journeys').update({ 
        spent: `$${newSpent.toLocaleString('es-CO')}`,
        fund: `$${newFund.toLocaleString('es-CO')}`
      }).eq('id', activeRoute.id);
      
      // Also register in expenses table
      await supabase.from('expenses').insert([{
        journey_id: activeRoute.id,
        amount: amountNum,
        description: expenseNote,
        category: expenseLabel
      }]);

      const newNodes = await getNodesByJourney(activeRoute.id);
      setEvents(newNodes.filter(n => n.status !== 'pending_approval' && n.status !== 'rejected').reverse());
      
      // Update local state for activeRoute to reflect new spent and fund
      setActiveRoute(prev => prev ? { 
        ...prev, 
        spent: `$${newSpent.toLocaleString('es-CO')}`,
        fund: `$${newFund.toLocaleString('es-CO')}`
      } : null);

      setIsExpenseModalOpen(false);
      setExpenseLabel("");
      setExpenseAmount("");
      setExpenseNote("");
      setExpensePhoto(null);
      setExpensePhotoPreview(null);

      toast({
        title: "Gasto Registrado",
        description: `Se registró un gasto de $${amountNum.toLocaleString('es-CO')} en tu ruta.`,
      });
    } catch (e) {
      toast({ title: "Error", description: "No se pudo registrar el gasto.", variant: "destructive" });
    }
  };

  const handleFinishRoute = async () => {
    if (!activeRoute) return;
    setIsConfirmFinishOpen(false);
    
    try {
      const finalEvent = {
        journey_id: activeRoute.id,
        node_id: `ev-${Date.now()}`,
        type: 'closure',
        label: "Ruta Finalizada",
        time_str: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'completed',
        sequence_order: Date.now(),
        details: { description: "Ruta completada exitosamente." }
      };
      
      await supabase.from('journey_nodes').insert([finalEvent]);
      await supabase.from('active_journeys').update({ status: 'Finalizado' }).eq('id', activeRoute.id);
      
      setRouteFinished(true);

      toast({
        title: "Ruta Finalizada con Éxito",
        description: "Has completado el viaje. Datos sincronizados con el Dashboard.",
        variant: "default",
      });
    } catch (error) {
      toast({ title: "Error", description: "No se pudo finalizar la ruta.", variant: "destructive" });
    }
  };

  const getEventIconStyle = (type: string, label: string) => {
    if (type === "start") return { icon: Map, color: "text-slate-600", bg: "bg-slate-200" };
    if (type === "closure") return { icon: CheckCircle2, color: "text-white", bg: "bg-green-500" };
    
    const def = EVENT_TYPES.find(t => t.label === label);
    return def ? { icon: def.icon, color: def.color, bg: def.bg } : { icon: MapPin, color: "text-primary", bg: "bg-primary/10" };
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-primary w-8 h-8"/></div>;
  }

  if (!activeRoute && !routeFinished) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
          <Truck className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">No tienes rutas activas</h2>
        <p className="text-slate-500 max-w-[250px] mt-2">La central no te ha asignado viajes pendientes por el momento.</p>
      </div>
    );
  }

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
            <p className="text-sm text-slate-500 font-medium">{activeRoute?.id}</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => setIsExpenseModalOpen(true)}
              size="sm" 
              variant="outline"
              className="rounded-full border-red-500 text-red-600 shadow-sm font-semibold hover:bg-red-50"
            >
              <Upload className="w-4 h-4 mr-1" /> Gasto
            </Button>
            <Button 
              onClick={() => setIsEventModalOpen(true)}
              size="sm" 
              className="rounded-full bg-primary shadow-md font-semibold text-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-1" /> Evento
            </Button>
          </div>
        </div>

        {/* Route Overview Card */}
        <Card className="border-none shadow-md bg-white overflow-hidden">
          <div className="bg-primary p-4 text-white">
            <div className="flex flex-col gap-4 relative">
              {/* Origin */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-white relative z-10" />
                  <div className="w-0.5 h-10 bg-primary/50 -my-1" />
                </div>
                <div className="-mt-1">
                  <p className="text-xs text-primary-foreground/80 font-medium mb-0.5">Origen</p>
                  <p className="font-bold text-base leading-tight">{activeRoute?.origin}</p>
                </div>
              </div>
              
              {/* Destination */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 relative z-10" />
                </div>
                <div className="-mt-1">
                  <p className="text-xs text-primary-foreground/80 font-medium mb-0.5">Destino</p>
                  <p className="font-bold text-base leading-tight">{activeRoute?.destination}</p>
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
                const IconDef = getEventIconStyle(event.type, event.label);
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
                          {event.label}
                        </p>
                        <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                          {event.time}
                        </span>
                      </div>
                      {(event.details?.address || event.details?.client) && (
                        <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mb-2">
                          <MapPin className="w-3 h-3" /> {event.details.address || event.details.client}
                        </p>
                      )}
                      
                      {event.details?.description && (
                        <div className="bg-slate-50 border border-slate-100 p-2 rounded-lg text-xs text-slate-600 mb-2">
                          {event.details.description}
                        </div>
                      )}

                      {event.details?.photosCount ? (
                        <div className="mt-2 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 p-4 text-center">
                          <p className="text-xs text-slate-500">{event.details.photosCount} Foto(s) adjuntas</p>
                        </div>
                      ) : null}
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
          <div className="h-2 w-full bg-primary"></div>
          
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
                    className="shrink-0 h-[50px] w-[50px] rounded-xl border-slate-200 text-primary bg-primary/10 hover:bg-primary/20"
                    onClick={handleGetLocation}
                    disabled={isLocating}
                  >
                    {isLocating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Navigation className="w-5 h-5" />}
                  </Button>
                  </div>
                </div>

                {eventType === 'gasto' && (
                  <div className="space-y-2 bg-red-50 p-4 rounded-xl border border-red-100">
                    <Label className="text-base font-semibold text-red-700">Monto del Gasto ($)</Label>
                    <Input 
                      type="number"
                      placeholder="Ej. 15000" 
                      className="py-6 rounded-xl bg-white border-red-200 focus-visible:ring-red-500"
                      value={expenseAmount}
                      onChange={(e) => setExpenseAmount(e.target.value)}
                      required
                    />
                  </div>
                )}

                {eventType === 'nueva_ruta' && (
                  <div className="space-y-4 bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-blue-900">Remitente</Label>
                      <Input 
                        placeholder="Quién envía" 
                        className="rounded-lg bg-white border-blue-200"
                        value={routeSender}
                        onChange={(e) => setRouteSender(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-blue-900">Destinatario</Label>
                      <Input 
                        placeholder="Quién recibe" 
                        className="rounded-lg bg-white border-blue-200"
                        value={routeReceiver}
                        onChange={(e) => setRouteReceiver(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-blue-900">¿Es empresa?</Label>
                      <Select value={routeIsCompany} onValueChange={setRouteIsCompany}>
                        <SelectTrigger className="w-full bg-white border-blue-200 rounded-lg h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="yes">Sí</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {routeIsCompany === 'yes' && (
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-blue-900">NIT de la Empresa</Label>
                        <Input 
                          placeholder="Ej. 900.123.456-7" 
                          className="rounded-lg bg-white border-blue-200"
                          value={routeNit}
                          onChange={(e) => setRouteNit(e.target.value)}
                          required
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-blue-900">Detalles de la Carga</Label>
                      <Input 
                        placeholder="Ej. 10 Cajas, muebles, etc." 
                        className="rounded-lg bg-white border-blue-200"
                        value={routeCargoDetails}
                        onChange={(e) => setRouteCargoDetails(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-blue-900">Lugar de Recogida</Label>
                      <Input 
                        placeholder="Dirección de recogida" 
                        className="rounded-lg bg-white border-blue-200"
                        value={routePickupLocation}
                        onChange={(e) => setRoutePickupLocation(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-blue-900">Destino de Entrega</Label>
                      <Input 
                        placeholder="Dirección final" 
                        className="rounded-lg bg-white border-blue-200"
                        value={routeDestination}
                        onChange={(e) => setRouteDestination(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

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
                    className="w-full py-8 border-dashed border-2 rounded-xl text-slate-500 hover:text-primary hover:bg-primary/10"
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
              <Button type="submit" className="w-full py-6 text-lg rounded-xl font-bold bg-primary hover:bg-primary/90 shadow-md">
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

      <Dialog open={isExpenseModalOpen} onOpenChange={setIsExpenseModalOpen}>
        <DialogContent className="sm:max-w-md w-[95vw] rounded-3xl p-0 overflow-hidden bg-white max-h-[90vh] overflow-y-auto">
          <div className="bg-red-600 p-6 text-white flex flex-col items-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold text-center">Registrar Gasto</DialogTitle>
            <DialogDescription className="text-red-100 text-center">
              Añade un peaje, combustible u otro gasto a tu ruta.
            </DialogDescription>
          </div>
          <form onSubmit={handleSubmitExpense} className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-base font-semibold">Tipo de Gasto</Label>
                <Select value={expenseLabel} onValueChange={setExpenseLabel} required>
                  <SelectTrigger className="w-full py-6 text-base rounded-xl bg-slate-50">
                    <SelectValue placeholder="Selecciona el tipo de gasto..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Peaje">Peaje</SelectItem>
                    <SelectItem value="Combustible">Combustible</SelectItem>
                    <SelectItem value="Alimentación">Alimentación</SelectItem>
                    <SelectItem value="Hospedaje">Hospedaje</SelectItem>
                    <SelectItem value="Mantenimiento">Mantenimiento Rápido</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-base font-semibold">Monto ($)</Label>
                <Input 
                  type="number"
                  placeholder="Ej. 15000" 
                  className="py-6 rounded-xl bg-slate-50"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-base font-semibold">Descripción o Nota</Label>
                <Textarea 
                  placeholder="Ej. Peaje Andes"
                  className="rounded-xl bg-slate-50 min-h-[80px]"
                  value={expenseNote}
                  onChange={(e) => setExpenseNote(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-base font-semibold flex justify-between">
                  Comprobante o Factura <span className="text-slate-400 font-normal text-sm">(Recomendado)</span>
                </Label>
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment" 
                  className="hidden" 
                  ref={expenseFileInputRef}
                  onChange={handleExpensePhotoCapture}
                />
                {!expensePhotoPreview ? (
                  <div 
                    onClick={() => expenseFileInputRef.current?.click()}
                    className="border-2 border-dashed border-red-200 rounded-2xl p-6 text-center bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                  >
                    <Camera className="mx-auto text-red-400 mb-2" size={32} />
                    <p className="text-sm font-medium text-red-600">Tomar foto del comprobante</p>
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 p-2">
                    <img src={expensePhotoPreview} alt="Preview" className="w-full h-40 object-cover rounded-xl" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-4 right-4 rounded-full h-8 w-8"
                      onClick={() => {
                        setExpensePhoto(null);
                        setExpensePhotoPreview(null);
                        if (expenseFileInputRef.current) expenseFileInputRef.current.value = "";
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button type="button" variant="outline" className="w-full rounded-xl py-6 text-base" onClick={() => setIsExpenseModalOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="w-full rounded-xl py-6 text-base bg-red-600 hover:bg-red-700">
                Guardar Gasto
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
