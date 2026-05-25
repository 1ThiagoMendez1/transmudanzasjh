
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FileText, 
  Truck, 
  Search, 
  Settings, 
  BarChart3, 
  Box,
  Home,
  Map,
  Wallet,
  Users
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/rutas-activas', label: 'Rutas Activas', icon: Map },
  { href: '/quotes', label: 'Cotizaciones', icon: FileText },
  { href: '/fleet', label: 'Flota', icon: Truck },
  { href: '/warehouse', label: 'Bodegaje', icon: Box },
  { href: '/finanzas', label: 'Finanzas', icon: Wallet },
  { href: '/personal', label: 'Personal', icon: Users },
  { href: '/reports', label: 'Reportes', icon: BarChart3 },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-6 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 z-50 pointer-events-none w-[calc(100%-2rem)] md:w-auto">
      <div className="flex flex-row md:flex-col justify-between md:justify-start gap-1 md:gap-4 p-2 md:p-3 glass-card rounded-2xl pointer-events-auto bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl">
        <div className="hidden md:block p-2 mb-4">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">
            T
          </div>
        </div>
        
        <div className="flex flex-row md:flex-col w-full justify-around md:justify-start gap-1 md:gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "group relative p-3 md:p-3 rounded-xl transition-all duration-300 flex items-center justify-center",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/25" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5 md:w-[22px] md:h-[22px]" />
                <span className="hidden md:block absolute left-full ml-4 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
        
        <div className="hidden md:block mt-8 pt-4 border-t border-muted">
          <button className="p-3 w-full flex justify-center text-muted-foreground hover:text-foreground rounded-xl transition-colors">
            <Search size={22} />
          </button>
          <button className="p-3 w-full flex justify-center text-muted-foreground hover:text-foreground rounded-xl transition-colors mt-2">
            <Settings size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}
