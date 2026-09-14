import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

/**
 * Быстрый редакторный прелоадер: логотип, тонкая линия прогресса.
 * Закрывается сам через ~1.6 сек — без «войти в систему» и сисадмин-текстов.
 * Звук всё равно отпирается первым касанием (обработчик в App.tsx).
 */
export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const start = performance.now();
    const DURATION = 1450;
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      // мягкий easeOut, чтобы линия «доходила» красиво
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));

      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      setIsFinished(true);
      // короткая пауза на полный выход — экран не «дёргается»
      setTimeout(onComplete, 550);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cyberx-ink select-none"
        >
          {/* Логотип */}
          <motion.img
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            src="/logo-omsk.png"
            alt="CyberX Omsk"
            className="h-14 sm:h-16 w-auto object-contain"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-6 text-center"
          >
            <div className="font-display font-black uppercase tracking-[0.06em] text-lg text-white">
              CYBERX<span className="text-cyberx-red">.</span>OMSK
            </div>
            <div className="eyebrow text-cyberx-faint mt-1.5">
              Арены Омска — открыты 24/7
            </div>
          </motion.div>

          {/* Линия прогресса */}
          <div className="mt-10 w-56 sm:w-72">
            <div className="h-px w-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-cyberx-red"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between eyebrow text-cyberx-faint">
              <span>Омск // 3 клуба</span>
              <span className="text-white/70 tabular-nums">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
