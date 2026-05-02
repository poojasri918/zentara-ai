import { motion } from "motion/react";
import { Zap, Bell, Clock, Info, ArrowRight, BellOff } from "lucide-react";
import { useState, useEffect } from "react";
import { GlassCard } from "./GlassCard.tsx";
import { MOCK_TRANSITS } from "../constants.ts";

export function Transits() {
  const [reminders, setReminders] = useState<string[]>(() => {
    const saved = localStorage.getItem('zentara_active_reminders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('zentara_active_reminders', JSON.stringify(reminders));
  }, [reminders]);

  const toggleReminder = (id: string) => {
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

      <div className="space-y-6">
        {MOCK_TRANSITS.map((transit, i) => {
          const transitId = `${transit.planet}-${transit.sign}-${transit.date}`;
          const isReminded = reminders.includes(transitId);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Clock className="size-16" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center text-2xl">
                          🪐
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
                      onClick={() => toggleReminder(transitId)}
                      className={`p-2.5 rounded-full border transition-all ${
                        isReminded 
                          ? 'bg-primary/20 border-primary text-primary' 
                          : 'bg-white/5 border-white/10 text-slate-400 hover:border-primary/50 hover:text-primary'
                      }`}
                      title={isReminded ? "Remove Reminder" : "Set Reminder"}
                    >
                      {isReminded ? <BellOff className="size-4" /> : <Bell className="size-4" />}
                    </button>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                      {transit.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                          <Info className="size-3 text-indigo-400" />
                          Minor Influence
                      </div>
                      <button className="flex items-center gap-1 text-[10px] font-bold text-primary uppercase tracking-widest group-hover:gap-2 transition-all">
                          Details <ArrowRight className="size-3" />
                      </button>
                  </div>
                </div>
              </div>
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
