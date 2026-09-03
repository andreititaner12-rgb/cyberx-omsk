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
import { motion } from 'framer-motion';

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
    days: 17,
    hours: 12,
    minutes: 41,
    seconds: 56,
  });

  useEffect(() => {
    const targetDate = new Date('2026-09-20T12:00:00+06:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  const tournament = tournamentData || UPCOMING_TOURNAMENT;
  const slotPercentage = Math.round((tournament.slotsRegistered / tournament.slotsTotal) * 100);

  return (
    <section id="tournaments" className="relative py-20 bg-transparent overflow-hidden">
      
      {/* Background ambient red glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-600/[0.05] rounded-full blur-[160px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main High-Impact Tournament Banner (Rounded Dark Luxury) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl border border-white/[0.12] bg-gradient-to-br from-[#12121c] via-[#0d0d14] to-[#08080c] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl"
        >
          
          {/* Top subtle glow line */}
          <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-[#E32124] to-transparent" />
          
          {/* Watermark Logo */}
          <div className="pointer-events-none absolute -right-12 -bottom-12 opacity-5 select-none font-display font-black text-[220px] text-white">
            CS2
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex flex-wrap items-center gap-2.5 font-mono">
                <span className="px-3.5 py-1.5 rounded-full bg-[#E32124] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-red-600/30">
                  <Flame className="w-3.5 h-3.5" />
                  БЛИЖАЙШИЙ LAN ТУРНИР
                </span>
                {tournament.gameTag && (
                  <span className="px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs text-zinc-300">
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

              {/* Tournament Specs Grid (Rounded) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[10px] uppercase text-zinc-500 block flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#E32124]" /> Дата и Время
                  </span>
                  <div className="text-xs font-bold text-white mt-1">
                    {tournament.date}
                  </div>
                  <div className="text-[10px] text-zinc-400">{tournament.time}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[10px] uppercase text-zinc-500 block flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#E32124]" /> Локация
                  </span>
                  <div className="text-xs font-bold text-white mt-1 truncate">
                    CYBERX ARENA
                  </div>
                  <div className="text-[10px] text-zinc-400">ул. Ленина, 19</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase text-zinc-500 block flex items-center gap-1">
                    <Users className="w-3 h-3 text-[#E32124]" /> Формат
                  </span>
                  <div className="text-xs font-bold text-white mt-1">
                    Double Elim 5x5
                  </div>
                  <div className="text-[10px] text-zinc-400">LAN Сервер 600Hz</div>
                </div>
              </div>

              {/* Slot Availability Progress (Rounded) */}
              <div className="p-4 rounded-2xl bg-[#08080d] border border-white/[0.06] space-y-2 font-mono">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-300">
                    Слоты команд: <span className="text-white font-bold">{tournament.slotsRegistered}</span> / {tournament.slotsTotal}
                  </span>
                  <span className="text-[#E32124] font-bold">
                    Осталось всего {tournament.slotsTotal - tournament.slotsRegistered} слота!
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#E32124] to-[#FF5E66] rounded-full transition-all duration-500"
                    style={{ width: `${slotPercentage}%` }}
                  />
                </div>
              </div>

            </div>

            {/* Right Prize & Countdown Column (Rounded) */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#0a0a10]/90 border border-white/[0.08] relative font-mono">
              
              <div className="text-center pb-6 border-b border-white/[0.08]">
                <span className="text-[11px] uppercase tracking-widest text-zinc-400 block mb-1">
                  ПРИЗОВОЙ ФОНД ТУРНИРА
                </span>
                <div className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight drop-shadow-[0_0_25px_rgba(227,33,36,0.6)]">
                  {tournament.prizePool}
                </div>
                <div className="text-xs text-[#E32124] mt-1">
                  + Кубок CyberX Omsk и часы в Premium
                </div>
              </div>

              {/* Countdown (Rounded) */}
              <div className="py-6">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 block text-center mb-3">
                  До старта турнира осталось:
                </span>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="font-display font-extrabold text-xl sm:text-2xl text-white">
                      {timeLeft.days}
                    </div>
                    <div className="text-[9px] uppercase text-zinc-500">Дней</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="font-display font-extrabold text-xl sm:text-2xl text-white">
                      {timeLeft.hours}
                    </div>
                    <div className="text-[9px] uppercase text-zinc-500">Часов</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="font-display font-extrabold text-xl sm:text-2xl text-white">
                      {timeLeft.minutes}
                    </div>
                    <div className="text-[9px] uppercase text-zinc-500">Мин</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="font-display font-extrabold text-xl sm:text-2xl text-[#E32124]">
                      {timeLeft.seconds}
                    </div>
                    <div className="text-[9px] uppercase text-zinc-500">Сек</div>
                  </div>
                </div>
              </div>

              {/* CTAs (Rounded) */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => {
                    sound.playTrigger();
                    onOpenRegister(tournament.id);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className="w-full py-3.5 px-6 rounded-2xl font-mono font-bold text-xs uppercase tracking-[0.2em] text-white bg-[#E32124] hover:bg-[#FF2A2E] shadow-lg shadow-red-600/30 active:scale-95 transition-all flex items-center justify-center gap-2"
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

        </motion.div>

      </div>
    </section>
  );
};
