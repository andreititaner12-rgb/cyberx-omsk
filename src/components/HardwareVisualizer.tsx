import React, { useState, useRef } from 'react';
import { HARDWARE_LIST } from '../data/arenaData';
import { 
  Monitor, 
  Keyboard, 
  Mouse, 
  Cpu, 
  Headphones, 
  Armchair, 
  Zap, 
  CheckCircle2, 
  Sliders, 
  Activity
} from 'lucide-react';
import { sound } from '../utils/sound';
import { motion, AnimatePresence } from 'framer-motion';

export const HardwareVisualizer: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('monitors');
  const [hzValue, setHzValue] = useState<number>(600);
  const [actuationValue, setActuationValue] = useState<number>(0.2);
  const [mouseCanvasPoints, setMouseCanvasPoints] = useState<{ x: number; y: number }[]>([]);
  const [audioProfile, setAudioProfile] = useState<'footsteps' | 'flat' | 'bass'>('footsteps');

  const mouseTestRef = useRef<HTMLDivElement | null>(null);

  const selectedItem = HARDWARE_LIST.find((h) => h.category === activeCategory) || HARDWARE_LIST[0];

  const categories = [
    { id: 'monitors', label: 'Дисплеи 600Hz', icon: Monitor },
    { id: 'keyboards', label: 'Dark Project Механика', icon: Keyboard },
    { id: 'mice', label: 'Мыши Logitech & Ajazz', icon: Mouse },
    { id: 'rigs', label: 'RTX 5070 Ti & 7800X3D', icon: Cpu },
    { id: 'audio', label: 'HyperX Cloud', icon: Headphones },
    { id: 'chairs', label: 'Кресла Tesoro', icon: Armchair },
  ];

  // Mouse canvas tester movement
  const handleMouseTestMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mouseTestRef.current) return;
    const rect = mouseTestRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMouseCanvasPoints((prev) => [...prev.slice(-35), { x, y }]);
  };

  return (
    <section id="hardware" className="relative py-24 sm:py-32 bg-transparent overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/[0.04] rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-10 w-[400px] h-[400px] bg-red-600/[0.03] rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Centered Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E32124]/10 border border-[#E32124]/30 text-[#E32124] text-xs font-mono font-bold tracking-wider uppercase mb-3.5">
            <Sliders className="w-3.5 h-3.5" />
            Оснащение CyberX Омск
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight uppercase text-white">
            HARDWARE <span className="text-[#E32124]">//</span> ТЕХ-АРСЕНАЛ 600HZ
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Топовое соревновательное железо в Омске: мониторы BenQ до 600Hz, процессоры AMD Ryzen 7 7800X3D и Intel Core i5-14600KF, видеокарты RTX 5070 Ti и кастомная механика Dark Project.
          </p>
        </motion.div>

        {/* Category Selector Tabs (Rounded) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10"
        >
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
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 border ${
                  isActive
                    ? 'bg-[#E32124] text-white border-[#E32124] shadow-lg shadow-red-600/30'
                    : 'bg-[#121218]/80 text-zinc-400 border-white/[0.08] hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#E32124]'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Main Hardware Interactive Visualizer Display (Rounded Dark Glass) */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedItem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
          >
            
            {/* Left Column: Visual Specs & Interactive Simulator */}
            <div className="lg:col-span-7 flex flex-col justify-between glass-card p-6 sm:p-8 rounded-3xl border border-white/[0.08] relative overflow-hidden">
              
              {/* Top info badge */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <span className="text-[11px] font-mono tracking-widest text-[#E32124] uppercase font-bold">
                    {selectedItem.categoryLabel} // СООТВЕТСТВИЕ СТАНДАРТУ
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
              <div className="my-6 p-5 rounded-2xl bg-[#08080c] border border-white/[0.08] relative">
                
                {/* 1. MONITOR REFRESH RATE SIMULATOR */}
                {selectedItem.interactiveType === 'hertz' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-[#E32124]" />
                        Симулятор плавности матрицы:
                      </span>
                      <span className="text-xs font-mono font-bold text-[#E32124] bg-[#E32124]/10 px-2 py-0.5 rounded border border-[#E32124]/30">
                        {hzValue} FPS / Hz
                      </span>
                    </div>

                    {/* Visual Smoothness Canvas Simulator */}
                    <div className="h-28 bg-[#0e0e14] rounded-xl border border-white/[0.06] relative overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center justify-between px-6 opacity-20 pointer-events-none">
                        <div className="w-[1px] h-full bg-white/20" />
                        <div className="w-[1px] h-full bg-white/20" />
                        <div className="w-[1px] h-full bg-white/20" />
                        <div className="w-[1px] h-full bg-white/20" />
                      </div>

                      {/* Animated moving target (Rounded target) */}
                      <div 
                        className="relative w-12 h-12 rounded-full border-2 border-[#E32124] bg-[#E32124]/20 flex items-center justify-center animate-bounce"
                        style={{
                          animationDuration: `${Math.max(0.3, 2000 / hzValue)}s`,
                          filter: hzValue < 144 ? 'blur(2px)' : 'none',
                          boxShadow: hzValue >= 400 ? '0 0 22px #E32124' : 'none',
                        }}
                      >
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>

                      <div className="absolute bottom-2 left-3 text-[10px] font-mono text-zinc-500">
                        {hzValue === 600 ? '✓ 600Hz Extreme Speed (Zero Motion Blur)' : hzValue >= 400 ? 'Сверхвысокая частота кадров' : 'Стандартный уровень'}
                      </div>
                    </div>

                    {/* Hz Slider Switcher */}
                    <div className="flex items-center gap-2 pt-1">
                      {[144, 240, 400, 480, 600].map((val) => (
                        <button
                          key={val}
                          onClick={() => {
                            sound.playClick();
                            setHzValue(val);
                          }}
                          className={`flex-1 py-1.5 text-xs font-mono font-bold rounded-xl transition-all border ${
                            hzValue === val
                              ? 'bg-[#E32124] text-white border-[#E32124]'
                              : 'bg-white/[0.03] text-zinc-400 border-white/[0.06] hover:bg-white/[0.08]'
                          }`}
                        >
                          {val}Hz
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. MECHANICAL SWITCH TRAVEL */}
                {selectedItem.interactiveType === 'actuation' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-[#E32124]" />
                        Ход свитчей Dark Project:
                      </span>
                      <span className="text-xs font-mono font-bold text-[#E32124] bg-[#E32124]/10 px-2 py-0.5 rounded border border-[#E32124]/30">
                        {actuationValue.toFixed(1)} мм
                      </span>
                    </div>

                    <div className="p-4 bg-[#0e0e14] rounded-xl border border-white/[0.06]">
                      <div className="relative h-10 bg-white/[0.04] rounded-lg overflow-hidden flex items-center px-4">
                        <div 
                          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#E32124]/40 to-[#E32124]/90 border-r-2 border-white transition-all duration-150"
                          style={{ width: `${(actuationValue / 4.0) * 100}%` }}
                        />
                        <span className="relative z-10 text-xs font-mono font-bold text-white drop-shadow">
                          Смазанные механические свитчи Dark Project
                        </span>
                      </div>

                      <input
                        type="range"
                        min="0.1"
                        max="4.0"
                        step="0.1"
                        value={actuationValue}
                        onChange={(e) => {
                          setActuationValue(parseFloat(e.target.value));
                        }}
                        className="w-full mt-3 accent-[#E32124] cursor-pointer"
                      />

                      <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                        <span>0.1 мм (Мгновенный отклик)</span>
                        <span>2.0 мм (Точка срабатывания)</span>
                        <span>4.0 мм (Полный ход)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. MOUSE TRACKING SANDBOX */}
                {selectedItem.interactiveType === 'sensor' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5 text-[#E32124]" />
                        Интерактивный тест сенсора (подвигайте мышь в поле):
                      </span>
                      <span className="text-xs font-mono text-[#E32124] font-bold">Hero / PixArt 3395</span>
                    </div>

                    <div
                      ref={mouseTestRef}
                      onMouseMove={handleMouseTestMove}
                      className="h-28 bg-[#0e0e14] rounded-xl border border-dashed border-white/20 relative overflow-hidden cursor-crosshair flex items-center justify-center select-none"
                    >
                      {mouseCanvasPoints.length === 0 ? (
                        <span className="text-xs font-mono text-zinc-500">
                          Наведите курсор и двигайте внутри этого блока
                        </span>
                      ) : (
                        mouseCanvasPoints.map((pt, i) => (
                          <div
                            key={i}
                            className="absolute w-1.5 h-1.5 rounded-full bg-[#E32124]"
                            style={{
                              left: pt.x,
                              top: pt.y,
                              opacity: (i + 1) / mouseCanvasPoints.length,
                              transform: 'translate(-50%, -50%)',
                            }}
                          />
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* 4. BEAST PC FPS BENCHMARK */}
                {selectedItem.interactiveType === 'fps' && (
                  <div className="space-y-3">
                    <div className="text-xs font-mono uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-[#E32124]" />
                      Средний FPS на сетапах RTX 5070 Ti & Ryzen 7 7800X3D:
                    </div>

                    <div className="space-y-2.5">
                      <div>
                        <div className="flex justify-between text-xs font-mono mb-1">
                          <span className="text-zinc-300">Counter-Strike 2 (Competitive)</span>
                          <span className="text-[#E32124] font-bold">750 FPS avg</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#E32124] rounded-full w-[98%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-mono mb-1">
                          <span className="text-zinc-300">Valorant (Full HD)</span>
                          <span className="text-[#E32124] font-bold">850 FPS avg</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#E32124] rounded-full w-[100%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-mono mb-1">
                          <span className="text-zinc-300">Dota 2 (Captains Mode)</span>
                          <span className="text-white font-bold">380 FPS</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-zinc-400 rounded-full w-[85%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. AUDIO EQUALIZER FREQUENCY */}
                {selectedItem.interactiveType === 'audioGraph' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                        Профиль гарнитур HyperX Cloud:
                      </span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => setAudioProfile('footsteps')}
                          className={`px-2.5 py-1 text-[10px] font-mono rounded-lg transition-all ${
                            audioProfile === 'footsteps' ? 'bg-[#E32124] text-white' : 'bg-white/10 text-zinc-400'
                          }`}
                        >
                          Шаги CS2 (+6dB)
                        </button>
                        <button
                          onClick={() => setAudioProfile('flat')}
                          className={`px-2.5 py-1 text-[10px] font-mono rounded-lg transition-all ${
                            audioProfile === 'flat' ? 'bg-[#E32124] text-white' : 'bg-white/10 text-zinc-400'
                          }`}
                        >
                          Баланс
                        </button>
                      </div>
                    </div>

                    {/* Equalizer bars animation */}
                    <div className="h-20 bg-[#0e0e14] rounded-xl border border-white/[0.06] flex items-end justify-between px-6 py-3 gap-1.5">
                      {[40, 65, 80, 95, 85, 90, 75, 60, 70, 90, 85, 60].map((h, idx) => (
                        <div
                          key={idx}
                          className="flex-1 bg-gradient-to-t from-[#930E10] to-[#E32124] rounded-t transition-all duration-300"
                          style={{
                            height: audioProfile === 'footsteps' && idx >= 3 && idx <= 8 ? `${h}%` : `${h * 0.6}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. ERGONOMICS INFO */}
                {selectedItem.interactiveType === 'ergonomics' && (
                  <div className="space-y-2 text-xs text-zinc-300">
                    <p className="font-mono text-[#E32124] font-bold">
                      ✓ Премиальные кресла Tesoro Zone &amp; Master
                    </p>
                    <p className="text-zinc-400">
                      Стальной каркас, плотная формованная пена, поясничные и шейные валики для сохранения правильной осанки даже после 10 часов игры.
                    </p>
                  </div>
                )}

              </div>

              {/* Pro Advantage Quote */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#E32124] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono font-bold text-white uppercase block">
                    Преимущество в соревновательных матчах:
                  </span>
                  <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">
                    {selectedItem.proAdvantage}
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Key Specs Grid & Photo */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              
              {/* Visual Photo Card */}
              <div className="relative h-56 sm:h-64 rounded-3xl overflow-hidden border border-white/[0.08] group">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 font-mono">
                  <span className="px-2.5 py-1 rounded-lg bg-[#E32124] text-white text-[10px] font-bold uppercase tracking-wider">
                    ОСНАЩЕНИЕ CYBERX OMSK
                  </span>
                  <p className="text-xs text-zinc-200 mt-1.5 font-medium drop-shadow">
                    {selectedItem.tagline}
                  </p>
                </div>
              </div>

              {/* Key Specs Breakdown */}
              <div className="grid grid-cols-2 gap-3">
                {selectedItem.keySpecs.map((spec, i) => (
                  <div
                    key={i}
                    className="glass-card p-4 rounded-2xl border border-white/[0.06] hover:border-[#E32124]/40 transition-colors font-mono"
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
