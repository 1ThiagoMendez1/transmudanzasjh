"use client";

import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { estimateQuoteDetails } from '@/ai/flows/estimate-quote-details';
import { predictJourneyExpenses } from '@/ai/flows/predict-journey-expenses';
import { Sparkles, ArrowRight, Loader2, Info } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function QuotesPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cargoDescription: '',
    destination: '',
    distance: 100,
    days: 1,
    weight: 1000,
  });
  
  const [prediction, setPrediction] = useState<any>(null);
  const [estimate, setEstimate] = useState<any>(null);

  const handlePredict = async () => {
    if (!formData.cargoDescription || !formData.destination) {
      toast({
        variant: "destructive",
        title: "Campos requeridos",
        description: "Por favor completa la descripción de la carga y el destino."
      });
      return;
    }

    setLoading(true);
    try {
      const [estRes, predRes] = await Promise.all([
        estimateQuoteDetails({ 
          cargoDescription: formData.cargoDescription, 
          destination: formData.destination 
        }),
        predictJourneyExpenses({
          journeyType: "mudanza interurbana",
          routeDescription: `Bogotá a ${formData.destination}`,
          distanceKm: formData.distance,
          expectedDurationDays: formData.days,
          cargoWeightKg: formData.weight,
          vehicleType: "Furgón mediano",
          historicalContext: "Rutas similares reportan peajes de $45,000 promedio."
        })
      ]);
      
      setEstimate(estRes);
      setPrediction(predRes);
      
      toast({
        title: "¡Análisis AI completado!",
        description: "Hemos generado sugerencias basadas en tu descripción."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error de análisis",
        description: "No pudimos conectar con el motor de IA. Reintenta pronto."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pl-32 pr-8 py-8 bg-background">
      <Navigation />
      
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-2">Cotizaciones 📑</h1>
        <p className="text-muted-foreground">Crea cotizaciones inteligentes y conviértelas en viajes con un clic.</p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7">
          <Card className="glass-card rounded-[2rem] border-none">
            <CardHeader>
              <CardTitle>Nueva Cotización</CardTitle>
              <CardDescription>Ingresa los detalles para que nuestra IA calcule el mejor vehículo y costos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Descripción de la Carga</Label>
                <Textarea 
                  placeholder="Ej: 40 cajas, 1 nevera, 1 sofá cama, destino Tunja..."
                  className="rounded-2xl min-h-[120px]"
                  value={formData.cargoDescription}
                  onChange={(e) => setFormData({...formData, cargoDescription: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Destino</Label>
                  <Input 
                    placeholder="Ciudad o dirección" 
                    className="rounded-xl"
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Peso Estimado (kg)</Label>
                  <Input 
                    type="number" 
                    className="rounded-xl"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Distancia (km)</Label>
                  <Input 
                    type="number" 
                    className="rounded-xl"
                    value={formData.distance}
                    onChange={(e) => setFormData({...formData, distance: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Duración (Días)</Label>
                  <Input 
                    type="number" 
                    className="rounded-xl"
                    value={formData.days}
                    onChange={(e) => setFormData({...formData, days: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <Button 
                onClick={handlePredict} 
                className="w-full rounded-2xl h-12 gap-2 bg-primary shadow-lg shadow-primary/20"
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                {loading ? "Analizando con IA..." : "Analizar con Trajecto IA"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-5 space-y-6">
          <Card className="glass-card rounded-[2rem] border-none bg-gradient-to-br from-secondary/10 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="text-primary" size={20} />
                Sugerencia de la IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!prediction && !estimate ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Info className="mx-auto mb-4 opacity-20" size={48} />
                  <p>Completa los datos de la izquierda para ver el análisis financiero inteligente.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {estimate && (
                    <div className="bg-white/50 p-4 rounded-2xl">
                      <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Vehículo Recomendado</p>
                      <p className="text-xl font-bold text-primary">{estimate.suggestedTruckType}</p>
                      <p className="text-sm font-medium">{estimate.estimatedTonnage} Toneladas</p>
                      <p className="text-xs text-muted-foreground mt-2 italic">{estimate.reasoning}</p>
                    </div>
                  )}

                  {prediction && (
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Costo Proyectado</p>
                        <p className="text-3xl font-bold">${prediction.totalPredictedExpenses.toLocaleString()}</p>
                        <p className="text-xs text-primary font-bold">Confianza: {prediction.confidenceLevel}</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs font-bold uppercase text-muted-foreground">Desglose de Gastos</p>
                        {prediction.expenseBreakdown.map((item: any, i: number) => (
                          <div key={i} className="flex justify-between items-center bg-muted/30 p-2 rounded-lg text-sm">
                            <span>{item.category}</span>
                            <span className="font-bold">${item.amount.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>

                      <Button className="w-full rounded-xl gap-2 mt-4 shadow-lg shadow-primary/20">
                        Convertir a Viaje <ArrowRight size={16} />
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="glass-card rounded-[2rem] p-6 border-none bg-primary text-white">
            <h3 className="font-bold text-lg mb-2">Tips de Ahorro</h3>
            <p className="text-sm opacity-90">Agrupar entregas en la misma zona de destino podría reducir tus costos operativos en un 15%.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}