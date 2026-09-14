import React, { useState } from 'react';
import { Gauge, ArrowRight } from 'lucide-react';
import { sound } from '../utils/sound';
import { motion } from 'framer-motion';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';

interface SimRacingBannerProps {
  onOpenBooking: (arenaId: string, zoneId: string) => void;
}

const GAMES = [
  { id: 'forza', name: 'Forza Horizon 6', desc: 'Открытый мир, живописные трассы и топ-суперкары.' },
  { id: 'assetto', name: 'Assetto Corsa', desc: 'Эталонная физика, кастомные треки и соревновательный дрифт.' },
  { id: 'acc', name: 'Assetto Corsa Competizione', desc: 'Официальный хардкорный симулятор GT3 и гонок на выносливость.' },
  { id: 'dirt', name: 'DiRT', desc: 'Раллийные спецучастки, грязь, гравий и контролируемые заносы.' },
  { id: 'beamng', name: 'BeamNG Drive', desc: 'Мягкотелая физика кузова и реалистичные краш-тесты.' },
  { id: 'city', name: 'City Car Driving', desc: 'Обучение и реалистичное вождение в плотном городском трафике.' },
];

export const SimRacingBanner: React.FC<SimRacingBannerProps> = ({ onOpenBooking }) => {
  const [selectedGame, setSelectedGame] = useState('assetto');
  const active = GAMES.find((g) => g.id === selectedGame) || GAMES[0];

  return (
    <section id="sim-racing" className="relative scroll-mt-24">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-10 py-20 sm:py-28">
        <SectionHeading
          index="03"
          label="Эксклюзив флагмана"
          title="Sim-Racing на Ленина, 19"
          lead="Два гоночных кокпита на рулевой базе Moza Direct Drive с честным Force Feedback, педальный узел Moza Load Cell с тензодатчиками и изогнутые UltraWide мониторы. Дуэли 1v1 в реальном времени."
        />

        <Reveal delay={0.1} className="mt-12 sm:mt-16">
          <div className="rounded-3xl overflow-hidden border border-white/[0.08] bg-cyberx-surface">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Левая колонка */}
              <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.06] rounded-xl overflow-hidden border border-white/[0.06]">
                  {[
                    { k: 'Рулевая база', v: 'Moza R9 Direct Drive', d: 'чистый прямой привод FFB' },
                    { k: 'Педальный узел', v: 'Moza Load Cell', d: 'тензодатчик усилия торможения' },
                    { k: 'Режим гонки', v: 'Дуэли 1v1', d: 'синхронизация заездов' },
                  ].map((s) => (
                    <div key={s.k} className="bg-cyberx-surface px-5 py-4">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-cyberx-faint font-mono">
                        {s.k}
                      </div>
                      <div className="mt-1.5 text-sm font-bold text-white">{s.v}</div>
                      <div className="mt-0.5 text-[11px] text-cyberx-muted">{s.d}</div>
                    </div>
                  ))}
                </div>

                {/* Дисциплины */}
                <div className="mt-8">
                  <div className="eyebrow text-cyberx-faint mb-3 flex items-center gap-2">
                    <Gauge size={13} className="text-cyberx-red" />
                    Гоночные дисциплины
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                    {GAMES.map((g) => {
                      const isActive = g.id === selectedGame;
                      return (
                        <button
                          key={g.id}
                          onClick={() => {
                            sound.playClick();
                            setSelectedGame(g.id);
                          }}
                          onMouseEnter={() => sound.playHover()}
                          className={`group flex items-center gap-3 py-2.5 text-left transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-white/55 hover:text-white/85'
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 shrink-0 ${
                              isActive ? 'bg-cyberx-red scale-100' : 'bg-white/25 scale-75'
                            }`}
                            aria-hidden
                          />
                          <span className="text-[13px] sm:text-sm font-medium truncate">
                            {g.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <motion.p
                    key={active.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 hairline-t text-[12px] sm:text-[13px] text-cyberx-muted leading-relaxed"
                  >
                    <span className="text-white font-semibold">{active.name}.</span> {active.desc}
                  </motion.p>
                </div>

                {/* CTA */}
                <div className="mt-auto pt-8 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-cyberx-faint font-mono">
                      Заезд
                    </div>
                    <div className="font-display font-extrabold text-2xl text-white">
                      600 ₽
                      <span className="text-xs font-sans font-normal text-cyberx-muted"> /час</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      sound.playTrigger();
                      onOpenBooking('cyberx-arena', 'sim-racing');
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className="btn-primary"
                  >
                    Забронировать кокпит
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Правая колонка: фото с медленным Ken Burns */}
              <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[420px] lg:min-h-full overflow-hidden">
                <img
                  src="/images/sim-racing-real.jpg"
                  alt="Киберспортивные автосимуляторы CyberX Arena, Омск"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-cyberx-surface via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                  <div>
                    <div className="eyebrow text-white/70">CyberX Arena</div>
                    <div className="mt-1 text-sm font-semibold text-white">ул. Ленина, 19 — 2 кокпита</div>
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
