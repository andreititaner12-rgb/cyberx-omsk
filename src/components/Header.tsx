import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, SlidersHorizontal, ChevronRight, Menu, X, MapPin } from 'lucide-react';
import { sound } from '../utils/sound';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenTournaments: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenTournaments,
  onOpenAdmin,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-white/[0.08] py-2.5 shadow-2xl shadow-black/80'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* CyberX Official Brand Logo */}
          <div 
            onClick={() => scrollTo('hero')} 
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="relative flex items-center h-9 sm:h-11">
              <img
                src="/logo-horizontal.png"
                alt="CyberX Community Omsk"
                className="h-8 sm:h-10 w-auto object-contain drop-shadow-[0_0_15px_rgba(227,33,36,0.5)] group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="hidden sm:flex flex-col border-l border-white/10 pl-3">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-xs sm:text-sm tracking-wider text-white">
                  OMSK
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#E32124]/20 text-[#E32124] border border-[#E32124]/40 tracking-wider">
                  3 КЛУБА
                </span>
              </div>
              <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">
                Arena • Европа • Октябрь
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0F0F14]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/[0.08]">
            <button
              onClick={() => scrollTo('arenas')}
              onMouseEnter={() => sound.playHover()}
              className="px-3.5 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.06] rounded-full transition-all flex items-center gap-1.5"
            >
              <MapPin className="w-3 h-3 text-[#E32124]" />
              <span>3 Клуба</span>
            </button>
            <button
              onClick={() => scrollTo('zones')}
              onMouseEnter={() => sound.playHover()}
              className="px-3.5 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.06] rounded-full transition-all"
            >
              Зоны & Premium 5+1
            </button>
            <button
              onClick={() => scrollTo('hardware')}
              onMouseEnter={() => sound.playHover()}
              className="px-3.5 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.06] rounded-full transition-all flex items-center gap-1.5"
            >
              Hardware 600Hz
              <span className="w-1.5 h-1.5 rounded-full bg-[#E32124]"></span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onOpenTournaments();
              }}
              onMouseEnter={() => sound.playHover()}
              className="px-3.5 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.06] rounded-full transition-all"
            >
              Турниры Омска
            </button>
            <button
              onClick={() => scrollTo('promotions')}
              onMouseEnter={() => sound.playHover()}
              className="px-3.5 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.06] rounded-full transition-all"
            >
              Акции
            </button>
          </nav>

          {/* Actions & Sound / Admin Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Sound FX Toggle */}
            <button
              onClick={handleSoundToggle}
              title={soundActive ? "Выключить звук интерфейса" : "Включить кибер-звуки интерфейса"}
              className={`p-2 sm:p-2.5 rounded-xl transition-all border ${
                soundActive
                  ? 'bg-[#E32124]/20 border-[#E32124]/60 text-[#E32124] shadow-sm shadow-[#E32124]/30'
                  : 'bg-white/[0.04] border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/20'
              }`}
            >
              {soundActive ? (
                <Volume2 className="w-4 h-4 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Owner Quick CMS button */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenAdmin();
              }}
              title="Панель владельца (быстрая смена турниров, цен и акций)"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 text-xs text-zinc-300 hover:text-white transition-all font-mono"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden md:inline">Управление</span>
            </button>

            {/* Book Now Button */}
            <button
              onClick={() => {
                sound.playTrigger();
                onOpenBooking();
              }}
              onMouseEnter={() => sound.playHover()}
              className="relative group overflow-hidden px-4 sm:px-5 py-2.5 rounded-xl font-display font-black text-xs uppercase tracking-wider text-white transition-all duration-300 bg-gradient-to-r from-[#E32124] to-[#B30E11] hover:from-[#FF2A2E] hover:to-[#E32124] shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="relative z-10 flex items-center gap-1.5">
                <span>Забронировать</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-2xl bg-[#0B0B10]/95 backdrop-blur-2xl border border-white/10 space-y-2 animate-fadeIn">
            <button
              onClick={() => scrollTo('arenas')}
              className="w-full text-left px-4 py-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] text-sm font-semibold text-white transition-all flex items-center justify-between"
            >
              <span>3 Клуба в Омске (CyberX Arena, Европа, Октябрь)</span>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </button>
            <button
              onClick={() => scrollTo('zones')}
              className="w-full text-left px-4 py-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] text-sm font-semibold text-white transition-all flex items-center justify-between"
            >
              <span>Зоны: Premium 5+1 / Автосимуляторы / Solo 600Hz</span>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </button>
            <button
              onClick={() => scrollTo('hardware')}
              className="w-full text-left px-4 py-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] text-sm font-semibold text-white transition-all flex items-center justify-between"
            >
              <span>Hardware & Периферия (BenQ 600Hz / RTX 5070 Ti)</span>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTournaments();
              }}
              className="w-full text-left px-4 py-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] text-sm font-semibold text-white transition-all flex items-center justify-between"
            >
              <span>Турниры Омска & Призовые</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E32124]/20 text-[#E32124]">150K ₽</span>
            </button>
            <button
              onClick={() => scrollTo('promotions')}
              className="w-full text-left px-4 py-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] text-sm font-semibold text-white transition-all flex items-center justify-between"
            >
              <span>Акции и Пакеты CyberX</span>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </button>
            
            <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="flex-1 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 text-center"
              >
                Панель Владельца
              </button>
              <button
                onClick={handleSoundToggle}
                className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 flex items-center gap-1.5"
              >
                {soundActive ? 'Звук: ВКЛ' : 'Звук: ВЫКЛ'}
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
