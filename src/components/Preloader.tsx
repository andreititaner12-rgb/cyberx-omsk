import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 600);
          }, 200);
          return 100;
        }
        const step = Math.floor(Math.random() * 15) + 8;
        return Math.min(prev + step, 100);
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#000000] text-white select-none overflow-hidden"
        >
          {/* Background Ambient Red Glow */}
          <div className="pointer-events-none absolute w-[500px] h-[500px] bg-[#E32124]/[0.15] rounded-full blur-[140px]" />

          {/* Centerpiece Content */}
          <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center space-y-6">
            
            {/* CyberX Logo with neon pulse */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative flex items-center justify-center"
            >
              <img
                src="/logo-omsk.png"
                alt="CyberX Omsk"
                className="h-16 sm:h-20 w-auto object-contain drop-shadow-[0_0_35px_rgba(227,33,36,0.8)]"
              />
            </motion.div>

            {/* Brand Title */}
            <div>
              <div className="font-display font-black text-2xl sm:text-3xl tracking-tight uppercase text-white">
                CYBERX<span className="text-[#E32124]">.</span>OMSK
              </div>
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-zinc-400 mt-1">
                ARENA ECOSYSTEM 600HZ
              </div>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full space-y-2 font-mono">
              <div className="flex items-center justify-between text-[11px] text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E32124] animate-ping" />
                  <span>INITIALIZING...</span>
                </span>
                <span className="text-[#E32124] font-bold">{progress}%</span>
              </div>

              <div className="h-1.5 w-full bg-white/[0.08] rounded-full overflow-hidden p-[1px] border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#8B0000] via-[#E32124] to-[#FF4D4D] rounded-full shadow-[0_0_12px_#E32124]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                />
              </div>
            </div>

            {/* Telemetry info */}
            <div className="text-[9px] font-mono tracking-widest text-zinc-600 uppercase">
              OMSK // 3 ARENAS // LEINA • MIRA • SEROVA
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
