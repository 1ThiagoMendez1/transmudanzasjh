"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { SnakeJourney, JourneyNode } from '@/components/SnakeJourney';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, MapPin, Package, Clock, ShieldCheck } from 'lucide-react';

const MOCK_TRACKING_NODES: JourneyNode[] = [
  { id: '1', type: 'start', label: 'Despachado', time: '08:00 AM', status: 'completed' },
  { id: '2', type: 'loading', label: 'Recogido', time: '10:30 AM', status: 'completed' },
  { id: '3', type: 'delivery', label: 'En Tránsito', time: 'En progreso', status: 'current' },
  { id: '4', type: 'closure', label: 'Entregado', time: '--:--', status: 'pending' },
];

export default function PublicTrackingPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl text-white shadow-xl shadow-primary/20 mb-4">
            <Truck size={32} />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Rastreo de Envío</h1>
          <div className="flex items-center justify-center gap-2">
            <span className="text-muted-foreground">Guía:</span>
            <span className="font-mono font-bold bg-muted px-3 py-1 rounded-lg text-primary">{id}</span>
          </div>
        </header>

        <section className="glass-card rounded-[3rem] p-8 md:p-12 overflow-hidden bg-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <Badge className="bg-primary hover:bg-primary/90 text-white mb-2 px-4 py-1 rounded-full uppercase text-[10px] tracking-wider font-bold">
                EN TRÁNSITO
              </Badge>
              <h2 className="text-2xl font-bold">Tu mudanza está en camino</h2>
              <p className="text-muted-foreground flex items-center gap-2 mt-1">
                <Clock size={14} /> Última actualización: hace 15 minutos
              </p>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-xs uppercase font-bold text-muted-foreground">Destino</p>
                <p className="font-bold">Calle 127 #45-12, Bogotá</p>
              </div>
            </div>
          </div>

          <div className="h-[300px] flex items-center justify-center">
            <SnakeJourney nodes={MOCK_TRACKING_NODES} />
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card border-none">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                <ShieldCheck />
              </div>
              <h3 className="font-bold mb-1">Seguro Activo</h3>
              <p className="text-xs text-muted-foreground">Carga protegida contra todo riesgo durante el trayecto.</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-none">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                <MapPin />
              </div>
              <h3 className="font-bold mb-1">Ubicación GPS</h3>
              <p className="text-xs text-muted-foreground">Monitoreo satelital 24/7 para tu tranquilidad.</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-none">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-muted-foreground mx-auto mb-4">
                <Package />
              </div>
              <h3 className="font-bold mb-1">36 Cajas</h3>
              <p className="text-xs text-muted-foreground">Detalle de inventario verificado en punto de cargue.</p>
            </CardContent>
          </Card>
        </div>

        <footer className="text-center text-muted-foreground text-sm py-8">
          <p>© 2024 TransmudanzasJH. Todos los derechos reservados.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:text-primary transition-colors">Soporte</a>
            <a href="#" className="hover:text-primary transition-colors">Términos</a>
            <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
          </div>
        </footer>
      </div>
    </div>
  );
}