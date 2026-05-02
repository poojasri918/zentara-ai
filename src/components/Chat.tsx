import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User, Bot, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage, UserProfile } from "../types.ts";
import { getAstrologyResponse } from "../services/geminiService.ts";

interface ChatProps {
  profile: UserProfile;
}

export function Chat({ profile }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('zentara_chat_history');
    return saved ? JSON.parse(saved) : [
      { role: 'assistant', content: `Greetings, ${profile.name}. I am the Cosmic Oracle. Your ${profile.zodiacSign} spirit is vibrant today. What celestial mysteries shall we explore?`, timestamp: new Date().toISOString() }
    ];
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('zentara_chat_history', JSON.stringify(messages));
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const history = messages.map(m => ({ role: m.role, content: m.content }));
    history.push({ role: 'user', content: input });

    const response = await getAstrologyResponse(history, profile);
    
    const assistantMsg: ChatMessage = {
      role: 'assistant',
      content: response,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, assistantMsg]);
    setIsLoading(false);
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: "The scrolls have been cleared. What is your new inquiry?", timestamp: new Date().toISOString() }]);
  };

  return (
    <div className="max-w-md mx-auto w-full h-screen flex flex-col pt-24 pb-20 px-4">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Sparkles className="size-4 text-primary fill-primary/30" />
          </div>
          <h1 className="font-serif text-xl font-bold">Cosmic Oracle</h1>
        </div>
        <button 
          onClick={clearChat}
          className="p-2 text-slate-500 hover:text-red-400 transition-colors"
          title="Clear History"
        >
          <Trash2 className="size-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 px-2 custom-scrollbar">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`size-8 rounded-full flex-shrink-0 flex items-center justify-center border ${
                msg.role === 'user' ? 'bg-indigo-600/20 border-indigo-500/30' : 'bg-slate-800/50 border-white/10'
              }`}>
                {msg.role === 'user' ? <User className="size-4 text-primary" /> : <Bot className="size-4 text-secondary" />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-indigo-600/20 text-white rounded-tr-none' 
                  : 'bg-white/5 text-slate-300 border border-white/5 rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="flex gap-3">
               <div className="size-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
                 <Bot className="size-4 text-secondary animate-pulse" />
               </div>
               <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 flex gap-1 items-center">
                  <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.5 }} className="size-1 rounded-full bg-primary" />
                  <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="size-1 rounded-full bg-primary" />
                  <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="size-1 rounded-full bg-primary" />
               </div>
             </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="mt-4 pb-4">
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask of the alignment..."
            className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-4 pr-12 text-sm focus:outline-none focus:border-primary/50 text-white placeholder:text-slate-600"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${
              input.trim() && !isLoading ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 text-slate-600'
            }`}
          >
            <Send className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
