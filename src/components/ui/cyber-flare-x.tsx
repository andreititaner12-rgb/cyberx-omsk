import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";

interface CyberFlareXProps {
  className?: string;
  glowColor?: string;
}

export const CyberFlareX: React.FC<CyberFlareXProps> = ({
  className,
  glowColor = "#E32124",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("relative select-none flex items-center justify-center", className)}
    >
      {/* Volumetric Radial Light Scattering (God Rays & Specular Flare) */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 400px at ${mousePos.x}% ${mousePos.y}%, rgba(227, 33, 36, 0.45), rgba(255, 42, 46, 0.2) 25%, rgba(0, 0, 0, 0) 70%)`,
          filter: "blur(20px)",
          opacity: isHovered ? 1 : 0.75,
        }}
      />

      {/* Breathing Core Flare Ambient Aura */}
      <div className="pointer-events-none absolute w-full h-full rounded-full bg-[#E32124]/20 blur-[90px] animate-pulse" />

      {/* SVG Volumetric Rim-Lit X Glyph (Exact Geometry from Photoshop design) */}
      <svg
        viewBox="0 0 450 500"
        className="relative z-10 w-full h-full overflow-visible drop-shadow-[0_0_35px_rgba(227,33,36,0.8)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Dynamic Laser Gradient following pointer */}
          <linearGradient id="cyberXGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF2A2E" />
            <stop offset="50%" stopColor="#E32124" />
            <stop offset="100%" stopColor="#960E11" />
          </linearGradient>

          <filter id="xGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="20" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Glow Halo Layer */}
        <path
          d="M 60,30 L 190,250 L 60,470 L 150,470 L 225,320 L 300,470 L 390,470 L 260,250 L 390,30 L 300,30 L 225,180 L 150,30 Z"
          stroke={glowColor}
          strokeWidth="18"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          className="opacity-30 blur-md"
        />

        {/* Main Sharp Neon Outline (Matches Photoshop exact outline) */}
        <path
          d="M 60,30 L 190,250 L 60,470 L 150,470 L 225,320 L 300,470 L 390,470 L 260,250 L 390,30 L 300,30 L 225,180 L 150,30 Z"
          stroke="url(#cyberXGradient)"
          strokeWidth="10"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          fill="rgba(227, 33, 36, 0.03)"
          filter="url(#xGlow)"
        />

        {/* Specular White Core Rim Line (Raymarched Light Reflection) */}
        <path
          d="M 60,30 L 190,250 L 60,470 L 150,470 L 225,320 L 300,470 L 390,470 L 260,250 L 390,30 L 300,30 L 225,180 L 150,30 Z"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          className="opacity-90"
        />

        {/* Dynamic Light Specular Dot that tracks mouse */}
        <circle
          cx={Math.max(60, Math.min(390, (mousePos.x / 100) * 450))}
          cy={Math.max(30, Math.min(470, (mousePos.y / 100) * 500))}
          r="6"
          fill="#FFFFFF"
          className="drop-shadow-[0_0_15px_#FFFFFF] opacity-80 pointer-events-none"
        />
      </svg>
    </div>
  );
};
