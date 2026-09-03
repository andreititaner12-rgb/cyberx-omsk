import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";

interface ChromeXProps {
  className?: string;
}

export const ChromeX: React.FC<ChromeXProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative select-none flex items-center justify-center w-full max-w-4xl mx-auto",
        className
      )}
    >
      {/* Candy Crimson Ambient Glow */}
      <div 
        className="pointer-events-none absolute inset-0 transition-all duration-300"
        style={{
          background: `radial-gradient(circle 500px at ${mousePos.x}% ${mousePos.y}%, rgba(227, 33, 36, 0.35), rgba(160, 10, 20, 0.15) 40%, transparent 75%)`,
          filter: "blur(40px)",
        }}
      />

      {/* SVG Liquid Mirror Chrome CYBERX Glyph Lockup */}
      <svg
        viewBox="0 0 1000 380"
        className="relative z-10 w-full h-auto overflow-visible drop-shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Liquid Mirror Chrome Metallic Gradient */}
          <linearGradient id="mirrorChrome" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="15%" stopColor="#D8DDE6" />
            <stop offset="35%" stopColor="#4A5260" />
            <stop offset="50%" stopColor="#1A1E26" />
            <stop offset="65%" stopColor="#E6ECF5" />
            <stop offset="85%" stopColor="#7E889B" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Crimson Edge Underglow */}
          <linearGradient id="candyCrimsonEdge" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF1E23" />
            <stop offset="50%" stopColor="#E32124" />
            <stop offset="100%" stopColor="#7A0005" />
          </linearGradient>

          <filter id="chromeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Central Master Graphic: CYBERX in High-End Razor-Sharp Liquid Chrome */}
        <text
          x="500"
          y="230"
          textAnchor="middle"
          fill="url(#mirrorChrome)"
          stroke="url(#candyCrimsonEdge)"
          strokeWidth="3.5"
          filter="url(#chromeGlow)"
          className="font-display font-black text-[150px] sm:text-[180px] lg:text-[210px] tracking-tight uppercase"
          style={{
            fontFamily: '"Tactic Sans", Montserrat, sans-serif',
            letterSpacing: '0.04em',
          }}
        >
          CYBERX
        </text>

        {/* Specular White Rim Highlight Line */}
        <text
          x="499"
          y="228"
          textAnchor="middle"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          opacity="0.85"
          className="font-display font-black text-[150px] sm:text-[180px] lg:text-[210px] tracking-tight uppercase pointer-events-none"
          style={{
            fontFamily: '"Tactic Sans", Montserrat, sans-serif',
            letterSpacing: '0.04em',
          }}
        >
          CYBERX
        </text>

        {/* Sub-label: OMSK // 3 CLUBS */}
        <text
          x="500"
          y="310"
          textAnchor="middle"
          fill="#FFFFFF"
          className="font-mono font-bold text-[18px] sm:text-[22px] tracking-[0.4em] uppercase opacity-75"
        >
          OMSK // ARENA • ЕВРОПА • ОКТЯБРЬ
        </text>
      </svg>
    </div>
  );
};
