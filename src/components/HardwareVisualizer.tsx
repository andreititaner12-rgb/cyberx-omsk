import React, { useState, lazy, Suspense } from 'react';
import { HARDWARE_LIST } from '../data/arenaData';
import {
  Monitor,
  Keyboard,
  Mouse,
  Cpu,
  Headphones,
  Armchair,
  Zap,
} from 'lucide-react';
import { sound } from '../utils/sound';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal, EASE_OUT } from './ui/Reveal';
import { DisplaySmoothnessSimulator } from './ui/DisplaySmoothnessSimulator';
import { KeyboardTester } from './ui/KeyboardTester';
import { MouseTester } from './ui/MouseTester';
import { PcTelemetryBenchmark } from './ui/PcTelemetryBenchmark';
import { AudioSpatialTester } from './ui/AudioSpatialTester';

// three.js — тяжёлый, грузим только когда открываются вкладки «Мыши»
const Mouse3DViewer = lazy(() => import('./ui/Mouse3DViewer'));

const CATEGORIES = [
  { id: 'monitors', label: 'Дисплеи 600Hz', icon: Monitor },
  { id: 'keyboards', label: 'Механика Dark Project', icon: Keyboard },
  { id: 'mice', label: 'Мыши и коврики', icon: Mouse },
  { id: 'rigs', label: 'RTX 5070 Ti · 7800X3D', icon: Cpu },
  { id: 'audio', label: 'Звук HyperX', icon: Headphones },
  { id: 'chairs', label: 'Эргономика', icon: Armchair },
];

export const HardwareVisualizer: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('monitors');
  const item = HARDWARE_LIST.find((h) => h.category === activeCategory) || HARDWARE_LIST[0];

  return (
    <section id="hardware" className="relative scroll-mt-24">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-10 py-20 sm:py-28">
        <SectionHeading
          index="04"
          label="Тех-арсенал"
          title="Железо соревновательного уровня"
          lead="Мониторы BenQ до 600Hz, процессоры AMD Ryzen 7 7800X3D и Intel Core i5-14600KF, видеокарты RTX 5070 Ti, смазанная механика Dark Project и фирменные кресла. Попробуй каждый модуль сам."
        />

        {/* Категории: подчёркивание вместо таблеток */}
        <Reveal delay={0.08} className="mt-10 sm:mt-12">
          <div className="flex gap-6 sm:gap-8 overflow-x-auto border-b border-white/[0.08] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveCategory(cat.id);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`relative flex items-center gap-2.5 pb-4 pt-1 whitespace-nowrap transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-cyberx-faint hover:text-white/70'
                  }`}
                >
                  <Icon size={15} className={isActive ? 'text-cyberx-red' : ''} />
                  <span className="text-[13px] sm:text-sm font-medium tracking-wide">{cat.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2px] bg-cyberx-red transition-transform duration-300 ease-out origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                    aria-hidden
                  />
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Контент */}
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch"
          >
            {/* Интерактивный модуль */}
            <div className="lg:col-span-7 flex flex-col rounded-3xl border border-white/[0.08] bg-cyberx-surface p-6 sm:p-8">
              <div className="mb-5">
                <div className="eyebrow text-cyberx-red flex items-center gap-2">
                  <Zap size={13} />
                  {item.categoryLabel}
                </div>
                <h3 className="mt-2 font-display font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight leading-tight">
                  {item.name}
                </h3>
                <p className="mt-1.5 text-xs font-mono text-cyberx-muted">{item.model}</p>
              </div>

              <div className="flex-1 rounded-2xl border border-white/[0.06] bg-[#06060a] p-4 sm:p-6">
                {item.interactiveType === 'hertz' && <DisplaySmoothnessSimulator />}
                {item.interactiveType === 'actuation' && <KeyboardTester />}
                {item.interactiveType === 'sensor' && <MouseTester />}
                {item.interactiveType === 'fps' && <PcTelemetryBenchmark />}
                {item.interactiveType === 'audioGraph' && <AudioSpatialTester />}
                {item.interactiveType === 'ergonomics' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                    {[
                      { t: 'Стальной каркас 1.5 мм', d: 'Газлифт 4 класса, нагрузка до 150 кг.' },
                      { t: 'Memory Foam', d: 'Поддержка поясницы и шейного отдела.' },
                      { t: 'Подлокотники 3D/4D', d: 'Регулировка вровень со столешницей.' },
                      { t: 'Мультиблок 90°–165°', d: 'Фиксация спинки в любом положении.' },
                    ].map((f) => (
                      <div key={f.t} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                        <div className="text-[13px] font-bold text-white">{f.t}</div>
                        <div className="mt-1 text-[11px] text-cyberx-muted leading-snug">{f.d}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Преимущество */}
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                <span className="mt-1 h-px w-5 bg-cyberx-red shrink-0" aria-hidden />
                <p className="text-xs sm:text-[13px] text-white/75 leading-relaxed">
                  <span className="font-semibold text-white block mb-0.5">
                    Преимущество в матче:
                  </span>
                  {item.proAdvantage}
                </p>
              </div>
            </div>

            {/* Фото + спецификации */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {item.category === 'mice' ? (
                <Suspense
                  fallback={
                    <div className="h-64 sm:h-72 rounded-3xl border border-white/[0.08] bg-cyberx-surface flex items-center justify-center">
                      <span className="eyebrow text-cyberx-faint">Загрузка 3D-модели…</span>
                    </div>
                  }
                >
                  <Mouse3DViewer />
                </Suspense>
              ) : (
                <div className="relative h-64 sm:h-72 rounded-3xl overflow-hidden border border-white/[0.08] group bg-cyberx-surface">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <p className="absolute bottom-4 left-4 right-4 text-xs text-white/80 drop-shadow">
                    {item.tagline}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-px bg-white/[0.07] rounded-2xl overflow-hidden border border-white/[0.06] flex-1">
                {item.keySpecs.map((spec) => (
                  <div key={spec.label} className="bg-cyberx-surface p-4 sm:p-5 transition-colors duration-300 hover:bg-cyberx-raised">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-cyberx-faint font-mono">
                      {spec.label}
                    </div>
                    <div className="mt-1.5 font-display font-extrabold text-lg text-white leading-tight">
                      {spec.value}
                    </div>
                    {spec.detail && (
                      <div className="mt-1 text-[10px] text-cyberx-muted leading-snug">
                        {spec.detail}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
