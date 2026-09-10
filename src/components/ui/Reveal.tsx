import React from 'react';
import { motion } from 'framer-motion';

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

/**
 * Базовое появление при прокрутке: плавный подъём + проявление.
 * Единая хореография всего лендинга.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  y = 26,
  once = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.75, delay, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface MaskLineProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  delay?: number;
  /** in-view триггер: заголовок появляется при скролле, либо сразу (hero) */
  immediate?: boolean;
}

/**
 * Строка заголовка, выезжающая из-под маски — фирменная хореография.
 */
export const MaskLine: React.FC<MaskLineProps> = ({
  children,
  className = '',
  innerClassName = '',
  delay = 0,
  immediate = false,
}) => {
  return (
    <span className={`mask-line ${className}`}>
      <motion.span
        initial={{ y: '108%' }}
        animate={immediate ? { y: '0%' } : undefined}
        whileInView={!immediate ? { y: '0%' } : undefined}
        viewport={immediate ? undefined : { once: true, margin: '-40px' }}
        transition={{ duration: 0.9, delay, ease: EASE_OUT }}
        className={innerClassName}
      >
        {children}
      </motion.span>
    </span>
  );
};
