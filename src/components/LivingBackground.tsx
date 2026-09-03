import React, { useEffect, useRef } from 'react';

export const LivingBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Living particle/beam lines
    const beams: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      horizontal: boolean;
    }> = [];

    for (let i = 0; i < 12; i++) {
      beams.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 180 + 80,
        speed: Math.random() * 0.8 + 0.3,
        opacity: Math.random() * 0.4 + 0.1,
        horizontal: Math.random() > 0.5,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // 1. Base Subtle Grid
      const gridSize = 64;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.022)';
      ctx.lineWidth = 1;

      const offsetX = (Math.sin(time * 0.5) * 10) % gridSize;
      const offsetY = (Math.cos(time * 0.5) * 10) % gridSize;

      ctx.beginPath();
      for (let x = offsetX; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = offsetY; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Animated Glowing Cyber Beams drifting along grid lines
      beams.forEach((beam) => {
        if (beam.horizontal) {
          beam.x += beam.speed;
          if (beam.x - beam.length > width) {
            beam.x = -beam.length;
            beam.y = Math.floor(Math.random() * (height / gridSize)) * gridSize + offsetY;
          }

          const grad = ctx.createLinearGradient(beam.x, beam.y, beam.x + beam.length, beam.y);
          grad.addColorStop(0, 'rgba(227, 33, 36, 0)');
          grad.addColorStop(0.5, `rgba(227, 33, 36, ${beam.opacity})`);
          grad.addColorStop(1, 'rgba(227, 33, 36, 0)');

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(beam.x, beam.y);
          ctx.lineTo(beam.x + beam.length, beam.y);
          ctx.stroke();
        } else {
          beam.y += beam.speed;
          if (beam.y - beam.length > height) {
            beam.y = -beam.length;
            beam.x = Math.floor(Math.random() * (width / gridSize)) * gridSize + offsetX;
          }

          const grad = ctx.createLinearGradient(beam.x, beam.y, beam.x, beam.y + beam.length);
          grad.addColorStop(0, 'rgba(227, 33, 36, 0)');
          grad.addColorStop(0.5, `rgba(227, 33, 36, ${beam.opacity})`);
          grad.addColorStop(1, 'rgba(227, 33, 36, 0)');

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(beam.x, beam.y);
          ctx.lineTo(beam.x, beam.y + beam.length);
          ctx.stroke();
        }
      });

      // 3. Ambient Breathing Radiant Orbs
      const orb1X = width * 0.5 + Math.sin(time) * 120;
      const orb1Y = height * 0.3 + Math.cos(time * 0.8) * 80;
      const radGrad1 = ctx.createRadialGradient(orb1X, orb1Y, 10, orb1X, orb1Y, 400);
      radGrad1.addColorStop(0, 'rgba(227, 33, 36, 0.05)');
      radGrad1.addColorStop(1, 'rgba(227, 33, 36, 0)');
      ctx.fillStyle = radGrad1;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
