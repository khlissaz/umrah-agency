import { motion, MotionProps } from 'framer-motion';
import React, { ElementType, ReactNode } from 'react';

interface MotionBoxProps<T extends ElementType> extends MotionProps {
  variant?: 'fadeUp' | 'fadeIn' | 'float' | 'scalePulse';
  delay?: number;
  children?: ReactNode;
  as?: T;
} 

export function MotionBox<T extends ElementType = 'div'>({
  variant,
  delay = 0,
  children,
  as,
  ...rest
}: MotionBoxProps<T> & Omit<React.ComponentProps<T>, keyof MotionProps>) {
  const motionProps = variant
    ? {
        initial: { opacity: 0, y: variant === 'fadeUp' ? 30 : 0 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay },
      }
    : {};

  const MotionComponent = as ? (motion as any)[as] : motion.div;
  return <MotionComponent {...motionProps} {...rest}>{children}</MotionComponent>;
}
