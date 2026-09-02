import { cn } from "../../utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

export const HoverEffect = ({
  items,
  className,
  onItemClick,
}: {
  items: {
    title: string;
    description: string;
    tag?: string;
    discount?: string;
    perks?: string[];
    code?: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
  onItemClick?: (item: any, idx: number) => void;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4 gap-4",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item.title + idx}
          className="relative group block p-2 h-full w-full cursor-pointer"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => onItemClick && onItemClick(item, idx)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-[#E32124]/[0.15] border border-[#E32124]/50 block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <div className="rounded-2xl h-full w-full p-6 overflow-hidden bg-[#0a0a10]/90 border border-white/[0.08] group-hover:border-[#E32124]/50 relative z-20 transition-all duration-300">
            {item.tag && (
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E32124] mb-2">
                {item.tag}
              </div>
            )}
            <h4 className="text-white font-display font-black text-lg tracking-tight mb-2">
              {item.title}
            </h4>
            {item.discount && (
              <div className="inline-block px-3 py-1 rounded-full bg-[#E32124] text-white text-xs font-mono font-bold mb-3">
                {item.discount}
              </div>
            )}
            <p className="text-zinc-400 text-xs leading-relaxed mb-4">
              {item.description}
            </p>
            {item.perks && (
              <div className="space-y-1.5 pt-3 border-t border-white/[0.06]">
                {item.perks.map((p, i) => (
                  <div key={i} className="text-[11px] text-zinc-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E32124]" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
