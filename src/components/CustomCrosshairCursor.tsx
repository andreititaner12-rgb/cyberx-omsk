import React, { useEffect, useState, useRef } from 'react';

export const CustomCrosshairCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const targetRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if device has a fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer');
        setIsHovering(isClickable);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth lerp loop
    const render = () => {
      cursorRef.current.x += (targetRef.current.x - cursorRef.current.x) * 0.45;
      cursorRef.current.y += (targetRef.current.y - cursorRef.current.y) * 0.45;
      setPos({ x: cursorRef.current.x, y: cursorRef.current.y });
      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out select-none"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: `translate3d(-50%, -50%, 0) scale(${isClicked ? 0.8 : isHovering ? 1.25 : 1})`,
      }}
    >
      {/* Outer Lock-on Brackets on Hover */}
      {isHovering && (
        <div className="absolute -inset-3.5 border border-[#E32124]/50 rounded-lg animate-pulse" />
      )}

      {/* Center Tactical CS2 Crosshair Dot */}
      <div className="w-1.5 h-1.5 rounded-full bg-[#E32124] shadow-[0_0_8px_#E32124]" />

      {/* 4 Crosshair Lines */}
      {/* Top */}
      <div 
        className="absolute w-[1.5px] bg-white/90 shadow-[0_0_4px_#E32124] transition-all duration-150"
        style={{
          height: isHovering ? '8px' : '6px',
          bottom: isHovering ? '8px' : '5px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
      {/* Bottom */}
      <div 
        className="absolute w-[1.5px] bg-white/90 shadow-[0_0_4px_#E32124] transition-all duration-150"
        style={{
          height: isHovering ? '8px' : '6px',
          top: isHovering ? '8px' : '5px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
      {/* Left */}
      <div 
        className="absolute h-[1.5px] bg-white/90 shadow-[0_0_4px_#E32124] transition-all duration-150"
        style={{
          width: isHovering ? '8px' : '6px',
          right: isHovering ? '8px' : '5px',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      />
      {/* Right */}
      <div 
        className="absolute h-[1.5px] bg-white/90 shadow-[0_0_4px_#E32124] transition-all duration-150"
        style={{
          width: isHovering ? '8px' : '6px',
          left: isHovering ? '8px' : '5px',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      />
    </div>
  );
};
