"use client";

import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight, Loader2, MoreHorizontal, CheckCircle2, MapPin, Truck, Globe } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { getAllWebQuotes, updateQuoteStatus, WebQuote, QuoteStatus } from '@/lib/quotes';
import { useRouter } from 'next/navigation';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { createJourney } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { CreateManualQuoteDialog } from '@/components/dashboard/CreateManualQuoteDialog';

const DISPATCH_DRIVERS = [
  "Carlos Rodríguez",
  "Luis Pérez",
  "Carlos Gómez",
  "Luis Martinez",
  "Andrés Felipe",
  "Juan Pérez",
  "Roberto Sánchez"
];

const DISPATCH_TRUCKS = [
  { plate: "XYZ-123", label: "Furgón NPR - XYZ-123" },
  { plate: "ABC-987", label: "Camión Sencillo - ABC-987" },
  { plate: "DEF-456", label: "Tractomula - DEF-456" },
  { plate: "GHI-789", label: "Furgón NHR - GHI-789" },
  { plate: "ABC-456", label: "Camión Grande - ABC-456" },
  { plate: "DEF-789", label: "Planchón - DEF-789" },
  { plate: "GHI-012", label: "Furgoneta - GHI-012" }
];

const DISPATCH_HELPERS = [
  "Pedro Sánchez",
  "Juan Díaz",
  "Andrés Ruiz",
  "Jorge Silva"
];

