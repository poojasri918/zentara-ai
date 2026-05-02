import { motion } from "motion/react";
import { Search, Calendar, Clock, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { GlassCard } from "./GlassCard.tsx";
import { getZodiacSign } from "../constants.ts";
import { UserProfile, ZodiacSign } from "../types.ts";

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [birthDate, setBirthDate] = useState("1993-12-14");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthTime, setBirthTime] = useState("12:00");
  const [name, setName] = useState("");

  const isStepValid = () => {
    if (step === 1) return !!birthDate;
    if (step === 2) return !!name.trim() && !!birthPlace.trim();
    return true;
  };

  const nextStep = () => {
    if (isStepValid()) {
      setStep(s => s + 1);
    }
  };

  const handleSkip = () => {
    // Provide a default "Explorer" profile if they skip
    onComplete({
      name: "Cosmic Seeker",
      birthDate: "1995-01-01",
      birthPlace: "Paris, FR",
      birthTime: "12:00",
      zodiacSign: ZodiacSign.Capricorn,
      ascendant: "Aries"
    });
  };

  const handleFinish = () => {
    if (!isStepValid()) return;
    const date = new Date(birthDate);
    const sign = getZodiacSign(date);
    onComplete({
      name,
      birthDate,
      birthPlace,
      birthTime,
      zodiacSign: sign,
      ascendant: "Leo" // Defaulting ascendant for now as we don't have a full calculation engine
    });
  };

  return (
    <div className="max-w-md mx-auto w-full min-h-screen pt-24 pb-12 px-6 flex flex-col items-center">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 px-6 py-4 flex justify-between items-center bg-[#0B0E14]/50 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-indigo-400 rounded-full flex items-center justify-center">
            <Sparkles className="text-white size-6" />
          </div>
          <span className="font-sans font-light tracking-[0.2em] text-lg text-white uppercase">ZENTARA</span>
        </div>
        <button 
          onClick={handleSkip}
          className="text-xs uppercase tracking-widest text-slate-400 hover:text-primary transition-colors px-2 py-1"
        >
          Skip
        </button>
      </header>

      {/* Progress */}
      <div className="w-full flex gap-2 mb-12">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${
              i <= step ? "bg-primary shadow-[0_0_8px_rgba(129,140,248,0.4)]" : "bg-white/10"
            }`}
          />
        ))}
      </div>

      <div className="w-full space-y-8 flex-1">
        <motion.div
           key={step}
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           className="space-y-8"
        >
          <div className="text-center space-y-3">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-white">
              {step === 1 && "Celestial Origin"}
              {step === 2 && "The Soul's Echo"}
              {step === 3 && "Precise Incarnation"}
            </h1>
            <p className="text-slate-500 font-sans text-sm max-w-[280px] mx-auto leading-relaxed">
              {step === 1 && "Your date of birth anchors your sun sign, the core of your outward radiant ego."}
              {step === 2 && "Location grounds your profile, defining the house systems and earthbound resonance."}
              {step === 3 && "The exact minute determines your Ascendant—your soul's unique filtering lens."}
            </p>
          </div>

          <div className="space-y-6">
            {step === 1 && (
              <GlassCard className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-primary uppercase tracking-widest">Birth Date</h3>
                  <Calendar className="text-primary size-5" />
                </div>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full bg-slate-900/40 border border-white/10 rounded-2xl p-4 text-center font-mono text-2xl text-white focus:outline-none focus:border-primary/50 appearance-none"
                />
              </GlassCard>
            )}

            {step === 2 && (
              <>
                <GlassCard className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-primary uppercase tracking-widest">Your Identity</h3>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-900/40 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary/50 text-white placeholder:text-slate-600"
                  />
                </GlassCard>
                <GlassCard className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-primary uppercase tracking-widest">Birth Place</h3>
                    <MapPin className="text-primary size-5" />
                  </div>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 size-5" />
                    <input
                      type="text"
                      placeholder="Search City of Birth"
                      value={birthPlace}
                      onChange={(e) => setBirthPlace(e.target.value)}
                      className="w-full bg-slate-900/40 border border-white/10 rounded-2xl p-4 pl-12 focus:outline-none focus:border-primary/50 text-white placeholder:text-slate-600"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["London, UK", "New York, US", "Tokyo, JP"].map(city => (
                      <button
                        key={city}
                        onClick={() => setBirthPlace(city)}
                        className={`px-4 py-2 rounded-full text-[10px] font-mono border transition-all uppercase tracking-tighter ${
                          birthPlace === city ? "bg-primary/20 border-primary text-primary" : "bg-white/5 border-white/10 text-slate-500"
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </GlassCard>
              </>
            )}

            {step === 3 && (
              <GlassCard className="flex items-center justify-between cursor-pointer border-white/10 hover:border-primary/30 transition-all">
                <div className="space-y-1">
                  <h3 className="text-xs font-semibold text-primary uppercase tracking-widest">Exact Time</h3>
                  <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest underline decoration-primary/30">Optional but recommended</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="time"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    className="bg-transparent font-mono text-xl text-white border-none focus:ring-0 w-24 outline-none"
                  />
                  <Clock className="text-slate-500 size-5" />
                </div>
              </GlassCard>
            )}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 inset-x-0 p-6 bg-gradient-to-t from-deep-space via-deep-space/80 to-transparent">
        <div className="max-w-md mx-auto space-y-4">
          <button
            onClick={step < 3 ? nextStep : handleFinish}
            disabled={!isStepValid()}
            className={`w-full font-bold py-5 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 uppercase tracking-widest text-sm ${
              isStepValid() 
              ? "bg-indigo-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]" 
              : "bg-white/5 text-slate-600 border border-white/5 cursor-not-allowed"
            }`}
          >
            {step < 3 ? "Continue" : "Calculate Chart"}
            <ArrowRight className={`size-5 transition-transform ${isStepValid() ? "translate-x-0" : "translate-x-1 opacity-0"}`} />
          </button>
          {!isStepValid() && (
             <p className="text-center text-[10px] text-red-400 font-mono tracking-widest uppercase animate-pulse">
               Missing required celestial details
             </p>
          )}
          <p className="text-center text-[9px] text-slate-600 font-mono tracking-widest uppercase">
            Zentara Encryption Active • Secure Astrological Data
          </p>
        </div>
      </footer>
    </div>
  );
}
