import React, { useState, useRef, useEffect, useCallback } from 'react';
import { sound } from '../../utils/sound';
import { Zap, MousePointerClick, RefreshCw } from 'lucide-react';

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  opacity: number;
}

export const DisplaySmoothnessSimulator: React.FC = () => {
  const [hzValue, setHzValue] = useState<number>(600);
  const [isActive, setIsActive] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isHoveredRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(false);

  const hzRef = useRef<number>(600);
  hzRef.current = hzValue;

  const physicsRef = useRef({
    x: 200,
    y: 80,
    vx: 0,
    vy: 0,
  });

  const shockwavesRef = useRef<Shockwave[]>([]);
  const trailRef = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Observer to completely pause rendering when offscreen
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    }, { threshold: 0.1 });

    observer.observe(canvas);

    let animId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      
      // Zero rendering and 0% CPU when not visible or not hovered (and ball is stopped)
      if (!isVisibleRef.current) return;

      const phys = physicsRef.current;
      const isMoving = Math.abs(phys.vx) > 0.05 || Math.abs(phys.vy) > 0.05 || shockwavesRef.current.length > 0;

      // When not hovered and ball has stopped, do not re-render
      if (!isHoveredRef.current && !isMoving && trailRef.current.length === 0) {
        return;
      }

      const dt = Math.min(32, time - lastTime);
      lastTime = time;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const hz = hzRef.current;
      const speedMult = dt / 16.67;

      // Update position only when active or in motion
      phys.x += phys.vx * speedMult;
      phys.y += phys.vy * speedMult;

      // Friction: rapid smooth deceleration when mouse leaves, gentle glide when hovered
      const friction = isHoveredRef.current ? 0.995 : 0.92;
      phys.vx *= friction;
      phys.vy *= friction;

      if (!isHoveredRef.current && Math.abs(phys.vx) < 0.08) phys.vx = 0;
      if (!isHoveredRef.current && Math.abs(phys.vy) < 0.08) phys.vy = 0;

      const radius = 18;

      // Boundary collisions with smooth bounce
      if (phys.x - radius <= 0) {
        phys.x = radius;
        phys.vx = Math.abs(phys.vx) * 0.92 + 0.8;
      } else if (phys.x + radius >= width) {
        phys.x = width - radius;
        phys.vx = -Math.abs(phys.vx) * 0.92 - 0.8;
      }

      if (phys.y - radius <= 0) {
        phys.y = radius;
        phys.vy = Math.abs(phys.vy) * 0.92 + 0.6;
      } else if (phys.y + radius >= height) {
        phys.y = height - radius;
        phys.vy = -Math.abs(phys.vy) * 0.92 - 0.6;
      }

      // Trail calculation
      const maxTrail = hz === 600 ? 10 : hz >= 360 ? 14 : 22;
      if (isMoving || isHoveredRef.current) {
        trailRef.current.push({ x: phys.x, y: phys.y });
        if (trailRef.current.length > maxTrail) {
          trailRef.current.shift();
        }
      } else {
        trailRef.current = [];
      }

      // 1. Draw Shockwaves
      shockwavesRef.current = shockwavesRef.current
        .map((sw) => ({
          ...sw,
          radius: sw.radius + 5.5,
          opacity: sw.opacity - 0.04,
        }))
        .filter((sw) => sw.opacity > 0);

      shockwavesRef.current.forEach((sw) => {
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(227, 33, 36, ${sw.opacity * 0.85})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      });

      // 2. Draw Motion Trail
      const trail = trailRef.current;
      for (let i = 0; i < trail.length; i++) {
        const pt = trail[i];
        const ratio = (i + 1) / trail.length;
        const alpha = ratio * (hz >= 480 ? 0.25 : 0.5);

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius * (0.6 + ratio * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = hz >= 360 ? `rgba(227, 33, 36, ${alpha})` : `rgba(130, 130, 140, ${alpha})`;
        ctx.fill();
      }

      // 3. Draw Sphere
      ctx.beginPath();
      ctx.arc(phys.x, phys.y, radius, 0, Math.PI * 2);
      const grad = ctx.createRadialGradient(phys.x - 4, phys.y - 4, 2, phys.x, phys.y, radius);
      grad.addColorStop(0, '#FF4D50');
      grad.addColorStop(0.7, '#E32124');
      grad.addColorStop(1, '#8A0E10');
      ctx.fillStyle = grad;
      ctx.shadowColor = isHoveredRef.current && hz >= 360 ? '#E32124' : 'transparent';
      ctx.shadowBlur = isHoveredRef.current && hz >= 360 ? 18 : 0;
      ctx.fill();

      // Center white glint
      ctx.beginPath();
      ctx.arc(phys.x - 4, phys.y - 4, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 0;
      ctx.fill();

      ctx.restore();
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', updateCanvasSize);
      observer.disconnect();
    };
  }, []);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    setIsActive(true);

    // Start gentle initial glide on mouse enter if stopped
    const phys = physicsRef.current;
    if (Math.abs(phys.vx) < 1) {
      phys.vx = 4.2;
      phys.vy = 1.6;
    }
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    setIsActive(false);
  };

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    sound.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Add Shockwave
    shockwavesRef.current.push({
      x: clickX,
      y: clickY,
      radius: 6,
      opacity: 1,
    });

    // Apply immediate physics momentum impulse
    const phys = physicsRef.current;
    const dx = phys.x - clickX;
    const dy = phys.y - clickY;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const force = Math.max(16, Math.min(36, 450 / dist));

    phys.vx += (dx / dist) * force;
    phys.vy += (dy / dist) * force;
  }, []);

  const handleCanvasTouch = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    sound.playClick();
    const canvas = canvasRef.current;
    if (!canvas || e.touches.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const clickX = touch.clientX - rect.left;
    const clickY = touch.clientY - rect.top;

    isHoveredRef.current = true;
    setIsActive(true);

    // Add Shockwave
    shockwavesRef.current.push({
      x: clickX,
      y: clickY,
      radius: 6,
      opacity: 1,
    });

    // Apply immediate physics momentum impulse
    const phys = physicsRef.current;
    const dx = phys.x - clickX;
    const dy = phys.y - clickY;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const force = Math.max(16, Math.min(36, 450 / dist));

    phys.vx += (dx / dist) * force;
    phys.vy += (dy / dist) * force;
  }, []);

  const resetBall = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    const canvas = canvasRef.current;
    const w = canvas ? canvas.clientWidth : 500;
    const h = canvas ? canvas.clientHeight : 160;

    physicsRef.current = {
      x: w / 2,
      y: h / 2,
      vx: isHoveredRef.current ? 5.5 : 0,
      vy: isHoveredRef.current ? -2.2 : 0,
    };
  };

  return (
    <div className="space-y-4 font-mono select-none">
      
      {/* Top Controls & Matrix Smoothness Readout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#E32124]" />
          <span className="text-xs uppercase tracking-wider text-zinc-300 font-bold">
            Симулятор плавности матрицы:
          </span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 font-bold ${
            isActive 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
              : 'bg-zinc-800/80 border-white/10 text-zinc-500'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-400 animate-ping' : 'bg-zinc-600'}`} />
            <span>{isActive ? 'АКТИВЕН' : 'ОЖИДАНИЕ НАВЕДЕНИЯ'}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#E32124] bg-[#E32124]/10 px-3 py-1 rounded-xl border border-[#E32124]/30 shadow-sm shadow-red-600/20">
            {hzValue} FPS // {(1000 / hzValue).toFixed(2)} мс
          </span>
        </div>
      </div>

      {/* High-Performance Canvas Sandbox (Active only on Hover) */}
      <div 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative h-44 sm:h-48 rounded-3xl border transition-all duration-300 overflow-hidden shadow-2xl flex items-center justify-center ${
          isActive 
            ? 'bg-[#08080e] border-[#E32124]/50 shadow-[0_0_25px_rgba(227,33,36,0.2)]' 
            : 'bg-[#06060a] border-white/10 opacity-80'
        }`}
      >
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          onTouchStart={handleCanvasTouch}
          onTouchMove={handleCanvasTouch}
          className="w-full h-full cursor-crosshair block"
        />

        {/* Bottom Interactive Hint */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] text-zinc-400 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 pointer-events-none">
          <span className="flex items-center gap-1.5 text-zinc-200 truncate">
            <MousePointerClick className="w-3.5 h-3.5 text-[#E32124] shrink-0" />
            <span className="truncate">
              {isActive 
                ? 'Кликайте или касайтесь для волны!' 
                : 'Коснитесь поля для запуска симуляции'}
            </span>
          </span>
          
          <button
            onClick={resetBall}
            className="pointer-events-auto p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer shrink-0 ml-2"
            title="Сбросить шар в центр"
          >
            <RefreshCw className="w-3 h-3 text-[#E32124]" />
            <span>В центр</span>
          </button>
        </div>
      </div>

      {/* Hz Frequency Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {[60, 144, 240, 360, 480, 600].map((val) => (
          <button
            key={val}
            onClick={() => {
              sound.playClick();
              setHzValue(val);
            }}
            className={`flex-1 min-w-[70px] py-2 text-xs font-mono font-bold rounded-xl transition-all border cursor-pointer ${
              hzValue === val
                ? 'bg-[#E32124] text-white border-[#E32124] shadow-lg shadow-red-600/40 scale-105'
                : 'bg-white/[0.04] text-zinc-400 border-white/[0.08] hover:bg-white/[0.08] hover:text-white'
            }`}
          >
            {val}Hz
          </button>
        ))}
      </div>

    </div>
  );
};
