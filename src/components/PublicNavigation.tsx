"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Truck, ChevronDown, Menu, MapPin, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';

export function PublicNavigation({ scrolled }: { scrolled: boolean }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper to determine if a route is active
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Para tu hogar', path: '/hogar' },
    { name: 'Para tu empresa', path: '/para-tu-empresa' },
    { name: '¿Qué hacemos?', path: '/que-hacemos' },
    { name: 'Conócenos', path: '/conocenos' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-500",
      scrolled ? 'bg-primary/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
    )}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-white">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 font-black text-xl md:text-2xl tracking-tighter cursor-pointer group z-50 relative">
          <Truck size={28} className="group-hover:translate-x-1 transition-transform" />
          <span>TRANSMUDANZAS <span className="font-light">JH</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 font-semibold text-sm tracking-wide">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path} 
              className={cn(
                "relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-white after:transition-all",
                isActive(link.path) ? "after:w-full" : "after:w-0 hover:after:w-full"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Dropdown Hablemos */}
          <div className="relative group/nav">
            <a href="/#contacto" className="relative flex items-center gap-1 py-3 px-4 -ml-4 group-hover/nav:bg-[#9b59b6] transition-colors rounded-t-sm">
              Hablemos <ChevronDown size={14} className="group-hover/nav:rotate-180 transition-transform duration-300" />
            </a>
            <div className="absolute top-full left-[-16px] w-64 bg-[#5e3c79] text-white shadow-xl opacity-0 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:pointer-events-auto transition-all duration-300 rounded-b-md rounded-tr-md overflow-hidden z-50">
              <Link href="/faq" className="block px-6 py-4 hover:bg-[#7b4d9e] transition-colors text-sm font-medium">FAQ</Link>
              <Link href="/trabaja-con-nosotros" className="block px-6 py-4 hover:bg-[#7b4d9e] transition-colors text-sm font-medium">Trabaja con nosotros</Link>
            </div>
          </div>
          
          <Link href="/portal-cliente" className="ml-4 border border-white/30 hover:bg-white hover:text-primary transition-colors px-6 py-2 rounded-full font-bold text-sm">
            Portal
          </Link>
        </div>

        {/* Mobile Navigation Toggle (Sheet) */}
        <div className="md:hidden flex items-center">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Menu size={28} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-primary border-none text-white w-full sm:w-[400px] p-0 flex flex-col">
              <SheetHeader className="p-6 border-b border-white/10 text-left">
                <SheetTitle className="text-white flex items-center gap-2 font-black text-2xl tracking-tighter">
                  <Truck size={24} />
                  <span>TRANSMUDANZAS <span className="font-light">JH</span></span>
                </SheetTitle>
              </SheetHeader>
              
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.path} 
                      href={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "text-lg font-bold transition-all py-2 border-b border-white/10",
                        isActive(link.path) ? "text-purple-200" : "text-white hover:text-purple-200"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link href="/faq" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-white hover:text-purple-200 transition-all py-2 border-b border-white/10">FAQ</Link>
                  <Link href="/trabaja-con-nosotros" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-white hover:text-purple-200 transition-all py-2 border-b border-white/10">Trabaja con nosotros</Link>
                </div>
              </div>

              <div className="p-6 border-t border-white/10 bg-white/5 space-y-4">
                <Link href="/portal-cliente" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full rounded-full bg-white text-primary hover:bg-gray-100 font-bold h-12 text-lg">
                    Portal de Clientes
                  </Button>
                </Link>
                <div className="flex justify-center text-sm font-medium text-white/50 pt-2">
                  <MapPin size={16} className="mr-2 inline" /> Cobertura Nacional
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
