"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpOptions {
  duration?: number;
  decimals?: number;
  start?: number;
}

export function useCountUp(
  target: number,
  { duration = 2200, decimals = 0, start = 0 }: CountUpOptions = {}
) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 });
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * eased;
      setValue(Number(current.toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, target, duration, decimals, start]);

  return { value, ref };
}
