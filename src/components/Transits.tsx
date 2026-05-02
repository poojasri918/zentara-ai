import { motion, AnimatePresence } from "motion/react";
import { Zap, Bell, Clock, Info, ArrowRight, BellOff } from "lucide-react";
import React, { useState, useEffect } from "react";
import { GlassCard } from "./GlassCard.tsx";
import { MOCK_TRANSITS } from "../constants.ts";

export function Transits() {
  const [reminders, setReminders] = useState<string[]>(() => {
    const saved = localStorage.getItem('zentara_active_reminders');
    return saved ? JSON.parse(saved) : [];
  });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('zentara_active_reminders', JSON.stringify(reminders));
  }, [reminders]);

  const toggleReminder = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setReminders(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-md mx-auto w-full pb-32 px-6 pt-24 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
            <h1 className="font-serif text-3xl font-bold">Celestial Events</h1>
            <p className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em] font-bold">Active Planetary Transits</p>
        </div>
        <div className="size-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-primary">
            <Zap className="size-6 fill-primary/20" />
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_TRANSITS.map((transit, i) => {
          const transitId = `${transit.planet}-${transit.sign}-${transit.date}`;
          const isReminded = reminders.includes(transitId);
          const isExpanded = expandedId === transitId;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : transitId)}
                className={`w-full text-left bg-white/[0.02] border transition-all duration-300 rounded-[32px] p-6 relative overflow-hidden group outline-none ${
                    isExpanded ? 'border-indigo-500/40 bg-white/[0.05]' : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                  <Clock className="size-16" />
                </div>
                
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                          {transit.planet === 'Saturn' ? '🪐' : transit.planet === 'Mars' ? '🔴' : transit.planet === 'Venus' ? '✨' : transit.planet === 'Mercury' ? '☄️' : '🌟'}
                      </div>
                      <div>
                          <h4 className="font-bold text-base text-white">{transit.planet} in {transit.sign}</h4>
                          <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-primary border border-indigo-500/30 font-mono tracking-tighter">Planetary Cycle</span>
                              <span className="text-[10px] text-slate-500 font-mono italic">{transit.date}</span>
                          </div>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => toggleReminder(e, transitId)}
                      className={`p-2.5 rounded-full border transition-all active:scale-90 ${
                        isReminded 
                          ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(129,140,248,0.2)]' 
                          : 'bg-white/5 border-white/10 text-slate-400 hover:border-primary/50 hover:text-primary focus:border-primary/50'
                      }`}
                      title={isReminded ? "Remove Reminder" : "Set Reminder"}
                    >
                      {isReminded ? <BellOff className="size-4" /> : <Bell className="size-4" />}
                    </button>
                  </div>

                  <p className={`text-sm text-slate-300 leading-relaxed font-sans transition-all duration-300 ${isExpanded ? '' : 'line-clamp-2'}`}>
                      {transit.description}
                  </p>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden space-y-4"
                      >
                        <div className="h-px bg-white/10 w-full" />
                        <div className="grid grid-cols-2 gap-4 pt-2">
                           <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                              <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Energy Influence</p>
                              <p className="text-xs text-white font-medium">Global Receptivity</p>
                           </div>
                           <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                              <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Duration</p>
                              <p className="text-xs text-white font-medium">14 Galactic Hours</p>
                           </div>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed italic">
                          "During this {transit.planet} transit, the collective unconscious undergoes a subtle shift. Pay attention to recurring numbers and fleeting dreams."
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                          <Info className="size-3 text-indigo-400" />
                          {isExpanded ? 'Full Insight Active' : 'Minor Influence'}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-primary uppercase tracking-widest group-hover:gap-2 transition-all">
                          {isExpanded ? 'Collapse' : 'Details'} <ArrowRight className={`size-3 transition-transform ${isExpanded ? '-rotate-90' : ''}`} />
                      </div>
                  </div>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      <GlassCard className="border-electric-blue/20 bg-electric-blue/5">
        <div className="flex items-center gap-4">
            <div className="size-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-primary">
                <Bell className="size-6 animate-bounce" />
            </div>
            <div>
                <p className="text-sm font-bold">Upcoming: Solar Eclipse</p>
                <p className="text-xs text-slate-500">Oct 2 in Libra • Powerful transformation portal. Reminders are automatically synced with your cosmic calendar.</p>
            </div>
        </div>
      </GlassCard>
    </div>
  );
}
