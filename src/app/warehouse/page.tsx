"use client";

import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Box, 
  Search, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  History,
  Package,
  Layers,
  Scale,
  Printer,
  QrCode,
  User,
  Phone,
  Mail,
  FileText,
  MapPin,
  Calendar,
  DollarSign,
  ShieldCheck,
  ClipboardList,
  Trash2
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface InventoryItemDetail {
  name: string;
  qty: number;
  state: string;
}

interface InventoryItem {
  id: string;
  guideNumber: string;
  client: string;
  clientPhone: string;
  clientEmail: string;
  clientDoc: string;
  items: string;
  space: string;
  entry: string;
  exitEstimated: string;
  status: string;
  location: string;
  supervisor: string;
  monthlyRate: string;
  insuranceValue: string;
  inventoryDetails: InventoryItemDetail[];
}

const MOCK_INVENTORY: InventoryItem[] = [
  { 
    id: '1', 
    guideNumber: 'GB-849-2024',
    client: 'Beatriz Gómez', 
    clientPhone: '+57 312 456 7890',
    clientEmail: 'beatriz.gomez@email.com',
    clientDoc: 'CC 52.849.201',
    items: 'Menaje hogar completo', 
    space: '12m³', 
    entry: '2024-02-15', 
    exitEstimated: '2024-08-15',
    status: 'Almacenado',
    location: 'Estante B-12 (Nivel 2)',
    supervisor: 'Carlos Mendoza',
    monthlyRate: '$220,000 COP',
    insuranceValue: '$10,000,000 COP',
    inventoryDetails: [
      { name: 'Nevera Samsung Digital Inverter', qty: 1, state: 'Excelente, embalada' },
      { name: 'Lavadora Whirlpool 18kg', qty: 1, state: 'Buen estado, embalada' },
      { name: 'Sofá de 3 puestos gris', qty: 1, state: 'Excelente, con plástico burbuja' },
      { name: 'Cajas de cartón medianas (vajilla y ropa)', qty: 8, state: 'Cerradas y rotuladas' },
      { name: 'Mesa de comedor de vidrio + 6 sillas', qty: 1, state: 'Desarmada, vidrio protegido' }
    ]
  },
  { 
    id: '2', 
    guideNumber: 'GB-102-2024',
    client: 'Inversiones XYZ', 
    clientPhone: '+57 300 987 6543',
    clientEmail: 'contacto@inversionesxyz.com',
    clientDoc: 'NIT 901.482.109-2',
    items: '15 Escritorios, 20 Sillas', 
    space: '8m³', 
    entry: '2024-03-01', 
    exitEstimated: '2024-06-01',
    status: 'En Salida',
    location: 'Sección D-04 (Muebles)',
    supervisor: 'Diana Marcela',
    monthlyRate: '$160,000 COP',
    insuranceValue: '$6,000,000 COP',
    inventoryDetails: [
      { name: 'Escritorios de madera y metal', qty: 15, state: 'Buen estado, semi-armados' },
      { name: 'Sillas ergonómicas de oficina', qty: 20, state: 'Usado con detalles de desgaste' },
      { name: 'Cajoneras rodantes de 3 cajones', qty: 5, state: 'Buen estado' }
    ]
  },
  { 
    id: '3', 
    guideNumber: 'GB-334-2024',
    client: 'Roberto Cano', 
    clientPhone: '+57 315 234 5678',
    clientEmail: 'roberto.cano@hotmail.com',
    clientDoc: 'CC 79.940.381',
    items: 'Nevera, Lavadora, Sofá', 
    space: '5m³', 
    entry: '2024-01-20', 
    exitEstimated: '2024-07-20',
    status: 'Almacenado',
    location: 'Estante A-05 (Nivel 1)',
    supervisor: 'Carlos Mendoza',
    monthlyRate: '$110,000 COP',
    insuranceValue: '$4,500,000 COP',
    inventoryDetails: [
      { name: 'Nevera LG No Frost', qty: 1, state: 'Buen estado, limpia' },
      { name: 'Lavadora LG Carga Frontal', qty: 1, state: 'Buen estado, mangueras amarradas' },
      { name: 'Sofá cama microfibra café', qty: 1, state: 'Regular estado, cubierto' }
    ]
  },
  { 
    id: '4', 
    guideNumber: 'GB-950-2024',
    client: 'Logística Pro', 
    clientPhone: '+57 310 555 0199',
    clientEmail: 'archivo@logisticapro.co',
    clientDoc: 'NIT 800.223.491-5',
    items: '50 Cajas archivo muerto', 
    space: '10m³', 
    entry: '2024-03-10', 
    exitEstimated: '2025-03-10',
    status: 'Recién Ingresado',
    location: 'Módulo C-22 (Archivo)',
    supervisor: 'Diana Marcela',
    monthlyRate: '$180,000 COP',
    insuranceValue: '$2,000,000 COP',
    inventoryDetails: [
      { name: 'Cajas de cartón reforzado (Archivo muerto)', qty: 50, state: 'Nuevas, selladas con cinta de seguridad' }
    ]
  },
];


