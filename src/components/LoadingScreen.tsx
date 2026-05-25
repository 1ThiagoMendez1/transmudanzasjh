"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Truck } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  const [loadingText, setLoadingText] = useState('Preparando tu mudanza...');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const texts = [
      'Preparando tu mudanza...',
      'Empacando con cuidado...',
      'Cargando el camión...',
      '¡Casi listos para arrancar!'
    ];
    let textIndex = 0;

    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % texts.length;
      setLoadingText(texts[textIndex]);
    }, 1500);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5; // Increases by 5% every 100ms -> 2 seconds to 100%
      });
    }, 100);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground overflow-hidden"
        >
          {/* Background Decorative Circles */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

          {/* Main Content Container */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center max-w-lg w-full px-6"
          >
            {/* Image Container with pulsing effect */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative w-64 h-64 md:w-80 md:h-80 mb-8 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800"
            >
              <Image
                src="/loading_truck.png"
                alt="Camión de Mudanza"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Dynamic Text */}
            <div className="h-12 flex items-center justify-center mb-6">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={loadingText}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-2xl font-bold text-center text-primary"
                >
                  {loadingText}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full h-4 bg-muted rounded-full overflow-hidden relative">
              {/* Moving Truck Icon */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 z-10 text-primary"
                initial={{ left: '-20px' }}
                animate={{ left: `calc(${progress}% - 20px)` }}
                transition={{ ease: "linear", duration: 0.1 }}
              >
                <Truck size={20} className="fill-current" />
              </motion.div>
              
              {/* The progress fill */}
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
