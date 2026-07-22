"use client";

import { cn } from "@/lib/utils";
import type { Chapter } from "@/content/types";
import { Reveal } from "@/components/effects/reveal";
import { SplitText } from "@/components/effects/split-text";

/** The standard, editorial opening of a chapter: kicker · title · subtitle. */
export function ChapterHeading({
  chapter,
  align = "left",
  className,
}: {
  chapter: Chapter;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "max-w-3xl",
        centered && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <div
          className={cn(
            "mb-6 flex items-center gap-3",
            centered && "justify-center",
          )}
        >
          <span className="text-2xl" aria-hidden>
            {chapter.emoji}
          </span>
          <span className="eyebrow">
            Chapter {chapter.index.toString().padStart(2, "0")} · {chapter.eyebrow}
          </span>
        </div>
      </Reveal>

      <SplitText
        as="h2"
        text={chapter.title}
        className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
      />

      {chapter.subtitle && (
        <Reveal delay={0.15}>
          <p
            className={cn(
              "mt-5 font-serif text-2xl italic text-muted-foreground sm:text-3xl",
              chapter.mood.scheme === "dark" && "text-warm-100/70",
            )}
          >
            {chapter.subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/** Narrative paragraphs, revealed one by one. */
export function ChapterNarrative({
  lines,
  dark,
  className,
}: {
  lines: string[];
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-xl space-y-5", className)}>
      {lines.map((line, i) => (
        <Reveal key={i} delay={i * 0.08}>
          <p
            className={cn(
              "font-serif text-xl leading-relaxed sm:text-2xl",
              dark ? "text-warm-100/80" : "text-foreground/80",
            )}
          >
            {line}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