export default function WarehousePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [inventoryList, setInventoryList] = useState<InventoryItem[]>(MOCK_INVENTORY);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEntryDialogOpen, setIsEntryDialogOpen] = useState(false);

  // New entry form states
  const [newEntry, setNewEntry] = useState({
    client: '',
    clientDoc: '',
    clientPhone: '',
    clientEmail: '',
    location: 'Estante A-01 (Nivel 1)',
    supervisor: 'Carlos Mendoza',
    space: '5',
    monthlyRate: '150000',
    insuranceValue: '3000000',
    entry: new Date().toISOString().split('T')[0],
    exitEstimated: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 6).toISOString().split('T')[0],
  });

  const [newEntryDetails, setNewEntryDetails] = useState<InventoryItemDetail[]>([
    { name: '', qty: 1, state: 'Excelente, embalado' }
  ]);

  const handleAddDetail = () => {
    setNewEntryDetails([...newEntryDetails, { name: '', qty: 1, state: 'Excelente, embalado' }]);
  };

  const handleRemoveDetail = (index: number) => {
    if (newEntryDetails.length > 1) {
      setNewEntryDetails(newEntryDetails.filter((_, i) => i !== index));
    }
  };

  const handleUpdateDetail = (index: number, key: keyof InventoryItemDetail, value: any) => {
    const updated = [...newEntryDetails];
    updated[index] = { ...updated[index], [key]: value };
    setNewEntryDetails(updated);
  };

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newEntry.client || !newEntry.clientDoc || !newEntry.clientPhone || !newEntry.clientEmail) {
      alert('Por favor complete todos los datos del depositante.');
      return;
    }

    const validDetails = newEntryDetails.filter(d => d.name.trim() !== '');
    if (validDetails.length === 0) {
      alert('Debe agregar al menos un artículo al inventario con descripción.');
      return;
    }

    const formattedSpace = `${newEntry.space}m³`;
    const formattedMonthlyRate = `$${Number(newEntry.monthlyRate).toLocaleString('es-CO')} COP`;
    const formattedInsuranceValue = `$${Number(newEntry.insuranceValue).toLocaleString('es-CO')} COP`;
    const randomGuideNum = `GB-${Math.floor(100 + Math.random() * 900)}-${new Date().getFullYear()}`;
    
    const summaryItems = validDetails.map(d => `${d.qty}x ${d.name}`).join(', ');
    const shortSummary = summaryItems.length > 35 ? summaryItems.slice(0, 35) + '...' : summaryItems;

    const newItem: InventoryItem = {
      id: String(inventoryList.length + 1),
      guideNumber: randomGuideNum,
      client: newEntry.client,
      clientDoc: newEntry.clientDoc,
      clientPhone: newEntry.clientPhone,
      clientEmail: newEntry.clientEmail,
      items: shortSummary,
      space: formattedSpace,
      entry: newEntry.entry,
      exitEstimated: newEntry.exitEstimated,
      status: 'Recién Ingresado',
      location: newEntry.location,
      supervisor: newEntry.supervisor,
      monthlyRate: formattedMonthlyRate,
      insuranceValue: formattedInsuranceValue,
      inventoryDetails: validDetails
    };

    setInventoryList([newItem, ...inventoryList]);
    
    // Reset state
    setNewEntry({
      client: '',
      clientDoc: '',
      clientPhone: '',
      clientEmail: '',
      location: 'Estante A-01 (Nivel 1)',
      supervisor: 'Carlos Mendoza',
      space: '5',
      monthlyRate: '150000',
      insuranceValue: '3000000',
      entry: new Date().toISOString().split('T')[0],
      exitEstimated: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 6).toISOString().split('T')[0],
    });
    setNewEntryDetails([{ name: '', qty: 1, state: 'Excelente, embalado' }]);
    
    setIsEntryDialogOpen(false);
  };

  const filteredInventory = inventoryList.filter(item => 
    item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.items.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pl-32 pr-8 py-8 bg-background text-foreground">
      <Navigation />
      
      <header className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Bodegaje 📦</h1>
          <p className="text-muted-foreground">Gestión inteligente de inventario y espacio de almacenamiento.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Buscar por cliente o ítem..." 
              className="pl-10 rounded-xl w-64 glass-card border-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            className="rounded-xl gap-2 shadow-lg shadow-primary/20"
            onClick={() => setIsEntryDialogOpen(true)}
          >
            <Plus size={18} /> Nuevo Ingreso
          </Button>
        </div>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="glass-card border-none overflow-hidden relative">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                <Layers size={24} />
              </div>
              <Badge variant="outline" className="text-xs">Capacidad</Badge>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Espacio Ocupado</h3>
            <p className="text-3xl font-bold mb-4">74%</p>
            <Progress value={74} className="h-2" />
            <p className="text-[10px] text-muted-foreground mt-4">256m³ de 345m³ totales disponibles</p>
          </CardContent>
          <div className="absolute -bottom-4 -right-4 opacity-5 text-primary">
            <Box size={100} />
          </div>
        </Card>

        <Card className="glass-card border-none">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-secondary/20 rounded-2xl text-primary">
                <ArrowUpRight size={24} />
              </div>
              <Badge variant="secondary" className="text-xs">Este mes</Badge>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Nuevos Ingresos</h3>
            <p className="text-3xl font-bold">12</p>
            <p className="text-[10px] text-primary font-bold mt-4">+15% vs mes anterior</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-none">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-destructive/10 rounded-2xl text-destructive">
                <ArrowDownLeft size={24} />
              </div>
              <Badge variant="destructive" className="text-[10px] bg-destructive/10 text-destructive border-none">Alerta</Badge>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Salidas Programadas</h3>
            <p className="text-3xl font-bold">4</p>
            <p className="text-[10px] text-muted-foreground mt-4">Próximas 48 horas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Inventory Table */}
        <div className="col-span-12 lg:col-span-9">
          <Card className="glass-card border-none rounded-[2rem] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-muted/20 pb-6">
              <div>
                <CardTitle className="text-xl">Inventario Activo</CardTitle>
                <CardDescription>Listado detallado de mercancía en custodia.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-2 rounded-xl">
                <History size={16} /> Ver Historial
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-muted/20">
                    <TableHead className="pl-6 font-bold">Cliente</TableHead>
                    <TableHead className="font-bold">Contenido</TableHead>
                    <TableHead className="font-bold">Espacio</TableHead>
                    <TableHead className="font-bold">Fecha Entrada</TableHead>
                    <TableHead className="font-bold">Estado</TableHead>
                    <TableHead className="text-right pr-6 font-bold">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow key={item.id} className="hover:bg-muted/30 transition-colors border-muted/20">
                      <TableCell className="pl-6 font-medium">{item.client}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{item.items}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Scale size={14} className="text-primary" />
                          {item.space}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{item.entry}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={item.status === 'Almacenado' ? 'secondary' : item.status === 'En Salida' ? 'destructive' : 'default'}
                          className="rounded-full px-3 text-[10px]"
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="rounded-xl h-8 text-primary hover:text-primary hover:bg-primary/10 transition-colors"
                          onClick={() => {
                            setSelectedItem(item);
                            setIsDialogOpen(true);
                          }}
                        >
                          Ver Guía
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions / Tips */}
        <aside className="col-span-12 lg:col-span-3 space-y-6">
          <Card className="glass-card border-none rounded-[2rem] p-6 bg-primary text-white shadow-2xl shadow-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <Package size={24} />
              <h4 className="font-bold">Tip de Espacio</h4>
            </div>
            <p className="text-xs leading-relaxed opacity-90">
              Recuerda que los ítems pesados deben ir en la base de los racks. Hemos detectado que optimizando el nivel 3 podrías ganar un 5% de capacidad.
            </p>
            <Button variant="secondary" className="w-full mt-6 rounded-xl font-bold text-xs h-10">
              Ver Mapa de Bodega
            </Button>
          </Card>

          <Card className="glass-card border-none rounded-[2rem] p-6">
            <h4 className="font-bold text-sm mb-4">Mantenimiento</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Fumigación</span>
                <span className="font-bold">25 Abr</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Extintores</span>
                <span className="font-bold text-green-500">Vigente</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Seguro Bodega</span>
                <span className="font-bold">Oct 2024</span>
              </div>
            </div>
          </Card>
        </aside>
      </div>

      {/* Guide Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] glass-card border-none p-8 text-foreground no-print print-content">
          {selectedItem && (
            <>
              {/* Dynamic print style tag scoped within the dialog */}
              <style dangerouslySetInnerHTML={{__html: `
                @media print {
                  body * {
                    visibility: hidden !important;
                  }
                  .print-content, .print-content * {
                    visibility: visible !important;
                  }
                  .print-content {
                    position: absolute !important;
                    left: 0 !important;
                    top: 0 !important;
                    width: 100% !important;
                    max-height: none !important;
                    overflow: visible !important;
                    background: white !important;
                    color: black !important;
                    box-shadow: none !important;
                    border: none !important;
                    padding: 20px !important;
                  }
                  .no-print-btn {
                    display: none !important;
                  }
                }
              `}} />

              <DialogHeader className="border-b border-muted/20 pb-6 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary/30">
                      T
                    </div>
                    <div>
                      <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        Guía de Bodegaje <span className="font-mono text-lg text-muted-foreground">#{selectedItem.guideNumber}</span>
                      </DialogTitle>
                      <DialogDescription className="text-xs">
                        Transmudanzas JH - Control de custodia de mercancías y almacenamiento
                      </DialogDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 self-end md:self-center">
                    <Badge 
                      variant={selectedItem.status === 'Almacenado' ? 'secondary' : selectedItem.status === 'En Salida' ? 'destructive' : 'default'}
                      className="rounded-full px-4 py-1 text-xs font-bold tracking-wide uppercase"
                    >
                      {selectedItem.status}
                    </Badge>
                  </div>
                </div>
              </DialogHeader>

              {/* Grid with Client and Location Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Client Card */}
                <div className="p-5 rounded-2xl bg-muted/40 border border-muted/20 space-y-3">
                  <h3 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <User size={14} /> Datos del Depositante
                  </h3>
                  <div className="space-y-1">
                    <p className="text-base font-bold">{selectedItem.client}</p>
                    <p className="text-xs text-muted-foreground">{selectedItem.clientDoc}</p>
                  </div>
                  <div className="pt-2 border-t border-muted/20 space-y-1.5 text-xs text-muted-foreground">
                    <p className="flex items-center gap-2"><Phone size={12} className="text-primary" /> {selectedItem.clientPhone}</p>
                    <p className="flex items-center gap-2"><Mail size={12} className="text-primary" /> {selectedItem.clientEmail}</p>
                  </div>
                </div>

                {/* Storage Card */}
                <div className="p-5 rounded-2xl bg-muted/40 border border-muted/20 space-y-3">
                  <h3 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin size={14} /> Ubicación y Custodia
                  </h3>
                  <div className="space-y-1">
                    <p className="text-base font-bold">{selectedItem.location}</p>
                    <p className="text-xs text-muted-foreground">Supervisor: {selectedItem.supervisor}</p>
                  </div>
                  <div className="pt-2 border-t border-muted/20 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-muted-foreground/60">Entrada</span>
                      <span className="flex items-center gap-1 mt-0.5"><Calendar size={12} /> {selectedItem.entry}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-muted-foreground/60">Salida Estimada</span>
                      <span className="flex items-center gap-1 mt-0.5"><Calendar size={12} /> {selectedItem.exitEstimated}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inventory Details Table */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5 mb-3">
                  <ClipboardList size={14} /> Inventario Detallado de Custodia
                </h3>
                <div className="rounded-2xl border border-muted/20 overflow-hidden bg-muted/20">
                  <Table>
                    <TableHeader className="bg-muted/40">
                      <TableRow className="hover:bg-transparent border-muted/20">
                        <TableHead className="font-bold text-xs pl-4">Descripción del Objeto / Ítem</TableHead>
                        <TableHead className="font-bold text-xs text-center w-24">Cant.</TableHead>
                        <TableHead className="font-bold text-xs pr-4">Estado / Observación en Recepción</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedItem.inventoryDetails.map((detail, idx) => (
                        <TableRow key={idx} className="hover:bg-muted/10 border-muted/20">
                          <TableCell className="text-sm font-medium pl-4">{detail.name}</TableCell>
                          <TableCell className="text-sm text-center font-bold w-24">{detail.qty}</TableCell>
                          <TableCell className="text-sm text-muted-foreground pr-4">{detail.state}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Bottom Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6 pt-4 border-t border-muted/20">
                {/* Security Measures */}
                <div className="md:col-span-7 space-y-3">
                  <h3 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck size={14} /> Protocolo y Medidas de Seguridad
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 bg-muted/20 p-2 rounded-xl border border-muted/10">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span>Monitoreo CCTV 24/7</span>
                    </div>
                    <div className="flex items-center gap-2 bg-muted/20 p-2 rounded-xl border border-muted/10">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span>Control de Humedad</span>
                    </div>
                    <div className="flex items-center gap-2 bg-muted/20 p-2 rounded-xl border border-muted/10">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span>Prevención Incendios</span>
                    </div>
                    <div className="flex items-center gap-2 bg-muted/20 p-2 rounded-xl border border-muted/10">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span>Póliza de Seguro Activa</span>
                    </div>
                  </div>
                </div>

                {/* Financial Summary & QR */}
                <div className="md:col-span-5 flex gap-4 bg-muted/40 p-4 rounded-2xl border border-muted/20">
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                      <DollarSign size={14} /> Resumen Financiero
                    </h3>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Espacio:</span>
                        <span className="font-bold">{selectedItem.space}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Valor Asegurado:</span>
                        <span className="font-bold">{selectedItem.insuranceValue}</span>
                      </div>
                      <div className="flex justify-between pt-1.5 border-t border-muted/20">
                        <span className="font-bold text-primary">Tarifa Mensual:</span>
                        <span className="font-bold text-primary">{selectedItem.monthlyRate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-white p-2 rounded-xl border border-muted/20 dark:bg-zinc-800">
                    <QrCode size={64} className="text-foreground animate-pulse" />
                    <span className="text-[8px] font-mono mt-1 text-muted-foreground">TRACK-ID</span>
                  </div>
                </div>
              </div>

              {/* Terms and Signatures */}
              <div className="border-t border-muted/20 pt-6 mt-6">
                <p className="text-[9px] text-muted-foreground leading-relaxed mb-6">
                  * CLAÚSULAS DE CUSTODIA: Transmudanzas JH certifica la recepción de los bienes detallados en este documento bajo condiciones normales de depósito. El depositante declara que las mercancías no son de carácter inflamable, ilícito o de prohibida circulación. Cualquier reclamación deberá realizarse en el momento de la entrega final de la mercancía.
                </p>
                <div className="grid grid-cols-2 gap-8 text-center pt-4">
                  <div className="space-y-1">
                    <div className="h-10 flex items-end justify-center">
                      <span className="font-mono text-xs italic text-primary/80">Transmudanzas JH Logistics</span>
                    </div>
                    <div className="border-t border-muted/40 w-48 mx-auto" />
                    <span className="block text-[10px] text-muted-foreground uppercase font-bold">Firma Autorizada Bodega</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-10 flex items-end justify-center">
                      <span className="font-mono text-xs italic text-muted-foreground">Firma Digital Registrada</span>
                    </div>
                    <div className="border-t border-muted/40 w-48 mx-auto" />
                    <span className="block text-[10px] text-muted-foreground uppercase font-bold">Firma Depositante (Cliente)</span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <DialogFooter className="mt-8 pt-4 border-t border-muted/20 flex gap-3 sm:justify-end no-print-btn">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)} 
                  className="rounded-xl"
                >
                  Cerrar
                </Button>
                <Button 
                  onClick={() => window.print()} 
                  className="rounded-xl gap-2 shadow-lg shadow-primary/20"
                >
                  <Printer size={16} /> Imprimir Guía
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* New Entry Form Dialog */}
      <Dialog open={isEntryDialogOpen} onOpenChange={setIsEntryDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2rem] border-none bg-background/95 backdrop-blur-xl shadow-2xl p-8">
          <DialogHeader className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Box size={20} className="animate-pulse" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold">Nuevo Registro de Bodegaje</DialogTitle>
                <DialogDescription>Ingrese la información del cliente, las tarifas y el inventario detallado de custodia.</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSaveEntry} className="space-y-6">
            {/* Grid 1: Client Info & Storage Config */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Client Card */}
              <div className="space-y-4 bg-muted/20 p-5 rounded-2xl border border-muted/20">
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <User size={14} /> Datos del Depositante
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-muted-foreground/80 mb-1">Nombre Completo / Empresa *</label>
                    <Input 
                      required
                      placeholder="Ej: Beatriz Gómez o Logística Pro"
                      value={newEntry.client}
                      onChange={(e) => setNewEntry({...newEntry, client: e.target.value})}
                      className="rounded-xl border-muted/30 focus:border-primary bg-background/50"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-muted-foreground/80 mb-1">Documento de Identidad (CC/NIT) *</label>
                    <Input 
                      required
                      placeholder="Ej: 52.849.201 o 900.123.456-7"
                      value={newEntry.clientDoc}
                      onChange={(e) => setNewEntry({...newEntry, clientDoc: e.target.value})}
                      className="rounded-xl border-muted/30 focus:border-primary bg-background/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-muted-foreground/80 mb-1">Teléfono *</label>
                      <Input 
                        required
                        type="tel"
                        placeholder="Ej: +57 312 456 7890"
                        value={newEntry.clientPhone}
                        onChange={(e) => setNewEntry({...newEntry, clientPhone: e.target.value})}
                        className="rounded-xl border-muted/30 focus:border-primary bg-background/50"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-muted-foreground/80 mb-1">Correo Electrónico *</label>
                      <Input 
                        required
                        type="email"
                        placeholder="Ej: cliente@correo.com"
                        value={newEntry.clientEmail}
                        onChange={(e) => setNewEntry({...newEntry, clientEmail: e.target.value})}
                        className="rounded-xl border-muted/30 focus:border-primary bg-background/50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Custody Info Card */}
              <div className="space-y-4 bg-muted/20 p-5 rounded-2xl border border-muted/20">
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <MapPin size={14} /> Detalles de Custodia y Tarifas
                </h3>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-muted-foreground/80 mb-1">Ubicación / Rack</label>
                      <Input 
                        placeholder="Ej: Estante B-12 (Nivel 2)"
                        value={newEntry.location}
                        onChange={(e) => setNewEntry({...newEntry, location: e.target.value})}
                        className="rounded-xl border-muted/30 focus:border-primary bg-background/50"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-muted-foreground/80 mb-1">Supervisor Bodega</label>
                      <Input 
                        placeholder="Ej: Carlos Mendoza"
                        value={newEntry.supervisor}
                        onChange={(e) => setNewEntry({...newEntry, supervisor: e.target.value})}
                        className="rounded-xl border-muted/30 focus:border-primary bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-muted-foreground/80 mb-1">Volumen (m³)</label>
                      <Input 
                        type="number"
                        min="1"
                        placeholder="12"
                        value={newEntry.space}
                        onChange={(e) => setNewEntry({...newEntry, space: e.target.value})}
                        className="rounded-xl border-muted/30 focus:border-primary bg-background/50"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-muted-foreground/80 mb-1">Tarifa Mensual ($)</label>
                      <Input 
                        type="number"
                        placeholder="220000"
                        value={newEntry.monthlyRate}
                        onChange={(e) => setNewEntry({...newEntry, monthlyRate: e.target.value})}
                        className="rounded-xl border-muted/30 focus:border-primary bg-background/50"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-muted-foreground/80 mb-1">Seguro Declarado ($)</label>
                      <Input 
                        type="number"
                        placeholder="10000000"
                        value={newEntry.insuranceValue}
                        onChange={(e) => setNewEntry({...newEntry, insuranceValue: e.target.value})}
                        className="rounded-xl border-muted/30 focus:border-primary bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-muted-foreground/80 mb-1">Fecha de Entrada</label>
                      <Input 
                        type="date"
                        value={newEntry.entry}
                        onChange={(e) => setNewEntry({...newEntry, entry: e.target.value})}
                        className="rounded-xl border-muted/30 focus:border-primary bg-background/50"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-muted-foreground/80 mb-1">Salida Estimada</label>
                      <Input 
                        type="date"
                        value={newEntry.exitEstimated}
                        onChange={(e) => setNewEntry({...newEntry, exitEstimated: e.target.value})}
                        className="rounded-xl border-muted/30 focus:border-primary bg-background/50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory List (Dynamic Rows) */}
            <div className="space-y-3 bg-muted/10 p-5 rounded-2xl border border-muted/20">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                  <ClipboardList size={14} /> Inventario Físico Detallado *
                </h3>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddDetail}
                  className="rounded-xl h-8 gap-1.5 text-xs border-primary/30 text-primary hover:bg-primary/10"
                >
                  <Plus size={14} /> Agregar Fila
                </Button>
              </div>

              <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                {newEntryDetails.map((detail, idx) => (
                  <div key={idx} className="flex gap-3 items-center bg-background/60 p-3 rounded-xl border border-muted/10">
                    <div className="flex-[3]">
                      <label className="block text-[8px] uppercase font-bold text-muted-foreground mb-0.5">Descripción del Artículo *</label>
                      <Input 
                        required
                        placeholder="Ej: Nevera Samsung Inverter, Cajas vajilla"
                        value={detail.name}
                        onChange={(e) => handleUpdateDetail(idx, 'name', e.target.value)}
                        className="rounded-lg h-9 text-sm"
                      />
                    </div>
                    
                    <div className="w-20">
                      <label className="block text-[8px] uppercase font-bold text-muted-foreground mb-0.5">Cant.</label>
                      <Input 
                        required
                        type="number"
                        min="1"
                        value={detail.qty}
                        onChange={(e) => handleUpdateDetail(idx, 'qty', parseInt(e.target.value) || 1)}
                        className="rounded-lg h-9 text-sm text-center"
                      />
                    </div>

                    <div className="flex-[2]">
                      <label className="block text-[8px] uppercase font-bold text-muted-foreground mb-0.5">Estado / Embalaje</label>
                      <Input 
                        placeholder="Ej: Excelente, plástico burbuja"
                        value={detail.state}
                        onChange={(e) => handleUpdateDetail(idx, 'state', e.target.value)}
                        className="rounded-lg h-9 text-sm"
                      />
                    </div>

                    {newEntryDetails.length > 1 && (
                      <div className="pt-3">
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleRemoveDetail(idx)}
                          className="h-9 w-9 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-muted/20">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsEntryDialogOpen(false)}
                className="rounded-xl"
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                className="rounded-xl gap-2 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90"
              >
                Guardar Ingreso
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

