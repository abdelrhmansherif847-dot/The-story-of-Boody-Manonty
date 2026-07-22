"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

const drawTransition = (i: number) => ({
  duration: 1.6,
  delay: 0.2 + i * 0.18,
  ease: [0.16, 1, 0.3, 1] as const,
});

/**
 * A self-drawing architectural blueprint — a suspension bridge and a tower
 * sketched line by line, the way an engineer's drawing comes to life.
 * Used in Boody's chapter and, later, morphed toward the heart in "Together".
 */
export function BlueprintDraw({
  className,
  color = "#94a6ff",
}: {
  className?: string;
  color?: string;
}) {
  const reduced = usePrefersReducedMotion();

  const lines = [
    // ground line
    "M20 300 H580",
    // bridge deck
    "M60 250 H540",
    // towers
    "M160 250 V120",
    "M440 250 V120",
    // main cables (parabolas)
    "M60 200 Q160 130 300 200 T540 200",
    // hangers
    "M120 205 V250 M200 210 V250 M300 200 V250 M400 210 V250 M480 205 V250",
    // building on the right
    "M470 250 V150 H560 V250",
    "M470 180 H560 M470 210 H560 M515 150 V250",
  ];

  const commonProps = {
    fill: "none",
    stroke: color,
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
  };

  return (
    <svg
      viewBox="0 0 600 320"
      className={cn("h-full w-full", className)}
      aria-hidden
    >
      {/* faint grid */}
      <defs>
        <pattern id="bp-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke={color} strokeWidth="0.4" opacity="0.18" />
        </pattern>
      </defs>
      <rect width="600" height="320" fill="url(#bp-grid)" opacity="0.5" />

      {lines.map((d, i) =>
        reduced ? (
          <path key={i} d={d} {...commonProps} opacity={0.9} />
        ) : (
          <motion.path
            key={i}
            d={d}
            {...commonProps}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.95 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={drawTransition(i)}
          />
        ),
      )}
    </svg>
  );
}
