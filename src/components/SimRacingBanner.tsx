import React, { useState } from 'react';
import { Gauge, Zap, ArrowRight } from 'lucide-react';
import { sound } from '../utils/sound';

interface SimRacingBannerProps {
  onOpenBooking: (arenaId: string, zoneId: string) => void;
}

export const SimRacingBanner: React.FC<SimRacingBannerProps> = ({ onOpenBooking }) => {
  const [selectedGame, setSelectedGame] = useState<'assetto' | 'f1' | 'forza'>('assetto');

  const games = [
    { id: 'assetto', name: 'Assetto Corsa Pro', tag: 'Реалистичная физика & Дрифт' },
    { id: 'f1', name: 'EA Sports F1 24', tag: 'Официальные болиды Formula 1' },
    { id: 'forza', name: 'Forza Horizon 5', tag: 'Открытый мир & Суперкары' },
  ];

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
            RACE
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex flex-wrap items-center gap-2.5 font-mono">
                <span className="px-3.5 py-1.5 rounded-full bg-[#E32124] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-red-600/30">
                  <Gauge className="w-3.5 h-3.5" />
                  ЭКСКЛЮЗИВ // ТОЛЬКО НА ЛЕНИНА, 19
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs text-zinc-300">
                  2 ГОНОЧНЫХ КОКПИТА
                </span>
              </div>

              <div>
                <h3 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white">
                  SIM-RACING <span className="text-[#E32124]">//</span> АВТОСИМУЛЯТОРЫ
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-zinc-300 max-w-xl font-normal leading-relaxed">
                  Почувствуйте реальный перегруз и сцепление колес с асфальтом на рулевых базах <span className="text-white font-bold">Direct Drive</span> с силой отдачи до 12 Nm, педалях с датчиками давления <span className="text-white font-bold">Load Cell</span> и изогнутых UltraWide мониторах.
                </p>
              </div>

              {/* Specs & Hardware pills (Rounded) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[10px] uppercase text-zinc-500 block">Базы руля</span>
                  <div className="text-xs font-bold text-white mt-1">Direct Drive</div>
                  <div className="text-[10px] text-[#E32124] mt-0.5">Мгновенный Force Feedback</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[10px] uppercase text-zinc-500 block">Педальный узел</span>
                  <div className="text-xs font-bold text-white mt-1">Load Cell Brake</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">Тензодатчик давления</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[10px] uppercase text-zinc-500 block">Режим гонки</span>
                  <div className="text-xs font-bold text-white mt-1">Парные дуэли 1v1</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">Синхронизация заездов</div>
                </div>
              </div>

              {/* Game Switcher (Rounded) */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-2">
                  Доступные гоночные дисциплины:
                </span>
                <div className="flex flex-wrap gap-2">
                  {games.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => {
                        sound.playClick();
                        setSelectedGame(g.id as typeof selectedGame);
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                        selectedGame === g.id
                          ? 'bg-[#E32124] text-white border-[#E32124]'
                          : 'bg-white/[0.03] text-zinc-400 border-white/[0.06] hover:text-white'
                      }`}
                    >
                      {g.name}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Card / CTA (Rounded) */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#09090f]/90 border border-white/[0.08] relative font-mono">
              
              <div className="relative h-48 rounded-2xl overflow-hidden mb-6 group border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1000&q=80"
                  alt="CyberX Sim Racing"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090f] via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[11px] font-mono text-white font-bold bg-[#000000]/80 px-2.5 py-1 rounded-lg border border-white/10">
                  📍 ул. Ленина, 19
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-baseline justify-between border-b border-white/[0.08] pb-3">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block">Стоимость заезда</span>
                    <div className="font-display font-black text-2xl text-white">
                      500 ₽ <span className="text-xs font-normal text-zinc-400">/ час</span>
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
                  className="w-full py-3.5 px-6 rounded-2xl font-mono font-bold text-xs uppercase tracking-[0.15em] text-white bg-[#E32124] hover:bg-[#FF2A2E] shadow-lg shadow-red-600/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
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