export default function QuotesPage() {
  const router = useRouter();

  // --- Web Quotes State ---
  const [webQuotes, setWebQuotes] = useState<WebQuote[]>([]);
  const [loadingWeb, setLoadingWeb] = useState(true);

  // --- Detail and Dispatch Modal State ---
  const [selectedQuote, setSelectedQuote] = useState<WebQuote | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [activeTabModal, setActiveTabModal] = useState<'details' | 'dispatch'>('details');

  // Dispatch fields state
  const [driver, setDriver] = useState('');
  const [truck, setTruck] = useState('');
  const [selectedHelpers, setSelectedHelpers] = useState<string[]>([]);
  const [assignedFund, setAssignedFund] = useState('');

  useEffect(() => {
    fetchWebQuotes();
  }, []);

  const fetchWebQuotes = async () => {
    setLoadingWeb(true);
    try {
      const data = await getAllWebQuotes();
      setWebQuotes(data);
    } catch (e) {
      toast({ title: "Error", description: "No se pudieron cargar las cotizaciones web", variant: "destructive" });
    } finally {
      setLoadingWeb(false);
    }
  };

  const handleStatusChange = async (id: string, status: QuoteStatus) => {
    await updateQuoteStatus(id, status);
    fetchWebQuotes();
    toast({ title: "Estado Actualizado", description: `La cotización ${id} ahora está ${status}` });
  };

  const handleOpenDetails = (quote: WebQuote) => {
    setSelectedQuote(quote);
    setActiveTabModal('details');
    setDriver('');
    setTruck('');
    setSelectedHelpers([]);
    setAssignedFund(quote.estimatedValue ? quote.estimatedValue.toString() : '1500000');
    setIsDetailsOpen(true);
  };

  const handleStartRoute = async () => {
    if (!selectedQuote) return;
    if (!driver || !truck) {
      toast({ variant: "destructive", title: "Faltan asignaciones", description: "Por favor selecciona un conductor y un vehículo." });
      return;
    }

    const routeId = `GUIA-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // 1. Create the active route in routes.ts
    await createJourney({
      id: routeId,
      driver,
      truck,
      origin: selectedQuote.origin,
      destination: selectedQuote.destination,
      fund: `$${parseInt(assignedFund).toLocaleString('es-CO')}`,
      helpers: selectedHelpers,
      quoteId: selectedQuote.id
    });

    // 2. Set quote status to 'Aceptada'
    await updateQuoteStatus(selectedQuote.id, 'Aceptada', parseInt(assignedFund));
    
    // 3. Refresh quote list
    fetchWebQuotes();
    
    // 4. Close dialog
    setIsDetailsOpen(false);

    toast({
      title: "Ruta Iniciada y Despachada",
      description: `El viaje ${routeId} ha sido asignado a ${driver} y se encuentra en ruta.`
    });

    // 5. Redirect to /rutas-activas
    router.push('/rutas-activas');
  };



  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Recibida': return 'bg-primary/10 text-primary border-primary/20';
      case 'En Análisis': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Cotizada': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'Aceptada': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Rechazada': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen px-4 pb-24 pt-8 md:pl-[140px] md:pr-8 md:py-8 bg-background max-w-[100vw] overflow-x-hidden">
      <Navigation />
      
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Gestión de Cotizaciones 📑</h1>
        <p className="text-muted-foreground text-sm md:text-base">Administra y despacha las cotizaciones solicitadas por los clientes.</p>
      </header>

      <Card className="glass-card rounded-[2rem] border-none overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-white/5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2"><Globe className="text-primary" /> Leads y Cotizaciones</CardTitle>
                  <CardDescription>Cotizaciones web y leads manuales registrados.</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <Button onClick={fetchWebQuotes} variant="outline" className="rounded-xl">Actualizar</Button>
                  <CreateManualQuoteDialog onQuoteCreated={fetchWebQuotes} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {loadingWeb ? (
                <div className="py-12 flex justify-center"><Loader2 className="animate-spin text-primary" size={32} /></div>
              ) : webQuotes.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  No hay cotizaciones web registradas.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>ID</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Ruta</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {webQuotes.map((quote) => (
                      <TableRow key={quote.id}>
                        <TableCell className="font-bold">{quote.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{quote.clientName}</p>
                            <p className="text-xs text-muted-foreground">{quote.clientPhone}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm truncate max-w-[200px]">{quote.origin} → {quote.destination}</p>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(quote.status)}>
                            {quote.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {new Date(quote.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          {quote.status === 'Recibida' && (
                            <Button size="sm" variant="outline" className="rounded-lg h-8" onClick={() => handleStatusChange(quote.id, 'En Análisis')}>
                              Analizar
                            </Button>
                          )}
                          {quote.status === 'En Análisis' && (
                            <Button size="sm" className="rounded-lg h-8" onClick={() => handleStatusChange(quote.id, 'Cotizada')}>
                              Cotizar
                            </Button>
                          )}
                          <Button size="sm" variant="default" className="rounded-lg h-8 gap-1 bg-primary text-white shadow-lg shadow-primary/20" onClick={() => router.push(`/quotes/${quote.id}`)}>
                            Gestionar Portal
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg" onClick={() => handleOpenDetails(quote)}>
                            <MoreHorizontal size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

      {/* --- Detail & Dispatch Dialog --- */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] p-6">
          {selectedQuote && (
            <>
              <DialogHeader className="border-b pb-4">
                <div className="flex justify-between items-start gap-4 pr-6">
                  <div>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                      Cotización {selectedQuote.id}
                    </DialogTitle>
                    <DialogDescription>
                      Solicitada el {new Date(selectedQuote.createdAt).toLocaleDateString()} a las {new Date(selectedQuote.createdAt).toLocaleTimeString()}
                    </DialogDescription>
                  </div>
                  <Badge variant="outline" className={getStatusColor(selectedQuote.status)}>
                    {selectedQuote.status}
                  </Badge>
                </div>
              </DialogHeader>

              {/* Inner Tabs for the Modal */}
              <div className="flex gap-2 my-4 bg-muted/50 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTabModal('details')}
                  className={cn(
                    "flex-1 py-2 text-sm font-medium rounded-lg transition-all",
                    activeTabModal === 'details' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Detalles y Fotos
                </button>
                <button
                  onClick={() => setActiveTabModal('dispatch')}
                  className={cn(
                    "flex-1 py-2 text-sm font-medium rounded-lg transition-all",
                    activeTabModal === 'dispatch' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Despachar / Iniciar Ruta
                </button>
              </div>

              {/* TAB 1: DETAILS AND PHOTOS */}
              {activeTabModal === 'details' && (
                <div className="space-y-6 py-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs uppercase font-bold text-muted-foreground">Cliente</p>
                      <p className="font-semibold text-foreground text-sm">{selectedQuote.clientName}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        📞 {selectedQuote.clientPhone}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs uppercase font-bold text-muted-foreground">Fecha Estimada Mudanza</p>
                      <p className="font-semibold text-foreground text-sm">{selectedQuote.estimatedDate || 'Por definir'}</p>
                    </div>
                  </div>

                  <div className="bg-muted/40 p-4 rounded-2xl border border-muted space-y-2">
                    <p className="text-xs uppercase font-bold text-muted-foreground">Ruta Solicitada</p>
                    <div className="flex items-center gap-2 text-foreground font-semibold">
                      <MapPin size={16} className="text-primary" />
                      <span>{selectedQuote.origin}</span>
                      <ArrowRight size={14} className="text-muted-foreground" />
                      <MapPin size={16} className="text-secondary" />
                      <span>{selectedQuote.destination}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs uppercase font-bold text-muted-foreground font-semibold">Descripción del Inventario</p>
                    <p className="text-sm bg-muted/20 p-4 rounded-2xl border text-foreground italic whitespace-pre-wrap">
                      "{selectedQuote.description}"
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs uppercase font-bold text-muted-foreground font-semibold">Fotos de la Carga</p>
                    {/* If no photos, render mock ones to look beautiful and professional */}
                    <div className="grid grid-cols-3 gap-3">
                      {(selectedQuote.photos && selectedQuote.photos.length > 0 ? selectedQuote.photos : [
                        "https://picsum.photos/seed/mivra_sofa/400/300",
                        "https://picsum.photos/seed/mivra_boxes/400/300",
                        "https://picsum.photos/seed/mivra_dining/400/300"
                      ]).map((photoUrl, i) => (
                        <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden border bg-muted shadow-sm hover:shadow-md transition-shadow">
                          <img
                            src={photoUrl}
                            alt={`Carga ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t pt-4">
                    <div className="space-y-2">
                      <Label>Valor Estimado ($)</Label>
                      <Input
                        type="number"
                        placeholder="Ej. 2500000"
                        className="rounded-xl"
                        value={selectedQuote.estimatedValue || ''}
                        onChange={async (e) => {
                          const val = e.target.value ? parseInt(e.target.value) : undefined;
                          setSelectedQuote({ ...selectedQuote, estimatedValue: val });
                          await updateQuoteStatus(selectedQuote.id, selectedQuote.status, val);
                          fetchWebQuotes();
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Estado actual</Label>
                      <select
                        className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={selectedQuote.status}
                        onChange={async (e) => {
                          const newStatus = e.target.value as QuoteStatus;
                          setSelectedQuote({ ...selectedQuote, status: newStatus });
                          await updateQuoteStatus(selectedQuote.id, newStatus, selectedQuote.estimatedValue);
                          fetchWebQuotes();
                          toast({ title: "Estado Actualizado", description: `La cotización ahora está en ${newStatus}` });
                        }}
                      >
                        <option value="Recibida">Recibida</option>
                        <option value="En Análisis">En Análisis</option>
                        <option value="Cotizada">Cotizada</option>
                        <option value="Aceptada">Aceptada</option>
                        <option value="Rechazada">Rechazada</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end border-t pt-4">
                    <Button variant="outline" className="rounded-xl" onClick={() => setIsDetailsOpen(false)}>
                      Cerrar
                    </Button>
                    <Button
                      className="rounded-xl gap-2 shadow-lg shadow-primary/20 bg-primary text-white"
                      onClick={() => setActiveTabModal('dispatch')}
                    >
                      Continuar a Despacho <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              )}

              {/* TAB 2: DISPATCH / START ROUTE */}
              {activeTabModal === 'dispatch' && (
                <div className="space-y-6 py-2">
                  <div className="bg-primary/5 p-4 rounded-2xl border border-primary/20 space-y-1">
                    <h4 className="font-bold text-primary flex items-center gap-2"><Truck size={18} /> Resumen de Despacho</h4>
                    <p className="text-xs text-muted-foreground">Se creará un viaje activo desde <b>{selectedQuote.origin}</b> hasta <b>{selectedQuote.destination}</b>.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-semibold text-sm">Conductor Asignado</Label>
                      <select
                        className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer"
                        value={driver}
                        onChange={(e) => setDriver(e.target.value)}
                      >
                        <option value="">Seleccione conductor...</option>
                        {DISPATCH_DRIVERS.map((d, idx) => (
                          <option key={idx} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label className="font-semibold text-sm">Vehículo / Placa</Label>
                      <select
                        className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer"
                        value={truck}
                        onChange={(e) => setTruck(e.target.value)}
                      >
                        <option value="">Seleccione vehículo...</option>
                        {DISPATCH_TRUCKS.map((t, idx) => (
                          <option key={idx} value={t.label}>{t.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="font-semibold text-sm">Ayudantes / Auxiliares Asignados</Label>
                    <div className="grid grid-cols-2 gap-3 bg-muted/30 p-4 rounded-2xl border">
                      {DISPATCH_HELPERS.map((h, idx) => {
                        const isChecked = selectedHelpers.includes(h);
                        return (
                          <label key={idx} className="flex items-center gap-3 cursor-pointer p-1 hover:bg-muted/40 rounded-lg">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {
                                if (isChecked) {
                                  setSelectedHelpers(selectedHelpers.filter(item => item !== h));
                                } else {
                                  setSelectedHelpers([...selectedHelpers, h]);
                                }
                              }}
                              className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4"
                            />
                            <span className="text-sm font-medium text-foreground">{h}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-semibold text-sm">Fondo de Viaje Asignado ($)</Label>
                    <Input
                      type="number"
                      placeholder="Ej. 1500000"
                      className="rounded-xl h-11"
                      value={assignedFund}
                      onChange={(e) => setAssignedFund(e.target.value)}
                    />
                    <p className="text-[11px] text-muted-foreground">Fondo en efectivo para viáticos, peajes y combustible.</p>
                  </div>

                  <div className="flex gap-3 justify-end border-t pt-4">
                    <Button variant="outline" className="rounded-xl" onClick={() => setActiveTabModal('details')}>
                      Atrás
                    </Button>
                    <Button
                      className="rounded-xl gap-2 shadow-lg shadow-primary/20 bg-primary text-white h-11 px-6"
                      onClick={handleStartRoute}
                      disabled={!driver || !truck}
                    >
                      <CheckCircle2 size={18} /> Iniciar Viaje y Despachar
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}