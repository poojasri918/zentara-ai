/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { CelestialBackground } from "./components/CelestialBackground.tsx";
import { Onboarding } from "./components/Onboarding.tsx";
import { Dashboard } from "./components/Dashboard.tsx";
import { BirthChart } from "./components/BirthChart.tsx";
import { Compatibility } from "./components/Compatibility.tsx";
import { Transits } from "./components/Transits.tsx";
import { Chat } from "./components/Chat.tsx";
import { Profile } from "./components/Profile.tsx";
import { BottomNav } from "./components/BottomNav.tsx";
import { AppScreen, UserProfile } from "./types.ts";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles } from "lucide-react";

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('onboarding');
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('cosmic_oracle_profile');
    if (saved) {
      setProfile(JSON.parse(saved));
      setScreen('dashboard');
    }
  }, []);

  const [isCalculating, setIsCalculating] = useState(false);

  const handleOnboardingComplete = (data: UserProfile) => {
    setProfile(data);
    setIsCalculating(true);
    
    // Simulate calculation for vibe
    setTimeout(() => {
      localStorage.setItem('cosmic_oracle_profile', JSON.stringify(data));
      setIsCalculating(false);
      setScreen('dashboard');
    }, 2500);
  };

  const handleLogout = () => {
    localStorage.removeItem('cosmic_oracle_profile');
    localStorage.removeItem('zentara_chat_history');
    setProfile(null);
    setScreen('onboarding');
  };

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <CelestialBackground />
      
      <AnimatePresence mode="wait">
        {isCalculating ? (
          <motion.div
            key="calculating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-deep-space flex flex-col items-center justify-center p-6 text-center space-y-8"
          >
            <div className="relative">
               <motion.div 
                 className="size-32 rounded-full border border-primary/20"
                 animate={{ rotate: 360 }}
                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               />
               <motion.div 
                 className="absolute inset-4 rounded-full border border-secondary/20"
                 animate={{ rotate: -360 }}
                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
               />
               <Sparkles className="absolute inset-0 m-auto size-12 text-primary fill-primary/20 animate-pulse" />
            </div>
            <div className="space-y-4">
              <h2 className="text-lg font-bold tracking-[0.4em] text-white uppercase text-center">Reading the Heavens</h2>
              <p className="text-slate-500 font-mono text-[10px] max-w-[200px] mx-auto leading-relaxed">
                ZENTARA ALGORITHM INITIALIZING... ALIGNING BIRTH COORDINATES
              </p>
            </div>
          </motion.div>
        ) : screen === 'onboarding' ? (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Onboarding onComplete={handleOnboardingComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={screen}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full"
              >
                {screen === 'dashboard' && profile && (
                  <Dashboard profile={profile} onNavigate={setScreen} />
                )}
                {screen === 'chart' && profile && (
                  <BirthChart profile={profile} />
                )}
                {screen === 'compatibility' && profile && (
                  <Compatibility userProfile={profile} />
                )}
                {screen === 'transits' && (
                  <Transits />
                )}
                {screen === 'chat' && profile && (
                  <Chat profile={profile} />
                )}
                {screen === 'profile' && profile && (
                  <Profile profile={profile} onLogout={handleLogout} />
                )}
              </motion.div>
            </AnimatePresence>
            
            <BottomNav current={screen} onNavigate={setScreen} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
