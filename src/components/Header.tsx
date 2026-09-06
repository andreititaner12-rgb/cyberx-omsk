import React, { useState, useEffect } from 'react';
import { sound } from '../utils/sound';
import { Volume2, VolumeX, MapPin } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenTournaments: () => void;
  onOpenAdmin?: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenTournaments,
  isMuted = false,
  onToggleMute
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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
    <>
      {/* 1. macOS-style Blurry Top Reveal Gradient Mask */}
      <div 
        className="fixed top-0 left-0 right-0 h-28 pointer-events-none z-40 transition-opacity duration-500"
        style={{
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* 2. Main Fixed Header Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 pointer-events-auto">
        <div
          className={`w-full transition-all duration-500 ${
            scrolled
              ? 'bg-[#050508]/80 backdrop-blur-2xl border-b border-red-950/30 py-3.5 shadow-[0_15px_35px_rgba(0,0,0,0.85)]'
              : 'bg-transparent py-5 sm:py-6 border-b border-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4 sm:gap-6">
              
              {/* Left: CyberX Brandmark */}
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
                
                <span className="hidden lg:inline-block font-mono text-[11px] tracking-[0.25em] text-zinc-400 uppercase group-hover:text-white transition-colors border-l border-white/10 pl-3">
                  OMSK // 3 CLUBS
                </span>
              </div>

              {/* Center: Navigation Links (Appears smoothly on scroll) */}
              <nav 
                className={`hidden md:flex items-center gap-5 lg:gap-7 font-mono text-[11px] tracking-[0.2em] uppercase text-zinc-400 transition-all duration-500 ${
                  scrolled
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <button
                  onClick={() => scrollTo('arenas')}
                  onMouseEnter={() => sound.playHover()}
                  className="hover:text-white transition-colors py-1 relative group cursor-pointer"
                >
                  <span>КЛУБЫ</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E32124] group-hover:w-full transition-all duration-300" />
                </button>
                <button
                  onClick={() => scrollTo('pricing')}
                  onMouseEnter={() => sound.playHover()}
                  className="hover:text-white text-zinc-300 transition-colors py-1 relative group flex items-center gap-1 cursor-pointer"
                >
                  <span>ПРАЙС</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E32124] shadow-[0_0_6px_#E32124]" />
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E32124] group-hover:w-full transition-all duration-300" />
                </button>
                <button
                  onClick={() => scrollTo('hardware')}
                  onMouseEnter={() => sound.playHover()}
                  className="hover:text-white transition-colors py-1 relative group cursor-pointer"
                >
                  <span>ЖЕЛЕЗО</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E32124] group-hover:w-full transition-all duration-300" />
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenTournaments();
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className="hover:text-white transition-colors py-1 relative group cursor-pointer"
                >
                  <span>ТУРНИРЫ</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E32124] group-hover:w-full transition-all duration-300" />
                </button>
                <button
                  onClick={() => scrollTo('promotions')}
                  onMouseEnter={() => sound.playHover()}
                  className="hover:text-white transition-colors py-1 relative group cursor-pointer"
                >
                  <span>АКЦИИ</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E32124] group-hover:w-full transition-all duration-300" />
                </button>
                <button
                  onClick={() => scrollTo('location')}
                  onMouseEnter={() => sound.playHover()}
                  className="hover:text-white transition-colors py-1 relative group flex items-center gap-1.5 cursor-pointer text-zinc-300"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#E32124]" />
                  <span>КАК ДОБРАТЬСЯ?</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E32124] group-hover:w-full transition-all duration-300" />
                </button>
              </nav>

              {/* Right: Sound Toggle + Translucent Glowing Action Button */}
              <div className="flex items-center gap-3 shrink-0">
                
                {/* Audio Mute / Unmute Button */}
                {onToggleMute && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      onToggleMute();
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-all cursor-pointer"
                    aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
                    title={isMuted ? 'Включить звук' : 'Выключить звук'}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-zinc-500" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-[#E32124] animate-pulse" />
                    )}
                  </button>
                )}

                <button
                  onClick={() => {
                    sound.playTrigger();
                    onOpenBooking();
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className="relative group px-4 sm:px-6 py-2.5 rounded-2xl font-mono text-xs font-bold tracking-[0.2em] uppercase text-zinc-200 hover:text-white bg-white/[0.05] hover:bg-[#E32124]/20 border border-white/15 hover:border-[#E32124]/70 backdrop-blur-xl shadow-lg hover:shadow-[0_0_25px_rgba(227,33,36,0.4)] transition-all duration-300 overflow-hidden active:scale-95 cursor-pointer"
                >
                  {/* Soft crimson gradient sheen on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#E32124]/30 via-[#A30E12]/35 to-[#E32124]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <span className="relative z-10">ЗАБРОНИРОВАТЬ</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </header>
    </>
  );
};
