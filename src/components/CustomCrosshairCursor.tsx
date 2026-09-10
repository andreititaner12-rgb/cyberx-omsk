import React, { useEffect, useRef } from 'react';

export const CustomCrosshairCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const currentPos = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const isHoveringRef = useRef(false);
  const isClickedRef = useRef(false);
  const isVisibleRef = useRef(false);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if fine pointer is used (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    const el = cursorRef.current;
    const ring = ringRef.current;
    if (!el || !ring) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        el.style.opacity = '1';
      }

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer');
        if (isHoveringRef.current !== isClickable) {
          isHoveringRef.current = isClickable;
          
          if (isClickable) {
            ring.style.width = '38px';
            ring.style.height = '38px';
            ring.style.borderColor = '#E32124';
            ring.style.boxShadow = '0 0 16px rgba(227, 33, 36, 0.6)';
            ring.style.backgroundColor = 'rgba(227, 33, 36, 0.08)';
          } else {
            ring.style.width = '24px';
            ring.style.height = '24px';
            ring.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            ring.style.boxShadow = '0 0 8px rgba(0, 0, 0, 0.5)';
            ring.style.backgroundColor = 'transparent';
          }
        }
      }
    };

    const handleMouseDown = () => {
      isClickedRef.current = true;
    };

    const handleMouseUp = () => {
      isClickedRef.current = false;
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      el.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      el.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Direct 144Hz+ GPU lerp loop with 0 React state re-renders
    const render = () => {
      currentPos.current.x += (targetRef.current.x - currentPos.current.x) * 0.45;
      currentPos.current.y += (targetRef.current.y - currentPos.current.y) * 0.45;

      const clickScale = isClickedRef.current ? 0.8 : 1;
      el.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%) scale(${clickScale})`;

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
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] select-none opacity-0 will-change-transform flex items-center justify-center"
      style={{
        transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
      }}
    >
      {/* Expanding Circular Ring Outline */}
      <div
        ref={ringRef}
        className="rounded-full border transition-all duration-200 ease-out flex items-center justify-center pointer-events-none"
        style={{
          width: '24px',
          height: '24px',
          borderColor: 'rgba(255, 255, 255, 0.4)',
        }}
      >
        {/* Center Tactical CS2 Red Dot */}
        <div className="w-1.5 h-1.5 rounded-full bg-[#E32124] shadow-[0_0_8px_#E32124]" />
      </div>

      {/* 4 Micro Tactical Crosshair Ticks */}
      <div className="absolute w-[1px] h-[4px] bg-white/70 -top-[14px]" />
      <div className="absolute w-[1px] h-[4px] bg-white/70 -bottom-[14px]" />
      <div className="absolute h-[1px] w-[4px] bg-white/70 -left-[14px]" />
      <div className="absolute h-[1px] w-[4px] bg-white/70 -right-[14px]" />
    </div>
  );
};
