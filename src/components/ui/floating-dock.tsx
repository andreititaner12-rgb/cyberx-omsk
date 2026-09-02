import { cn } from "../../utils/cn";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useRef, useState } from "react";
import { sound } from "../../utils/sound";

export interface FloatingDockItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: string;
}

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: FloatingDockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden fixed bottom-6 right-6 z-50", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-2 right-0 flex flex-col gap-2 p-2 bg-[#0a0a10]/95 backdrop-blur-2xl border border-white/[0.12] rounded-2xl shadow-2xl"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <button
                  onClick={() => {
                    sound.playClick();
                    setOpen(false);
                    if (item.onClick) {
                      item.onClick();
                    } else if (item.href) {
                      const el = document.querySelector(item.href);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="h-11 px-4 rounded-xl bg-white/[0.04] hover:bg-[#E32124] text-white flex items-center gap-3 w-full transition-colors text-xs font-mono font-semibold"
                >
                  <div className="w-5 h-5 flex items-center justify-center text-[#E32124] group-hover:text-white">
                    {item.icon}
                  </div>
                  <span>{item.title}</span>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => {
          sound.playClick();
          setOpen(!open);
        }}
        className="h-14 w-14 rounded-2xl bg-[#E32124] text-white flex items-center justify-center shadow-2xl shadow-red-600/50 hover:scale-105 active:scale-95 transition-all border border-white/20"
      >
        <div className="flex flex-col gap-1 items-center justify-center w-6">
          <span className={`h-0.5 w-6 bg-white transition-all ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`h-0.5 w-4 bg-white transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-white transition-all ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </div>
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex h-16 gap-3 items-end rounded-2xl bg-[#09090f]/90 backdrop-blur-2xl px-4 pb-3 border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.8)] shadow-red-950/20",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  onClick,
  badge,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [42, 64, 42]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [42, 64, 42]);

  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 28, 20]);
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 28, 20]
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    sound.playClick();
    if (onClick) {
      onClick();
    } else if (href) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => {
          sound.playHover();
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square rounded-2xl bg-white/[0.04] hover:bg-[#E32124] border border-white/[0.08] hover:border-[#E32124] flex items-center justify-center relative transition-colors shadow-lg group"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-3 py-1 rounded-lg bg-[#000000] border border-white/20 text-white absolute -top-9 left-1/2 -translate-x-1/2 w-fit text-[11px] font-mono font-bold whitespace-nowrap shadow-xl"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>

        {badge && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#E32124] border-2 border-black animate-pulse" />
        )}

        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center text-zinc-300 group-hover:text-white transition-colors"
        >
          {icon}
        </motion.div>
      </motion.div>
    </div>
  );
}
