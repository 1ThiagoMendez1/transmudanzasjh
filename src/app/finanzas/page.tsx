"use client";

import React, { useState, useEffect } from 'react';
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
  TrendingUp,
  TrendingDown,
  Landmark,
  PiggyBank,
  CreditCard,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  FileSpreadsheet,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getExpenses, createExpense, Expense } from '@/lib/expenses';
import { useToast } from '@/hooks/use-toast';

export default function Finanzas() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    type: 'egreso',
    category: '',
    amount: '',
    description: '',
    reference: ''
  });

  const { toast } = useToast();

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "No se pudieron cargar los movimientos.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.amount || !newExpense.category || !newExpense.description) return;

    try {
      await createExpense({
        date: new Date().toISOString().split('T')[0],
        category: newExpense.category,
        amount: Number(newExpense.amount),
        description: newExpense.description,
        reference: newExpense.reference || undefined,
        status: 'Pagado'
      });
      toast({ title: "Éxito", description: "Movimiento registrado." });
      setIsAddExpenseOpen(false);
      setNewExpense({ type: 'egreso', category: '', amount: '', description: '', reference: '' });
      fetchExpenses();
    } catch (error) {
      toast({ title: "Error", description: "No se pudo guardar el movimiento.", variant: "destructive" });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount);
  };

  // KPIs en Cero (hasta que haya lógica real)
  const financialKpis = [
    { title: "Balance Total", value: "$0", change: "0%", trend: "neutral", icon: Landmark },
    { title: "Ingresos (Mes)", value: "$0", change: "0%", trend: "neutral", icon: TrendingUp },
    { title: "Egresos (Mes)", value: "$0", change: "0%", trend: "neutral", icon: TrendingDown },
    { title: "Caja Menor", value: "$0", change: "Estable", trend: "neutral", icon: Wallet },
  ];

  return (
    <div className="min-h-screen px-4 pb-24 pt-8 md:pl-[140px] md:pr-8 md:py-8 bg-background max-w-[100vw] overflow-x-hidden">
      <Navigation />
      
      <header className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Centro Financiero</h1>
          <p className="text-muted-foreground">Gestiona tus cuentas, créditos, caja menor y analiza el rendimiento financiero.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl gap-2"><FileSpreadsheet size={16} /> Exportar Excel</Button>
          <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl gap-2 shadow-lg shadow-primary/20"><Plus size={16} /> Nuevo Movimiento</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Registrar Nuevo Movimiento</DialogTitle>
                <DialogDescription>
                  Ingresa los detalles de la transacción financiera.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddExpense}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">Tipo</Label>
                    <select id="type" value={newExpense.type} onChange={(e) => setNewExpense({...newExpense, type: e.target.value})} className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                      <option value="egreso">Egreso (Gasto)</option>
                      <option value="ingreso">Ingreso</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">Monto</Label>
                    <Input id="amount" type="number" required value={newExpense.amount} onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})} placeholder="Ej. 150000" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">Categoría</Label>
                    <Input id="category" required value={newExpense.category} onChange={(e) => setNewExpense({...newExpense, category: e.target.value})} placeholder="Ej. Nómina, Combustible" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="desc" className="text-right">Descripción</Label>
                    <Input id="desc" required value={newExpense.description} onChange={(e) => setNewExpense({...newExpense, description: e.target.value})} placeholder="Detalles del movimiento" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="ref" className="text-right">Referencia (Opcional)</Label>
                    <Input id="ref" value={newExpense.reference} onChange={(e) => setNewExpense({...newExpense, reference: e.target.value})} placeholder="Ej. Placa del vehículo o Factura" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Guardar Movimiento</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {financialKpis.map((kpi, i) => {
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
                      "text-muted-foreground bg-muted"
                    )}>
                      <Activity size={14} className="mr-1" />
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
          
          {/* Cuentas de Ahorro y Bancarias */}
          <Card className="glass-card border-white/20 dark:border-white/10">
            <CardHeader className="pb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-bold">Cuentas Bancarias y Ahorros</CardTitle>
              <Button size="sm" className="rounded-xl gap-1"><Plus size={14} /> Agregar</Button>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                No hay cuentas bancarias registradas.
              </div>
            </CardContent>
          </Card>

          {/* Créditos y Obligaciones */}
          <Card className="glass-card border-white/20 dark:border-white/10">
            <CardHeader className="pb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <CreditCard size={20} className="text-primary" />
                Créditos y Obligaciones
              </CardTitle>
              <Button size="sm" className="rounded-xl gap-1"><Plus size={14} /> Agregar</Button>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                No hay créditos ni obligaciones registradas.
              </div>
            </CardContent>
          </Card>
          
        </div>

        <div className="space-y-8">
          {/* Transacciones Generales */}
          <Card className="glass-card border-white/20 dark:border-white/10 h-full">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Transacciones Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">Cargando transacciones...</div>
              ) : expenses.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No hay transacciones recientes.</div>
              ) : (
                <div className="space-y-5">
                  {expenses.map((tx) => (
                    <div key={tx.id} className="flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-red-500/10 text-red-500">
                        <TrendingDown size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{tx.description}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-muted-foreground">{new Date(tx.date).toLocaleDateString()}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-muted rounded-md">{tx.category}</span>
                        </div>
                      </div>
                      <div className="font-bold text-sm text-foreground">
                        -{formatCurrency(tx.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
        </div>
      </div>

    </div>
  );
}
