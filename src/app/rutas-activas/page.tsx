"use client";

import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { SnakeJourney, JourneyNode } from '@/components/SnakeJourney';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Share2, 
  MessageSquare,
  FileText,
  ChevronRight,
  Truck,
  Plus,
  Camera,
  Image as ImageIcon,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { getAllWebQuotes, WebQuote } from '@/lib/quotes';
import { Loader2 } from 'lucide-react';
import { 
  ActiveJourney, 
  getAllActiveJourneys, 
  getNodesByJourney, 
  createJourney, 
  addExpenseToJourney, 
  addServiceToJourney 
} from '@/lib/routes';

export default function RutasActivas() {
  const [activeJourneys, setActiveJourneys] = useState<ActiveJourney[]>([]);
  const [acceptedQuotes, setAcceptedQuotes] = useState<WebQuote[]>([]);
  const [selectedQuoteId, setSelectedQuoteId] = useState<string>('');
  const [nodesByJourney, setNodesByJourney] = useState<Record<string, JourneyNode[]>>({});
  const [selectedJourneyId, setSelectedJourneyId] = useState('');
  const [activeNode, setActiveNode] = useState<JourneyNode | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Modals
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isNewRouteOpen, setIsNewRouteOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [autoGuia, setAutoGuia] = useState('');

  useEffect(() => {
    getAllWebQuotes().then(quotes => {
      let accepted = quotes.filter(q => q.status === 'Aceptada');
      if (accepted.length === 0) {
        // Mock an accepted quote for demonstration if there aren't any
        accepted = [{
          id: 'MIVRA-1029',
          secretCode: 'XYZ123',
          status: 'Aceptada',
          createdAt: new Date().toISOString(),
          origin: 'Barranquilla (Norte)',
          destination: 'Santa Marta (Rodadero)',
          estimatedDate: '2026-06-01',
          description: 'Mudanza ejecutiva',
          photos: [],
          clientName: 'Ana Maria',
          clientPhone: '320000000',
          estimatedValue: 2500000
        } as WebQuote];
      }
      setAcceptedQuotes(accepted);
    });

    async function loadJourneys() {
      const journeys = await getAllActiveJourneys();
      setActiveJourneys(journeys);
      const nodesMap: Record<string, JourneyNode[]> = {};
      for (const j of journeys) {
        nodesMap[j.id] = await getNodesByJourney(j.id);
      }
      setNodesByJourney(nodesMap);
      if (journeys.length > 0) {
        setSelectedJourneyId(journeys[0].id);
      }
      setLoading(false);
    }
    loadJourneys();
  }, []);

  const activeJourney = activeJourneys.find(j => j.id === selectedJourneyId) || activeJourneys[0];
  const nodes = activeJourney ? (nodesByJourney[activeJourney.id] || []) : [];

  // Whenever the active journey changes, reset active node
  useEffect(() => {
    setActiveNode(null);
  }, [selectedJourneyId]);

  const [newRouteData, setNewRouteData] = useState({
    destino: '',
    remitente: '',
    fechaEnvio: '',
    destinatario: '',
    fechaRecepcion: '',
    photosCount: 0
  });

  const [newJourneyData, setNewJourneyData] = useState({
    driver: '',
    truck: '',
    origin: '',
    destination: '',
    fund: ''
  });

  const [newExpenseData, setNewExpenseData] = useState({
    label: '',
    amount: '',
    description: '',
    photosCount: 0
  });

  useEffect(() => {
    if (selectedQuoteId) {
      const quote = acceptedQuotes.find(q => q.id === selectedQuoteId);
      if (quote) {
        setNewJourneyData(prev => ({
          ...prev,
          origin: quote.origin,
          destination: quote.destination,
          fund: quote.estimatedValue ? quote.estimatedValue.toString() : ''
        }));
      }
    }
  }, [selectedQuoteId, acceptedQuotes]);

  // Generate a random guide number when add service modal opens
  useEffect(() => {
    if (isAddServiceOpen) {
      setAutoGuia(`EXT-${Math.floor(Math.random() * 90000) + 10000}`);
    } else {
      setNewRouteData({
        destino: '', remitente: '', fechaEnvio: '', destinatario: '', fechaRecepcion: '', photosCount: 0
      });
    }
  }, [isAddServiceOpen]);

  const handleCreateJourney = async () => {
    if (!newJourneyData.driver || !newJourneyData.truck || !newJourneyData.origin || !newJourneyData.destination) {
      toast({ variant: "destructive", title: "Faltan datos", description: "Todos los campos principales son obligatorios." });
      return;
    }

    const newId = `GUIA-${Math.floor(Math.random() * 900000) + 100000}`;
    
    await createJourney({
      id: newId,
      driver: newJourneyData.driver,
      truck: newJourneyData.truck,
      origin: newJourneyData.origin,
      destination: newJourneyData.destination,
      fund: newJourneyData.fund ? `$${parseInt(newJourneyData.fund).toLocaleString('es-CO')}` : '$0',
    });
    
    const journeys = await getAllActiveJourneys();
    setActiveJourneys(journeys);
    const nodesMap: Record<string, JourneyNode[]> = {};
    for (const j of journeys) {
      nodesMap[j.id] = await getNodesByJourney(j.id);
    }
    setNodesByJourney(nodesMap);
    
    setIsNewRouteOpen(false);
    setSelectedJourneyId(newId);
    setNewJourneyData({ driver: '', truck: '', origin: '', destination: '', fund: '' });
    setSelectedQuoteId('');

    toast({
      title: "Ruta Creada Exitosamente",
      description: `El viaje ${newId} ha sido asignado a ${newJourneyData.driver}.`
    });
  };

  const handleAddRoute = async () => {
    if (!newRouteData.destino || !newRouteData.remitente || !newRouteData.destinatario) {
      toast({
        variant: "destructive",
        title: "Campos Incompletos",
        description: "El destino, remitente y destinatario son obligatorios."
      });
      return;
    }

    await addServiceToJourney(activeJourney.id, {
      destino: newRouteData.destino,
      remitente: newRouteData.remitente,
      destinatario: newRouteData.destinatario,
      fechaRecepcion: newRouteData.fechaRecepcion,
      description: `Servicio Adicional Autorizado (${autoGuia})`,
      photosCount: newRouteData.photosCount,
      autoGuia
    });

    const updatedNodes = await getNodesByJourney(activeJourney.id);
    setNodesByJourney(prev => ({
      ...prev,
      [activeJourney.id]: updatedNodes
    }));
    
    setIsAddServiceOpen(false);

    toast({
      title: "Servicio Autorizado y Agregado",
      description: `La nueva parada en ${newRouteData.destino} ha sido asignada a ${activeJourney.driver}.`
    });
  };

  const handleSimulatePhotoUpload = () => {
    toast({ title: "Cargando...", description: "Simulando subida de imágenes..." });
    setTimeout(() => {
      setNewRouteData(prev => ({ ...prev, photosCount: prev.photosCount + 2 }));
      toast({ title: "Evidencias Listas", description: "Se adjuntaron 2 fotografías al servicio." });
    }, 1000);
  };

  const handleSimulateExpensePhotoUpload = () => {
    toast({ title: "Cargando...", description: "Subiendo foto de factura/recibo..." });
    setTimeout(() => {
      setNewExpenseData(prev => ({ ...prev, photosCount: prev.photosCount + 1 }));
      toast({ title: "Evidencia Lista", description: "Se adjuntó la foto del comprobante." });
    }, 1000);
  };

  const handleAddExpense = async () => {
    if (!newExpenseData.label || !newExpenseData.amount) {
      toast({ variant: "destructive", title: "Faltan datos", description: "El tipo de gasto y el monto son obligatorios." });
      return;
    }

    const amountNum = parseInt(newExpenseData.amount, 10);
    await addExpenseToJourney(
      activeJourney.id,
      newExpenseData.label,
      amountNum,
      newExpenseData.description,
      newExpenseData.photosCount
    );

    const journeys = await getAllActiveJourneys();
    setActiveJourneys(journeys);
    const updatedNodes = await getNodesByJourney(activeJourney.id);
    setNodesByJourney(prev => ({
      ...prev,
      [activeJourney.id]: updatedNodes
    }));

    setIsAddExpenseOpen(false);
    setNewExpenseData({ label: '', amount: '', description: '', photosCount: 0 });

    toast({
      title: "Gasto Registrado",
      description: `Se registró un gasto de $${amountNum.toLocaleString('es-CO')} por ${newExpenseData.label}.`
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (activeJourneys.length === 0) {
    return (
      <div className="min-h-screen px-4 pb-24 pt-8 md:pl-[140px] md:pr-8 md:py-8 bg-background max-w-[100vw] overflow-x-hidden">
        <Navigation />
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Rutas Activas 📑</h1>
          <p className="text-muted-foreground text-sm md:text-base">No hay rutas activas registradas en este momento.</p>
        </header>
        <div className="flex justify-center py-12">
          <Dialog open={isNewRouteOpen} onOpenChange={setIsNewRouteOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl gap-2 shadow-lg shadow-primary/20 bg-primary text-white">
                <Plus size={18} /> Crear Nueva Ruta
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-[2rem]">
              <DialogHeader>
                <DialogTitle className="text-2xl">Planificar Nueva Ruta</DialogTitle>
                <DialogDescription>
                  Asigna un vehículo y conductor para un viaje desde cero.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2 bg-primary/5 p-4 rounded-2xl border border-primary/20">
                  <Label className="text-primary font-bold flex items-center gap-2"><FileText size={16} /> Vincular Cotización Aceptada</Label>
                  <select 
                    className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
                    value={selectedQuoteId}
                    onChange={(e) => setSelectedQuoteId(e.target.value)}
                  >
                    <option value="">-- Ruta Manual (Sin vincular) --</option>
                    {acceptedQuotes.map(q => (
                      <option key={q.id} value={q.id}>
                        {q.id} - {q.clientName} ({q.origin} ➔ {q.destination})
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-muted-foreground mt-1">Seleccionar una cotización completará automáticamente el origen, destino y fondo.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Conductor</Label>
                    <select 
                      className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
                      value={newJourneyData.driver}
                      onChange={e => setNewJourneyData({...newJourneyData, driver: e.target.value})}
                    >
                      <option value="">Seleccione un conductor...</option>
                      <option value="Carlos Gómez">Carlos Gómez</option>
                      <option value="Luis Martinez">Luis Martinez</option>
                      <option value="Andrés Felipe">Andrés Felipe</option>
                      <option value="Juan Pérez">Juan Pérez</option>
                      <option value="Roberto Sánchez">Roberto Sánchez</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Vehículo / Placa</Label>
                    <select 
                      className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
                      value={newJourneyData.truck}
                      onChange={e => setNewJourneyData({...newJourneyData, truck: e.target.value})}
                    >
                      <option value="">Seleccione un vehículo...</option>
                      <option value="Furgón NPR - XYZ-123">Furgón NPR - XYZ-123</option>
                      <option value="Camión Sencillo - ABC-987">Camión Sencillo - ABC-987</option>
                      <option value="Tractomula - DEF-456">Tractomula - DEF-456</option>
                      <option value="Furgón NHR - GHI-789">Furgón NHR - GHI-789</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Ciudad de Origen</Label>
                  <Input placeholder="Ej. Bogotá" className="rounded-xl" value={newJourneyData.origin} onChange={e => setNewJourneyData({...newJourneyData, origin: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Destino Final (Inicial)</Label>
                  <Input placeholder="Ej. Bucaramanga" className="rounded-xl" value={newJourneyData.destination} onChange={e => setNewJourneyData({...newJourneyData, destination: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Fondo Asignado ($)</Label>
                  <Input placeholder="Ej. 1500000" type="number" className="rounded-xl" value={newJourneyData.fund} onChange={e => setNewJourneyData({...newJourneyData, fund: e.target.value})} />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateJourney} className="w-full rounded-xl h-12 text-lg">Crear e Iniciar Ruta</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 pb-24 pt-8 md:pl-[140px] md:pr-8 md:py-8 bg-background max-w-[100vw] overflow-x-hidden">
      <Navigation />
      
      {/* Route Selector Area */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MapPin className="text-primary" />
            Rutas Activas ({activeJourneys.length})
          </h2>
          
          <Dialog open={isNewRouteOpen} onOpenChange={setIsNewRouteOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl gap-2 shadow-lg shadow-primary/20 bg-primary text-white">
                <Plus size={18} /> Crear Nueva Ruta
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-[2rem]">
              <DialogHeader>
                <DialogTitle className="text-2xl">Planificar Nueva Ruta</DialogTitle>
                <DialogDescription>
                  Asigna un vehículo y conductor para un viaje desde cero.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2 bg-primary/5 p-4 rounded-2xl border border-primary/20">
                  <Label className="text-primary font-bold flex items-center gap-2"><FileText size={16} /> Vincular Cotización Aceptada</Label>
                  <select 
                    className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
                    value={selectedQuoteId}
                    onChange={(e) => setSelectedQuoteId(e.target.value)}
                  >
                    <option value="">-- Ruta Manual (Sin vincular) --</option>
                    {acceptedQuotes.map(q => (
                      <option key={q.id} value={q.id}>
                        {q.id} - {q.clientName} ({q.origin} ➔ {q.destination})
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-muted-foreground mt-1">Seleccionar una cotización completará automáticamente el origen, destino y fondo.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Conductor</Label>
                    <select 
                      className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
                      value={newJourneyData.driver}
                      onChange={e => setNewJourneyData({...newJourneyData, driver: e.target.value})}
                    >
                      <option value="">Seleccione un conductor...</option>
                      <option value="Carlos Gómez">Carlos Gómez</option>
                      <option value="Luis Martinez">Luis Martinez</option>
                      <option value="Andrés Felipe">Andrés Felipe</option>
                      <option value="Juan Pérez">Juan Pérez</option>
                      <option value="Roberto Sánchez">Roberto Sánchez</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Vehículo / Placa</Label>
                    <select 
                      className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
                      value={newJourneyData.truck}
                      onChange={e => setNewJourneyData({...newJourneyData, truck: e.target.value})}
                    >
                      <option value="">Seleccione un vehículo...</option>
                      <option value="Furgón NPR - XYZ-123">Furgón NPR - XYZ-123</option>
                      <option value="Camión Sencillo - ABC-987">Camión Sencillo - ABC-987</option>
                      <option value="Tractomula - DEF-456">Tractomula - DEF-456</option>
                      <option value="Furgón NHR - GHI-789">Furgón NHR - GHI-789</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Ciudad de Origen</Label>
                  <Input placeholder="Ej. Bogotá" className="rounded-xl" value={newJourneyData.origin} onChange={e => setNewJourneyData({...newJourneyData, origin: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Destino Final (Inicial)</Label>
                  <Input placeholder="Ej. Bucaramanga" className="rounded-xl" value={newJourneyData.destination} onChange={e => setNewJourneyData({...newJourneyData, destination: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Fondo Asignado ($)</Label>
                  <Input placeholder="Ej. 1500000" type="number" className="rounded-xl" value={newJourneyData.fund} onChange={e => setNewJourneyData({...newJourneyData, fund: e.target.value})} />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateJourney} className="w-full rounded-xl h-12 text-lg">Crear e Iniciar Ruta</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
          {activeJourneys.map(journey => (
            <Card 
              key={journey.id}
              className={cn(
                "min-w-[280px] sm:min-w-[320px] cursor-pointer transition-all duration-300 border-2 snap-start shrink-0",
                selectedJourneyId === journey.id 
                  ? "border-primary shadow-lg shadow-primary/20 bg-primary/5" 
                  : "border-transparent hover:border-primary/50 bg-card"
              )}
              onClick={() => setSelectedJourneyId(journey.id)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg">{journey.id}</h3>
                  <span className={cn(
                    "text-xs font-bold px-2 py-1 rounded-full",
                    journey.status === 'En Ruta' ? "text-primary bg-primary/10" : "text-amber-600 bg-amber-500/10"
                  )}>
                    {journey.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p className="flex items-center gap-2"><Truck size={14} className="text-foreground" /> <span className="font-medium">{journey.truck}</span></p>
                  <p className="flex items-center gap-2"><span className="text-xs">👤</span> <span className="font-medium">{journey.driver}</span></p>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span>Progreso del viaje</span>
                    <span>{journey.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary" 
                      initial={{ width: 0 }}
                      animate={{ width: `${journey.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeJourney.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <header className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-8 border-b border-muted pb-8">
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Viaje Activo: <span className="text-primary">{activeJourney.id}</span></h1>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm md:text-base text-muted-foreground bg-muted/30 p-3 rounded-xl border border-muted/50 inline-flex">
                  <p>👤 Conductor: <span className="font-bold text-foreground">{activeJourney.driver}</span></p>
                  <span className="hidden sm:inline text-muted">|</span>
                  <p>🚛 Vehículo: <span className="font-bold text-foreground">{activeJourney.truck}</span></p>
                </div>
              </div>
              
              <Dialog open={isAddServiceOpen} onOpenChange={setIsAddServiceOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-xl gap-2 shadow-lg shadow-primary/20">
                    <Plus size={18} /> Agregar Servicio a Ruta
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto rounded-[2rem]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Autorizar Nuevo Servicio</DialogTitle>
                    <DialogDescription>
                      Asigna una nueva parada extra a <b>{activeJourney.driver}</b> en su recorrido actual.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-6 py-4">
                    {/* Info de Contexto */}
                    <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-xl border border-muted">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-bold">Guía Extra</p>
                        <p className="font-bold text-primary">{autoGuia || 'Generando...'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-bold">Origen Base</p>
                        <p className="font-medium">{activeJourney.origin}</p>
                      </div>
                    </div>

                    {/* Destino y Fechas */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-primary font-bold flex items-center gap-2"><Truck size={16}/> Destino de la Nueva Parada</Label>
                        <Input 
                          placeholder="Ej: Barranquilla, Atlántico" 
                          className="rounded-xl h-12"
                          value={newRouteData.destino}
                          onChange={(e) => setNewRouteData({...newRouteData, destino: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Remitente (Quién envía)</Label>
                          <Input 
                            placeholder="Nombre / Empresa" 
                            className="rounded-xl"
                            value={newRouteData.remitente}
                            onChange={(e) => setNewRouteData({...newRouteData, remitente: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Fecha/Hora de Envío</Label>
                          <Input 
                            type="datetime-local" 
                            className="rounded-xl"
                            value={newRouteData.fechaEnvio}
                            onChange={(e) => setNewRouteData({...newRouteData, fechaEnvio: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Destinatario (Quién recibe)</Label>
                          <Input 
                            placeholder="Nombre / Empresa" 
                            className="rounded-xl"
                            value={newRouteData.destinatario}
                            onChange={(e) => setNewRouteData({...newRouteData, destinatario: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Fecha/Hora Recepción Est.</Label>
                          <Input 
                            type="datetime-local" 
                            className="rounded-xl"
                            value={newRouteData.fechaRecepcion}
                            onChange={(e) => setNewRouteData({...newRouteData, fechaRecepcion: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Evidencia */}
                    <div className="space-y-2">
                      <Label className="font-bold flex items-center gap-2">Evidencias Fotográficas de Paquetería</Label>
                      <div 
                        onClick={handleSimulatePhotoUpload}
                        className="border-2 border-dashed border-primary/30 rounded-2xl p-6 text-center bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer"
                      >
                        {newRouteData.photosCount === 0 ? (
                          <>
                            <Camera className="mx-auto text-primary/50 mb-2" size={32} />
                            <p className="text-sm font-medium text-foreground">Haz clic para cargar fotos del estado actual</p>
                          </>
                        ) : (
                          <>
                            <ImageIcon className="mx-auto text-green-500 mb-2" size={32} />
                            <p className="text-sm font-bold text-green-600">{newRouteData.photosCount} fotos adjuntadas</p>
                          </>
                        )}
                      </div>
                    </div>

                  </div>
                  <DialogFooter className="sticky bottom-0 bg-background pt-2 pb-4">
                    <Button onClick={handleAddRoute} className="w-full rounded-xl h-12 gap-2 text-lg shadow-lg shadow-primary/20">
                      <Plus size={20} /> Autorizar y Agregar al Viaje
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="flex flex-wrap md:flex-nowrap gap-4 w-full lg:w-auto">
              <Card className="glass-card overflow-hidden flex-1 md:flex-auto">
                <CardContent className="flex items-center gap-4 py-3 px-6">
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <Wallet size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-muted-foreground">Fondo Restante</p>
                    <p className="text-lg font-bold">{activeJourney.fund}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card overflow-hidden flex-1 md:flex-auto">
                <CardContent className="flex items-center gap-4 py-3 px-6">
                  <div className="p-2 bg-destructive/10 rounded-full text-destructive">
                    <TrendingDown size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-muted-foreground">Gastos Hoy</p>
                    <p className="text-lg font-bold">{activeJourney.spent}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </header>

          <div className="grid grid-cols-12 gap-8">
            <section className="col-span-12 lg:col-span-9 space-y-8">
              <div className="relative glass-card rounded-[2rem] p-6 md:p-12 overflow-hidden bg-gradient-to-br from-white to-background">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Truck size={200} />
                </div>
                
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 relative z-10 gap-4">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    Recorrido en Vivo
                    <span className="inline-block w-2 h-2 bg-primary rounded-full animate-ping" />
                  </h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="rounded-xl gap-2">
                      <Share2 size={16} /> Compartir
                    </Button>
                    <Button size="sm" className="rounded-xl gap-2 shadow-lg shadow-primary/20">
                      <MessageSquare size={16} /> WhatsApp
                    </Button>
                  </div>
                </div>

                <div className="overflow-x-auto pb-4 pt-4">
                  <SnakeJourney nodes={nodes.filter(n => n.type !== 'expense')} onNodeClick={setActiveNode} />
                </div>
              </div>

              <div className="glass-card rounded-[2rem] p-6 md:p-8">
                <h3 className="text-xl font-bold mb-6">Bitácora de Eventos</h3>
                <div className="space-y-4">
                  {nodes.filter(n => n.status !== 'pending' && n.id !== 'return-node' && n.id !== 'closure-node').map((node) => (
                    <div key={node.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 hover:bg-muted/50 rounded-2xl transition-colors">
                      <div className="text-sm font-bold text-muted-foreground sm:w-20">{node.time}</div>
                      <div className={cn("hidden sm:block w-2 h-2 rounded-full", node.status === 'completed' ? (node.isExtra ? 'bg-amber-500' : 'bg-primary') : (node.isExtra ? 'bg-amber-500 animate-pulse' : 'bg-primary animate-pulse'))} />
                      <div className="flex-1">
                        <p className="font-bold flex items-center gap-2">
                          <span className={cn("sm:hidden w-2 h-2 rounded-full inline-block", node.status === 'completed' ? (node.isExtra ? 'bg-amber-500' : 'bg-primary') : (node.isExtra ? 'bg-amber-500 animate-pulse' : 'bg-primary animate-pulse'))} />
                          {node.label}
                          {node.isOriginalFinal && <span className="text-[10px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full ml-2">Destino Inicial</span>}
                          {node.isExtra && <span className="text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-full ml-2">Ruta Extra</span>}
                        </p>
                        <p className="text-xs text-muted-foreground">{node.details?.description || node.details?.address || 'Sin detalles'}</p>
                      </div>
                      <ChevronRight size={16} className="hidden sm:block text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <aside className="col-span-12 lg:col-span-3">
              <div className="space-y-6 sticky top-8">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass-card rounded-[2rem] p-6"
                >
                {activeNode ? (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-xl">Detalle del Nodo</h3>
                      <Button variant="ghost" size="sm" onClick={() => setActiveNode(null)}>Cerrar</Button>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-2xl space-y-4 relative overflow-hidden">
                      {activeNode.isExtra && <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">Extra</div>}
                      {activeNode.isOriginalFinal && <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-bl-xl">Final Inicial</div>}
                      
                      <div>
                        <p className="text-xs uppercase font-bold text-muted-foreground">Evento</p>
                        <p className="text-lg font-bold pr-16">{activeNode.label}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase font-bold text-muted-foreground">Estado</p>
                        <p className="font-medium capitalize">{activeNode.type === 'delivery' && activeNode.status === 'pending' ? 'Programado' : activeNode.status}</p>
                      </div>
                      
                      {activeNode.details?.sender && (
                        <div className="border-t border-muted-foreground/10 pt-2">
                          <p className="text-xs uppercase font-bold text-muted-foreground">Remitente</p>
                          <p className="font-medium">{activeNode.details.sender}</p>
                        </div>
                      )}
                      {activeNode.details?.receiver && (
                        <div>
                          <p className="text-xs uppercase font-bold text-muted-foreground">Destinatario</p>
                          <p className="font-medium">{activeNode.details.receiver}</p>
                        </div>
                      )}
                      {activeNode.details?.address && (
                        <div>
                          <p className="text-xs uppercase font-bold text-muted-foreground">Ubicación</p>
                          <p className="font-medium text-sm">{activeNode.details.address}</p>
                        </div>
                      )}
                      
                      {activeNode.details?.photosCount !== undefined && activeNode.details.photosCount > 0 && (
                        <div className="bg-primary/10 p-2 rounded-lg flex items-center gap-2 text-primary">
                          <ImageIcon size={16} />
                          <span className="text-sm font-bold">{activeNode.details.photosCount} Evidencias</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full rounded-xl" variant="outline" disabled={!activeNode.details?.photosCount}>
                        Ver Evidencia Fotográfica
                      </Button>
                      <Button className="w-full rounded-xl bg-primary shadow-lg shadow-primary/20">
                        Editar Información
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full text-muted-foreground">
                      <FileText size={32} />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Selecciona un Nodo</h3>
                    <p className="text-sm text-muted-foreground">Haz clic en cualquier punto de la línea para ver sus detalles específicos.</p>
                  </div>
                )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glass-card rounded-[2rem] p-6"
                >
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Wallet size={20} className="text-destructive" /> Gastos Reportados
                  </h3>
                  <div className="space-y-3">
                    {nodes.filter(n => n.type === 'expense').length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">No hay gastos registrados aún.</p>
                    ) : (
                      nodes.filter(n => n.type === 'expense').map(expense => (
                        <div key={expense.id} className="bg-destructive/5 p-3 rounded-xl border border-destructive/10">
                          <div className="flex justify-between items-start mb-1">
                            <p className="font-bold text-sm">{expense.label}</p>
                            <p className="text-sm font-bold text-destructive">${expense.details?.amount?.toLocaleString() || 0}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{expense.details?.description}</p>
                          <p className="text-[10px] text-muted-foreground font-medium">{expense.time}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full mt-4 rounded-xl gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20">
                        <Plus size={16} /> Registrar Gasto
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[400px] rounded-[2rem]">
                      <DialogHeader>
                        <DialogTitle className="text-xl">Registrar Nuevo Gasto</DialogTitle>
                        <DialogDescription>
                          Reporta un gasto operativo para la ruta actual.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label>Tipo de Gasto</Label>
                          <select 
                            className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
                            value={newExpenseData.label}
                            onChange={e => setNewExpenseData({...newExpenseData, label: e.target.value})}
                          >
                            <option value="">Seleccione un tipo...</option>
                            <option value="Peaje">Peaje</option>
                            <option value="Gasolina">Gasolina / Combustible</option>
                            <option value="Alimentación">Alimentación</option>
                            <option value="Hospedaje">Hospedaje</option>
                            <option value="Mantenimiento">Mantenimiento Rápido</option>
                            <option value="Otro">Otro</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Monto ($)</Label>
                          <Input type="number" placeholder="Ej. 15000" className="rounded-xl" value={newExpenseData.amount} onChange={e => setNewExpenseData({...newExpenseData, amount: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <Label>Descripción / Notas</Label>
                          <Input placeholder="Ej. Peaje Andes" className="rounded-xl" value={newExpenseData.description} onChange={e => setNewExpenseData({...newExpenseData, description: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-bold flex items-center gap-2">Evidencia (Recibo/Factura)</Label>
                          <div 
                            onClick={handleSimulateExpensePhotoUpload}
                            className="border-2 border-dashed border-destructive/30 rounded-2xl p-4 text-center bg-destructive/5 hover:bg-destructive/10 transition-colors cursor-pointer"
                          >
                            {newExpenseData.photosCount === 0 ? (
                              <>
                                <Camera className="mx-auto text-destructive/50 mb-2" size={24} />
                                <p className="text-xs font-medium text-foreground">Subir foto de comprobante</p>
                              </>
                            ) : (
                              <>
                                <ImageIcon className="mx-auto text-green-500 mb-2" size={24} />
                                <p className="text-xs font-bold text-green-600">Foto adjuntada</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleAddExpense} variant="destructive" className="w-full rounded-xl h-12">Guardar Gasto</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              </div>
            </aside>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
