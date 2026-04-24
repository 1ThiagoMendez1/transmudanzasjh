"use client";

import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Truck, AlertTriangle, ShieldCheck, Calendar, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const VEHICLES = [
  { id: '1', plate: 'XYZ-123', type: 'Furgón Mediano', driver: 'Carlos Ruiz', status: 'En Ruta', soat: 'Vigente', insurance: 'Próximo a vencer' },
  { id: '2', plate: 'ABC-456', type: 'Camión Grande', driver: 'Andrés López', status: 'Disponible', soat: 'Vigente', insurance: 'Vigente' },
  { id: '3', plate: 'DEF-789', type: 'Planchón', driver: 'Mario Gómez', status: 'En Mantenimiento', soat: 'Vencido', insurance: 'Vigente' },
  { id: '4', plate: 'GHI-012', type: 'Furgoneta', driver: 'Luis Torres', status: 'Disponible', soat: 'Vigente', insurance: 'Vigente' },
];

export default function FleetPage() {
  return (
    <div className="min-h-screen pl-32 pr-8 py-8 bg-background">
      <Navigation />
      
      <header className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Mi Flota 🚛</h1>
          <p className="text-muted-foreground">Control de vehículos, conductores y cumplimiento legal.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input placeholder="Buscar placa o conductor..." className="pl-10 rounded-xl w-64 glass-card border-none" />
          </div>
          <Button className="rounded-xl gap-2 shadow-lg shadow-primary/20">
            Agregar Vehículo
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {VEHICLES.map((vehicle) => (
          <Card key={vehicle.id} className="glass-card border-none hover:shadow-2xl transition-all duration-300 group">
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
                <Button variant="ghost" className="w-full rounded-xl gap-2 hover:bg-primary hover:text-white">
                  <Calendar size={16} /> Historial de Viajes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}