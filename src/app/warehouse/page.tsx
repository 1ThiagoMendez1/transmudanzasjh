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
  Scale
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

const MOCK_INVENTORY = [
  { id: '1', client: 'Beatriz Gómez', items: 'Menaje hogar completo', space: '12m³', entry: '2024-02-15', status: 'Almacenado' },
  { id: '2', client: 'Inversiones XYZ', items: '15 Escritorios, 20 Sillas', space: '8m³', entry: '2024-03-01', status: 'En Salida' },
  { id: '3', client: 'Roberto Cano', items: 'Nevera, Lavadora, Sofá', space: '5m³', entry: '2024-01-20', status: 'Almacenado' },
  { id: '4', client: 'Logística Pro', items: '50 Cajas archivo muerto', space: '10m³', entry: '2024-03-10', status: 'Recién Ingresado' },
];

export default function WarehousePage() {
  const [searchTerm, setSearchTerm] = useState('');

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
          <Button className="rounded-xl gap-2 shadow-lg shadow-primary/20">
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
                  {MOCK_INVENTORY.map((item) => (
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
                        <Button variant="ghost" size="sm" className="rounded-xl h-8">Ver Guía</Button>
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
    </div>
  );
}
