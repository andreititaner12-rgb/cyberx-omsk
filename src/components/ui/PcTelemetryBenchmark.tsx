import React, { useState, useEffect, useRef } from 'react';
import { Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export const PcTelemetryBenchmark: React.FC = () => {
  const [fpsData, setFpsData] = useState({
    cs2: 762,
    val: 854,
    dota: 382,
    cyberpunk: 148,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef<boolean>(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    }, { threshold: 0.1 });

    observer.observe(el);

    const interval = setInterval(() => {
      if (!isVisibleRef.current) return;
      setFpsData({
        cs2: 750 + Math.floor(Math.random() * 24),
        val: 844 + Math.floor(Math.random() * 28),
        dota: 374 + Math.floor(Math.random() * 16),
        cyberpunk: 142 + Math.floor(Math.random() * 14),
      });
    }, 600);

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  const games = [
    {
      title: 'Counter-Strike 2',
      badge: 'Competitive 1080p',
      fps: fpsData.cs2,
      onePercentLow: '540 FPS',
      targetPercent: 96,
      color: '#E32124',
    },
    {
      title: 'Valorant',
      badge: 'Max Settings',
      fps: fpsData.val,
      onePercentLow: '620 FPS',
      targetPercent: 100,
      color: '#FF4655',
    },
    {
      title: 'Dota 2',
      badge: '5v5 Teamfight',
      fps: fpsData.dota,
      onePercentLow: '290 FPS',
      targetPercent: 78,
      color: '#E32124',
    },
    {
      title: 'Cyberpunk 2077',
      badge: 'Ray Tracing Ultra',
      fps: fpsData.cyberpunk,
      onePercentLow: '118 FPS',
      targetPercent: 62,
      color: '#00F0FF',
    },
  ];

  return (
    <div ref={containerRef} className="space-y-4 font-mono select-none">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#E32124]" />
          <span className="text-xs uppercase font-bold text-zinc-300">
            Средний FPS в играх // RTX 5070 Ti + Ryzen 7 7800X3D
          </span>
        </div>

        <div className="text-[11px] text-zinc-400">
          Super VIP &amp; Solo сетапы
        </div>
      </div>

      {/* Live Benchmark Cards with Animated Progress Bars */}
      <div className="space-y-3">
        {games.map((g, idx) => (
          <div key={idx} className="p-3.5 rounded-2xl bg-[#08080c] border border-white/[0.06] hover:border-[#E32124]/40 transition-colors">
            
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase">{g.title}</span>
                <span className="text-[10px] text-zinc-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                  {g.badge}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] text-zinc-400 hidden sm:inline-block">
                  1% Low: <strong className="text-zinc-200">{g.onePercentLow}</strong>
                </span>
                <span className="text-sm font-display font-black text-[#E32124]">
                  {g.fps} <span className="text-[10px] font-mono font-normal text-zinc-400">FPS</span>
                </span>
              </div>
            </div>

            {/* Animated Progress Bar */}
            <div className="h-2.5 bg-white/10 rounded-full overflow-hidden p-[1px]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${g.targetPercent}%` }}
                transition={{ duration: 1.2, delay: 0.1 * idx, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-[#880e10] via-[#E32124] to-[#FF3B3F] "
              />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
