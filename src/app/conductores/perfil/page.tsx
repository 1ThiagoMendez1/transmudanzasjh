"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Target, TrendingUp, Medal, ShieldCheck, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export default function PerfilConductor() {
  // Simulated data for demonstration
  const driver = {
    name: "Sin Nombre",
    photo: "",
    level: "Nivel 1",
    points: 0,
    nextLevelPoints: 1000,
    status: "Disponible",
    completedRoutes: 0,
  };

  const progressPercentage = (driver.points / driver.nextLevelPoints) * 100;

  const achievements: any[] = [];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-md p-4 flex flex-col gap-6 pt-8">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
              <AvatarImage src={driver.photo} alt={driver.name} />
              <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">CM</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mt-4">{driver.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
              <Medal className="w-3 h-3 mr-1" />
              {driver.level}
            </Badge>
            <span className="text-sm text-slate-500">• {driver.status}</span>
          </div>
        </div>

        {/* Gamification / Points Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-none shadow-md bg-gradient-to-br from-primary to-primary/80 text-white overflow-hidden relative">
            <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4">
              <Trophy className="w-32 h-32" />
            </div>
            <CardContent className="p-6 relative z-10">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">Tus Puntos Totales</p>
                  <h2 className="text-4xl font-extrabold flex items-center gap-2">
                    {driver.points} <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  </h2>
                </div>
                <div className="text-right">
                  <p className="text-blue-100 text-xs">Próximo Nivel</p>
                  <p className="font-bold">{driver.nextLevelPoints} pts</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium text-blue-100">
                  <span>Progreso de Nivel</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2 bg-blue-900/50" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{driver.completedRoutes}</p>
                <p className="text-xs text-slate-500 font-medium">Rutas Completadas</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">98%</p>
                <p className="text-xs text-slate-500 font-medium">Precisión de Entrega</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Últimos Logros
          </h3>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <motion.div 
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
              >
                <Card className="border-none shadow-sm">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${achievement.bg} ${achievement.color}`}>
                      <achievement.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800">{achievement.title}</h4>
                      <p className="text-xs text-slate-500">{achievement.date}</p>
                    </div>
                    <div className="font-bold text-green-600 text-sm">
                      +50 pts
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// Inline simple badge component since it wasn't clear if shadcn badge is installed globally in this file
function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </span>
  )
}
