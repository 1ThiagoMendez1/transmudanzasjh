"use client";

import React, { useEffect, useState } from 'react';
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
import { getAllActiveJourneys, ActiveJourney } from '@/lib/routes';
import { getAllWebQuotes, WebQuote } from '@/lib/quotes';

export default function Dashboard() {
  const [quotes, setQuotes] = useState<WebQuote[]>([]);
  const [journeys, setJourneys] = useState<ActiveJourney[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [fetchedQuotes, fetchedJourneys] = await Promise.all([
        getAllWebQuotes(),
        getAllActiveJourneys()
      ]);
      setQuotes(fetchedQuotes);
      setJourneys(fetchedJourneys);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const kpiData = [
    { title: "Ingresos del Mes", value: "$0", change: "0%", trend: "neutral", icon: DollarSign },
    { title: "Cotizaciones Activas", value: quotes.length.toString(), change: "Últimas 24h", trend: "neutral", icon: FileText },
    { title: "Rutas Activas", value: journeys.length.toString(), change: "En progreso", trend: "neutral", icon: Truck },
    { title: "Nuevos Clientes", value: "0", change: "0%", trend: "neutral", icon: Users },
  ];

  // Map quotes to recent activity as an example
  const recentActivity = quotes.slice(0, 4).map((q, idx) => ({
    id: q.id || idx.toString(),
    type: 'quote_pending',
    title: 'Nueva Cotización',
    desc: `${q.origin} - ${q.destination}`,
    time: new Date(q.created_at || '').toLocaleDateString(),
    value: 'Pendiente',
    icon: Clock,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10'
  }));

  return (
    <div className="min-h-screen px-4 pb-24 pt-8 md:pl-[140px] md:pr-8 md:py-8 bg-background max-w-[100vw] overflow-x-hidden">
      <Navigation />
      
      <header className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Visión General</h1>
          <p className="text-muted-foreground">Bienvenido de nuevo, aquí tienes un resumen de tu negocio hoy.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl gap-2" onClick={fetchData}><Activity size={16} /> Refrescar</Button>
          <Button className="rounded-xl gap-2 shadow-lg shadow-primary/20"><Calendar size={16} /> Este Mes</Button>
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
                    <p className="text-3xl font-bold text-foreground">
                      {loading ? '...' : kpi.value}
                    </p>
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
              <div className="h-[300px] w-full flex items-center justify-center pt-8 pb-2">
                <p className="text-muted-foreground">Esperando datos financieros...</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Card className="glass-card border-white/20 dark:border-white/10">
              <CardContent className="p-6">
                <h3 className="text-sm font-bold text-muted-foreground mb-4 uppercase">Estado de la Flota</h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-sm">Sin datos para mostrar.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/20 dark:border-white/10">
              <CardContent className="p-6">
                <h3 className="text-sm font-bold text-muted-foreground mb-4 uppercase">Conversión de Cotizaciones</h3>
                <div className="flex items-center justify-center h-32 relative">
                   <p className="text-muted-foreground text-sm">Sin datos de conversión.</p>
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
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">Cargando actividad...</div>
              ) : recentActivity.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No hay actividad reciente.</div>
              ) : (
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
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
