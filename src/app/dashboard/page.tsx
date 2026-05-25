"use client";

import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  DollarSign,
  FileText, 
  Truck, 
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Calendar,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const kpiData = [
  { title: "Ingresos del Mes", value: "$42.5M", change: "+12.5%", trend: "up", icon: DollarSign },
  { title: "Cotizaciones Activas", value: "24", change: "+4", trend: "up", icon: FileText },
  { title: "Vehículos en Ruta", value: "8/12", change: "2 en taller", trend: "neutral", icon: Truck },
  { title: "Nuevos Clientes", value: "15", change: "-2%", trend: "down", icon: Users },
];

const recentActivity = [
  { id: 1, type: 'quote_approved', title: 'Cotización Aprobada', desc: 'Mudanza Bogotá - Medellín', time: 'Hace 2 horas', value: '$2.5M', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
  { id: 2, type: 'route_started', title: 'Ruta Iniciada', desc: 'Furgón NPR (XYZ-123)', time: 'Hace 4 horas', value: 'Origen: Cali', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 3, type: 'quote_pending', title: 'Nueva Cotización', desc: 'Oficina 100m2 Norte', time: 'Hace 5 horas', value: 'Pendiente', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { id: 4, type: 'payment_received', title: 'Pago Recibido', desc: 'Anticipo 50% - Guía 00842', time: 'Ayer', value: '$1.2M', icon: DollarSign, color: 'text-primary', bg: 'bg-primary/10' },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen px-4 pb-24 pt-8 md:pl-[140px] md:pr-8 md:py-8 bg-background max-w-[100vw] overflow-x-hidden">
      <Navigation />
      
      <header className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Visión General</h1>
          <p className="text-muted-foreground">Bienvenido de nuevo, aquí tienes un resumen de tu negocio hoy.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl gap-2"><Calendar size={16} /> Este Mes</Button>
          <Button className="rounded-xl gap-2 shadow-lg shadow-primary/20"><Activity size={16} /> Generar Reporte</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {kpiData.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-card hover:shadow-xl transition-all duration-300 border-white/20 dark:border-white/10 h-full">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <Icon size={24} />
                    </div>
                    <span className={cn(
                      "flex items-center text-xs font-bold px-2 py-1 rounded-full",
                      kpi.trend === 'up' ? "text-green-600 bg-green-500/10" : 
                      kpi.trend === 'down' ? "text-red-600 bg-red-500/10" : 
                      "text-muted-foreground bg-muted"
                    )}>
                      {kpi.trend === 'up' && <ArrowUpRight size={14} className="mr-1" />}
                      {kpi.trend === 'down' && <ArrowDownRight size={14} className="mr-1" />}
                      {kpi.change}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-muted-foreground text-sm font-medium mb-1">{kpi.title}</h3>
                    <p className="text-3xl font-bold text-foreground">{kpi.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Ingresos Chart Placeholder */}
          <Card className="glass-card border-white/20 dark:border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold">Flujo de Ingresos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full flex items-end justify-between gap-2 pt-8 pb-2">
                {[40, 60, 35, 75, 50, 85, 65, 90, 100, 70, 80, 95].map((h, i) => (
                  <div key={i} className="w-full flex flex-col items-center gap-2 group">
                    <div className="w-full bg-primary/20 rounded-t-sm relative group-hover:bg-primary/30 transition-colors" style={{ height: `${h}%` }}>
                      <div className="absolute bottom-0 w-full bg-primary rounded-t-sm transition-all duration-500 group-hover:bg-primary/90" style={{ height: `${h * 0.7}%` }}></div>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-medium uppercase">{['E','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Card className="glass-card border-white/20 dark:border-white/10">
              <CardContent className="p-6">
                <h3 className="text-sm font-bold text-muted-foreground mb-4 uppercase">Estado de la Flota</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1"><span className="font-medium">En Ruta (8)</span><span className="text-primary font-bold">66%</span></div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary w-[66%]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1"><span className="font-medium">Disponibles (2)</span><span className="text-green-500 font-bold">16%</span></div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden"><div className="h-full bg-green-500 w-[16%]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1"><span className="font-medium">Mantenimiento (2)</span><span className="text-destructive font-bold">16%</span></div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden"><div className="h-full bg-destructive w-[16%]"></div></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/20 dark:border-white/10">
              <CardContent className="p-6">
                <h3 className="text-sm font-bold text-muted-foreground mb-4 uppercase">Conversión de Cotizaciones</h3>
                <div className="flex items-center justify-center h-32 relative">
                   <div className="w-32 h-32 rounded-full border-[12px] border-primary/20 relative flex items-center justify-center">
                     <div className="absolute inset-0 rounded-full border-[12px] border-primary border-t-transparent border-l-transparent transform rotate-45"></div>
                     <div className="text-center">
                       <span className="text-2xl font-bold block leading-none">68%</span>
                       <span className="text-[10px] uppercase font-bold text-muted-foreground">Aprobadas</span>
                     </div>
                   </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="glass-card border-white/20 dark:border-white/10 h-full">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentActivity.map((activity, i) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex gap-4 relative">
                      {i !== recentActivity.length - 1 && (
                        <div className="absolute left-[19px] top-[40px] bottom-[-24px] w-[2px] bg-muted"></div>
                      )}
                      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10", activity.bg, activity.color)}>
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 pb-2">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-bold text-sm">{activity.title}</p>
                          <span className="text-[10px] font-medium text-muted-foreground">{activity.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{activity.desc}</p>
                        <p className="text-sm font-semibold">{activity.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button variant="outline" className="w-full mt-6 rounded-xl">Ver toda la actividad</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
