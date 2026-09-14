import React, { useEffect, useRef } from 'react';

/**
 * Тактический курсор CyberX: тонкое кольцо с точкой и микро-штрихами.
 * Уверенная инерция (lerp), реагирует на кликабельные цели,
 * без неоновых свечений — только чистая графика.
 */
export const CustomCrosshairCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);
  const pressed = useRef(false);
  const visible = useRef(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const el = cursorRef.current;
    const ring = ringRef.current;
    if (!el || !ring) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        visible.current = true;
        el.style.opacity = '1';
      }
      const t = e.target as HTMLElement | null;
      const clickable = !!t?.closest(
        'button, a, input, textarea, select, [role="button"], .cursor-pointer'
      );
      if (hovering.current !== clickable) {
        hovering.current = clickable;
        ring.style.width = clickable ? '32px' : '22px';
        ring.style.height = clickable ? '32px' : '22px';
        ring.style.borderColor = clickable
          ? 'rgba(227, 33, 36, 0.9)'
          : 'rgba(255, 255, 255, 0.45)';
      }
    };

    const onDown = () => (pressed.current = true);
    const onUp = () => (pressed.current = false);
    const onLeave = () => {
      visible.current = false;
      el.style.opacity = '0';
    };
    const onEnter = () => {
      visible.current = true;
      el.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    const render = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.4;
      pos.current.y += (target.current.y - pos.current.y) * 0.4;
      const scale = pressed.current ? 0.82 : 1;
      el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf.current = requestAnimationFrame(render);
    };
    raf.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] select-none opacity-0 will-change-transform flex items-center justify-center"
      style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
      aria-hidden
    >
      {/* Кольцо */}
      <div
        ref={ringRef}
        className="rounded-full border transition-[width,height,border-color] duration-200 ease-out"
        style={{ width: '22px', height: '22px', borderColor: 'rgba(255,255,255,0.45)' }}
      />
      {/* Центр */}
      <span className="absolute h-[3px] w-[3px] rounded-full bg-[#E32124]" />
      {/* Микро-штрихи */}
      <span className="absolute w-px h-[5px] bg-white/50 -top-[12px]" />
      <span className="absolute w-px h-[5px] bg-white/50 -bottom-[12px]" />
      <span className="absolute h-px w-[5px] bg-white/50 -left-[12px]" />
      <span className="absolute h-px w-[5px] bg-white/50 -right-[12px]" />
    </div>
  );
};
