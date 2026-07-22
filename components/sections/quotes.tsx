"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote as QuoteIcon } from "lucide-react";
import { quotes } from "@/content/quotes";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

/** A quiet, auto-rotating spotlight of our favourite lines. */
export function QuotesSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % quotes.length), 5200);
    return () => clearInterval(id);
  }, [paused]);

  const q = quotes[index];

  return (
    <section
      id="quotes"
      className="relative flex min-h-[70svh] items-center justify-center overflow-hidden bg-navy-950 px-6 py-24 text-warm-50"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,theme(colors.navy.800),theme(colors.navy.950)_70%)]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 grain-overlay opacity-20" />

      <div className="relative mx-auto max-w-3xl text-center">
        <QuoteIcon className="mx-auto mb-8 h-8 w-8 text-royal-400/60" />
        <div className="relative min-h-[9rem]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? {} : { opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <p
                dir={q.arabic ? "rtl" : "ltr"}
                className={cn(
                  q.arabic
                    ? "font-arabic-display text-4xl font-medium sm:text-6xl"
                    : "font-display text-3xl font-light leading-snug sm:text-5xl",
                )}
              >
                {q.arabic ? q.text : `“${q.text}”`}
              </p>
              {q.attribution && (
                <cite className="mt-6 font-sans text-xs uppercase not-italic tracking-luxe text-warm-100/50">
                  — {q.attribution}
                </cite>
              )}
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* dots */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show quote ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === index ? "w-8 bg-royal-300" : "w-1.5 bg-warm-100/25 hover:bg-warm-100/50",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
