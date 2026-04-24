
"use client";

import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { SnakeJourney, JourneyNode } from '@/components/SnakeJourney';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Share2, 
  MessageSquare,
  FileText,
  ChevronRight,
  Truck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const MOCK_NODES: JourneyNode[] = [
  { 
    id: '1', 
    type: 'start', 
    label: 'Origen', 
    time: '08:00 AM', 
    status: 'completed',
    details: { address: 'Calle 100, Bogotá' }
  },
  { 
    id: '2', 
    type: 'loading', 
    label: 'Cargue #1', 
    time: '10:30 AM', 
    status: 'completed',
    details: { client: 'Juan Perez', address: 'Calle 140, Bogotá', description: 'Mudanza residencial' }
  },
  { 
    id: '3', 
    type: 'expense', 
    label: 'Peaje', 
    time: '01:15 PM', 
    status: 'completed',
    details: { amount: 15000, description: 'Peaje Andes' }
  },
  { 
    id: '4', 
    type: 'delivery', 
    label: 'Entrega #1', 
    time: '03:45 PM', 
    status: 'current',
    details: { client: 'Juan Perez', address: 'Tunja, Boyacá' }
  },
  { 
    id: '5', 
    type: 'return', 
    label: 'Regreso', 
    time: '--:--', 
    status: 'pending' 
  },
  { 
    id: '6', 
    type: 'closure', 
    label: 'Cierre', 
    time: '--:--', 
    status: 'pending' 
  },
];

export default function Dashboard() {
  const [activeNode, setActiveNode] = useState<JourneyNode | null>(null);

  return (
    <div className="min-h-screen pl-32 pr-8 py-8 bg-background">
      <Navigation />
      
      <header className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">¡Hola, TransmudanzasJH! 🚛</h1>
          <p className="text-muted-foreground">Monitoreo activo del viaje: <span className="font-bold text-primary">GUIA-000842</span></p>
        </div>
        
        <div className="flex gap-4">
          <Card className="glass-card overflow-hidden">
            <CardContent className="flex items-center gap-4 py-3 px-6">
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <Wallet size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-muted-foreground">Fondo Restante</p>
                <p className="text-lg font-bold">$1.240.000</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card overflow-hidden">
            <CardContent className="flex items-center gap-4 py-3 px-6">
              <div className="p-2 bg-destructive/10 rounded-full text-destructive">
                <TrendingDown size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-muted-foreground">Gastos Hoy</p>
                <p className="text-lg font-bold">$360.000</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card overflow-hidden">
            <CardContent className="flex items-center gap-4 py-3 px-6">
              <div className="p-2 bg-secondary/10 rounded-full text-secondary">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-muted-foreground">Proyección</p>
                <p className="text-lg font-bold text-primary">$4.800.000</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <section className="col-span-12 lg:col-span-9 space-y-8">
          <div className="relative glass-card rounded-[2rem] p-12 overflow-hidden bg-gradient-to-br from-white to-background">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Truck size={200} />
            </div>
            
            <div className="flex justify-between items-center mb-8 relative z-10">
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

            <SnakeJourney nodes={MOCK_NODES} onNodeClick={setActiveNode} />
          </div>

          <div className="glass-card rounded-[2rem] p-8">
            <h3 className="text-xl font-bold mb-6">Bitácora de Eventos</h3>
            <div className="space-y-4">
              {MOCK_NODES.filter(n => n.status !== 'pending').map((node) => (
                <div key={node.id} className="flex items-center gap-4 p-4 hover:bg-muted/50 rounded-2xl transition-colors">
                  <div className="text-sm font-bold text-muted-foreground w-20">{node.time}</div>
                  <div className={cn("w-2 h-2 rounded-full", node.status === 'completed' ? 'bg-primary' : 'bg-primary animate-pulse')} />
                  <div className="flex-1">
                    <p className="font-bold">{node.label}</p>
                    <p className="text-xs text-muted-foreground">{node.details?.description || node.details?.address || 'Sin detalles'}</p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="col-span-12 lg:col-span-3 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-[2rem] p-6 sticky top-8"
          >
            {activeNode ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-xl">Detalle del Nodo</h3>
                  <Button variant="ghost" size="sm" onClick={() => setActiveNode(null)}>Cerrar</Button>
                </div>
                
                <div className="bg-muted p-4 rounded-2xl space-y-4">
                  <div>
                    <p className="text-xs uppercase font-bold text-muted-foreground">Evento</p>
                    <p className="text-lg font-bold">{activeNode.label}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold text-muted-foreground">Estado</p>
                    <p className="font-medium">{activeNode.status}</p>
                  </div>
                  {activeNode.details?.client && (
                    <div>
                      <p className="text-xs uppercase font-bold text-muted-foreground">Cliente</p>
                      <p className="font-medium">{activeNode.details.client}</p>
                    </div>
                  )}
                  {activeNode.details?.amount && (
                    <div>
                      <p className="text-xs uppercase font-bold text-muted-foreground">Costo</p>
                      <p className="font-bold text-primary text-xl">${activeNode.details.amount.toLocaleString()}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Button className="w-full rounded-xl" variant="outline">
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
        </aside>
      </div>
    </div>
  );
}
