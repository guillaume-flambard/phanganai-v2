'use client';

import { motion } from 'motion/react';

interface AnimatedProgressProps {
  progress: number; // 0-100
  className?: string;
  barClassName?: string;
}

export function AnimatedProgress({ progress, className, barClassName }: AnimatedProgressProps) {
  return (
    <div className={className}>
      <motion.div
        className={barClassName}
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
      />
    </div>
  );
}
