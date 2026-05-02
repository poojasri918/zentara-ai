import { motion, AnimatePresence } from "motion/react";
import { Users, Heart, Zap, Shield, Sparkles, ArrowRight, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { GlassCard } from "./GlassCard.tsx";
import { ZodiacSign, UserProfile } from "../types.ts";
import { ZODIAC_DATA } from "../constants.ts";

interface CompatibilityProps {
  userProfile: UserProfile;
}

export function Compatibility({ userProfile }: CompatibilityProps) {
  const [partnerName, setPartnerName] = useState("");
  const [partnerSign, setPartnerSign] = useState<ZodiacSign>(ZodiacSign.Aquarius);
  const [isCalculated, setIsCalculated] = useState(false);

  const calculateCompatibility = () => {
    const elements: Record<string, string[]> = {
      Fire: [ZodiacSign.Aries, ZodiacSign.Leo, ZodiacSign.Sagittarius],
      Earth: [ZodiacSign.Taurus, ZodiacSign.Virgo, ZodiacSign.Capricorn],
      Air: [ZodiacSign.Gemini, ZodiacSign.Libra, ZodiacSign.Aquarius],
      Water: [ZodiacSign.Cancer, ZodiacSign.Scorpio, ZodiacSign.Pisces]
    };

    const getElement = (s: ZodiacSign) => Object.entries(elements).find(([_, signs]) => signs.includes(s))?.[0];
    const e1 = getElement(userProfile.zodiacSign);
    const e2 = getElement(partnerSign);

    let score = 50;
    let title = "Static Resonance";
    if (e1 === e2) {
      score = 95;
      title = "Elemental Twin";
    }
    else if ((e1 === 'Fire' && e2 === 'Air') || (e1 === 'Air' && e2 === 'Fire')) {
      score = 88;
      title = "Radiant Bloom";
    }
    else if ((e1 === 'Earth' && e2 === 'Water') || (e1 === 'Water' && e2 === 'Earth')) {
      score = 82;
      title = "Grounded Flow";
    }
    else if ((e1 === 'Fire' && e2 === 'Earth') || (e1 === 'Air' && e2 === 'Water')) {
      score = 65;
      title = "Creative Friction";
    }
    else {
      score = 42;
      title = "Opposing Vectors";
    }

    return { score, e1, e2, title };
  };

  const { score, e1, e2, title } = calculateCompatibility();

  const getExplanation = () => {
    if (score >= 90) return `As two ${e1} souls, you share a fundamental pace of life. Your bond is intuitive; words are often secondary to your shared energetic frequency.`;
    if (score >= 80) return `A classic alchemical pairing. The ${e1} essence provides the foundation, while ${e2} provides the inspiration. You bring out the dormant potential in one another.`;
    if (score >= 60) return `Your connection is one of transformation through friction. ${e1} and ${e2} are not naturally aligned, meaning your growth comes from learning to speak each other's spiritual language.`;
    return `A rare and challenging combination. You operate on genuinely different dimensions. Success here requires a profound surrender of the ego to appreciate the beauty of your differences.`;
  };

  return (
    <div className="max-w-md mx-auto w-full pb-32 px-6 pt-24 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-serif text-3xl font-bold">Synastry Engine</h1>
        <p className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em] font-bold">Alchemical Soul Connection</p>
      </div>

      <AnimatePresence mode="wait">
        {!isCalculated ? (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 flex flex-col items-center gap-6">
               <div className="text-center space-y-2">
                  <p className="text-primary text-[10px] font-bold uppercase tracking-widest">Setup Resonance</p>
                  <h2 className="font-serif text-xl">Who is the second soul?</h2>
               </div>

               <div className="w-full space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold ml-2">Name</label>
                    <input 
                      type="text"
                      placeholder="Soul's Name"
                      value={partnerName}
                      onChange={(e) => setPartnerName(e.target.value)}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary/50 text-white placeholder:text-slate-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold ml-2">Zodiac Sign</label>
                    <div className="grid grid-cols-4 gap-2">
                       {Object.values(ZodiacSign).map(s => (
                         <button
                           key={s}
                           onClick={() => setPartnerSign(s)}
                           className={`aspect-square rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                             partnerSign === s ? 'bg-primary/20 border-primary text-primary' : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20'
                           }`}
                         >
                           <span className="text-lg">{ZODIAC_DATA[s].symbol}</span>
                           <span className="text-[8px] font-mono font-bold">{s.substring(0,3)}</span>
                         </button>
                       ))}
                    </div>
                  </div>
               </div>

               <button 
                 onClick={() => setIsCalculated(true)}
                 disabled={!partnerName}
                 className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 disabled:opacity-30 transition-all uppercase text-xs tracking-widest"
               >
                 Measure Bond <Zap className="size-4" />
               </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between gap-4 px-8">
              <div className="flex-1 space-y-2 text-center">
                  <div className="aspect-square rounded-full border border-primary/30 flex items-center justify-center text-4xl shadow-inner shadow-primary/10">
                      {ZODIAC_DATA[userProfile.zodiacSign].symbol}
                  </div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">{userProfile.name}</p>
              </div>
              
              <div className="size-16 flex items-center justify-center relative">
                  <Heart className={`size-10 ${score > 80 ? 'text-primary fill-primary/30' : 'text-slate-500'}`} />
                  <motion.div 
                     className="absolute inset-0 rounded-full border border-primary/50"
                     animate={{ scale: [1, 1.4, 1], opacity: [1, 0, 1] }}
                     transition={{ duration: 2, repeat: Infinity }}
                  />
              </div>

              <div className="flex-1 space-y-2 text-center">
                  <div className="aspect-square rounded-full border border-secondary/30 flex items-center justify-center text-4xl shadow-inner shadow-secondary/10">
                      {ZODIAC_DATA[partnerSign].symbol}
                  </div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">{partnerName}</p>
              </div>
            </div>

            <div className="text-center space-y-1">
              <h2 className="text-6xl font-mono font-bold text-primary tracking-tighter drop-shadow-[0_0_15px_#818cf844]">{score}%</h2>
              <p className="text-[10px] font-mono text-white tracking-[0.4em] uppercase mt-2 font-bold">{title}</p>
              <p className="text-[8px] font-mono text-slate-500 tracking-[0.4em] uppercase mt-1 font-bold">Bond Coeffeciency</p>
            </div>

            <GlassCard className="!bg-indigo-950/20 border-primary/20 p-8 space-y-6">
                <div className="space-y-2">
                    <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                        <Sparkles className="size-3" /> The Oracle's Verdict
                    </h3>
                    <p className="text-slate-300 italic text-base leading-relaxed">
                        "{getExplanation()}"
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div className="space-y-1">
                        <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold flex items-center gap-1"><Shield className="size-3 text-indigo-400" /> Harmony</p>
                        <p className="text-xs text-white">Shared {e1} Essence</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold flex items-center gap-1"><Zap className="size-3 text-purple-400" /> Friction</p>
                        <p className="text-xs text-white">House Opposition</p>
                    </div>
                </div>
            </GlassCard>

            <button 
              onClick={() => { setIsCalculated(false); setPartnerName(""); }}
              className="w-full py-4 border border-white/10 rounded-2xl text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:border-primary/30 hover:text-slate-300 transition-all flex items-center justify-center gap-2"
            >
              <X className="size-3" /> Begin New Search
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
