"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  aBase: number;
  phase: number;
};

/**
 * Slow-drifting light particles — like dust in a sunbeam. Canvas-based and
 * capped for performance; pauses when the tab is hidden and disables entirely
 * under prefers-reduced-motion.
 */
export function Particles({
  className,
  color = "255, 255, 255",
  quantity = 42,
  maxRadius = 2.2,
}: {
  className?: string;
  /** "r, g, b" channels. */
  color?: string;
  quantity?: number;
  maxRadius?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let particles: Particle[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas.parentElement ?? canvas;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      // Scale particle count with area, capped by `quantity`.
      const count = Math.min(quantity, Math.round((w * h) / 26000));
      particles = Array.from({ length: count }, () => spawn(w, h));
    };

    const spawn = (w: number, h: number): Particle => {
      const aBase = Math.random() * 0.5 + 0.1;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: (Math.random() * 0.8 + 0.2) * maxRadius,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(Math.random() * 0.18 + 0.04),
        a: aBase,
        aBase,
        phase: Math.random() * Math.PI * 2,
      };
    };

    const tick = () => {
      if (!running) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx * dpr;
        p.y += p.vy * dpr;
        p.phase += 0.01;
        p.a = p.aBase * (0.6 + 0.4 * Math.sin(p.phase));
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * dpr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running) {
        raf = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(raf);
      }
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [color, quantity, maxRadius, reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
