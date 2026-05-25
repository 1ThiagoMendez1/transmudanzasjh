"use client";

import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Users, 
  Briefcase, 
  Award, 
  Wallet, 
  TrendingUp,
  Search,
  Plus,
  MoreVertical,
  Star,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// --- MOCK DATA ---

const kpis = [
  { title: "Total Plantilla", value: "45", subtitle: "Empleados activos", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
  { title: "Nómina Mensual", value: "$124.5M", subtitle: "Proyección actual", icon: Wallet, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { title: "Incentivos Pagados", value: "$3.2M", subtitle: "Mes en curso", icon: Award, color: "text-amber-500", bg: "bg-amber-500/10" },
  { title: "Auxiliares (Mes)", value: "12", subtitle: "Turnos pagados", icon: Briefcase, color: "text-purple-500", bg: "bg-purple-500/10" },
];

const empleados = [
  { id: 1, nombre: "Carlos Rodríguez", rol: "Conductor NPR", estado: "Activo", antiguedad: "2 años", rating: 4.8 },
  { id: 2, nombre: "María Gómez", rol: "Coordinadora Logística", estado: "Activo", antiguedad: "4 años", rating: 4.9 },
  { id: 3, nombre: "Luis Pérez", rol: "Conductor NHR", estado: "Vacaciones", antiguedad: "1 año", rating: 4.5 },
  { id: 4, nombre: "Ana Martínez", rol: "Auxiliar Administrativa", estado: "Incapacidad", antiguedad: "3 años", rating: 4.7 },
];

const nominas = [
  { id: 1, periodo: "Mayo 2026 - Q1", total: "$62,250,000", estado: "Pendiente", fecha: "15 Mayo 2026" },
  { id: 2, periodo: "Abril 2026 - Q2", total: "$61,800,000", estado: "Pagado", fecha: "30 Abril 2026" },
  { id: 3, periodo: "Abril 2026 - Q1", total: "$62,000,000", estado: "Pagado", fecha: "15 Abril 2026" },
];

const incentivos = [
  { id: 1, conductor: "Carlos Rodríguez", motivo: "Cero Accidentes (Mes)", monto: "$150,000", fecha: "01 Mayo 2026", estado: "Pagado" },
  { id: 2, conductor: "Luis Pérez", motivo: "Entregas a Tiempo (100%)", monto: "$100,000", fecha: "01 Mayo 2026", estado: "Aprobado" },
  { id: 3, conductor: "Jorge Silva", motivo: "Ahorro Combustible", monto: "$80,000", fecha: "15 Abr 2026", estado: "Pagado" },
];

const auxiliares = [
  { id: 1, nombre: "Pedro Sánchez", servicio: "Mudanza Bogotá - Norte", pago: "$60,000", fecha: "05 Mayo 2026", estado: "Pagado" },
  { id: 2, nombre: "Juan Díaz", servicio: "Cargue Bodega Principal", pago: "$45,000", fecha: "06 Mayo 2026", estado: "Pendiente" },
  { id: 3, nombre: "Andrés Ruiz", servicio: "Descargue Express", pago: "$50,000", fecha: "06 Mayo 2026", estado: "Pendiente" },
];

// --- COMPONENTS ---

export default function PersonalDashboard() {
  const [activeTab, setActiveTab] = useState('plantilla');

  const tabs = [
    { id: 'plantilla', label: 'Plantilla', icon: Users },
    { id: 'nominas', label: 'Nóminas', icon: FileText },
    { id: 'incentivos', label: 'Incentivos', icon: Award },
    { id: 'auxiliares', label: 'Auxiliares', icon: Briefcase },
  ];

  return (
    <div className="min-h-screen px-4 pb-24 pt-8 md:pl-[140px] md:pr-8 md:py-8 bg-background max-w-[100vw] overflow-x-hidden">
      <Navigation />
      
      <header className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Recursos Humanos</h1>
          <p className="text-muted-foreground">Gestión de personal, nóminas, incentivos y colaboradores externos.</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-xl gap-2 shadow-lg shadow-primary/20">
                <Plus size={16} /> Agregar Personal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Empleado</DialogTitle>
                <DialogDescription>
                  Ingresa los datos del nuevo miembro del equipo.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="empName" className="text-right">Nombre</Label>
                  <Input id="empName" placeholder="Ej. Juan Pérez" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="empRole" className="text-right">Cargo</Label>
                  <select id="empRole" className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <option value="Conductor NPR">Conductor NPR</option>
                    <option value="Conductor NHR">Conductor NHR</option>
                    <option value="Coordinador">Coordinador Logístico</option>
                    <option value="Auxiliar">Auxiliar Administrativo</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="empStatus" className="text-right">Estado</Label>
                  <select id="empStatus" className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <option value="Activo">Activo</option>
                    <option value="Incapacidad">Incapacidad</option>
                    <option value="Vacaciones">Vacaciones</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Guardar Empleado</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {kpis.map((kpi, i) => {
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
                    <div className={cn("p-3 rounded-xl", kpi.bg, kpi.color)}>
                      <Icon size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-muted-foreground text-sm font-medium mb-1">{kpi.title}</h3>
                    <p className="text-3xl font-bold text-foreground mb-1">{kpi.value}</p>
                    <p className="text-xs text-muted-foreground">{kpi.subtitle}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 mb-6 pb-2 hide-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all whitespace-nowrap",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              )}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          
          {/* PLANTILLA TAB */}
          {activeTab === 'plantilla' && (
            <motion.div
              key="plantilla"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input placeholder="Buscar empleado..." className="pl-10 rounded-xl bg-background/50 backdrop-blur-sm border-white/20" />
                </div>
                <Button variant="outline" className="rounded-xl">Filtros</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {empleados.map(emp => (
                  <Card key={emp.id} className="glass-card hover:border-primary/30 transition-colors cursor-pointer group">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-white font-bold text-lg shadow-md">
                          {emp.nombre.charAt(0)}
                        </div>
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-1 rounded-full uppercase",
                          emp.estado === 'Activo' ? "bg-green-500/10 text-green-500" :
                          emp.estado === 'Vacaciones' ? "bg-blue-500/10 text-blue-500" :
                          "bg-amber-500/10 text-amber-500"
                        )}>
                          {emp.estado}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg truncate" title={emp.nombre}>{emp.nombre}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{emp.rol}</p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-white/10">
                        <div className="flex items-center gap-1">
                          <Clock size={14} /> {emp.antiguedad}
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star size={14} className="fill-amber-500" /> {emp.rating}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* NÓMINAS TAB */}
          {activeTab === 'nominas' && (
            <motion.div
              key="nominas"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-xl">Historial de Nóminas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {nominas.map(nom => (
                      <div key={nom.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-white/10 bg-background/50 hover:bg-muted/30 transition-colors gap-4">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                            nom.estado === 'Pagado' ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500"
                          )}>
                            <FileText size={18} />
                          </div>
                          <div>
                            <h4 className="font-bold">{nom.periodo}</h4>
                            <p className="text-sm text-muted-foreground">Fecha de pago: {nom.fecha}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                          <div className="text-left sm:text-right">
                            <p className="text-sm text-muted-foreground mb-1">Total</p>
                            <p className="font-bold text-lg">{nom.total}</p>
                          </div>
                          <span className={cn(
                            "px-3 py-1 text-xs font-bold rounded-full",
                            nom.estado === 'Pagado' ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500"
                          )}>
                            {nom.estado}
                          </span>
                          <Button variant="ghost" size="icon" className="hidden sm:flex">
                            <ChevronRight size={18} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* INCENTIVOS TAB */}
          {activeTab === 'incentivos' && (
            <motion.div
              key="incentivos"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-xl">Últimos Incentivos Asignados</CardTitle>
                      <Button variant="outline" size="sm" className="rounded-xl">Ver Todos</Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 mt-4">
                        {incentivos.map(inc => (
                          <div key={inc.id} className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-background/50">
                            <div>
                              <h4 className="font-bold">{inc.conductor}</h4>
                              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                <Award size={14} className="text-amber-500" /> {inc.motivo}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-green-500 text-lg">+{inc.monto}</p>
                              <p className="text-xs text-muted-foreground">{inc.fecha}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <Card className="glass-card bg-gradient-to-br from-amber-500/10 to-background border-amber-500/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="text-amber-500" /> Sistema de Puntos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Los conductores ganan puntos por entregas perfectas, puntualidad y cero reportes.
                      </p>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 rounded-lg bg-background/60">
                          <span className="text-sm font-medium">Entrega a tiempo</span>
                          <span className="text-amber-500 font-bold">+50 pts</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-background/60">
                          <span className="text-sm font-medium">Cero Accidentes (Mes)</span>
                          <span className="text-amber-500 font-bold">+500 pts</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-background/60">
                          <span className="text-sm font-medium">Ahorro Combustible</span>
                          <span className="text-amber-500 font-bold">+200 pts</span>
                        </div>
                      </div>
                      <Button className="w-full mt-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-white">Configurar Reglas</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}

          {/* AUXILIARES TAB */}
          {activeTab === 'auxiliares' && (
            <motion.div
              key="auxiliares"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl">Pagos a Destajo y Auxiliares</CardTitle>
                  <Button size="sm" className="rounded-xl gap-2"><Plus size={16} /> Registrar Pago</Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full mt-4">
                      <thead>
                        <tr className="border-b border-white/10 text-left text-sm text-muted-foreground">
                          <th className="pb-3 font-medium">Nombre / C.C.</th>
                          <th className="pb-3 font-medium">Servicio</th>
                          <th className="pb-3 font-medium">Fecha</th>
                          <th className="pb-3 font-medium text-right">Monto</th>
                          <th className="pb-3 font-medium text-center">Estado</th>
                          <th className="pb-3"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {auxiliares.map(aux => (
                          <tr key={aux.id} className="hover:bg-muted/20 transition-colors">
                            <td className="py-4">
                              <div className="font-medium flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center font-bold text-xs">
                                  {aux.nombre.charAt(0)}
                                </div>
                                {aux.nombre}
                              </div>
                            </td>
                            <td className="py-4 text-sm text-muted-foreground">{aux.servicio}</td>
                            <td className="py-4 text-sm text-muted-foreground">{aux.fecha}</td>
                            <td className="py-4 text-right font-bold">{aux.pago}</td>
                            <td className="py-4 text-center">
                              <span className={cn(
                                "text-[10px] font-bold px-2 py-1 rounded-full",
                                aux.estado === 'Pagado' ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500"
                              )}>
                                {aux.estado}
                              </span>
                            </td>
                            <td className="py-4 text-right">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                <MoreVertical size={16} />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
