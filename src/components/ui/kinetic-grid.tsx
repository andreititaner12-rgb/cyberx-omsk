import React, { useEffect, useRef } from "react";
import { cn } from "../../utils/cn";

interface KineticGridProps {
  className?: string;
  gridColor?: string;
  activeColor?: string;
  dotSize?: number;
  gap?: number;
  warpRadius?: number;
  warpIntensity?: number;
  children?: React.ReactNode;
}

export const KineticGrid: React.FC<KineticGridProps> = ({
  className,
  gridColor = "rgba(255, 255, 255, 0.08)",
  activeColor = "rgba(227, 33, 36, 0.7)",
  dotSize = 1.5,
  gap = 36,
  warpRadius = 180,
  warpIntensity = 25,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });
  const ripplesRef = useRef<Array<{ x: number; y: number; radius: number; maxRadius: number; speed: number; alpha: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      ripplesRef.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        maxRadius: 350,
        speed: 6,
        alpha: 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += r.speed;
        r.alpha = 1 - r.radius / r.maxRadius;
        if (r.radius >= r.maxRadius) {
          ripplesRef.current.splice(i, 1);
        }
      }

      const mouse = mouseRef.current;
      const cols = Math.ceil(width / gap) + 1;
      const rows = Math.ceil(height / gap) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const originX = i * gap;
          const originY = j * gap;

          let posX = originX;
          let posY = originY;
          let isHovered = false;

          // Warp calculation
          if (mouse.active) {
            const dx = mouse.x - originX;
            const dy = mouse.y - originY;
            const dist = Math.hypot(dx, dy);

            if (dist < warpRadius) {
              const force = (1 - dist / warpRadius) * warpIntensity;
              const angle = Math.atan2(dy, dx);
              posX += Math.cos(angle) * force;
              posY += Math.sin(angle) * force;
              isHovered = true;
            }
          }

          // Ripple deformation
          for (const ripple of ripplesRef.current) {
            const rdx = ripple.x - posX;
            const rdy = ripple.y - posY;
            const rdist = Math.hypot(rdx, rdy);
            const diff = Math.abs(rdist - ripple.radius);

            if (diff < 40) {
              const rippleForce = (1 - diff / 40) * 15 * ripple.alpha;
              const angle = Math.atan2(rdy, rdx);
              posX -= Math.cos(angle) * rippleForce;
              posY -= Math.sin(angle) * rippleForce;
            }
          }

          // Draw dot
          ctx.beginPath();
          ctx.arc(posX, posY, isHovered ? dotSize * 1.8 : dotSize, 0, Math.PI * 2);
          ctx.fillStyle = isHovered ? activeColor : gridColor;
          ctx.fill();

          // Subtle cross lines near cursor
          if (isHovered) {
            ctx.strokeStyle = "rgba(227, 33, 36, 0.15)";
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(posX - 4, posY);
            ctx.lineTo(posX + 4, posY);
            ctx.moveTo(posX, posY - 4);
            ctx.lineTo(posX, posY + 4);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [gridColor, activeColor, dotSize, gap, warpRadius, warpIntensity]);

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      />
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};
