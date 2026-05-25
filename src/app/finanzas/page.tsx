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
  DollarSign,
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

const financialKpis = [
  { title: "Balance Total", value: "$124.5M", change: "+5.2%", trend: "up", icon: Landmark },
  { title: "Ingresos (Mes)", value: "$45.2M", change: "+12.5%", trend: "up", icon: TrendingUp },
  { title: "Egresos (Mes)", value: "$28.4M", change: "-2.1%", trend: "down", icon: TrendingDown },
  { title: "Caja Menor", value: "$1.2M", change: "Estable", trend: "neutral", icon: Wallet },
];

const accountsData = [
  { id: 1, name: 'Bancolombia - Cuenta Corriente', type: 'Corriente', balance: '$45,000,000', number: '**** 4567', icon: Landmark, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 2, name: 'Davivienda - Cuenta Ahorros', type: 'Ahorros', balance: '$68,500,000', number: '**** 8901', icon: PiggyBank, color: 'text-red-500', bg: 'bg-red-500/10' },
  { id: 3, name: 'Fondo de Emergencia', type: 'Inversión', balance: '$15,000,000', number: 'Fiducuenta', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
];

const creditData = [
  { id: 1, name: 'Crédito Vehicular NPR', bank: 'Banco de Bogotá', total: '$85,000,000', paid: '$35,000,000', nextPayment: '$2,500,000', dueDate: '15 Mayo 2026', progress: 41 },
  { id: 2, name: 'Tarjeta de Crédito Empresarial', bank: 'Bancolombia', total: '$20,000,000', paid: '$5,000,000', nextPayment: '$800,000', dueDate: '05 Mayo 2026', progress: 25 },
];

const recentTransactions = [
  { id: 1, desc: 'Pago Nómina 1ra Quincena', category: 'Nómina', amount: '-$12,500,000', date: 'Hoy, 09:00 AM', type: 'expense' },
  { id: 2, desc: 'Anticipo Servicio Mudanza Bogotá', category: 'Ingresos', amount: '+$3,200,000', date: 'Ayer, 02:30 PM', type: 'income' },
  { id: 3, desc: 'Mantenimiento Vehículo (Placa ABC-123)', category: 'Operativa', amount: '-$850,000', date: '28 Abr 2026', type: 'expense' },
  { id: 4, desc: 'Recarga Caja Menor', category: 'Transferencia', amount: '+$500,000', date: '27 Abr 2026', type: 'income' },
];

export default function Finanzas() {
  const [activeTab, setActiveTab] = useState('resumen');
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState<any>(null);
  const [isCreditDialogOpen, setIsCreditDialogOpen] = useState(false);
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
  const [isAddCreditOpen, setIsAddCreditOpen] = useState(false);

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
          <Dialog>
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
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">Tipo</Label>
                  <select id="type" className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <option value="ingreso">Ingreso</option>
                    <option value="egreso">Egreso</option>
                    <option value="transferencia">Transferencia</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="account" className="text-right">Cuenta</Label>
                  <select id="account" className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <option value="bancolombia">Bancolombia (Corriente)</option>
                    <option value="davivienda">Davivienda (Ahorros)</option>
                    <option value="caja_menor">Caja Menor</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">Monto</Label>
                  <Input id="amount" type="number" placeholder="Ej. 150000" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">Categoría</Label>
                  <Input id="category" placeholder="Ej. Nómina, Combustible" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="desc" className="text-right">Descripción</Label>
                  <Input id="desc" placeholder="Detalles del movimiento" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Guardar Movimiento</Button>
              </DialogFooter>
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
                      kpi.trend === 'up' ? "text-green-600 bg-green-500/10" : 
                      kpi.trend === 'down' ? "text-red-600 bg-red-500/10" : 
                      "text-muted-foreground bg-muted"
                    )}>
                      {kpi.trend === 'up' && <ArrowUpRight size={14} className="mr-1" />}
                      {kpi.trend === 'down' && <ArrowDownRight size={14} className="mr-1" />}
                      {kpi.trend === 'neutral' && <Activity size={14} className="mr-1" />}
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
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">Ver todas</Button>
                <Button size="sm" className="rounded-xl gap-1" onClick={() => setIsAddAccountOpen(true)}><Plus size={14} /> Agregar</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {accountsData.map((account) => {
                  const Icon = account.icon;
                  return (
                    <div 
                      key={account.id} 
                      onClick={() => {
                        setSelectedAccount(account);
                        setIsAccountDialogOpen(true);
                      }}
                      className="p-4 rounded-xl border border-muted/50 hover:border-primary/30 transition-all cursor-pointer hover:-translate-y-1 shadow-sm hover:shadow-md bg-background/50 backdrop-blur-sm"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className={cn("p-2 rounded-lg", account.bg, account.color)}>
                          <Icon size={20} />
                        </div>
                        <span className="text-[10px] font-bold px-2 py-1 bg-muted rounded-full uppercase">{account.type}</span>
                      </div>
                      <h4 className="font-semibold text-sm mb-1 truncate" title={account.name}>{account.name}</h4>
                      <p className="text-xs text-muted-foreground mb-3">{account.number}</p>
                      <p className="text-xl font-bold">{account.balance}</p>
                    </div>
                  );
                })}
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
              <Button size="sm" className="rounded-xl gap-1" onClick={() => setIsAddCreditOpen(true)}><Plus size={14} /> Agregar</Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {creditData.map((credit) => (
                <div 
                  key={credit.id} 
                  onClick={() => {
                    setSelectedCredit(credit);
                    setIsCreditDialogOpen(true);
                  }}
                  className="p-4 rounded-xl border border-muted/50 bg-background/50 hover:border-primary/30 transition-all cursor-pointer hover:-translate-y-1 shadow-sm hover:shadow-md"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h4 className="font-bold">{credit.name}</h4>
                      <p className="text-sm text-muted-foreground">{credit.bank}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-sm text-muted-foreground">Próximo Pago: <span className="font-bold text-foreground">{credit.dueDate}</span></p>
                      <p className="text-lg font-bold text-destructive">{credit.nextPayment}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span>Pagado: {credit.paid}</span>
                      <span>Total: {credit.total}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${credit.progress}%` }}></div>
                    </div>
                    <p className="text-right text-[10px] text-muted-foreground font-bold">{credit.progress}% Completado</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          {/* Análisis Financiero Chart Placeholder */}
          <Card className="glass-card border-white/20 dark:border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold">Análisis Financiero (Ingresos vs Egresos)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full flex items-end justify-between gap-4 pt-8 pb-2 relative">
                {/* Horizontal lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 pt-8">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-full h-px bg-muted/50"></div>
                  ))}
                </div>
                
                {/* Bars */}
                {[...Array(6)].map((_, i) => {
                  const heightIncome = 40 + Math.random() * 60;
                  const heightExpense = 20 + Math.random() * (heightIncome - 10);
                  return (
                    <div key={i} className="w-full flex justify-center items-end gap-1 group z-10">
                      <div className="w-1/3 bg-primary/80 hover:bg-primary rounded-t-md transition-colors" style={{ height: `${heightIncome}%` }}></div>
                      <div className="w-1/3 bg-destructive/80 hover:bg-destructive rounded-t-md transition-colors" style={{ height: `${heightExpense}%` }}></div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground font-medium uppercase mt-2 px-2">
                <span>Nov</span><span>Dic</span><span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span>
              </div>
              <div className="flex justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary rounded-sm"></div>Ingresos</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-destructive rounded-sm"></div>Egresos</div>
              </div>
            </CardContent>
          </Card>

        </div>

        <div className="space-y-8">
          
          {/* Caja Menor Widget */}
          <Card className="glass-card border-white/20 dark:border-white/10 bg-gradient-to-br from-background to-primary/5">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Wallet size={20} className="text-primary" />
                Caja Menor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4 mb-6 border-b border-muted">
                <p className="text-sm text-muted-foreground mb-1">Saldo Disponible</p>
                <p className="text-4xl font-black text-foreground">$1,250,000</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Button variant="outline" className="w-full rounded-xl gap-2 border-primary/20 hover:bg-primary/10 text-primary">
                  <TrendingUp size={16} /> Recarga
                </Button>
                <Button variant="outline" className="w-full rounded-xl gap-2 border-destructive/20 hover:bg-destructive/10 text-destructive">
                  <TrendingDown size={16} /> Gasto
                </Button>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">Últimos Movimientos (Caja)</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Peaje La Línea</span>
                    <span className="font-medium text-destructive">-$25,000</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Gasolina Furgón</span>
                    <span className="font-medium text-destructive">-$120,000</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Recarga (Admin)</span>
                    <span className="font-medium text-green-500">+$500,000</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transacciones Generales */}
          <Card className="glass-card border-white/20 dark:border-white/10 h-full">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Transacciones Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex gap-4 items-center">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                      tx.type === 'income' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                    )}>
                      {tx.type === 'income' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{tx.desc}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-muted-foreground">{tx.date}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-muted rounded-md">{tx.category}</span>
                      </div>
                    </div>
                    <div className={cn("font-bold text-sm", tx.type === 'income' ? 'text-green-500' : 'text-foreground')}>
                      {tx.amount}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-6 rounded-xl text-primary">Ver histórico completo</Button>
            </CardContent>
          </Card>
          
        </div>
      </div>

      <Dialog open={isAccountDialogOpen} onOpenChange={setIsAccountDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Análisis de Cuenta</DialogTitle>
            <DialogDescription>
              Detalles y rendimiento de la cuenta seleccionada.
            </DialogDescription>
          </DialogHeader>
          {selectedAccount && (
            <div className="py-4 space-y-6">
              <div className="flex items-center gap-4">
                <div className={cn("p-4 rounded-2xl", selectedAccount.bg, selectedAccount.color)}>
                  <selectedAccount.icon size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedAccount.name}</h3>
                  <p className="text-muted-foreground">{selectedAccount.number} • <span className="uppercase text-xs font-bold px-2 py-0.5 bg-muted rounded-full ml-1">{selectedAccount.type}</span></p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-xl border border-white/5 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Saldo Actual</p>
                  <p className="text-2xl font-bold">{selectedAccount.balance}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl border border-white/5 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Rendimiento (Mes)</p>
                  <p className="text-2xl font-bold text-green-500">+4.2%</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-muted-foreground mb-3 uppercase">Movimientos Recientes</h4>
                <div className="space-y-3">
                  {[
                    { desc: 'Transferencia Recibida', amount: '+$1,200,000', type: 'in', date: 'Hoy' },
                    { desc: 'Pago Proveedores', amount: '-$450,000', type: 'out', date: 'Ayer' },
                    { desc: 'Mantenimiento Cuenta', amount: '-$15,000', type: 'out', date: 'Hace 3 días' },
                  ].map((tx, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div>
                        <p className="font-semibold text-sm">{tx.desc}</p>
                        <p className="text-xs text-muted-foreground">{tx.date}</p>
                      </div>
                      <p className={cn("font-bold text-sm", tx.type === 'in' ? "text-green-500" : "text-foreground")}>
                        {tx.amount}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsAccountDialogOpen(false)}>Cerrar Análisis</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isCreditDialogOpen} onOpenChange={setIsCreditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalle de Crédito / Obligación</DialogTitle>
            <DialogDescription>
              Información detallada, tasas de interés y plan de amortización.
            </DialogDescription>
          </DialogHeader>
          {selectedCredit && (
            <div className="py-4 space-y-6">
              <div className="flex items-center gap-4 border-b border-muted pb-4">
                <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                  <CreditCard size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedCredit.name}</h3>
                  <p className="text-muted-foreground">{selectedCredit.bank} • <span className="uppercase text-xs font-bold px-2 py-0.5 bg-muted rounded-full ml-1">Vigente</span></p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-muted/30 rounded-xl border border-white/5 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Tasa Efectiva</p>
                  <p className="text-lg font-bold text-amber-500">22.4% EA</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-xl border border-white/5 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Cuotas Restantes</p>
                  <p className="text-lg font-bold">24 / 60</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-xl border border-white/5 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Día de Pago</p>
                  <p className="text-lg font-bold">{selectedCredit.dueDate.split(' ')[0]}</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-xl border border-white/5 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Mora</p>
                  <p className="text-lg font-bold text-green-500">0 Días</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-muted-foreground mb-3 uppercase">Próximo Pago</h4>
                <div className="flex justify-between items-center p-4 bg-muted/20 rounded-xl border border-white/10">
                  <div>
                    <p className="text-sm font-semibold mb-1">Cuota Fija Mensual</p>
                    <p className="text-xs text-muted-foreground">Vence el {selectedCredit.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-destructive">{selectedCredit.nextPayment}</p>
                    <p className="text-[10px] text-muted-foreground">Incluye capital e intereses</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span>Pagado: {selectedCredit.paid}</span>
                  <span>Total Aprobado: {selectedCredit.total}</span>
                </div>
                <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${selectedCredit.progress}%` }}></div>
                </div>
                <p className="text-center text-[10px] text-muted-foreground font-bold">{selectedCredit.progress}% del crédito pagado</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsCreditDialogOpen(false)}>Cerrar Detalle</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddAccountOpen} onOpenChange={setIsAddAccountOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar Nueva Cuenta</DialogTitle>
            <DialogDescription>
              Ingresa los datos de la nueva cuenta bancaria o de inversión.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accName" className="text-right">Nombre</Label>
              <Input id="accName" placeholder="Ej. Bancolombia Ahorros" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accType" className="text-right">Tipo</Label>
              <select id="accType" className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <option value="Ahorros">Ahorros</option>
                <option value="Corriente">Corriente</option>
                <option value="Inversión">Inversión</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accNum" className="text-right">Número</Label>
              <Input id="accNum" placeholder="Últimos 4 dígitos" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accBal" className="text-right">Saldo Inicial</Label>
              <Input id="accBal" type="number" placeholder="Ej. 5000000" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsAddAccountOpen(false)}>Guardar Cuenta</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddCreditOpen} onOpenChange={setIsAddCreditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Crédito</DialogTitle>
            <DialogDescription>
              Registra una nueva obligación financiera o tarjeta de crédito.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="credName" className="text-right">Nombre</Label>
              <Input id="credName" placeholder="Ej. Crédito Vehicular" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="credBank" className="text-right">Entidad</Label>
              <Input id="credBank" placeholder="Ej. Banco de Bogotá" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="credTotal" className="text-right">Monto Total</Label>
              <Input id="credTotal" type="number" placeholder="Ej. 85000000" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="credPayment" className="text-right">Cuota Mensual</Label>
              <Input id="credPayment" type="number" placeholder="Ej. 1200000" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsAddCreditOpen(false)}>Guardar Crédito</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
