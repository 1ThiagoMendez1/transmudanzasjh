"use client";

import React, { useState, useEffect } from 'react';
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
import { getFleet, createFleetVehicle, FleetVehicle } from '@/lib/fleet';
import { useToast } from '@/hooks/use-toast';

export default function FleetPage() {
  const [vehicles, setVehicles] = useState<FleetVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    plate: '',
    type: 'Furgón Mediano',
    brand: 'N/A', // Add missing fields based on FleetVehicle interface
    model: 'N/A',
    capacity_kg: 0,
    status: 'Disponible'
  });
  
  // Note: For simplicity, driver, soat, and insurance aren't natively in the FleetVehicle schema
  // We will map status if needed or just use the available fields.

  const [historyVehicle, setHistoryVehicle] = useState<any>(null);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  
  const { toast } = useToast();

  const fetchFleet = async () => {
    setLoading(true);
    try {
      const data = await getFleet();
      setVehicles(data);
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "No se pudieron cargar los vehículos", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFleet();
  }, []);

  const handleAddVehicle = async () => {
    if (!newVehicle.plate) return;
    
    try {
      await createFleetVehicle({
        plate: newVehicle.plate,
        type: newVehicle.type,
        brand: newVehicle.brand,
        model: newVehicle.model,
        capacity_kg: newVehicle.capacity_kg,
        status: newVehicle.status
      });
      
      toast({ title: "Vehículo agregado", description: "Se registró exitosamente." });
      setIsDialogOpen(false);
      setNewVehicle({ plate: '', type: 'Furgón Mediano', brand: 'N/A', model: 'N/A', capacity_kg: 0, status: 'Disponible' });
      fetchFleet();
    } catch (error) {
      toast({ title: "Error", description: "Ocurrió un problema al guardar el vehículo", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen px-4 pb-24 pt-8 md:pl-[140px] md:pr-8 md:py-8 bg-background max-w-[100vw] overflow-x-hidden">
      <Navigation />
      
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Mi Flota 🚛</h1>
          <p className="text-muted-foreground">Control de vehículos y estado de operación.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input placeholder="Buscar placa..." className="pl-10 rounded-xl w-full sm:w-64 bg-background/50 backdrop-blur-sm border-white/20" />
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
                  <Label htmlFor="brand" className="text-right">Marca</Label>
                  <Input 
                    id="brand" 
                    placeholder="Ej. Chevrolet" 
                    className="col-span-3"
                    value={newVehicle.brand}
                    onChange={(e) => setNewVehicle({...newVehicle, brand: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="capacity" className="text-right">Capacidad (kg)</Label>
                  <Input 
                    id="capacity"
                    type="number" 
                    placeholder="0" 
                    className="col-span-3"
                    value={newVehicle.capacity_kg}
                    onChange={(e) => setNewVehicle({...newVehicle, capacity_kg: Number(e.target.value)})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleAddVehicle} disabled={!newVehicle.plate}>Guardar Vehículo</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
      </header>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Cargando flota...</div>
      ) : vehicles.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No hay vehículos registrados en la flota.</div>
      ) : (
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
                  <p className="text-muted-foreground text-sm">{vehicle.type} • {vehicle.brand}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-2xl">
                    <span className="text-sm font-medium">Modelo</span>
                    <span className="text-xs">{vehicle.model}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-2xl">
                    <span className="text-sm font-medium">Capacidad</span>
                    <span className="text-xs">{vehicle.capacity_kg} kg</span>
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
      )}

      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Historial de Viajes - {historyVehicle?.plate}</DialogTitle>
            <DialogDescription>
              Últimos viajes realizados por el vehículo {historyVehicle?.plate}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="text-center text-muted-foreground p-4">
              No hay viajes registrados aún.
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsHistoryDialogOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}