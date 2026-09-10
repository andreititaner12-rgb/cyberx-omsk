import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';
import { ChevronRight, Zap } from 'lucide-react';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isReadyToEnter, setIsReadyToEnter] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const hasEnteredRef = useRef(false);

  // Initialize progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReadyToEnter(true);
          return 100;
        }

        const step = Math.floor(Math.random() * 12) + 10;
        const next = Math.min(prev + step, 100);
        sound.playDataPacket(next);

        if (next >= 100) {
          setIsReadyToEnter(true);
        }
        return next;
      });
    }, 85);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    if (hasEnteredRef.current) return;
    hasEnteredRef.current = true;

    // Direct user interaction unlocks Web Audio & HTML5 Audio in all browsers
    sound.setEnabled(true);
    sound.init();
    sound.playSystemReady();

    // Start voice intro immediately on user gesture
    sound.playVoiceGreeting().catch(() => {});

    setIsFinished(true);
    setTimeout(onComplete, 400);
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleEnter}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020205] text-white select-none overflow-hidden cursor-pointer"
        >
          {/* Background Ambient Red Glow */}
          <div className="pointer-events-none absolute w-[550px] h-[550px] bg-[#E32124]/[0.18] rounded-full blur-[140px]" />

          {/* Centerpiece Content */}
          <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center space-y-6">
            
            {/* CyberX Logo with neon pulse */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
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
                ARENA ECOSYSTEM
              </div>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full space-y-2.5 font-mono">
              <div className="flex items-center justify-between text-[11px] text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E32124] animate-ping" />
                  <span>{progress < 100 ? 'СБОР ДАННЫХ И ТЕЛЕМЕТРИИ...' : 'СИСТЕМА ГОТОВА К ЗАПУСКУ'}</span>
                </span>
                <span className="text-[#E32124] font-bold">{progress}%</span>
              </div>

              <div className="h-2 w-full bg-white/[0.08] rounded-full overflow-hidden p-[1px] border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#8B0000] via-[#E32124] to-[#FF4D4D] rounded-full shadow-[0_0_15px_#E32124]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                />
              </div>
            </div>

            {/* Interactive Launch Button (Appears to guarantee 100% audio gesture unlocking) */}
            <div className="pt-2 w-full">
              {isReadyToEnter ? (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEnter();
                  }}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#E32124] via-[#FF2A2E] to-[#E32124] text-white font-mono text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_35px_rgba(227,33,36,0.8)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 border border-white/30 animate-pulse"
                >
                  <Zap className="w-4 h-4" />
                  <span>ВОЙТИ В СИСТЕМУ CYBERX</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              ) : (
                <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase flex items-center justify-center gap-1.5">
                  <span>НАЖМИТЕ В ЛЮБОЕ МЕСТО ДЛЯ БЫСТРОГО ВХОДА</span>
                </div>
              )}
            </div>

            {/* Telemetry info */}
            <div className="text-[9px] font-mono tracking-widest text-zinc-600 uppercase">
              OMSK // 3 ARENAS // LENINA • MIRA • SEROVA
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
