"use client";

import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Truck, AlertTriangle, ShieldCheck, Calendar, Search, Plus } from 'lucide-react';
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

const INITIAL_VEHICLES = [
  { id: '1', plate: 'XYZ-123', type: 'Furgón Mediano', driver: 'Carlos Ruiz', status: 'En Ruta', soat: 'Vigente', insurance: 'Próximo a vencer' },
  { id: '2', plate: 'ABC-456', type: 'Camión Grande', driver: 'Andrés López', status: 'Disponible', soat: 'Vigente', insurance: 'Vigente' },
  { id: '3', plate: 'DEF-789', type: 'Planchón', driver: 'Mario Gómez', status: 'En Mantenimiento', soat: 'Vencido', insurance: 'Vigente' },
  { id: '4', plate: 'GHI-012', type: 'Furgoneta', driver: 'Luis Torres', status: 'Disponible', soat: 'Vigente', insurance: 'Vigente' },
];

export default function FleetPage() {
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    plate: '',
    type: 'Furgón Mediano',
    driver: '',
    status: 'Disponible',
    soat: 'Vigente',
    insurance: 'Vigente'
  });
  const [historyVehicle, setHistoryVehicle] = useState<any>(null);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);

  const handleAddVehicle = () => {
    if (!newVehicle.plate || !newVehicle.driver) return;
    
    setVehicles([...vehicles, { ...newVehicle, id: Date.now().toString() }]);
    setIsDialogOpen(false);
    setNewVehicle({
      plate: '',
      type: 'Furgón Mediano',
      driver: '',
      status: 'Disponible',
      soat: 'Vigente',
      insurance: 'Vigente'
    });
  };

  return (
    <div className="min-h-screen px-4 pb-24 pt-8 md:pl-[140px] md:pr-8 md:py-8 bg-background max-w-[100vw] overflow-x-hidden">
      <Navigation />
      
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Mi Flota 🚛</h1>
          <p className="text-muted-foreground">Control de vehículos, conductores y cumplimiento legal.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input placeholder="Buscar placa o conductor..." className="pl-10 rounded-xl w-full sm:w-64 bg-background/50 backdrop-blur-sm border-white/20" />
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl gap-2 shadow-lg shadow-primary/20 whitespace-nowrap">
                <Plus size={18} /> Agregar Vehículo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Vehículo</DialogTitle>
                <DialogDescription>
                  Ingresa los datos del nuevo vehículo a la flota.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="plate" className="text-right">Placa</Label>
                  <Input 
                    id="plate" 
                    placeholder="Ej. ABC-123" 
                    className="col-span-3 uppercase" 
                    value={newVehicle.plate}
                    onChange={(e) => setNewVehicle({...newVehicle, plate: e.target.value.toUpperCase()})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">Tipo</Label>
                  <select 
                    id="type" 
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    value={newVehicle.type}
                    onChange={(e) => setNewVehicle({...newVehicle, type: e.target.value})}
                  >
                    <option value="Furgón Mediano">Furgón Mediano</option>
                    <option value="Camión Grande">Camión Grande</option>
                    <option value="Planchón">Planchón</option>
                    <option value="Furgoneta">Furgoneta</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="driver" className="text-right">Conductor</Label>
                  <Input 
                    id="driver" 
                    placeholder="Nombre del conductor" 
                    className="col-span-3"
                    value={newVehicle.driver}
                    onChange={(e) => setNewVehicle({...newVehicle, driver: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddVehicle} disabled={!newVehicle.plate || !newVehicle.driver}>Guardar Vehículo</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="glass-card hover:border-primary/30 transition-colors cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                <Truck size={24} />
              </div>
              <Badge variant={vehicle.status === 'Disponible' ? 'secondary' : 'default'} className="rounded-full px-4">
                {vehicle.status}
              </Badge>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="mb-6">
                <h3 className="text-2xl font-bold tracking-tight">{vehicle.plate}</h3>
                <p className="text-muted-foreground text-sm">{vehicle.type} • {vehicle.driver}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={18} className="text-primary" />
                    <span className="text-sm font-medium">SOAT</span>
                  </div>
                  <Badge variant={vehicle.soat === 'Vencido' ? 'destructive' : 'outline'} className="text-[10px]">
                    {vehicle.soat}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <AlertTriangle size={18} className={vehicle.insurance === 'Vigente' ? 'text-primary' : 'text-orange-500'} />
                    <span className="text-sm font-medium">Seguro</span>
                  </div>
                  <Badge variant={vehicle.insurance === 'Vigente' ? 'outline' : 'secondary'} className="text-[10px]">
                    {vehicle.insurance}
                  </Badge>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-muted">
                <Button 
                  variant="ghost" 
                  className="w-full rounded-xl gap-2 hover:bg-primary hover:text-white"
                  onClick={() => {
                    setHistoryVehicle(vehicle);
                    setIsHistoryDialogOpen(true);
                  }}
                >
                  <Calendar size={16} /> Historial de Viajes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Historial de Viajes - {historyVehicle?.plate}</DialogTitle>
            <DialogDescription>
              Últimos viajes realizados por el vehículo conducido por {historyVehicle?.driver}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="flex justify-between items-start p-4 bg-muted/30 rounded-2xl border border-white/5">
                <div>
                  <h4 className="font-bold text-sm">Bogotá ➔ {['Medellín', 'Cali', 'Barranquilla'][idx]}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {['12 Mayo 2026', '08 Mayo 2026', '02 Mayo 2026'][idx]} • Carga General
                  </p>
                </div>
                <Badge variant="outline" className="text-green-500 bg-green-500/10 border-none">
                  Completado
                </Badge>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsHistoryDialogOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}