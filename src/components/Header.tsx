import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Volume2, 
  VolumeX, 
  Building2, 
  Layers, 
  Monitor, 
  Trophy, 
  Tag, 
  Compass, 
  SlidersHorizontal 
} from 'lucide-react';
import { sound } from '../utils/sound';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenTournaments: () => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenTournaments,
  onOpenAdmin,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const state = sound.toggle();
    setSoundActive(state);
  };

  const scrollTo = (id: string) => {
    sound.playClick();
    setNavDrawerOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: '3 Клуба в Омске', id: 'arenas', icon: <Building2 className="w-4 h-4 text-[#E32124]" /> },
    { label: 'Зоны & Эксклюзивы', id: 'zones', icon: <Layers className="w-4 h-4 text-zinc-300" /> },
    { label: 'Железо 600Hz', id: 'hardware', icon: <Monitor className="w-4 h-4 text-[#E32124]" /> },
    { 
      label: 'LAN Турниры', 
      action: () => {
        setNavDrawerOpen(false);
        onOpenTournaments();
      }, 
      icon: <Trophy className="w-4 h-4 text-amber-400" />,
      badge: '150K ₽'
    },
    { label: 'Акции & Бонусы', id: 'promotions', icon: <Tag className="w-4 h-4 text-zinc-300" /> },
    { label: '2ГИС Маршруты', id: 'location', icon: <Compass className="w-4 h-4 text-emerald-400" /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* Main Top Header Strip */}
      <div className={`transition-all duration-300 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-2xl border-b border-white/[0.08] py-2.5 shadow-2xl shadow-black/80'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 sm:py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* CyberX Brand Logo + Single-Line Club List (Fixed wrapping issue!) */}
            <div 
              onClick={() => scrollTo('hero')} 
              className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
            >
              <div className="relative flex items-center h-9 sm:h-11">
                <img
                  src="/logo-horizontal.png"
                  alt="CyberX Community Omsk"
                  className="h-8 sm:h-10 w-auto object-contain drop-shadow-[0_0_15px_rgba(227,33,36,0.4)] group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              
              {/* Single line in 1 row: ARENA • ЕВРОПА • ОКТЯБРЬ without wrapping */}
              <div className="hidden lg:flex items-center border-l border-white/10 pl-3">
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <span className="font-display font-black text-xs tracking-wider text-white">
                    OMSK
                  </span>
                  <span className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase whitespace-nowrap">
                    // ARENA • ЕВРОПА • ОКТЯБРЬ
                  </span>
                </div>
              </div>
            </div>

            {/* Retractable Navigation Bar Toggle Button (Slide out / retract with arrow) */}
            <button
              onClick={() => {
                sound.playClick();
                setNavDrawerOpen(!navDrawerOpen);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-xs font-mono font-semibold ${
                navDrawerOpen
                  ? 'bg-[#E32124]/15 border-[#E32124] text-white shadow-lg shadow-red-950/40'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.09] text-zinc-300 hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E32124] animate-pulse" />
              <span>Навигация & Разделы</span>
              {navDrawerOpen ? (
                <ChevronUp className="w-4 h-4 text-[#E32124] transition-transform" />
              ) : (
                <ChevronDown className="w-4 h-4 text-zinc-400 transition-transform" />
              )}
            </button>

            {/* Right Action: Clean Primary CTA Button */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  sound.playTrigger();
                  onOpenBooking();
                }}
                onMouseEnter={() => sound.playHover()}
                className="relative group overflow-hidden px-5 sm:px-6 py-2.5 rounded-xl font-display font-black text-xs uppercase tracking-wider text-white transition-all duration-300 bg-gradient-to-r from-[#E32124] to-[#B30E11] hover:from-[#FF2A2E] hover:to-[#E32124] shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="relative z-10 flex items-center gap-1.5">
                  <span>Забронировать</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Retractable Smooth Animated Top Navigation Drawer (Slides down on demand, retracts up when not needed) */}
      <AnimatePresence>
        {navDrawerOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="border-b border-white/[0.1] bg-[#07070b]/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Navigation Links Grid */}
                <div className="flex flex-wrap items-center gap-2">
                  {navItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (item.action) {
                          item.action();
                        } else if (item.id) {
                          scrollTo(item.id);
                        }
                      }}
                      onMouseEnter={() => sound.playHover()}
                      className="px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#E32124]/50 border border-white/[0.06] text-xs font-semibold text-zinc-300 hover:text-white transition-all flex items-center gap-2 group"
                    >
                      <div className="group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#E32124]/20 text-[#E32124] border border-[#E32124]/30">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Sub-Actions inside Drawer: Sound Switch + CMS Admin */}
                <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-white/[0.06]">
                  {/* Sound Toggle inside drawer */}
                  <button
                    onClick={handleSoundToggle}
                    className={`px-3 py-2 rounded-xl border text-xs font-mono transition-all flex items-center gap-2 ${
                      soundActive
                        ? 'bg-[#E32124]/20 border-[#E32124]/60 text-[#E32124]'
                        : 'bg-white/[0.03] border-white/[0.06] text-zinc-400 hover:text-white'
                    }`}
                  >
                    {soundActive ? (
                      <>
                        <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                        <span>Звук: ВКЛ</span>
                      </>
                    ) : (
                      <>
                        <VolumeX className="w-3.5 h-3.5" />
                        <span>Звук: ВЫКЛ</span>
                      </>
                    )}
                  </button>

                  {/* CMS Button inside drawer */}
                  {onOpenAdmin && (
                    <button
                      onClick={() => {
                        setNavDrawerOpen(false);
                        onOpenAdmin();
                      }}
                      className="px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-xs font-mono text-zinc-400 hover:text-white transition-all flex items-center gap-1.5"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>Панель Владельца</span>
                    </button>
                  )}
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
};
