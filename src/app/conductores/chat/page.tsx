"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MapPin, Camera, MoreVertical, Truck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ConductoresChat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages([...messages, {
      id: messages.length + 1,
      sender: "Carlos Martínez",
      text: newMessage,
      isSystem: false,
      isMe: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: "https://i.pravatar.cc/150?u=carlos"
    }]);
    setNewMessage("");
  };

  return (
    <div className="w-full h-full flex flex-col relative">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 p-4 flex items-center justify-between shadow-sm z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-slate-800 leading-tight">Canal de Ruta Global</h1>
            <p className="text-xs text-green-600 font-medium">12 conductores en línea</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-slate-500">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </header>

      {/* Chat Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 space-y-4 bg-slate-50"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.isSystem ? 'justify-center' : msg.isMe ? 'justify-end' : 'justify-start'}`}
            >
              {msg.isSystem ? (
                <div className="bg-slate-200/60 text-slate-500 text-xs px-3 py-1.5 rounded-full font-medium">
                  {msg.text}
                </div>
              ) : (
                <div className={`flex gap-2 max-w-[85%] ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                  {!msg.isMe && (
                    <Avatar className="w-8 h-8 flex-shrink-0 mt-1">
                      <AvatarImage src={msg.avatar} />
                      <AvatarFallback>{msg.sender[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                    {!msg.isMe && <span className="text-xs text-slate-500 ml-1 mb-1">{msg.sender}</span>}
                    <div className={`px-4 py-2.5 rounded-2xl shadow-sm text-sm ${msg.isMe ? 'bg-primary text-white rounded-tr-sm' : 'bg-white text-slate-800 border border-slate-100 rounded-tl-sm'}`}>
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 mx-1">{msg.time}</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-slate-200 p-3 pt-2 sticky bottom-0 z-10">
        <form onSubmit={handleSend} className="flex items-end gap-2">
          <div className="flex flex-col gap-2">
            <Button type="button" variant="ghost" size="icon" className="w-10 h-10 rounded-full text-slate-500 bg-slate-50 hover:bg-slate-100 shrink-0">
              <Camera className="w-5 h-5" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="w-10 h-10 rounded-full text-slate-500 bg-slate-50 hover:bg-slate-100 shrink-0">
              <MapPin className="w-5 h-5" />
            </Button>
          </div>
          <div className="relative flex-1">
            <Input 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="pr-12 rounded-full border-slate-300 bg-slate-50 focus-visible:ring-primary min-h-[44px]"
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={!newMessage.trim()}
              className="absolute right-1 top-1 bottom-1 w-9 h-9 rounded-full bg-primary hover:bg-primary/90 text-white disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
