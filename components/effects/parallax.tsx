"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Vertical parallax: shifts children as the element travels through the
 * viewport. `speed` > 0 moves slower than scroll (background), < 0 faster.
 */
export function Parallax({
  children,
  speed = 0.3,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 60}%`, `${speed * -60}%`]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/** Expose a raw scroll-progress MotionValue for a target element. */
export function useElementProgress(offset: [string, string] = ["start end", "end start"]) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // @ts-expect-error framer accepts string edge tuples
    offset,
  });
  return { ref, scrollYProgress: scrollYProgress as MotionValue<number> };
}
