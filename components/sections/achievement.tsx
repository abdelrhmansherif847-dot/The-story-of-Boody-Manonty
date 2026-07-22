"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { scores, achievementQuote, type ScoreCard } from "@/content/achievement";
import { chapterById } from "@/content/chapters";
import { SectionShell } from "./section-shell";
import { Reveal } from "@/components/effects/reveal";
import { SplitText } from "@/components/effects/split-text";
import { TiltCard } from "@/components/effects/tilt-card";
import { usePrefersReducedMotion } from "@/lib/hooks";

const chapter = chapterById.achievement;

function ScoreGauge({ card }: { card: ScoreCard }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(reduced ? card.score : 0);

  const pct = card.score / card.max;
  const R = 78;
  const C = 2 * Math.PI * R;

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, card.score, {
      duration: 2.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, card.score]);

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      <svg viewBox="0 0 180 180" className="h-48 w-48 -rotate-90">
        <circle cx="90" cy="90" r={R} fill="none" stroke="currentColor" strokeWidth="6" className="text-white/10" />
        <motion.circle
          cx="90"
          cy="90"
          r={R}
          fill="none"
          stroke={card.accent}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: reduced ? C * (1 - pct) : C }}
          animate={inView ? { strokeDashoffset: C * (1 - pct) } : {}}
          transition={{ duration: 2.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ filter: `drop-shadow(0 0 10px ${card.accent}66)` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center rotate-0">
        <span className="font-display text-5xl font-semibold tabular-nums text-warm-50">
          {value}
        </span>
        <span className="font-sans text-xs uppercase tracking-luxe text-warm-100/50">
          of {card.max}
        </span>
      </div>
    </div>
  );
}

function Card({ card }: { card: ScoreCard }) {
  return (
    <TiltCard className="h-full" intensity={8}>
      <div className="glass-dark flex h-full flex-col items-center rounded-4xl px-8 py-10 text-center shadow-luxe">
        <div className="mb-6 flex items-center gap-3">
          <span className="text-2xl" aria-hidden>
            {card.emoji}
          </span>
          <div className="text-left">
            <p className="font-display text-2xl font-medium text-warm-50">{card.name}</p>
            <p className="font-sans text-[0.65rem] uppercase tracking-luxe text-warm-100/50">
              {card.subject}
            </p>
          </div>
        </div>
        <ScoreGauge card={card} />
        <p className="mt-6 flex items-center gap-2 font-serif text-lg italic text-warm-100/70">
          <GraduationCap className="h-5 w-5" style={{ color: card.accent }} />
          Mathematics
        </p>
      </div>
    </TiltCard>
  );
}

/** The academic achievement — two hard-won scores, side by side. */
export function AchievementSection() {
  return (
    <SectionShell id={chapter.id} mood={chapter.mood}>
      <div className="container relative text-center">
        <Reveal>
          <p className="eyebrow text-gold-300">{chapter.eyebrow}</p>
        </Reveal>
        <SplitText
          as="h2"
          text="We Succeeded Together"
          className="mt-4 font-display text-4xl font-semibold tracking-tight text-warm-50 sm:text-6xl"
        />
        <Reveal delay={0.15}>
          <p className="mx-auto mt-5 max-w-xl font-serif text-xl italic text-warm-100/70">
            Long nights, practice tests, and encouraging each other when the
            numbers refused to make sense.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2 sm:gap-8">
          {scores.map((card) => (
            <Reveal key={card.key} delay={card.key === "boody" ? 0 : 0.15}>
              <Card card={card} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16">
            <p className="font-serif text-2xl italic text-warm-100/60">{achievementQuote.soft}</p>
            <p className="text-gradient-gold mt-2 font-display text-3xl font-semibold sm:text-5xl">
              {achievementQuote.strong}
            </p>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
