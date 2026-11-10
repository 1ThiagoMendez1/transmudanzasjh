"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Receipt, MessageCircle, User, Map } from "lucide-react";
import { motion } from "framer-motion";

export default function ConductoresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { path: "/conductores/rutas", icon: Map, label: "Rutas" },
    { path: "/conductores/gastos", icon: Receipt, label: "Gastos" },
    { path: "/conductores/chat", icon: MessageCircle, label: "Chat" },
    { path: "/conductores/perfil", icon: User, label: "Perfil" },
  ];

  return (
    <div className="h-[100dvh] bg-slate-50 flex flex-col overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-16">
        {children}
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className="relative flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-500 hover:text-primary transition-colors"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute -top-[1px] w-12 h-1 bg-primary rounded-b-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon
                  className={`w-6 h-6 transition-transform ${
                    isActive ? "text-primary scale-110" : "text-slate-400"
                  }`}
                />
                <span
                  className={`text-[10px] font-medium ${
                    isActive ? "text-primary" : "text-slate-400"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
