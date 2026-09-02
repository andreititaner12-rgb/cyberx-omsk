import React, { useState, useEffect } from 'react';
import { UPCOMING_TOURNAMENT } from '../data/arenaData';
import { Tournament } from '../types';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Flame, 
  Layers
} from 'lucide-react';
import { sound } from '../utils/sound';

interface TournamentCardProps {
  onOpenRegister: (tournamentId: string) => void;
  onOpenAllTournaments: () => void;
  tournamentData?: Tournament;
}

export const TournamentCard: React.FC<TournamentCardProps> = ({
  onOpenRegister,
  onOpenAllTournaments,
  tournamentData,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 18,
    hours: 7,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const tournament = tournamentData || UPCOMING_TOURNAMENT;
  const slotPercentage = Math.round((tournament.slotsRegistered / tournament.slotsTotal) * 100);

  return (
    <section id="tournaments" className="relative py-20 bg-[#070709] overflow-hidden">
      
      {/* Background ambient red glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-600/[0.05] rounded-full blur-[160px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main High-Impact Tournament Banner */}
        <div className="relative rounded-3xl border border-white/[0.12] bg-gradient-to-br from-[#12121c] via-[#0d0d14] to-[#08080c] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
          
          {/* Top subtle glow line */}
          <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-[#FF1E27] to-transparent" />
          
          {/* Watermark Logo / Glyph */}
          <div className="pointer-events-none absolute -right-12 -bottom-12 opacity-5 select-none font-display font-black text-[220px] text-white">
            CS2
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-[#FF1E27] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-red-600/30">
                  <Flame className="w-3.5 h-3.5" />
                  БЛИЖАЙШИЙ LAN ТУРНИР
                </span>
                {tournament.gameTag && (
                  <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-mono text-zinc-300">
                    {tournament.gameTag}
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white">
                  {tournament.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-300 max-w-xl font-light">
                  {tournament.description}
                </p>
              </div>

              {/* Tournament Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#FF1E27]" /> Дата и Время
                  </span>
                  <div className="text-xs font-bold text-white mt-1">
                    {tournament.date}
                  </div>
                  <div className="text-[10px] text-zinc-400">{tournament.time}</div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#FF1E27]" /> Локация
                  </span>
                  <div className="text-xs font-bold text-white mt-1 truncate">
                    NEXUS PRIME
                  </div>
                  <div className="text-[10px] text-zinc-400">Тверская, 12</div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block flex items-center gap-1">
                    <Users className="w-3 h-3 text-[#FF1E27]" /> Формат
                  </span>
                  <div className="text-xs font-bold text-white mt-1">
                    Double Elim 5x5
                  </div>
                  <div className="text-[10px] text-zinc-400">LAN Сервер 540Hz</div>
                </div>
              </div>

              {/* Slot Availability Progress */}
              <div className="p-4 rounded-2xl bg-[#08080d] border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-300">
                    Слоты команд: <span className="text-white font-bold">{tournament.slotsRegistered}</span> / {tournament.slotsTotal}
                  </span>
                  <span className="text-[#FF1E27] font-bold">
                    Осталось всего {tournament.slotsTotal - tournament.slotsRegistered} слота!
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF1E27] to-[#FF5E66] rounded-full transition-all duration-500"
                    style={{ width: `${slotPercentage}%` }}
                  />
                </div>
              </div>

            </div>

            {/* Right Prize & Countdown Column */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#0a0a10]/80 border border-white/[0.08] relative">
              
              <div className="text-center pb-6 border-b border-white/[0.08]">
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                  ПРИЗОВОЙ ФОНД ТУРНИРА
                </span>
                <div className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight drop-shadow-[0_0_25px_rgba(255,30,39,0.5)]">
                  {tournament.prizePool}
                </div>
                <div className="text-xs font-mono text-[#FF1E27] mt-1">
                  + Кубок Nexus и сертификаты на Pro-буткамп
                </div>
              </div>

              {/* Countdown */}
              <div className="py-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block text-center mb-3">
                  До старта турнира осталось:
                </span>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="font-display font-extrabold text-xl sm:text-2xl text-white">
                      {timeLeft.days}
                    </div>
                    <div className="text-[9px] font-mono uppercase text-zinc-500">Дней</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="font-display font-extrabold text-xl sm:text-2xl text-white">
                      {timeLeft.hours}
                    </div>
                    <div className="text-[9px] font-mono uppercase text-zinc-500">Часов</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="font-display font-extrabold text-xl sm:text-2xl text-white">
                      {timeLeft.minutes}
                    </div>
                    <div className="text-[9px] font-mono uppercase text-zinc-500">Мин</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="font-display font-extrabold text-xl sm:text-2xl text-[#FF1E27]">
                      {timeLeft.seconds}
                    </div>
                    <div className="text-[9px] font-mono uppercase text-zinc-500">Сек</div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => {
                    sound.playTrigger();
                    onOpenRegister(tournament.id);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className="w-full py-3.5 px-6 rounded-xl font-display font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#FF1E27] to-[#C4001B] hover:from-[#FF2E36] hover:to-[#FF1E27] shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>Зарегистрировать команду</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenAllTournaments();
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className="w-full py-2.5 px-4 rounded-xl font-mono text-xs text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-all flex items-center justify-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Все турниры сезона (Dota 2, Valorant, FC 25) →</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
