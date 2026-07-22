"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ANNIVERSARY, elapsedSince, pad, type Duration } from "@/lib/utils";
import { useMounted } from "@/lib/hooks";
import { Reveal } from "@/components/effects/reveal";
import { Particles } from "@/components/effects/particles";
import { SectionShell } from "./section-shell";

/** Shared ticking hook — recomputes the elapsed time every second. */
function useElapsed(): Duration {
  const [d, setD] = useState<Duration>(() => elapsedSince(ANNIVERSARY));
  useEffect(() => {
    const id = setInterval(() => setD(elapsedSince(ANNIVERSARY)), 1000);
    return () => clearInterval(id);
  }, []);
  return d;
}

const UNITS: Array<{ key: keyof Duration; label: string }> = [
  { key: "years", label: "Years" },
  { key: "months", label: "Months" },
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

/** The full love-counter moment. */
export function LoveCounter() {
  const mounted = useMounted();
  const d = useElapsed();

  return (
    <SectionShell
      id="love-counter"
      register={false}
      mood={{
        gradient: "from-navy-950 via-navy-900 to-royal-900",
        accent: "#6b7dfb",
        scheme: "dark",
      }}
    >
      <Particles quantity={30} color="200,214,255" className="opacity-50" />
      <div className="container relative text-center">
        <Reveal>
          <p className="eyebrow text-warm-100/60">Counting every second</p>
          <h2 className="mt-4 font-display text-4xl font-medium sm:text-6xl">
            Since the day everything changed
          </h2>
          <p className="mx-auto mt-4 max-w-md font-serif text-xl italic text-warm-100/60">
            24 August 2023 — and still counting.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-3 gap-3 sm:gap-5 md:grid-cols-6">
          {UNITS.map(({ key, label }, i) => (
            <Reveal key={key} delay={i * 0.06}>
              <div className="glass-dark flex flex-col items-center rounded-3xl px-2 py-6 sm:py-8">
                <span className="font-display text-4xl font-semibold tabular-nums text-warm-50 sm:text-6xl">
                  {mounted ? (key === "years" || key === "months" ? d[key] : pad(d[key])) : "—"}
                </span>
                <span className="mt-2 font-sans text-[0.6rem] uppercase tracking-luxe text-warm-100/50 sm:text-xs">
                  {label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-12 font-serif text-2xl italic text-warm-100/80">
            That's{" "}
            <span className="text-gradient-blue font-semibold not-italic tabular-nums">
              {mounted ? d.totalDays.toLocaleString() : "—"}
            </span>{" "}
            days of us.
          </p>
        </Reveal>
      </div>
    </SectionShell>
  );
}

/** Compact counter for the persistent top bar. */
export function LoveCounterMini() {
  const mounted = useMounted();
  const d = useElapsed();
  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-1.5 font-sans text-xs tabular-nums text-foreground/70"
      aria-label={`${d.totalDays} days together`}
      title="Days since 24 August 2023"
    >
      <motion.span
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        className="text-burgundy-500"
      >
        ❤
      </motion.span>
      <span className="hidden sm:inline">{d.totalDays.toLocaleString()} days</span>
      <span className="sm:hidden">{d.totalDays.toLocaleString()}d</span>
    </motion.div>
  );
}
