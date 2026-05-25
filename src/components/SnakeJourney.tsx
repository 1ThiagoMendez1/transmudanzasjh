"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  MapPin, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export type JourneyNode = {
  id: string;
  type: 'start' | 'loading' | 'stop' | 'delivery' | 'expense' | 'return' | 'closure';
  label: string;
  time: string;
  status: 'completed' | 'current' | 'pending';
  isExtra?: boolean;
  isOriginalFinal?: boolean;
  details?: {
    client?: string;
    address?: string;
    amount?: number;
    description?: string;
    sender?: string;
    sendDate?: string;
    receiver?: string;
    receiveDate?: string;
    photosCount?: number;
  };
};

interface SnakeJourneyProps {
  nodes: JourneyNode[];
  onNodeClick?: (node: JourneyNode) => void;
}

export function SnakeJourney({ nodes, onNodeClick }: SnakeJourneyProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const getIcon = (type: JourneyNode['type']) => {
    switch (type) {
      case 'start': return MapPin;
      case 'loading': return Package;
      case 'stop': return Clock;
      case 'delivery': return CheckCircle2;
      case 'expense': return CreditCard;
      case 'return': return Truck;
      case 'closure': return AlertCircle;
      default: return MapPin;
    }
  };

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center px-20">
      <svg className="absolute inset-0 w-full h-full snake-container" preserveAspectRatio="none">
        <defs>
          <linearGradient id="snakeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
        </defs>
        
        {/* Animated Background Path */}
        <motion.path
          d={`M 100 200 Q 300 100 500 200 T 900 200`}
          fill="transparent"
          stroke="hsl(var(--muted))"
          strokeWidth="12"
          strokeLinecap="round"
          className="opacity-20"
        />
        
        {/* Active Path */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d={`M 100 200 Q 300 100 500 200 T 900 200`}
          fill="transparent"
          stroke="url(#snakeGradient)"
          strokeWidth="14"
          strokeLinecap="round"
          className="drop-shadow-sm"
        />
      </svg>

      <div className="relative w-full h-full flex items-center justify-between z-10">
        {nodes.map((node, index) => {
          const Icon = getIcon(node.type);
          const isLast = index === nodes.length - 1;
          
          return (
            <div 
              key={node.id} 
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => onNodeClick?.(node)}
            >
              <motion.div
                whileHover={{ scale: 1.2, y: -5 }}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg",
                  node.isExtra ? "ring-4 ring-amber-500/30" : "",
                  node.status === 'completed' ? (node.isExtra ? "bg-amber-500 text-white" : "bg-primary text-white") :
                  node.status === 'current' ? `bg-white border-4 ${node.isExtra ? 'border-amber-500 text-amber-500' : 'border-primary text-primary'} snake-node-active animate-pulse` :
                  "bg-muted text-muted-foreground"
                )}
              >
                <Icon size={24} />
              </motion.div>
              {node.isOriginalFinal && (
                <div className="absolute -top-3 bg-secondary text-secondary-foreground text-[9px] font-bold px-2 py-0.5 rounded-full border border-background shadow-sm whitespace-nowrap z-20">
                  Destino Inicial
                </div>
              )}
              {node.isExtra && (
                <div className="absolute -top-3 bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-background shadow-sm whitespace-nowrap z-20">
                  Ruta Extra
                </div>
              )}
              
              <div className="absolute top-16 text-center w-32">
                <p className="font-bold text-sm text-foreground">{node.label}</p>
                <p className="text-xs text-muted-foreground">{node.time}</p>
              </div>

              <AnimatePresence>
                {hoveredNode === node.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute bottom-20 z-50 w-64 glass-card p-4 rounded-2xl pointer-events-none"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={node.status === 'completed' ? 'default' : 'secondary'}>
                        {node.type.toUpperCase()}
                      </Badge>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground">{node.status}</span>
                    </div>
                    {node.details && (
                      <div className="space-y-2">
                        {node.details.client && (
                          <p className="text-sm font-semibold text-foreground">Cliente: {node.details.client}</p>
                        )}
                        {node.details.sender && (
                          <p className="text-xs text-foreground"><span className="font-bold">De:</span> {node.details.sender}</p>
                        )}
                        {node.details.receiver && (
                          <p className="text-xs text-foreground"><span className="font-bold">Para:</span> {node.details.receiver}</p>
                        )}
                        {node.details.address && (
                          <p className="text-xs text-muted-foreground truncate">{node.details.address}</p>
                        )}
                        {node.details.amount && (
                          <p className="text-sm font-bold text-primary">${node.details.amount.toLocaleString()}</p>
                        )}
                        {node.details.description && (
                          <p className="text-[11px] italic text-muted-foreground">{node.details.description}</p>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}