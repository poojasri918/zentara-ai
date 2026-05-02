import { motion } from "motion/react";
import { UserProfile } from "../types.ts";
import { ZODIAC_DATA } from "../constants.ts";
import { GlassCard } from "./GlassCard.tsx";
import { Info } from "lucide-react";

interface BirthChartProps {
  profile: UserProfile;
}

export function BirthChart({ profile }: BirthChartProps) {
  const zodiacSigns = Object.keys(ZODIAC_DATA);
  const radius = 140;
  const houseLabels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="max-w-md mx-auto w-full pb-32 px-6 pt-24 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-serif text-3xl font-bold">Celestial Map</h1>
        <p className="text-white/40 text-sm font-mono uppercase tracking-widest">
          {profile.birthPlace} • {new Date(profile.birthDate).toLocaleDateString()}
        </p>
      </div>

      <div className="relative aspect-square w-full flex items-center justify-center py-10">
        {/* Zodiac Wheel SVG */}
        <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_0_20px_rgba(242,202,80,0.2)]">
          <defs>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f2ca50" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f2ca50" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Outer circle */}
          <circle cx="200" cy="200" r="180" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

          {/* Houses */}
          {houseLabels.map((_, i) => {
            const angle = (i * 30) - 90;
            const x1 = 200 + 100 * Math.cos((angle * Math.PI) / 180);
            const y1 = 200 + 100 * Math.sin((angle * Math.PI) / 180);
            const x2 = 200 + 180 * Math.cos((angle * Math.PI) / 180);
            const y2 = 200 + 180 * Math.sin((angle * Math.PI) / 180);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            );
          })}

          {/* Zodiac Symbols */}
          {Object.entries(ZODIAC_DATA).map(([sign, data], i) => {
            const angle = (i * 30) - 75;
            const x = 200 + 160 * Math.cos((angle * Math.PI) / 180);
            const y = 200 + 160 * Math.sin((angle * Math.PI) / 180);
            return (
              <text
                key={sign}
                x={x}
                y={y}
                fill={sign === profile.zodiacSign ? "#f2ca50" : "rgba(255,255,255,0.4)"}
                fontSize="16"
                textAnchor="middle"
                alignmentBaseline="middle"
                className="font-serif select-none"
              >
                {data.symbol}
              </text>
            );
          })}

          {/* Inner Web (Randomized logic for aesthetics) */}
          <path
            d="M 200 100 L 250 250 L 120 180 L 280 180 L 150 250 Z"
            fill="none"
            stroke="rgba(242,202,80,0.2)"
            strokeWidth="0.5"
          />

          {/* Sun Core */}
          <circle cx="200" cy="200" r="15" fill="url(#sunGlow)" />
          <motion.circle 
            cx="200" cy="200" r="3" 
            fill="#6366f1" 
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </svg>

        <div className="absolute inset-x-0 bottom-0 flex justify-center">
             <div className="bg-primary/10 border border-primary/20 rounded-full px-4 py-1 flex items-center gap-2">
                <div className="size-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-mono text-primary uppercase tracking-wider italic font-bold">
                    Radiant Sun in {profile.zodiacSign}
                </span>
             </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl">
        <h3 className="text-xs font-semibold text-primary uppercase tracking-widest mb-6">Elemental Placements</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
             <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-300 border border-indigo-500/20">
                    ☀️
                </div>
                <div>
                    <h5 className="text-sm font-bold text-white">Sun</h5>
                    <p className="text-[10px] text-slate-500 uppercase font-mono">Core Vitality</p>
                </div>
             </div>
             <p className="text-primary font-mono font-bold">{profile.zodiacSign}</p>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
             <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-300 border border-purple-500/20">
                    🌙
                </div>
                <div>
                    <h5 className="text-sm font-bold text-white">Moon</h5>
                    <p className="text-[10px] text-slate-500 uppercase font-mono">Inner Reflex</p>
                </div>
             </div>
             <p className="text-secondary font-mono font-bold">Scorpio</p>
          </div>
        </div>
      </div>
    </div>
  );
}
