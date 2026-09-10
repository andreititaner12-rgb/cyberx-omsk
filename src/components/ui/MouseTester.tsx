import React, { useState, useRef } from 'react';
import { sound } from '../../utils/sound';
import { Mouse, Activity, CheckCircle2, RefreshCw, Zap } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

export const MouseTester: React.FC = () => {
  const [trail, setTrail] = useState<Point[]>([]);
  const [lineOpacity, setLineOpacity] = useState<number>(1);
  const [leftClicks, setLeftClicks] = useState<number>(0);
  const [rightClicks, setRightClicks] = useState<number>(0);
  const [middleClicks, setMiddleClicks] = useState<number>(0);
  const [doubleClicksDetected, setDoubleClicksDetected] = useState<number>(0);
  const [cps, setCps] = useState<number>(0);
  const [lastDebounceMs, setLastDebounceMs] = useState<number>(1.2);
  const [lastClickedButton, setLastClickedButton] = useState<'left' | 'right' | 'middle' | 'side' | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const lastClickTimeRef = useRef<number>(0);
  const clickTimestampsRef = useRef<number[]>([]);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    setLineOpacity(1);
  };

  // Smooth graceful trail fade-out when mouse leaves
  const handleMouseLeave = () => {
    setLineOpacity(0);
    fadeTimeoutRef.current = setTimeout(() => {
      setTrail([]);
      setLineOpacity(1);
    }, 700);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setLineOpacity(1);
    setTrail((prev) => [...prev.slice(-65), { x, y }]);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!canvasRef.current || e.touches.length === 0) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    setLineOpacity(1);
    setTrail((prev) => [...prev.slice(-65), { x, y }]);
  };

  const handleTouchClickZone = (e: React.TouchEvent) => {
    e.preventDefault();
    sound.playClick();

    const now = performance.now();
    if (lastClickTimeRef.current > 0) {
      const diff = now - lastClickTimeRef.current;
      setLastDebounceMs(parseFloat(Math.max(0.6, diff * 0.04).toFixed(1)));
      if (diff < 28) {
        setDoubleClicksDetected((prev) => prev + 1);
      }
    }
    lastClickTimeRef.current = now;

    clickTimestampsRef.current.push(now);
    const oneSecAgo = now - 1000;
    clickTimestampsRef.current = clickTimestampsRef.current.filter((t) => t > oneSecAgo);
    setCps(clickTimestampsRef.current.length);

    setLeftClicks((p) => p + 1);
    setLastClickedButton('left');

    setTimeout(() => {
      setLastClickedButton(null);
    }, 180);
  };

  // Unified universal click handler
  const handleUniversalMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    sound.playClick();

    const now = performance.now();
    
    // Check debounce & double-click
    if (lastClickTimeRef.current > 0) {
      const diff = now - lastClickTimeRef.current;
      setLastDebounceMs(parseFloat(Math.max(0.6, diff * 0.04).toFixed(1)));

      if (diff < 28) {
        setDoubleClicksDetected((prev) => prev + 1);
      }
    }
    lastClickTimeRef.current = now;

    // CPS Calculation
    clickTimestampsRef.current.push(now);
    const oneSecAgo = now - 1000;
    clickTimestampsRef.current = clickTimestampsRef.current.filter((t) => t > oneSecAgo);
    setCps(clickTimestampsRef.current.length);

    // Identify button
    if (e.button === 0) {
      setLeftClicks((p) => p + 1);
      setLastClickedButton('left');
    } else if (e.button === 2) {
      setRightClicks((p) => p + 1);
      setLastClickedButton('right');
    } else if (e.button === 1) {
      setMiddleClicks((p) => p + 1);
      setLastClickedButton('middle');
    } else {
      setLastClickedButton('side');
    }

    setTimeout(() => {
      setLastClickedButton(null);
    }, 180);
  };

  const resetStats = () => {
    sound.playClick();
    setLeftClicks(0);
    setRightClicks(0);
    setMiddleClicks(0);
    setDoubleClicksDetected(0);
    setCps(0);
    setTrail([]);
  };

  // Build smooth continuous SVG path
  const svgPathData = trail.reduce((acc, pt, idx) => {
    if (idx === 0) return `M ${pt.x} ${pt.y}`;
    return `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  return (
    <div className="space-y-4 font-mono select-none">
      
      {/* Telemetry Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        
        {/* Left / Right / Middle Clicks */}
        <div className="p-3 rounded-2xl bg-[#0a0a10] border border-white/[0.08]">
          <span className="text-[10px] uppercase text-zinc-500 block">ЛКМ / ПКМ / СКМ</span>
          <div className="text-base font-bold text-white mt-0.5 flex items-center gap-1.5">
            <span className="text-[#E32124]">{leftClicks}</span>
            <span className="text-zinc-600">/</span>
            <span className="text-white">{rightClicks}</span>
            <span className="text-zinc-600">/</span>
            <span className="text-sky-400">{middleClicks}</span>
          </div>
        </div>

        {/* CPS Speed Meter */}
        <div className="p-3 rounded-2xl bg-[#0a0a10] border border-white/[0.08]">
          <span className="text-[10px] uppercase text-zinc-500 block">Скорость (CPS)</span>
          <div className="text-base font-bold text-[#E32124] mt-0.5 flex items-center gap-1">
            <Zap className="w-4 h-4 text-[#E32124]" />
            <span>{cps} клик/сек</span>
          </div>
        </div>

        {/* Debounce Time */}
        <div className="p-3 rounded-2xl bg-[#0a0a10] border border-white/[0.08]">
          <span className="text-[10px] uppercase text-zinc-500 block">Дебаунс отклика</span>
          <div className="text-base font-bold text-white mt-0.5">
            {lastDebounceMs} мс
          </div>
        </div>

        {/* Double-Click Status */}
        <div className="p-3 rounded-2xl bg-[#0a0a10] border border-white/[0.08] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase text-zinc-500 block">Дабл-клик тест</span>
            <div className="text-xs font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
              {doubleClicksDetected === 0 ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>0 сбоев (Идеал)</span>
                </>
              ) : (
                <span className="text-[#E32124]">{doubleClicksDetected} дабл-кликов</span>
              )}
            </div>
          </div>
          <button
            onClick={resetStats}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Сбросить счетчик"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Main Dual-Action Sensor Canvas & Universal Click Pad */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        
        {/* Sensor Continuous Line Tracking Pad (With graceful fade-out transition) */}
        <div
          ref={canvasRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={() => { if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current); setLineOpacity(1); }}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseLeave}
          className="sm:col-span-7 h-40 bg-[#08080e] rounded-2xl border border-dashed border-white/20 relative overflow-hidden cursor-crosshair flex items-center justify-center shadow-inner"
        >
          {trail.length === 0 ? (
            <div className="text-center p-4">
              <Activity className="w-5 h-5 text-[#E32124] mx-auto mb-1 opacity-70 animate-pulse" />
              <span className="text-xs text-zinc-500">
                Двигайте курсор или палец: проверяется стабильность трекинга сенсора
              </span>
            </div>
          ) : (
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ease-out"
              style={{ opacity: lineOpacity }}
            >
              {/* Continuous Line */}
              <path
                d={svgPathData}
                fill="none"
                stroke="#E32124"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Head Pointer Dot */}
              {trail.length > 0 && (
                <circle
                  cx={trail[trail.length - 1].x}
                  cy={trail[trail.length - 1].y}
                  r="4"
                  fill="#ffffff"
                  stroke="#E32124"
                  strokeWidth="2"
                />
              )}
            </svg>
          )}
        </div>

        {/* Unified Universal Click Zone (Auto-detects ANY button pressed) */}
        <div
          onMouseDown={handleUniversalMouseDown}
          onTouchStart={handleTouchClickZone}
          onContextMenu={(e) => e.preventDefault()}
          className="sm:col-span-5 h-40 rounded-2xl bg-gradient-to-b from-[#12121c] to-[#0a0a12] border border-white/10 hover:border-[#E32124] transition-all flex flex-col items-center justify-between p-4 group cursor-pointer shadow-xl relative overflow-hidden active:scale-[0.98]"
        >
          {/* Top visual mouse button diagram */}
          <div className="flex items-center gap-1.5 w-full justify-center">
            {/* LKM */}
            <div className={`px-3 py-1 rounded-lg text-[10px] font-bold border transition-all ${
              lastClickedButton === 'left' 
                ? 'bg-[#E32124] text-white border-[#E32124] shadow-[0_0_12px_#E32124]' 
                : 'bg-white/5 border-white/10 text-zinc-400'
            }`}>
              ЛКМ {lastClickedButton === 'left' && '✓'}
            </div>

            {/* Wheel */}
            <div className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-all ${
              lastClickedButton === 'middle' 
                ? 'bg-sky-500 text-white border-sky-500 shadow-[0_0_12px_#0ea5e9]' 
                : 'bg-white/5 border-white/10 text-zinc-400'
            }`}>
              СКМ
            </div>

            {/* PKM */}
            <div className={`px-3 py-1 rounded-lg text-[10px] font-bold border transition-all ${
              lastClickedButton === 'right' 
                ? 'bg-[#E32124] text-white border-[#E32124] shadow-[0_0_12px_#E32124]' 
                : 'bg-white/5 border-white/10 text-zinc-400'
            }`}>
              ПКМ {lastClickedButton === 'right' && '✓'}
            </div>
          </div>

          {/* Center Call to Action */}
          <div className="text-center">
            <Mouse className="w-6 h-6 mx-auto text-[#E32124] group-hover:scale-110 transition-transform mb-1" />
            <div className="text-xs font-bold text-white uppercase">
              Универсальная зона клика
            </div>
            <div className="text-[10px] text-zinc-400 mt-0.5">
              Кликайте ЛКМ, ПКМ или Колесом
            </div>
          </div>

          <div className="text-[10px] text-zinc-500">
            Сайт сам определяет нажатую кнопку
          </div>
        </div>

      </div>

    </div>
  );
};
