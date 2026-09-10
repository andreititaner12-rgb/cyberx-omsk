import React, { useState } from 'react';
import { Gauge, Zap, ArrowRight, Trophy } from 'lucide-react';
import { sound } from '../utils/sound';

interface SimRacingBannerProps {
  onOpenBooking: (arenaId: string, zoneId: string) => void;
}

export const SimRacingBanner: React.FC<SimRacingBannerProps> = ({ onOpenBooking }) => {
  const [selectedGame, setSelectedGame] = useState<string>('assetto');

  const games = [
    { id: 'forza', name: 'FORZA HORIZON 6', desc: 'Открытый мир, живописные трассы и топ-суперкары' },
    { id: 'assetto', name: 'ASSETTO CORSA', desc: 'Эталонная физика, кастомные треки и соревновательный дрифт' },
    { id: 'acc', name: 'ASSETTO CORSA COMPETIZIONE', desc: 'Официальный хардкорный симулятор GT3 и гонок на выносливость' },
    { id: 'dirt', name: 'DiRT', desc: 'Раллийные спецучастки, грязь, гравий и заносы' },
    { id: 'beamng', name: 'BEAMNG.DRIVE', desc: 'Мягкотелая физика узлов автомобиля и реалистичные краш-тесты' },
    { id: 'citycar', name: 'CITY CAR DRIVING', desc: 'Обучение и реалистичное вождение в плотном городском трафике' },
  ];

  const activeGameInfo = games.find((g) => g.id === selectedGame) || games[0];

  return (
    <section className="relative py-20 bg-transparent overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[400px] bg-[#E32124]/[0.05] rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="relative rounded-3xl border border-[#E32124]/30 bg-gradient-to-br from-[#12121c] via-[#09090f] to-[#000000] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
          
          {/* Top highlight bar */}
          <div className="absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-[#E32124] to-transparent" />

          {/* Watermark */}
          <div className="pointer-events-none absolute -right-10 -bottom-10 opacity-5 select-none font-display font-black text-[200px] text-white">
            MOZA
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex flex-wrap items-center gap-2.5 font-mono">
                <span className="badge-gold-shimmer px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-[#241300]" />
                  ЭКСКЛЮЗИВ // ТОЛЬКО НА ЛЕНИНА, 19
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs text-zinc-300">
                  2 ГОНОЧНЫХ КОКПИТА MOZA
                </span>
              </div>

              <div>
                <h3 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white">
                  SIM-RACING <span className="text-[#E32124]">//</span> АВТОСИМУЛЯТОРЫ
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-zinc-300 max-w-xl font-normal leading-relaxed">
                  Почувствуйте реальный перегруз и сцепление колес с асфальтом на рулевой базе <span className="text-white font-bold">Moza Direct Drive</span> с мгновенным Force Feedback, педальном узле <span className="text-white font-bold">Moza Load Cell</span> с тензодатчиками и изогнутых UltraWide мониторах.
                </p>
              </div>

              {/* Specs & Hardware pills (Rounded) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[10px] uppercase text-zinc-500 block">База руля</span>
                  <div className="text-xs font-bold text-white mt-1">Moza Direct Drive</div>
                  <div className="text-[10px] text-[#E32124] mt-0.5">Чистый прямой привод FFB</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[10px] uppercase text-zinc-500 block">Педальный узел</span>
                  <div className="text-xs font-bold text-white mt-1">Moza Load Cell</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">Тензодатчик давления</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[10px] uppercase text-zinc-500 block">Режим гонки</span>
                  <div className="text-xs font-bold text-white mt-1">Парные дуэли 1v1</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">Синхронизация заездов</div>
                </div>
              </div>

              {/* Game Switcher (All 6 requested disciplines) */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-2.5 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-[#E32124]" />
                  Доступные гоночные дисциплины:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {games.map((g) => {
                    const isSelected = selectedGame === g.id;
                    return (
                      <button
                        key={g.id}
                        onClick={() => {
                          sound.playClick();
                          setSelectedGame(g.id);
                        }}
                        onMouseEnter={() => sound.playHover()}
                        className={`px-3 py-2 rounded-xl text-[11px] font-mono font-bold transition-all border text-left flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#E32124] text-white border-[#E32124] shadow-md shadow-red-600/30'
                            : 'bg-white/[0.03] text-zinc-300 border-white/[0.06] hover:bg-white/[0.08] hover:text-white'
                        }`}
                      >
                        <span className="truncate">{g.name}</span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white ml-1 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Selected Game Description */}
                <div className="mt-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-zinc-400 font-mono">
                  <span className="text-white font-bold">{activeGameInfo.name}:</span> {activeGameInfo.desc}
                </div>
              </div>

            </div>

            {/* Right Card / CTA with Real Sim-Racing Photo from CyberX Lenina 19 */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#09090f]/90 border border-white/[0.08] relative font-mono">
              
              <div className="relative h-48 rounded-2xl overflow-hidden mb-6 group border border-white/10 shadow-xl bg-black">
                <img
                  src="/images/sim-racing-real.jpg"
                  alt="CyberX Sim Racing Омск Ленина 19"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090f] via-transparent to-transparent" />
                
                <span className="absolute bottom-3 left-3 text-[11px] font-mono text-white font-bold bg-[#000000]/80 px-2.5 py-1 rounded-lg border border-white/10 backdrop-blur-md">
                  📍 CyberX Arena // ул. Ленина, 19
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-baseline justify-between border-b border-white/[0.08] pb-3">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block">Стоимость заезда</span>
                    <div className="font-display font-black text-2xl text-white">
                      400 ₽ <span className="text-xs font-normal text-zinc-400">/ час</span>
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-zinc-400">
                    2 кокпита готовы к дуэли
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.playTrigger();
                    onOpenBooking('cyberx-arena', 'sim-racing');
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className="w-full py-3.5 px-6 rounded-2xl font-mono font-bold text-xs uppercase tracking-[0.15em] text-white bg-[#E32124] hover:bg-[#FF2A2E] shadow-lg shadow-red-600/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>Забронировать автосимулятор</span>
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
