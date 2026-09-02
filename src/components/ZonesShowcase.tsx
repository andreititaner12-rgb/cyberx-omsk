import React, { useState } from 'react';
import { ZONES } from '../data/arenaData';
import { 
  Users, 
  Monitor, 
  Check, 
  ArrowRight, 
  Layers, 
  Coffee,
  Sparkles,
  Zap
} from 'lucide-react';
import { sound } from '../utils/sound';

interface ZonesShowcaseProps {
  onOpenBooking: (arenaId?: string, zoneId?: string) => void;
}

export const ZonesShowcase: React.FC<ZonesShowcaseProps> = ({ onOpenBooking }) => {
  const [activeZoneId, setActiveZoneId] = useState<string>(ZONES[0].id);

  const currentZone = ZONES.find((z) => z.id === activeZoneId) || ZONES[0];

  return (
    <section id="zones" className="relative py-24 sm:py-32 bg-[#000000] overflow-hidden">
      
      {/* Background ambient light */}
      <div className="pointer-events-none absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-red-600/[0.04] rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E32124]/10 border border-[#E32124]/30 text-[#E32124] text-xs font-mono font-bold tracking-wider uppercase mb-3">
              <Layers className="w-3.5 h-3.5" />
              Архитектура пространств CyberX Омск
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight uppercase text-white">
              ЗОНЫ <span className="text-[#E32124]">//</span> И ЭКСКЛЮЗИВЫ
            </h2>
            <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-xl">
              От общих соревновательных залов до эксклюзивных Premium сьютов (5 ПК + PS5 + большой стол), двух автосимуляторов Sim-Racing и кино-лаунжа с проектором 150" на Ленина.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E32124]" />
              Premium & Автосимуляторы — фишка Ленина
            </span>
          </div>
        </div>

        {/* Zones Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
          {ZONES.map((zone) => {
            const isSelected = zone.id === activeZoneId;
            return (
              <button
                key={zone.id}
                onClick={() => {
                  sound.playClick();
                  setActiveZoneId(zone.id);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 border backdrop-blur-md relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#151522] border-[#E32124] shadow-xl shadow-red-950/40 translate-y-[-2px]'
                    : 'bg-[#0a0a0f]/80 hover:bg-[#12121c] border-white/[0.08] hover:border-white/20'
                }`}
              >
                {/* Active Indicator Top Glow */}
                {isSelected && (
                  <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-[#E32124] to-transparent" />
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-mono tracking-widest uppercase font-bold text-[#E32124]">
                      {zone.category}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-sm sm:text-base text-white">
                    {zone.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                    {zone.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="text-[11px] font-mono text-zinc-400">
                    от <span className="text-white font-bold">{zone.pricePerHour} ₽</span> / ч
                  </div>
                  <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-[#E32124]' : 'text-zinc-500'}`}>
                    {isSelected ? 'ВЫБРАНО' : 'ОБЗОР →'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Zone Detail Showcase Card */}
        <div className="glass-card rounded-3xl border border-white/[0.09] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Visual Photo / Media */}
            <div className="lg:col-span-6 relative min-h-[360px] lg:min-h-full">
              <img
                src={currentZone.image}
                alt={currentZone.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#000000] via-[#000000]/50 to-transparent" />

              <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-[#000000]/80 backdrop-blur-md border border-white/15 text-xs font-mono text-white flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#E32124]" />
                  {currentZone.capacity}
                </span>
                {currentZone.badge && (
                  <span className="px-3 py-1 rounded-full bg-[#E32124] text-white text-xs font-mono font-bold shadow-lg shadow-red-600/30">
                    {currentZone.badge}
                  </span>
                )}
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-2xl font-display font-black text-white">
                  {currentZone.name}
                </div>
                <p className="text-xs sm:text-sm text-zinc-200 mt-1 font-light">
                  {currentZone.tagline}
                </p>
              </div>
            </div>

            {/* Right Information & Booking */}
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                
                {/* Description */}
                <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                  {currentZone.description}
                </p>

                {/* Hardware & Peripherals in this zone */}
                <div className="mb-6">
                  <span className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase block mb-3 flex items-center gap-2">
                    <Monitor className="w-3.5 h-3.5 text-[#E32124]" />
                    Оснащение и конфигурация:
                  </span>
                  <div className="space-y-2">
                    {currentZone.hardwareBrief.map((hw, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E32124]" />
                        <span>{hw}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comfort & Amenities */}
                <div className="mb-6">
                  <span className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase block mb-3 flex items-center gap-2">
                    <Coffee className="w-3.5 h-3.5 text-[#E32124]" />
                    Особенности и доступность:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentZone.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Pricing & Booking Footer */}
              <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-black text-2xl text-white">
                      {currentZone.pricePerHour} ₽
                    </span>
                    <span className="text-xs font-mono text-zinc-400">/ час</span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400">
                    Ночной пакет (10 часов): <span className="text-white font-semibold">{currentZone.priceNight} ₽</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.playTrigger();
                    onOpenBooking(
                      currentZone.id.includes('premium') || currentZone.id.includes('sim-racing') || currentZone.id.includes('projector') 
                        ? 'cyberx-lenina' 
                        : undefined, 
                      currentZone.id
                    );
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className="py-3 px-6 rounded-xl font-display font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#E32124] to-[#B30E11] hover:from-[#FF2A2E] hover:to-[#E32124] shadow-lg shadow-red-600/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>Забронировать {currentZone.name.split('//')[0].trim()}</span>
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
