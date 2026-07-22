"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { KeyRound, Lock, Heart } from "lucide-react";
import { site } from "@/content/site";
import { isCorrectPassword } from "@/lib/password";
import { useExperience } from "@/components/providers/experience-provider";
import { Particles } from "@/components/effects/particles";

/**
 * The door to the story. A calm, dark, jewellery-box screen: enter the date
 * that started everything (24/8/2023) and the whole experience unfolds.
 */
export function Gate() {
  const { unlock } = useExperience();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [opening, setOpening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 1200);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCorrectPassword(value)) {
      setError(false);
      setOpening(true);
      // Let the "opening" flourish play, then reveal the story.
      setTimeout(unlock, 1900);
    } else {
      setError(true);
      setValue("");
      setTimeout(() => setError(false), 700);
    }
  };

  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-navy-950 px-6 text-warm-50">
      {/* Ambient light + particles */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,theme(colors.navy.800),theme(colors.navy.950)_70%)]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 grain-overlay opacity-30" />
      <Particles quantity={46} color="200, 214, 255" />

      {/* Expanding light on success */}
      <AnimatePresence>
        {opening && (
          <motion.div
            className="absolute left-1/2 top-1/2 -z-[5] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-warm-50"
            initial={{ scale: 0, opacity: 0.9 }}
            animate={{ scale: 900, opacity: 1 }}
            transition={{ duration: 1.7, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!opening ? (
          <motion.div
            key="gate"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md"
          >
            <div className="glass-dark relative overflow-hidden rounded-4xl px-8 py-12 text-center shadow-luxe sm:px-12">
              {/* Lock crest */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/5"
              >
                <div className="relative">
                  <Lock className="h-8 w-8 text-warm-100" strokeWidth={1.3} />
                  <span className="absolute -inset-4 animate-pulse-ring rounded-full border border-white/20" />
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="eyebrow text-warm-100/60"
              >
                {site.monogram}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="mt-4 font-display text-4xl font-medium leading-tight sm:text-5xl"
              >
                {site.welcome}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mx-auto mt-4 max-w-xs font-serif text-lg italic text-warm-100/70"
              >
                {site.tagline}
              </motion.p>

              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.9 }}
                className="mt-10"
              >
                <motion.div
                  animate={error ? { x: [0, -10, 10, -8, 8, 0] } : {}}
                  transition={{ duration: 0.5 }}
                  className={`flex items-center gap-3 rounded-full border bg-white/5 px-5 py-3 transition-colors ${
                    error ? "border-burgundy-400" : "border-white/15 focus-within:border-white/40"
                  }`}
                >
                  <KeyRound className="h-5 w-5 shrink-0 text-warm-100/50" />
                  <input
                    ref={inputRef}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="DD / MM / YYYY"
                    aria-label="Enter the date that started everything"
                    className="w-full bg-transparent text-center font-sans text-lg tracking-widest text-warm-50 placeholder:text-warm-100/30 focus:outline-none"
                  />
                </motion.div>

                <button
                  type="submit"
                  className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-warm-50 px-6 py-3.5 font-sans text-sm font-medium tracking-wide2 text-navy-950 transition hover:bg-white active:scale-[0.99]"
                >
                  Open our story
                  <Heart className="h-4 w-4 transition-transform group-hover:scale-110" fill="currentColor" />
                </button>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 font-serif text-sm italic text-burgundy-200"
                    >
                      Not quite — try the day everything changed.
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative z-10 text-center text-navy-950"
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ delay: 0.7, duration: 1.2 }}
              className="font-sans text-xs uppercase tracking-luxe"
            >
              {site.anniversaryLabel}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="mt-3 font-display text-3xl font-medium sm:text-5xl"
            >
              Our story begins
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
