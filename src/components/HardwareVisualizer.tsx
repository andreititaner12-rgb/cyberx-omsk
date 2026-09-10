import React, { useState } from 'react';
import { HARDWARE_LIST } from '../data/arenaData';
import { 
  Monitor, 
  Keyboard, 
  Mouse, 
  Cpu, 
  Headphones, 
  Armchair, 
  CheckCircle2, 
  Sliders, 
  Activity,
  Zap,
  ShieldCheck,
  Check
} from 'lucide-react';
import { sound } from '../utils/sound';
import { motion, AnimatePresence } from 'framer-motion';

import { DisplaySmoothnessSimulator } from './ui/DisplaySmoothnessSimulator';
import { KeyboardTester } from './ui/KeyboardTester';
import { MouseTester } from './ui/MouseTester';
import { Mouse3DViewer } from './ui/Mouse3DViewer';
import { PcTelemetryBenchmark } from './ui/PcTelemetryBenchmark';
import { AudioSpatialTester } from './ui/AudioSpatialTester';

export const HardwareVisualizer: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('monitors');

  const selectedItem = HARDWARE_LIST.find((h) => h.category === activeCategory) || HARDWARE_LIST[0];

  const categories = [
    { id: 'monitors', label: 'Дисплеи 600Hz', icon: Monitor },
    { id: 'keyboards', label: 'Dark Project Механика', icon: Keyboard },
    { id: 'mice', label: 'Мыши Logitech & Ajazz', icon: Mouse },
    { id: 'rigs', label: 'RTX 5070 Ti & 7800X3D', icon: Cpu },
    { id: 'audio', label: 'HyperX Cloud', icon: Headphones },
    { id: 'chairs', label: 'Кресла CyberX', icon: Armchair },
  ];

  return (
    <section id="hardware" className="relative py-20 sm:py-28 bg-transparent scroll-mt-24">
      
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/[0.04] rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-10 w-[400px] h-[400px] bg-red-600/[0.03] rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E32124]/10 border border-[#E32124]/30 text-[#E32124] text-xs font-mono font-bold tracking-wider uppercase mb-3.5">
            <Sliders className="w-3.5 h-3.5" />
            Оснащение CyberX Омск
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight uppercase text-white">
            HARDWARE <span className="text-[#E32124]">//</span> ТЕХ-АРСЕНАЛ
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Топовое соревновательное железо в Омске: мониторы BenQ до 600Hz, процессоры AMD Ryzen 7 7800X3D и Intel Core i5-14600KF, видеокарты RTX 5070 Ti, механика Dark Project и фирменные эрго-кресла CyberX.
          </p>
        </div>

        {/* Category Selector Tabs (Unobstructed, Centered, Wrapped, No Scrollbar) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-12 overflow-visible">
          {categories.map((cat) => {
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
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 border cursor-pointer ${
                  isActive
                    ? 'bg-[#E32124] text-white border-[#E32124] shadow-lg shadow-red-600/30 scale-105'
                    : 'bg-[#121218]/80 text-zinc-400 border-white/[0.08] hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#E32124]'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Hardware Interactive Visualizer Display */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedItem.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
          >
            
            {/* Left Column: Interactive Module Playground */}
            <div className="lg:col-span-7 flex flex-col justify-between glass-card p-6 sm:p-8 rounded-3xl border border-white/[0.08] relative overflow-hidden bg-[#09090f]/95 shadow-2xl">
              
              {/* Top info header */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <span className="text-[11px] font-mono tracking-widest text-[#E32124] uppercase font-bold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#E32124]" />
                    {selectedItem.categoryLabel} // СООТВЕТСТВИЕ КИБЕРСПОРТИВНОМУ СТАНДАРТУ
                  </span>
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1 uppercase">
                    {selectedItem.name}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mt-1">
                    {selectedItem.model}
                  </p>
                </div>

                <div className="shrink-0 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                  <Activity className="w-5 h-5 text-[#E32124]" />
                </div>
              </div>

              {/* DYNAMIC INTERACTIVE MODULE */}
              <div className="my-4 p-4 sm:p-5 rounded-3xl bg-[#06060c] border border-white/[0.08] relative">
                
                {/* 1. MONITOR REFRESH RATE & SHOCKWAVE PHYSICS SIMULATOR */}
                {selectedItem.interactiveType === 'hertz' && (
                  <DisplaySmoothnessSimulator />
                )}

                {/* 2. KEYBOARD TESTER & LATENCY CALCULATOR */}
                {selectedItem.interactiveType === 'actuation' && (
                  <KeyboardTester />
                )}

                {/* 3. MOUSE SENSOR & DOUBLE-CLICK / CPS TESTER */}
                {selectedItem.interactiveType === 'sensor' && (
                  <MouseTester />
                )}

                {/* 4. BEAST PC LIVE FPS BENCHMARK */}
                {selectedItem.interactiveType === 'fps' && (
                  <PcTelemetryBenchmark />
                )}

                {/* 5. AUDIO CS2 SPATIAL POSITIONING TESTER */}
                {selectedItem.interactiveType === 'audioGraph' && (
                  <AudioSpatialTester />
                )}

                {/* 6. ERGONOMICS CYBERX CHAIRS */}
                {selectedItem.interactiveType === 'ergonomics' && (
                  <div className="space-y-4 font-mono text-xs">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span>Фирменные анатомические кресла CyberX Esports</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-300">
                      <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#E32124] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white block">Стальной каркас 1.5 мм</span>
                          <span className="text-[11px] text-zinc-400 leading-tight">Газлифт 4 класса, выдерживает нагрузку до 150 кг.</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#E32124] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white block">Memory Foam подушки</span>
                          <span className="text-[11px] text-zinc-400 leading-tight">Анатомическая поддержка поясницы и шейного отдела.</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#E32124] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white block">3D/4D Подлокотники</span>
                          <span className="text-[11px] text-zinc-400 leading-tight">Регулируются вровень со столешницей для опоры локтей.</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#E32124] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white block">Мультиблок 90° — 165°</span>
                          <span className="text-[11px] text-zinc-400 leading-tight">Откидывание спинки для отдыха между напряжёнными катками.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Pro Advantage Quote */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3 mt-4">
                <CheckCircle2 className="w-5 h-5 text-[#E32124] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono font-bold text-white uppercase block">
                    Преимущество в соревновательных матчах:
                  </span>
                  <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed font-mono">
                    {selectedItem.proAdvantage}
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Visual Photo Card / 3D Model & Key Specs Breakdown */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              
              {/* Either Real 3D GLB Model for Mice OR High-Resolution Hardware Photo Card */}
              {selectedItem.category === 'mice' ? (
                <Mouse3DViewer />
              ) : (
                <div className="relative h-72 sm:h-80 rounded-3xl overflow-hidden border border-white/[0.1] group bg-gradient-to-b from-[#11111a] to-[#06060a] shadow-2xl flex items-center justify-center">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/30 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-4 right-4 font-mono z-10">
                    <span className="px-2.5 py-1 rounded-lg bg-[#E32124] text-white text-[10px] font-bold uppercase tracking-wider shadow-md shadow-red-600/40">
                      ОСНАЩЕНИЕ CYBERX OMSK
                    </span>
                    <p className="text-xs text-zinc-200 mt-1.5 font-medium drop-shadow">
                      {selectedItem.tagline}
                    </p>
                  </div>
                </div>
              )}

              {/* Key Specs Breakdown */}
              <div className="grid grid-cols-2 gap-3">
                {selectedItem.keySpecs.map((spec, i) => (
                  <div
                    key={i}
                    className="glass-card p-4 rounded-2xl border border-white/[0.06] hover:border-[#E32124]/40 transition-colors font-mono bg-[#09090e]/90 shadow-lg"
                  >
                    <div className="text-[11px] text-zinc-400">
                      {spec.label}
                    </div>
                    <div className="text-base sm:text-lg font-display font-extrabold text-white mt-0.5">
                      {spec.value}
                    </div>
                    {spec.detail && (
                      <div className="text-[10px] text-zinc-500 mt-1 leading-tight">
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
