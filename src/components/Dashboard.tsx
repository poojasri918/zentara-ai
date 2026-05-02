import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Sparkles, Moon, Star, Users, Zap, Calendar as CalendarIcon, MapPin, Target, ShieldAlert, Clock, Activity, Coffee, Brain, Crown, Flame, Wind } from "lucide-react";
import { GlassCard } from "./GlassCard.tsx";
import { UserProfile, HoroscopeReading, ZodiacSign, UserMood } from "../types.ts";
import { generateHoroscope } from "../services/geminiService.ts";
import { ZODIAC_DATA } from "../constants.ts";

interface DashboardProps {
  profile: UserProfile;
  onNavigate: (screen: any) => void;
}

export function Dashboard({ profile, onNavigate }: DashboardProps) {
  const [mood, setMood] = useState<UserMood>('focused');
  const [horoscope, setHoroscope] = useState<HoroscopeReading | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedInsight, setSelectedInsight] = useState<{ title: string; content: string; icon: any } | null>(null);

  useEffect(() => {
    async function fetchHoroscope() {
      setLoading(true);
      const data = await generateHoroscope(profile, mood);
      setHoroscope(data);
      setLoading(false);
    }
    fetchHoroscope();
  }, [profile, mood]);

  const zodiac = ZODIAC_DATA[profile.zodiacSign];

  const moods: { id: UserMood; icon: any; label: string }[] = [
    { id: 'focused', icon: Brain, label: 'Focused' },
    { id: 'anxious', icon: Activity, label: 'Anxious' },
    { id: 'confident', icon: Crown, label: 'Strong' },
    { id: 'flow', icon: Wind, label: 'Flow' },
    { id: 'restless', icon: Flame, label: 'Restless' },
    { id: 'low-energy', icon: Coffee, label: 'Low Energy' },
  ];

  const insightCards = [
    { 
      id: 'focus', 
      title: "Today's Focus", 
      content: horoscope?.focus || "Aligning with your core intention...", 
      icon: Target, 
      color: "text-orange-400", 
      bg: "bg-orange-500/10",
      detail: "The universe is emphasizing this specific area. When your attention converges here, manifestations accelerate. Avoid fragmentation of thought today."
    },
    { 
      id: 'avoid', 
      title: "What to Avoid", 
      content: horoscope?.avoid || "Steering clear of interference...", 
      icon: ShieldAlert, 
      color: "text-red-400", 
      bg: "bg-red-500/10",
      detail: "The current planetary friction suggests these paths lead to energetic exhaustion. Step back and observe rather than engaging directly with these themes."
    },
    { 
      id: 'timing', 
      title: "Lucky Timing", 
      content: horoscope?.luckyTiming || "Calculating synchronicity...", 
      icon: Clock, 
      color: "text-indigo-400", 
      bg: "bg-indigo-500/10",
      detail: "During this window, the local atmospheric density is at its most receptive state for your specific signature. Use this time for important calls or creative work."
    },
    { 
      id: 'sync', 
      title: "Sync Sign", 
      content: horoscope?.compatibleSigns[0] || "Finding resonance...", 
      icon: Users, 
      color: "text-purple-400", 
      bg: "bg-purple-500/10",
      detail: "A soul sharing this sign currently holds a frequency that complements your own. Interactions will feel effortless, and collaboration will yield hybrid results."
    }
  ];

  return (
    <div className="max-w-md mx-auto w-full pb-32 px-6 pt-24 space-y-8 relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-400 p-0.5 shadow-xl shadow-indigo-500/20 rotate-3 transition-transform hover:rotate-0 cursor-default">
            <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-white text-3xl font-serif">
              {zodiac.symbol}
            </div>
          </div>
          <div>
            <p className="text-[10px] text-indigo-400 uppercase font-mono font-bold tracking-widest">Master Seeker</p>
            <h4 className="font-serif font-bold text-xl leading-tight text-white">{profile.name}</h4>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-[10px] text-slate-500 uppercase font-mono mb-1">{profile.ascendant || "Rising Star"}</div>
          <div className="flex items-center gap-2 bg-indigo-500/10 rounded-full px-3 py-1 border border-indigo-500/20">
            <Moon className="size-3 text-indigo-400 animate-pulse" />
            <span className="text-[8px] font-mono font-bold text-indigo-300 uppercase tracking-wider">Lunar Phase 82%</span>
          </div>
        </div>
      </div>

      {/* Mood Selector */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em]">State of Being</h3>
          <span className="text-[10px] text-indigo-400 font-mono">Select current mood</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
          {moods.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                if (loading) return;
                setMood(m.id);
              }}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-2xl border transition-all active:scale-95 ${
                mood === m.id 
                  ? 'bg-indigo-600 border-indigo-500 shadow-lg shadow-indigo-500/30 text-white' 
                  : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10'
              } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <m.icon className={`size-4 ${mood === m.id ? 'text-white' : 'text-slate-500'}`} />
              <span className="text-xs font-bold whitespace-nowrap">{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Horoscope Card */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[42px] opacity-20 blur group-hover:opacity-30 transition duration-1000"></div>
        <div className="relative bg-slate-900 border border-white/10 rounded-[40px] p-8 space-y-6 overflow-hidden min-h-[280px] flex flex-col justify-center">
          <div className="flex items-center justify-between">
             <Star className="size-5 text-indigo-400 fill-indigo-400/20" />
             <div className="text-[10px] text-white/40 font-mono uppercase tracking-[0.4em]">
                {new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
             </div>
             <Sparkles className="size-5 text-purple-400 fill-purple-400/20" />
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center gap-4"
              >
                 <div className="size-16 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                 <p className="text-xs font-mono text-indigo-400 animate-pulse tracking-widest text-center uppercase">Consulting the Alignment</p>
              </motion.div>
            ) : horoscope && (
              <motion.div 
                key="content"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-6 text-center"
              >
                <div className="space-y-2">
                  <h2 className="text-4xl font-serif text-white tracking-tight drop-shadow-sm leading-tight capitalize">
                    {profile.zodiacSign} {mood}
                  </h2>
                  <p className="text-slate-400 leading-relaxed text-base italic px-4">
                    "{horoscope.summary}"
                  </p>
                </div>

                <div className="w-full flex flex-col items-center gap-2 pt-4">
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden text-left">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${horoscope.energyLevel}%` }}
                        />
                    </div>
                    <div className="w-full flex justify-between px-1">
                        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Ethereal Vitality</span>
                        <span className="text-[8px] font-bold text-indigo-400 font-mono">{horoscope.energyLevel}%</span>
                    </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Daily Insights Grid */}
      <div className="grid grid-cols-2 gap-4">
        {insightCards.map((card) => (
          <button
            key={card.id}
            onClick={() => setSelectedInsight({ title: card.title, content: card.content, icon: card.icon })}
            disabled={loading}
            className={`text-left w-full h-full p-6 border border-white/5 bg-white/[0.02] rounded-[32px] space-y-3 transition-all active:scale-95 group hover:border-white/10 ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-white/[0.04]'}`}
          >
            <div className={`size-8 rounded-xl ${card.bg} flex items-center justify-center ${card.color} group-hover:scale-110 transition-transform`}>
              <card.icon className="size-4" />
            </div>
            <div className="space-y-1">
              <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{card.title}</h5>
              <p className="text-xs text-white font-medium line-clamp-2">{card.content}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Chat Prompt */}
      <button 
        onClick={() => onNavigate('chat')}
        className="w-full p-6 bg-gradient-to-r from-indigo-900/40 to-slate-900 rounded-[32px] border border-white/10 flex items-center justify-between group hover:border-indigo-500/30 transition-all active:scale-[0.98]"
      >
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
            <Sparkles className="size-6 text-primary animate-pulse" />
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-white">Ask the Cosmic Oracle</p>
            <p className="text-[10px] text-slate-500 mt-0.5 capitalize">Deep dive into today's {mood} transit</p>
          </div>
        </div>
        <div className="size-10 rounded-full border border-white/10 flex items-center justify-center text-slate-500 group-hover:text-primary group-hover:border-primary/30 transition-all">
          <ArrowUpRight className="size-4" />
        </div>
      </button>

      {/* Insight Modal */}
      <AnimatePresence>
        {selectedInsight && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInsight(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-slate-900 border border-white/10 rounded-[40px] p-8 z-[101] shadow-2xl space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <selectedInsight.icon className="size-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">{selectedInsight.title}</h3>
              </div>
              <div className="space-y-4">
                <p className="text-white text-lg font-medium leading-relaxed italic">"{selectedInsight.content}"</p>
                <div className="h-px bg-white/10 w-full" />
                <p className="text-slate-400 text-sm leading-relaxed">
                  {insightCards.find(c => c.title === selectedInsight.title)?.detail}
                </p>
              </div>
              <button 
                onClick={() => setSelectedInsight(null)}
                className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors"
              >
                Close Guidance
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function ArrowUpRight(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

