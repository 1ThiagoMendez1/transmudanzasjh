"use client";

import React, { useState, useRef } from "react";
import { 
  Fuel, 
  Ticket, 
  Hotel, 
  Wrench, 
  Utensils, 
  Droplets,
  PlusSquare,
  Camera,
  Upload,
  X,
  Truck
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { getSession } from "@/app/actions/auth";
import { getAllActiveJourneys, ActiveJourney } from "@/lib/routes";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

const EXPENSE_CATEGORIES = [
  { id: "combustible", label: "Combustible", icon: Fuel, color: "bg-orange-500", lightColor: "bg-orange-100", textColor: "text-orange-600" },
  { id: "peajes", label: "Peajes", icon: Ticket, color: "bg-primary", lightColor: "bg-primary/10", textColor: "text-primary" },
  { id: "hoteles", label: "Hoteles", icon: Hotel, color: "bg-purple-500", lightColor: "bg-purple-100", textColor: "text-purple-600" },
  { id: "mecanica", label: "Mecánica", icon: Wrench, color: "bg-red-500", lightColor: "bg-red-100", textColor: "text-red-600" },
  { id: "comida", label: "Comida", icon: Utensils, color: "bg-green-500", lightColor: "bg-green-100", textColor: "text-green-600" },
  { id: "lavado", label: "Lavado", icon: Droplets, color: "bg-cyan-500", lightColor: "bg-cyan-100", textColor: "text-cyan-600" },
  { id: "otros", label: "Otros", icon: PlusSquare, color: "bg-slate-700", lightColor: "bg-slate-200", textColor: "text-slate-800" },
];

export default function ConductoresPage() {
  const [selectedCategory, setSelectedCategory] = useState<typeof EXPENSE_CATEGORIES[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeRoute, setActiveRoute] = useState<ActiveJourney | null>(null);
  const [loadingRoute, setLoadingRoute] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    async function loadData() {
      try {
        const session = await getSession();
        if (!session) return;
        
        const driverName = session.name;
        const allJourneys = await getAllActiveJourneys();
        const currentJourney = allJourneys.find(j => j.driver === driverName && j.status !== 'Finalizado' && j.status !== 'finalizada');
        
        if (currentJourney) {
          setActiveRoute(currentJourney);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingRoute(false);
      }
    }
    loadData();
  }, []);

  const handleCategoryClick = (category: typeof EXPENSE_CATEGORIES[0]) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
    // Reset form
    setAmount("");
    setNotes("");
    setPhoto(null);
    setPhotoPreview(null);
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !photo) {
      toast({
        title: "Faltan datos",
        description: "Por favor, ingresa el monto y adjunta una foto de evidencia.",
        variant: "destructive",
      });
      return;
    }

    if (!activeRoute) {
      toast({
        title: "Sin ruta activa",
        description: "Debes tener una ruta activa para registrar gastos.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      let finalPhotoUrl = null;

      toast({ title: "Subiendo evidencia...", description: "Por favor espera." });
      const fileExt = photo.name.split('.').pop() || 'jpg';
      const fileName = `exp_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${activeRoute.id}/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('evidencias')
        .upload(filePath, photo);

      if (uploadError) {
        console.error("Error uploading photo:", uploadError);
        toast({ title: "Advertencia", description: "El gasto se guardará pero la foto no pudo subirse.", variant: "destructive" });
      } else if (data) {
        const { data: publicUrlData } = supabase.storage
          .from('evidencias')
          .getPublicUrl(filePath);
        
        finalPhotoUrl = publicUrlData.publicUrl;
      }

      const amountNum = parseFloat(amount);
      const newNode = {
        journey_id: activeRoute.id,
        node_id: `exp-${Date.now()}`,
        type: 'expense',
        label: selectedCategory?.label || "Otro",
        time_str: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'completed',
        sequence_order: Date.now(),
        details: {
          description: notes,
          photoUrl: finalPhotoUrl,
          photosCount: finalPhotoUrl ? 1 : 0,
          amount: amountNum
        }
      };

      await supabase.from('journey_nodes').insert([newNode]);
      
      const currentSpentStr = activeRoute.spent || "$0";
      const currentSpent = parseInt(currentSpentStr.replace(/[^\d-]/g, '') || '0', 10);
      const newSpent = currentSpent + amountNum;
      
      const currentFundStr = activeRoute.fund || "$0";
      const currentFund = parseInt(currentFundStr.replace(/[^\d-]/g, '') || '0', 10);
      const newFund = currentFund - amountNum;
      
      await supabase.from('active_journeys').update({ 
        spent: `$${newSpent.toLocaleString('es-CO')}`,
        fund: `$${newFund.toLocaleString('es-CO')}`
      }).eq('id', activeRoute.id);
      
      await supabase.from('expenses').insert([{
        journey_id: activeRoute.id,
        amount: amountNum,
        description: notes,
        category: selectedCategory?.label || "Otro"
      }]);

      toast({
        title: "Gasto reportado",
        description: `El gasto de ${selectedCategory?.label} por $${amountNum.toLocaleString('es-CO')} ha sido enviado.`,
      });
      setIsModalOpen(false);
    } catch (e) {
      console.error(e);
      toast({ title: "Error", description: "No se pudo registrar el gasto.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-md p-4 flex flex-col gap-6 pt-8">
        
        {/* Header Section */}
        <div className="text-center mb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white mb-4 shadow-lg">
            <Truck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Reporte de Gastos</h1>
          <p className="text-slate-500 text-sm mt-1">Selecciona la categoría del gasto para subir tu evidencia</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-4">
          {EXPENSE_CATEGORIES.map((category) => (
            <motion.div whileTap={{ scale: 0.95 }} key={category.id}>
              <Card 
                className="cursor-pointer hover:shadow-md transition-shadow border-none shadow-sm h-full"
                onClick={() => handleCategoryClick(category)}
              >
                <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-3 h-full">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${category.lightColor} ${category.textColor} mb-1`}>
                    <category.icon className="w-7 h-7" />
                  </div>
                  <span className="font-semibold text-slate-700">{category.label}</span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expense Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-[95vw] max-w-md rounded-2xl p-0 overflow-hidden bg-white max-h-[90vh] overflow-y-auto">
          <div className={`h-2 w-full ${selectedCategory?.color || 'bg-primary'}`}></div>
          
          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
            <DialogHeader className="text-left space-y-0 pb-2">
              <div className="flex items-center gap-3 mb-1">
                <div className={`p-2 rounded-lg ${selectedCategory?.lightColor} ${selectedCategory?.textColor}`}>
                  {selectedCategory && <selectedCategory.icon className="w-6 h-6" />}
                </div>
                <DialogTitle className="text-xl">Gasto de {selectedCategory?.label}</DialogTitle>
              </div>
              <DialogDescription>
                Ingresa el monto exacto y adjunta una foto clara de la factura o recibo.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-base font-semibold">Monto del gasto</Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium text-lg">$</span>
                  <Input 
                    id="amount" 
                    type="number" 
                    step="0.01"
                    placeholder="0.00" 
                    className="pl-8 text-lg py-6 rounded-xl bg-slate-50 border-slate-200"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Photo Upload - Mobile Native Capture */}
              <div className="space-y-2">
                <Label className="text-base font-semibold">Evidencia (Foto)</Label>
                
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handlePhotoCapture}
                />
                
                {!photoPreview ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-slate-700">Tomar foto o subir</p>
                      <p className="text-sm text-slate-500 mt-1">Obligatorio para procesar el gasto</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                    <img src={photoPreview} alt="Evidencia" className="w-full h-48 object-cover" />
                    <Button 
                      type="button"
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-2 right-2 rounded-full w-8 h-8 opacity-90"
                      onClick={() => {
                        setPhoto(null);
                        setPhotoPreview(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2 flex items-center justify-between">
                      <span className="text-white text-xs font-medium truncate px-2">{photo?.name || 'Foto adjunta'}</span>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        className="text-white hover:text-white hover:bg-white/20 h-7 text-xs"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Cambiar
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Notes Input */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-base font-semibold">Detalles adicionales <span className="text-slate-400 font-normal">(Opcional)</span></Label>
                <Textarea 
                  id="notes" 
                  placeholder="Ej. Cambio de aceite en taller..." 
                  className="resize-none rounded-xl bg-slate-50 border-slate-200"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                />
              </div>
            </div>

            <DialogFooter className="mt-2 flex-col sm:flex-col gap-2">
              <Button type="submit" disabled={isSubmitting} className="w-full py-6 text-lg rounded-xl font-semibold shadow-md bg-primary hover:bg-primary/90" size="lg">
                {isSubmitting ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Upload className="w-5 h-5 mr-2" />}
                Registrar Gasto
              </Button>
              <Button type="button" disabled={isSubmitting} variant="ghost" className="w-full py-6 text-slate-500" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
