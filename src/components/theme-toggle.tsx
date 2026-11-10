"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // If the initial theme is system, we determine the actual one so the button shows correctly,
  // but for the toggle action, we just alternate between 'light' and 'dark'.
  const isDark = theme === "dark" || (theme === "system" && typeof window !== 'undefined' && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-xl transition-colors relative group"
      title="Cambiar Tema"
    >
      {isDark ? <Moon size={22} /> : <Sun size={22} />}
      
      <span className="hidden md:block absolute left-full ml-4 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {isDark ? "Modo Oscuro" : "Modo Claro"}
      </span>
    </button>
  );
}
