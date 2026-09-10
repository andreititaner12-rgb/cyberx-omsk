import React, { useEffect, useState } from 'react';
import { UPCOMING_TOURNAMENT } from '../data/arenaData';
import { Tournament } from '../types';
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  Award,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { sound } from '../utils/sound';
import { motion } from 'framer-motion';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';

const pluralSlots = (n: number): string => {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return 'слот';
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return 'слота';
  return 'слотов';
};

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
  const tournament = tournamentData || UPCOMING_TOURNAMENT;

  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0, past: false });

  // Дата старта: ISO из данных турнира, fallback — фиксированная
  const target = (() => {
    const iso = (tournament as { dateISO?: string }).dateISO;
    if (iso) {
      const t = new Date(iso).getTime();
      if (!Number.isNaN(t)) return t;
    }
    return new Date('2026-09-20T12:00:00+06:00').getTime();
  })();

  useEffect(() => {
    const update = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0, past: true });
        return;
      }
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
        past: false,
      });
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [target]);

  const slotPct = Math.round((tournament.slotsRegistered / tournament.slotsTotal) * 100);
  const free = tournament.slotsTotal - tournament.slotsRegistered;

  return (
    <section id="tournaments" className="relative scroll-mt-24 select-none">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-10 py-20 sm:py-28">
        <SectionHeading
          index="05"
          label="Киберспортивная сцена"
          title="Главный LAN сезона"
          lead="Собери команду, зарегистрируйся и сражайся за кубок CyberX и реальный призовой фонд на сцене CyberX Arena. Финал комментируют профессиональные кастеры, трансляция на Twitch."
        />

        <Reveal delay={0.1} className="mt-12 sm:mt-16">
          <div className="rounded-3xl border border-white/[0.08] bg-cyberx-surface overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Левая часть: турнир */}
              <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12">
                <div className="eyebrow text-cyberx-red">{tournament.gameTag}</div>
                <h3 className="mt-3 font-display font-black uppercase text-2xl sm:text-4xl text-white tracking-tight leading-[1.05]">
                  {tournament.title}
                </h3>
                <p className="mt-3 text-sm text-cyberx-muted leading-relaxed max-w-xl">
                  {tournament.description}
                </p>

                {/* Факты турнира */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.07] rounded-xl overflow-hidden border border-white/[0.06]">
                  {[
                    { icon: Calendar, k: 'Дата и время', v: tournament.date, d: tournament.time },
                    { icon: MapPin, k: 'Локация', v: 'CyberX Arena', d: 'ул. Ленина, 19' },
                    { icon: Users, k: 'Формат', v: 'Double Elim 5x5', d: 'LAN-сервер 600Hz' },
                  ].map((s) => {
                    const Icon = s.icon;
                    return (
                      <div key={s.k} className="bg-cyberx-surface p-4 sm:p-5">
                        <div className="text-[10px] uppercase tracking-[0.16em] text-cyberx-faint font-mono flex items-center gap-1.5">
                          <Icon size={12} className="text-cyberx-red" />
                          {s.k}
                        </div>
                        <div className="mt-1.5 text-sm font-bold text-white">{s.v}</div>
                        <div className="text-[11px] text-cyberx-muted">{s.d}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Слоты */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs font-mono mb-2.5">
                    <span className="text-cyberx-muted">
                      Слоты: <span className="text-white font-semibold">{tournament.slotsRegistered} / {tournament.slotsTotal}</span>
                    </span>
                    <span className="text-cyberx-red font-semibold">
                      осталось {free} {pluralSlots(free)}
                    </span>
                  </div>
                  <div className="h-[3px] rounded-full bg-white/[0.08] overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-cyberx-red origin-left"
                      style={{ width: `${slotPct}%` }}
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      sound.playTrigger();
                      onOpenRegister(tournament.id);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className="btn-primary"
                  >
                    Зарегистрировать команду
                    <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      onOpenAllTournaments();
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className="btn-ghost"
                  >
                    <Layers size={14} />
                    Все турниры сезона
                  </button>
                </div>
              </div>

              {/* Правая часть: приз + таймер */}
              <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/[0.08] bg-cyberx-raised/40 p-6 sm:p-10 lg:p-12 flex flex-col justify-between gap-10">
                <div>
                  <div className="eyebrow text-cyberx-faint">Призовой фонд</div>
                  <div className="mt-2 font-display font-black text-5xl sm:text-6xl text-white tracking-tight">
                    {tournament.prizePool.replace(' ₽', '')}
                    <span className="text-2xl sm:text-3xl text-cyberx-red"> ₽</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-cyberx-muted">
                    <Award size={14} className="text-cyberx-red" />
                    + кубок CyberX Omsk и часы в Premium-залах
                  </div>
                </div>

                <div>
                  <div className="eyebrow text-cyberx-faint mb-3">
                    {timeLeft.past ? 'Турнир идёт прямо сейчас' : 'До старта осталось'}
                  </div>
                  <div className="grid grid-cols-4 gap-px bg-white/[0.08] rounded-xl overflow-hidden border border-white/[0.06]">
                    {[
                      { v: timeLeft.d, l: 'дней' },
                      { v: timeLeft.h, l: 'часов' },
                      { v: timeLeft.m, l: 'минут' },
                      { v: timeLeft.s, l: 'секунд' },
                    ].map((c) => (
                      <div key={c.l} className="bg-cyberx-surface py-4 text-center">
                        <div className="font-display font-extrabold text-2xl sm:text-3xl text-white tabular-nums">
                          {String(c.v).padStart(2, '0')}
                        </div>
                        <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-cyberx-faint font-mono">
                          {c.l}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-[11px] font-mono text-cyberx-muted flex items-center gap-2">
                    <Trophy size={13} className="text-cyberx-red" />
                    {tournament.entryFee}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
