"use client";

import React, { useEffect, useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, MessageSquare, Star, Search } from 'lucide-react';
import { getAllPqrsf, PqrsfDocument, updatePqrsfStatus, PqrsfStatus } from '@/lib/pqrsf';
import { cn } from '@/lib/utils';

export default function PqrsfDashboard() {
  const [pqrsfList, setPqrsfList] = useState<PqrsfDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPqrsf = async () => {
    setLoading(true);
    try {
      const data = await getAllPqrsf();
      setPqrsfList(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPqrsf();
  }, []);

  const handleStatusChange = async (id: string, status: PqrsfStatus) => {
    try {
      await updatePqrsfStatus(id, status);
      fetchPqrsf();
    } catch (err) {
      console.error(err);
      alert('Error al actualizar el estado.');
    }
  };

  const filteredList = pqrsfList.filter(p => 
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tipo_solicitud.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen px-4 pb-24 pt-8 md:pl-[140px] md:pr-8 md:py-8 bg-background max-w-[100vw] overflow-x-hidden">
      <Navigation />
      
      <header className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <MessageSquare className="text-primary" size={32} /> PQRSF
          </h1>
          <p className="text-muted-foreground">Peticiones, Quejas, Reclamos, Sugerencias y Felicitaciones recibidas.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input 
              type="text" 
              placeholder="Buscar por nombre o correo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <Button variant="outline" className="rounded-xl gap-2" onClick={fetchPqrsf} disabled={loading}>
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Refrescar
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glass-card">
          <CardContent className="p-6 flex flex-col justify-center items-center text-center">
            <h3 className="text-muted-foreground font-bold text-sm uppercase mb-2">Total Recibidos</h3>
            <p className="text-4xl font-black text-foreground">{pqrsfList.length}</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-6 flex flex-col justify-center items-center text-center">
            <h3 className="text-muted-foreground font-bold text-sm uppercase mb-2">Pendientes</h3>
            <p className="text-4xl font-black text-amber-500">{pqrsfList.filter(p => p.estado === 'Pendiente').length}</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-6 flex flex-col justify-center items-center text-center">
            <h3 className="text-muted-foreground font-bold text-sm uppercase mb-2">Resueltos</h3>
            <p className="text-4xl font-black text-green-500">{pqrsfList.filter(p => p.estado === 'Resuelto').length}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Listado de Solicitudes</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-10 text-muted-foreground">Cargando registros...</div>
          ) : filteredList.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">No se encontraron registros de PQRSF.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 font-bold text-muted-foreground">Fecha / Estado</th>
                    <th className="pb-3 font-bold text-muted-foreground">Cliente</th>
                    <th className="pb-3 font-bold text-muted-foreground">Tipo de Solicitud</th>
                    <th className="pb-3 font-bold text-muted-foreground">Evaluación Promedio</th>
                    <th className="pb-3 font-bold text-muted-foreground text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredList.map((p) => {
                    const avgRating = ((p.puntualidad + p.cuidado + p.amabilidad + p.seguridad + p.agilidad) / 5).toFixed(1);
                    return (
                      <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                        <td className="py-4 align-top">
                          <p className="font-semibold text-foreground">{new Date(p.created_at || '').toLocaleDateString()}</p>
                          <span className={cn(
                            "inline-block px-2 py-1 rounded-full text-[10px] font-bold mt-1 uppercase",
                            p.estado === 'Pendiente' ? 'bg-amber-500/10 text-amber-500' :
                            p.estado === 'En Revisión' ? 'bg-blue-500/10 text-blue-500' :
                            'bg-green-500/10 text-green-500'
                          )}>{p.estado}</span>
                        </td>
                        <td className="py-4 align-top">
                          <p className="font-bold text-foreground">{p.nombre}</p>
                          <p className="text-muted-foreground text-xs">{p.correo}</p>
                          <p className="text-muted-foreground text-xs">{p.telefono}</p>
                        </td>
                        <td className="py-4 align-top">
                          <p className="font-medium text-foreground max-w-[200px] truncate" title={p.tipo_solicitud}>{p.tipo_solicitud.split('(')[0].trim()}</p>
                          <p className="text-muted-foreground text-xs">Servicio: {p.tipo_servicio}</p>
                        </td>
                        <td className="py-4 align-top">
                          <div className="flex items-center gap-1">
                            <Star className="text-amber-400 fill-amber-400 w-4 h-4" />
                            <span className="font-bold text-foreground">{avgRating}</span>
                          </div>
                        </td>
                        <td className="py-4 align-top text-right">
                          <select 
                            value={p.estado}
                            onChange={(e) => handleStatusChange(p.id!, e.target.value as PqrsfStatus)}
                            className="bg-background border border-border rounded-lg text-xs px-2 py-1 mr-2"
                          >
                            <option value="Pendiente">Pendiente</option>
                            <option value="En Revisión">En Revisión</option>
                            <option value="Resuelto">Resuelto</option>
                          </select>
                          <Button variant="outline" size="sm" className="text-xs rounded-lg" onClick={() => alert(`Mensaje de ${p.nombre}:\n\n${p.mensaje}`)}>
                            Leer Mensaje
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
