import { useEffect, useRef } from "react";
import { cn } from "../../utils/cn";

export const GlowingEffect = ({
  blur = 0,
  spread = 20,
  glow = true,
  disabled = false,
  borderWidth = 1.5,
  className,
}: {
  blur?: number;
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  borderWidth?: number;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;
    const element = containerRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      element.style.setProperty("--glow-x", `${x}px`);
      element.style.setProperty("--glow-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [disabled]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300",
        glow ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        className
      )}
      style={{
        padding: `${borderWidth}px`,
        background: `radial-gradient(circle ${spread * 10}px at var(--glow-x, 50%) var(--glow-y, 50%), rgba(227, 33, 36, 0.8), rgba(255, 42, 46, 0.4) 30%, transparent 70%)`,
        mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
        WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
        maskComposite: "exclude",
        WebkitMaskComposite: "xor",
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
      }}
    />
  );
};
