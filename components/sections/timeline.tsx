"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Baby,
  Sparkles,
  Camera,
  Waves,
  Gem,
  Moon,
  GraduationCap,
  Sun,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { chapterById } from "@/content/chapters";
import { milestones, type Milestone } from "@/content/timeline";
import { SectionShell } from "./section-shell";
import { ChapterHeading } from "./chapter-heading";
import { Reveal } from "@/components/effects/reveal";
import { cn } from "@/lib/utils";

const chapter = chapterById.journey;

const ICONS: Record<string, LucideIcon> = {
  Baby,
  Sparkles,
  Camera,
  Waves,
  Gem,
  Moon,
  GraduationCap,
  Sun,
};

function Node({ m, side }: { m: Milestone; side: "left" | "right" }) {
  const Icon = ICONS[m.icon] ?? Sparkles;
  const card = (
    <a
      href={m.chapter ? `#${m.chapter}` : undefined}
      className={cn(
        "group block rounded-3xl border border-border/70 bg-card/70 p-6 shadow-luxe backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-royal-400/50",
        m.highlight && "ring-1 ring-royal-400/40",
      )}
    >
      <div className="flex items-center gap-2 text-royal-600">
        <span className="text-lg" aria-hidden>
          {m.emoji}
        </span>
        <span className="font-sans text-[0.65rem] uppercase tracking-luxe">{m.when}</span>
      </div>
      <h3 className="mt-2 font-display text-2xl font-medium text-foreground">{m.title}</h3>
      <p className="mt-2 font-serif text-lg italic text-muted-foreground">{m.detail}</p>
      {m.chapter && (
        <span className="mt-3 inline-flex items-center gap-1 font-sans text-xs uppercase tracking-luxe text-royal-500 opacity-0 transition group-hover:opacity-100">
          Visit chapter <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      )}
    </a>
  );

  return (
    <div className="relative md:grid md:grid-cols-2 md:gap-12">
      {/* node dot */}
      <span
        className={cn(
          "absolute left-4 top-7 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border-2 border-background shadow md:left-1/2",
          m.highlight ? "bg-royal-500 text-warm-50" : "bg-card text-royal-500 ring-1 ring-border",
        )}
      >
        <Icon className="h-4 w-4" strokeWidth={1.6} />
      </span>

      {side === "left" ? (
        <>
          <Reveal direction="right" className="ml-12 md:ml-0 md:pr-6 md:text-right">
            {card}
          </Reveal>
          <div className="hidden md:block" />
        </>
      ) : (
        <>
          <div className="hidden md:block" />
          <Reveal direction="left" className="ml-12 md:ml-0 md:pl-6">
            {card}
          </Reveal>
        </>
      )}
    </div>
  );
}

/** Our Journey — the milestones, on a scroll-filled timeline. */
export function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 26 });

  return (
    <SectionShell id={chapter.id} mood={chapter.mood}>
      <div className="container relative">
        <ChapterHeading chapter={chapter} align="center" />

        <div ref={ref} className="relative mx-auto mt-16 max-w-4xl">
          {/* rail */}
          <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            style={{ scaleY }}
            className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-royal-400 via-accent to-burgundy-400 md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-10 md:space-y-16">
            {milestones.map((m, i) => (
              <Node key={m.id} m={m} side={i % 2 === 0 ? "left" : "right"} />
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
