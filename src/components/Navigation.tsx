
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
  Home
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/quotes', label: 'Cotizaciones', icon: FileText },
  { href: '/fleet', label: 'Flota', icon: Truck },
  { href: '/warehouse', label: 'Bodegaje', icon: Box },
  { href: '/reports', label: 'Reportes', icon: BarChart3 },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
      <div className="flex flex-col gap-4 p-3 glass-card rounded-2xl pointer-events-auto">
        <div className="p-2 mb-4">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">
            T
          </div>
        </div>
        
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "group relative p-3 rounded-xl transition-all duration-300",
                isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/25" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon size={22} />
              <span className="absolute left-full ml-4 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.label}
              </span>
            </Link>
          );
        })}
        
        <div className="mt-8 pt-4 border-t border-muted">
          <button className="p-3 text-muted-foreground hover:text-foreground rounded-xl transition-colors">
            <Search size={22} />
          </button>
          <button className="p-3 text-muted-foreground hover:text-foreground rounded-xl transition-colors mt-2">
            <Settings size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}
