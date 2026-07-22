"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * An ECG / heartbeat line. A faint trace sits beneath a bright pulse that
 * travels along it forever — the visual heartbeat of Manonty's chapter.
 */
export function HeartbeatLine({
  className,
  color = "#4655ef",
  strokeWidth = 2.5,
}: {
  className?: string;
  color?: string;
  strokeWidth?: number;
}) {
  const reduced = usePrefersReducedMotion();
  // Two repeats of a clean ECG beat across a wide viewBox.
  const beat =
    "M0 60 H120 l14 -8 8 16 10 -46 12 78 12 -40 10 0 H360 l14 -8 8 16 10 -46 12 78 12 -40 10 0 H720";

  return (
    <svg
      viewBox="0 0 720 120"
      preserveAspectRatio="none"
      className={cn("h-24 w-full", className)}
      aria-hidden
    >
      <path d={beat} fill="none" stroke={color} strokeWidth={strokeWidth} opacity={0.14} />
      {!reduced && (
        <motion.path
          d={beat}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="140 1600"
          initial={{ strokeDashoffset: 1740 }}
          animate={{ strokeDashoffset: [1740, 0] }}
          transition={{ duration: 3.4, ease: "linear", repeat: Infinity }}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      )}
    </svg>
  );
}
