import React from 'react';
import { motion, Variants } from 'framer-motion';

export type AnimatedGroupPreset = 'fade' | 'slide' | 'scale' | 'blur-sm' | 'blur-slide';

export interface AnimatedGroupProps {
  children: React.ReactNode;
  className?: string;
  preset?: AnimatedGroupPreset;
  staggerDelay?: number;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  as?: React.ElementType;
}

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const presetItemVariants: Record<AnimatedGroupPreset, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
    },
  },
  slide: {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } 
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
    },
  },
  'blur-sm': {
    hidden: { opacity: 0, filter: 'blur(10px)', y: 12 },
    visible: { 
      opacity: 1, 
      filter: 'blur(0px)', 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    },
  },
  'blur-slide': {
    hidden: { opacity: 0, filter: 'blur(12px)', y: 28, scale: 0.95 },
    visible: { 
      opacity: 1, 
      filter: 'blur(0px)', 
      y: 0, 
      scale: 1, 
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } 
    },
  },
};

export const AnimatedGroup: React.FC<AnimatedGroupProps> = ({
  children,
  className = '',
  preset = 'blur-slide',
  staggerDelay = 0.12,
  variants,
}) => {
  const containerVariants: Variants = variants?.container || {
    ...defaultContainerVariants,
    visible: {
      ...defaultContainerVariants.visible,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = variants?.item || presetItemVariants[preset];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return (
          <motion.div variants={itemVariants} className="h-full">
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
};
