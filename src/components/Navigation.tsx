"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { logoutAction } from '@/app/actions/auth';
import { ThemeToggle } from '@/components/theme-toggle';
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
  Users,
  UserCog,
  LogOut,
  User,
  Menu,
  MessageSquare
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/rutas-activas', label: 'Rutas Activas', icon: Map },
  { href: '/quotes', label: 'Cotizaciones', icon: FileText },
  { href: '/fleet', label: 'Flota', icon: Truck },
  { href: '/warehouse', label: 'Bodegaje', icon: Box },
  { href: '/finanzas', label: 'Finanzas', icon: Wallet },
  { href: '/personal', label: 'Personal', icon: Users },
  { href: '/usuarios', label: 'Usuarios', icon: UserCog },
  { href: '/reports', label: 'Reportes', icon: BarChart3 },
  { href: '/dashboard/pqrsf', label: 'PQRSF', icon: MessageSquare },
];

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.push('/login');
  };

  const mobileNavItems = navItems.slice(0, 4);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed left-6 top-6 bottom-auto translate-x-0 z-50 pointer-events-none w-auto">
        <div className="flex flex-col justify-start items-center gap-3 p-3 glass-card rounded-2xl pointer-events-auto bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl w-[76px] max-h-[calc(100vh-3rem)] overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex justify-center items-center w-full mb-4 pt-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">
              T
            </div>
          </div>
          
          <div className="flex flex-col w-full justify-start gap-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={cn(
                    "group relative w-12 h-12 rounded-xl transition-all duration-300 flex items-center justify-center",
                    isActive 
                      ? "bg-primary text-white shadow-lg shadow-primary/25" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="w-[22px] h-[22px]" />
                  <span className="absolute left-full ml-4 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
          
          <div className="flex flex-col items-center mt-8 pt-4 border-t border-muted w-full gap-2 pb-2">
            <ThemeToggle />
            <button onClick={() => router.push('/perfil')} className="w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-xl transition-colors relative group">
              <User size={22} />
              <span className="absolute left-full ml-4 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Mi Perfil
              </span>
            </button>
            <button onClick={handleLogout} className="w-12 h-12 flex items-center justify-center text-red-500/70 hover:text-red-500 rounded-xl transition-colors relative group hover:bg-red-500/10">
              <LogOut size={22} />
              <span className="absolute left-full ml-4 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Cerrar Sesión
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="flex md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-[calc(100%-2rem)]">
        <div className="flex flex-row justify-between items-center w-full p-2 glass-card rounded-2xl pointer-events-auto bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl">
          {mobileNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "relative w-12 h-12 rounded-xl transition-all duration-300 flex items-center justify-center",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/25" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
              </Link>
            );
          })}
          
          <Sheet>
            <SheetTrigger asChild>
              <button className="relative w-12 h-12 rounded-xl transition-all duration-300 flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl h-[85vh] p-0 flex flex-col border-none bg-background/95 backdrop-blur-xl">
              <SheetHeader className="p-6 pb-2 text-left border-b border-border">
                <SheetTitle className="text-xl font-black">Menú Principal</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 hide-scrollbar">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link 
                      key={item.href} 
                      href={item.href}
                      className={cn(
                        "flex items-center gap-4 px-4 py-3 rounded-xl transition-all",
                        isActive 
                          ? "bg-primary/10 text-primary font-bold" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground font-medium"
                      )}
                    >
                      <Icon className={cn("w-6 h-6", isActive && "text-primary")} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <div className="p-6 border-t border-border flex flex-col gap-3 bg-muted/30">
                <div className="flex justify-between items-center bg-background rounded-2xl p-2 border border-border">
                  <ThemeToggle />
                  <button onClick={() => router.push('/perfil')} className="w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-xl transition-colors">
                    <User size={22} />
                  </button>
                  <button onClick={handleLogout} className="w-12 h-12 flex items-center justify-center text-red-500/70 hover:text-red-500 rounded-xl transition-colors hover:bg-red-500/10">
                    <LogOut size={22} />
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  );
}
