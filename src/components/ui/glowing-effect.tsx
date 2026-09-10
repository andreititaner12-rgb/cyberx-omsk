import { cn } from "../../utils/cn";

export const GlowingEffect = ({
  glow = false,
  className,
}: {
  blur?: number;
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  borderWidth?: number;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute -inset-[1px] rounded-[inherit] transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-10",
        glow && "opacity-100",
        className
      )}
      style={{
        boxShadow: "inset 0 0 0 1.5px rgba(227, 33, 36, 0.6), 0 0 25px rgba(227, 33, 36, 0.25)",
      }}
    />
  );
};
