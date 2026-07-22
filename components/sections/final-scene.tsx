"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ANNIVERSARY, elapsedSince } from "@/lib/utils";
import { useMounted } from "@/lib/hooks";

/**
 * The last page. One question. A held breath. Then the only answer that
 * ever mattered — while, quietly, the counter keeps counting.
 */
export function FinalScene() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [answered, setAnswered] = useState(false);
  const [hearts, setHearts] = useState<number[]>([]);
  const mounted = useMounted();
  const [days, setDays] = useState(0);

  useEffect(() => {
    setDays(elapsedSince(ANNIVERSARY).totalDays);
    const id = setInterval(() => setDays(elapsedSince(ANNIVERSARY).totalDays), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setAnswered(true), 3600);
    return () => clearTimeout(t);
  }, [inView]);

  const burst = () => {
    const ids = Array.from({ length: 12 }, (_, i) => Date.now() + i);
    setHearts((h) => [...h, ...ids]);
    setTimeout(() => setHearts((h) => h.slice(ids.length)), 2600);
  };

  return (
    <section
      ref={ref}
      id="final"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Background that slowly fades toward black as the scene resolves */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        initial={{ opacity: 1 }}
        animate={{ opacity: answered ? 0.25 : 1 }}
        transition={{ duration: 6, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse at center, #131f3c 0%, #0b1428 45%, #060b18 100%)",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-black" />
      <div aria-hidden className="absolute inset-0 -z-10 grain-overlay opacity-20" />

      {/* Floating hearts easter-egg */}
      <AnimatePresence>
        {hearts.map((id, i) => (
          <motion.span
            key={id}
            className="pointer-events-none absolute bottom-1/3 text-2xl"
            style={{ left: `${20 + ((i * 37) % 60)}%` }}
            initial={{ opacity: 0, y: 0, scale: 0.6 }}
            animate={{ opacity: [0, 1, 0], y: -220, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.4, ease: "easeOut" }}
          >
            ❤️
          </motion.span>
        ))}
      </AnimatePresence>

      <div className="relative flex flex-col items-center gap-10 text-warm-50">
        {/* The question */}
        <motion.p
          dir="rtl"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-arabic-display text-5xl font-medium sm:text-7xl"
        >
          نعمل واحد؟
        </motion.p>

        {/* The answer */}
        <div className="min-h-[5rem]">
          <AnimatePresence>
            {answered && (
              <motion.button
                dir="rtl"
                onClick={burst}
                initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className="flex max-w-[92vw] cursor-pointer flex-wrap items-center justify-center gap-x-3 font-arabic-display text-4xl font-bold outline-none sm:text-7xl"
                aria-label="يسسسسسسس ❤️"
                title="❤"
              >
                <span className="text-gradient-blue">يسسسسسسس</span>
                <span aria-hidden>❤️</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* The counter keeps counting — quietly, forever */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: answered ? 1 : 0 }}
        transition={{ duration: 3, delay: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-1 text-warm-100/50"
      >
        <span className="font-sans text-[0.65rem] uppercase tracking-luxe">
          and still counting
        </span>
        <span className="font-display text-lg tabular-nums text-warm-100/70">
          {mounted ? `${days.toLocaleString()} days of us` : ""}
        </span>
      </motion.div>
    </section>
  );
}
