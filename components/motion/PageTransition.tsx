'use client';

import { motion, type Variants } from 'motion/react';
import { pageVariants } from '@/lib/animations';

interface PageTransitionProps {
  children: React.ReactNode;
  variant?: Variants;
  className?: string;
}

export function PageTransition({ children, variant = pageVariants, className }: PageTransitionProps) {
  return (
    <motion.div
      variants={variant}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}
