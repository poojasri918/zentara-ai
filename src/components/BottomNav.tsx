import { Star, Users, Zap, LayoutDashboard, User, MessageCircle } from "lucide-react";
import { motion } from "motion/react";

interface BottomNavProps {
  current: string;
  onNavigate: (screen: any) => void;
}

export function BottomNav({ current, onNavigate }: BottomNavProps) {
  const items = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Oracle' },
    { id: 'chat', icon: MessageCircle, label: 'Chat' },
    { id: 'compatibility', icon: Users, label: 'Synastry' },
    { id: 'transits', icon: Zap, label: 'Transits' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 h-20 bg-[#0B0E14]/80 backdrop-blur-3xl border-t border-white/5 flex items-center justify-around px-2 z-50">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`group flex flex-col items-center gap-1 transition-all duration-300 ${
            current === item.id ? "text-primary" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <div className={`p-2 rounded-xl transition-all duration-300 ${
            current === item.id ? "bg-primary/10" : "bg-transparent"
          }`}>
            <item.icon className="size-6" />
          </div>
          <span className="text-[8px] font-bold tracking-[0.2em] uppercase">{item.label}</span>
          {current === item.id && (
            <motion.div 
              layoutId="nav-glow"
              className="absolute bottom-2 size-1 rounded-full bg-primary shadow-[0_0_12px_#6366f1]" 
            />
          )}
        </button>
      ))}
    </nav>
  );
}
