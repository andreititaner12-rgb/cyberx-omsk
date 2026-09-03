import React, { useState, useEffect } from 'react';
import { sound } from '../utils/sound';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenTournaments: () => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenTournaments,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    sound.playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 pointer-events-none">
      <div
        className={`w-full transition-all duration-500 pointer-events-auto ${
          scrolled
            ? 'bg-[#000000]/60 backdrop-blur-2xl border-b border-white/[0.08] py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">
            
            {/* Left: CyberX Brandmark (Always visible with subtle red glow) */}
            <div 
              onClick={() => scrollTo('hero')} 
              className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
            >
              <div className="relative flex items-center h-8 sm:h-9">
                <img
                  src="/logo-horizontal.png"
                  alt="CyberX Community Omsk"
                  className="h-7 sm:h-8 w-auto object-contain drop-shadow-[0_0_15px_rgba(227,33,36,0.5)] group-hover:brightness-125 transition-all"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              
              <span className="hidden sm:inline-block font-mono text-[11px] tracking-[0.25em] text-zinc-400 uppercase group-hover:text-white transition-colors border-l border-white/10 pl-3">
                OMSK // 3 CLUBS
              </span>
            </div>

            {/* Center: Navigation Links (Appears smoothly only on scroll) */}
            <nav 
              className={`hidden md:flex items-center gap-6 lg:gap-8 font-mono text-[11px] tracking-[0.22em] uppercase text-zinc-400 transition-all duration-500 ${
                scrolled
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              <button
                onClick={() => scrollTo('arenas')}
                onMouseEnter={() => sound.playHover()}
                className="hover:text-white transition-colors py-1 relative group"
              >
                <span>3 КЛУБА</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E32124] group-hover:w-full transition-all duration-300" />
              </button>
              <button
                onClick={() => scrollTo('zones')}
                onMouseEnter={() => sound.playHover()}
                className="hover:text-white transition-colors py-1 relative group"
              >
                <span>ЗОНЫ & VIP</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E32124] group-hover:w-full transition-all duration-300" />
              </button>
              <button
                onClick={() => scrollTo('hardware')}
                onMouseEnter={() => sound.playHover()}
                className="hover:text-white transition-colors py-1 relative group flex items-center gap-1.5"
              >
                <span>600HZ ЖЕЛЕЗО</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E32124]" />
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E32124] group-hover:w-full transition-all duration-300" />
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenTournaments();
                }}
                onMouseEnter={() => sound.playHover()}
                className="hover:text-white transition-colors py-1 relative group text-zinc-300"
              >
                <span>ТУРНИРЫ</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E32124] group-hover:w-full transition-all duration-300" />
              </button>
              <button
                onClick={() => scrollTo('promotions')}
                onMouseEnter={() => sound.playHover()}
                className="hover:text-white transition-colors py-1 relative group"
              >
                <span>АКЦИИ</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E32124] group-hover:w-full transition-all duration-300" />
              </button>
              <button
                onClick={() => scrollTo('location')}
                onMouseEnter={() => sound.playHover()}
                className="hover:text-[#20C05C] transition-colors py-1 relative group"
              >
                <span>2ГИС</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#20C05C] group-hover:w-full transition-all duration-300" />
              </button>
            </nav>

            {/* Right: Action Button (Appears smoothly only on scroll) */}
            <div 
              className={`flex items-center gap-3 shrink-0 transition-all duration-500 ${
                scrolled
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              <button
                onClick={() => {
                  sound.playTrigger();
                  onOpenBooking();
                }}
                onMouseEnter={() => sound.playHover()}
                className="px-5 sm:px-6 py-2 rounded-xl border border-[#E32124] bg-[#E32124]/10 hover:bg-[#E32124] text-[#E32124] hover:text-white font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(227,33,36,0.25)] hover:shadow-[0_0_30px_rgba(227,33,36,0.6)] active:scale-95"
              >
                ЗАБРОНИРОВАТЬ
              </button>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
