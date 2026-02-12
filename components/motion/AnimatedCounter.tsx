'use client';

import { useEffect, useRef, useState } from 'react';
import { animate } from 'motion';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  separator?: boolean;
  className?: string;
}

export function AnimatedCounter({
  target,
  duration = 1.2,
  prefix = '',
  suffix = '',
  separator = true,
  className,
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    if (animated.current) return;
    animated.current = true;

    const controls = animate(0, target, {
      duration,
      ease: 'easeOut',
      onUpdate(value) {
        const rounded = Math.round(value);
        const formatted = separator ? rounded.toLocaleString() : String(rounded);
        setDisplay(`${prefix}${formatted}${suffix}`);
      },
    });

    return () => controls.stop();
  }, [target, duration, prefix, suffix, separator]);

  return <span ref={ref} className={className}>{display}</span>;
}
