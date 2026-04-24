"use client";

import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Truck, 
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const REVENUE_DATA = [
  { month: 'Ene', revenue: 4500000, expenses: 3200000 },
  { month: 'Feb', revenue: 5200000, expenses: 3800000 },
  { month: 'Mar', revenue: 4800000, expenses: 3500000 },
  { month: 'Abr', revenue: 6100000, expenses: 4200000 },
  { month: 'May', revenue: 5500000, expenses: 3900000 },
  { month: 'Jun', revenue: 6700000, expenses: 4800000 },
];

const EXPENSE_DISTRIBUTION = [
  { name: 'Combustible', value: 40, color: 'hsl(var(--primary))' },
  { name: 'Peajes', value: 15, color: 'hsl(var(--chart-2))' },
  { name: 'Mantenimiento', value: 20, color: 'hsl(var(--chart-3))' },
  { name: 'Personal', value: 25, color: 'hsl(var(--chart-4))' },
];

const TRIP_PERFORMANCE = [
  { day: 'Lun', completed: 12, scheduled: 15 },
  { day: 'Mar', completed: 18, scheduled: 20 },
  { day: 'Mie', completed: 15, scheduled: 16 },
  { day: 'Jue', completed: 22, scheduled: 22 },
  { day: 'Vie', completed: 20, scheduled: 25 },
  { day: 'Sab', completed: 10, scheduled: 12 },
  { day: 'Dom', completed: 5, scheduled: 5 },
];

export default function ReportsPage() {
  return (
    <div className="min-h-screen pl-32 pr-8 py-8 bg-background">
      <Navigation />
      
      <header className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Reportes 📊</h1>
          <p className="text-muted-foreground">Análisis de rendimiento y rentabilidad de TransmudanzasJH.</p>
        </div>
        <Button className="rounded-xl gap-2 shadow-lg shadow-primary/20">
          <Download size={18} /> Exportar Datos
        </Button>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {[
          { label: 'Ingresos Totales', value: '$28.3M', icon: DollarSign, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Gastos Operativos', value: '$18.9M', icon: TrendingDown, color: 'text-destructive', bg: 'bg-destructive/10' },
          { label: 'Viajes Completados', value: '432', icon: Truck, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Margen de Utilidad', value: '33.2%', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
        ].map((stat, i) => (
          <Card key={i} className="glass-card border-none">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Revenue Chart */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="glass-card border-none rounded-[2rem] overflow-hidden">
            <CardHeader>
              <CardTitle>Ingresos vs Gastos</CardTitle>
              <CardDescription>Comparativa mensual del rendimiento financiero.</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ChartContainer config={{
                revenue: { label: "Ingresos", color: "hsl(var(--primary))" },
                expenses: { label: "Gastos", color: "hsl(var(--chart-2))" }
              }}>
                <BarChart data={REVENUE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" fill="var(--color-expenses)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Expense Distribution */}
        <div className="col-span-12 lg:col-span-4">
          <Card className="glass-card border-none rounded-[2rem] h-full">
            <CardHeader>
              <CardTitle>Distribución de Gastos</CardTitle>
              <CardDescription>Desglose por categoría operativa.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={EXPENSE_DISTRIBUTION}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {EXPENSE_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full space-y-2 mt-4">
                {EXPENSE_DISTRIBUTION.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-bold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trip Performance Chart */}
        <div className="col-span-12 lg:col-span-12">
          <Card className="glass-card border-none rounded-[2rem] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Rendimiento Semanal de Viajes</CardTitle>
                <CardDescription>Viajes completados vs programados por día.</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span>Completados</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-muted" />
                  <span>Programados</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={TRIP_PERFORMANCE}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="completed" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={4} 
                    dot={{ r: 4, fill: "hsl(var(--primary))" }} 
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="scheduled" 
                    stroke="hsl(var(--muted))" 
                    strokeWidth={2} 
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}