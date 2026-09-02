import React, { useState } from 'react';
import { ARENAS } from '../data/arenaData';
import { 
  MapPin, 
  Send, 
  Clock, 
  Star, 
  Check, 
  ArrowRight, 
  Building2
} from 'lucide-react';
import { sound } from '../utils/sound';

interface ArenaEcosystemProps {
  onOpenBooking: (arenaId: string) => void;
  selectedArenaId?: string;
}

export const ArenaEcosystem: React.FC<ArenaEcosystemProps> = ({
  onOpenBooking,
  selectedArenaId,
}) => {
  const [activeId, setActiveId] = useState<string>(selectedArenaId || ARENAS[0].id);

  const currentArena = ARENAS.find((a) => a.id === activeId) || ARENAS[0];

  return (
    <section id="arenas" className="relative py-24 sm:py-32 bg-[#000000] overflow-hidden">
      
      {/* Subtle glow background */}
      <div className="pointer-events-none absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#E32124]/[0.035] rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E32124]/10 border border-[#E32124]/30 text-[#E32124] text-xs font-mono font-bold tracking-wider uppercase mb-3">
              <Building2 className="w-3.5 h-3.5" />
              Сеть киберспортивных пространств CyberX
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight uppercase text-white">
              3 КЛУБА <span className="text-[#E32124]">//</span> В ОМСКЕ
            </h2>
            <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-xl">
              <span className="text-white font-bold">CyberX Arena</span> (Ленина, 19), <span className="text-white font-bold">CyberX Европа</span> (Мира, 42к1) и <span className="text-white font-bold">CyberX Октябрь</span> (Серова, 19А). 182 игровых ПК суммарно, единый клубный аккаунт и 10 PS5 залов.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-400">
              Всего в сети: <span className="text-white font-bold">182 Игровых ПК</span>
            </span>
          </div>
        </div>

        {/* Arenas Interactive Switcher Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {ARENAS.map((arena) => {
            const isSelected = arena.id === activeId;
            return (
              <button
                key={arena.id}
                onClick={() => {
                  sound.playClick();
                  setActiveId(arena.id);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`text-left p-5 rounded-2xl transition-all duration-300 border backdrop-blur-md relative ${
                  isSelected
                    ? 'bg-[#151520] border-[#E32124] shadow-xl shadow-red-950/40 translate-y-[-2px]'
                    : 'bg-[#0a0a0f]/80 hover:bg-[#12121a] border-white/[0.08] hover:border-white/20'
                }`}
              >
                {/* Active top line */}
                {isSelected && (
                  <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#E32124] to-transparent" />
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#E32124]">
                    {arena.id === 'cyberx-arena' ? 'ФЛАГМАН СЕТИ' : arena.id === 'cyberx-evropa' ? 'ХАБ НЕФТЯНИКИ' : 'ХАБ ОКТЯБРЬ'}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-mono">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{arena.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="font-display font-extrabold text-base sm:text-lg text-white">
                  {arena.name.split('//')[0].trim()}
                </div>
                <div className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E32124] shrink-0" />
                  <span className="truncate">{arena.address}</span>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>{arena.rigsCount} ПК</span>
                  <span className="text-zinc-500">•</span>
                  <span>{arena.id === 'cyberx-arena' ? '2 Premium' : 'VIP залы'}</span>
                  <span className="text-zinc-500">•</span>
                  <span>{arena.ps5RoomsCount} PS5 залов</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Arena Deep Dive Showcase Card */}
        <div className="glass-card rounded-3xl border border-white/[0.09] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Photo & Visual Highlights */}
            <div className="lg:col-span-6 relative min-h-[340px] lg:min-h-full">
              <img
                src={currentArena.image}
                alt={currentArena.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#000000] via-[#000000]/60 to-transparent" />

              {/* Badges on image */}
              <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-[#000000]/80 backdrop-blur-md border border-white/15 text-xs font-mono text-white flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  {currentArena.workingHours}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#E32124] text-white text-xs font-mono font-bold">
                  {currentArena.rigsCount} Игровых ПК
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-2xl font-display font-black text-white">
                  {currentArena.name}
                </div>
                <p className="text-xs text-zinc-300 mt-1 font-light">
                  {currentArena.tagline}
                </p>
              </div>
            </div>

            {/* Right Details & Booking CTA */}
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                
                {/* Address and Contacts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-[#08080c] border border-white/[0.06]">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block">Адрес в Омске</span>
                    <div className="text-xs font-bold text-white mt-0.5">{currentArena.address}</div>
                    <div className="text-[11px] text-[#E32124] mt-0.5">{currentArena.metro}</div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block">Бронь и контакты</span>
                    <a href={`tel:${currentArena.phone}`} className="text-xs font-mono font-semibold text-white hover:text-[#E32124] transition-colors block mt-0.5">
                      {currentArena.phone}
                    </a>
                    <a href={`https://t.me/${currentArena.telegram.replace('@', '')}`} target="_blank" rel="noreferrer" className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 mt-0.5">
                      <Send className="w-3 h-3 text-sky-400" />
                      {currentArena.telegram}
                    </a>
                  </div>
                </div>

                {/* Key Infrastructure Highlights */}
                <div className="mb-6">
                  <span className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase block mb-3">
                    Инфраструктура и эксклюзивы:
                  </span>
                  <div className="space-y-2.5">
                    {currentArena.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#E32124]/15 border border-[#E32124]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#E32124]">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-xs sm:text-sm text-zinc-300">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => {
                    sound.playTrigger();
                    onOpenBooking(currentArena.id);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className="flex-1 py-3.5 px-6 rounded-xl font-display font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#E32124] to-[#B30E11] hover:from-[#FF2A2E] hover:to-[#E32124] shadow-lg shadow-red-600/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <span>Забронировать в {currentArena.name.split('//')[0].trim()}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
