import { UserProfile } from "../types.ts";
import { ZODIAC_DATA } from "../constants.ts";
import { Settings, LogOut, Shield, Bell, HelpCircle, Star, Moon, Calendar, MapPin, Clock } from "lucide-react";
import { motion } from "motion/react";

interface ProfileProps {
  profile: UserProfile;
  onLogout: () => void;
}

export function Profile({ profile, onLogout }: ProfileProps) {
  const zodiac = ZODIAC_DATA[profile.zodiacSign];

  const menuItems = [
    { icon: Bell, label: 'Notifications', value: 'Active' },
    { icon: Shield, label: 'Privacy Sphere', value: 'Secure' },
    { icon: HelpCircle, label: 'Cosmic Support', value: '' },
    { icon: Settings, label: 'Settings', value: '' },
  ];

  return (
    <div className="max-w-md mx-auto w-full pb-32 px-6 pt-24 space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="relative">
          <div className="size-32 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-indigo-400 p-1 shadow-3xl shadow-indigo-500/30">
            <div className="w-full h-full rounded-full bg-slate-900 flex flex-col items-center justify-center border border-white/5">
              <span className="text-6xl font-serif text-white">{zodiac.symbol}</span>
            </div>
          </div>
          <motion.div 
            className="absolute -bottom-2 -right-2 size-12 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center shadow-xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <Star className="size-6 text-indigo-400 fill-indigo-400/20" />
          </motion.div>
        </div>
        
        <div className="space-y-1">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-white">{profile.name}</h1>
          <div className="flex items-center justify-center gap-2">
            <p className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase font-bold">{profile.zodiacSign} Sun</p>
            <span className="size-1 rounded-full bg-slate-800" />
            <p className="text-[10px] text-purple-400 font-mono tracking-widest uppercase font-bold">{profile.ascendant || "Leo"} Rising</p>
          </div>
        </div>
      </div>

      {/* Birth Stats Grid */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-6 space-y-4">
            <div className="flex items-center gap-4">
                <div className="size-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <Calendar className="size-5" />
                </div>
                <div>
                   <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Entry Date</p>
                   <p className="text-sm font-medium text-white">{new Date(profile.birthDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="size-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <MapPin className="size-5" />
                </div>
                <div>
                   <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Origin Coordinates</p>
                   <p className="text-sm font-medium text-white">{profile.birthPlace}</p>
                </div>
            </div>

            {profile.birthTime && (
                <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                        <Clock className="size-5" />
                    </div>
                    <div>
                       <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Exact Incarnation</p>
                       <p className="text-sm font-medium text-white">{profile.birthTime}</p>
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* Menu Sections */}
      <div className="space-y-4 pt-4">
        <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em] px-4">Celestial Account</h3>
        <div className="bg-white/[0.02] border border-white/5 rounded-[32px] overflow-hidden">
          {menuItems.map((item, i) => (
            <button 
              key={i}
              className={`w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors ${
                i !== menuItems.length - 1 ? 'border-b border-white/5' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon className="size-5 text-slate-400" />
                <span className="text-sm text-slate-200 font-medium">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">{item.value}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/30" />
              </div>
            </button>
          ))}
        </div>

        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-3 p-6 bg-red-500/10 border border-red-500/20 rounded-[32px] text-red-400 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/20 transition-all active:scale-95"
        >
          <LogOut className="size-4" />
          Dissolve Connection
        </button>
      </div>

      <div className="text-center space-y-2 opacity-20 py-8">
        <p className="text-[9px] font-mono tracking-[0.4em] uppercase font-bold">Zentara AI • Ethereal OS 2.1</p>
        <p className="text-[8px] font-sans">Forged in the Astral Realm</p>
      </div>
    </div>
  );
}
