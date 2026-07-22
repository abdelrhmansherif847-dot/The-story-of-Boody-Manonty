"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { chapterById } from "@/content/chapters";
import { dictionary, dictionaryOutro, type DictionaryEntry } from "@/content/dictionary";
import { SectionShell } from "./section-shell";
import { ChapterHeading } from "./chapter-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/effects/reveal";
import { cn } from "@/lib/utils";

const chapter = chapterById.dictionary;

/** A flip card: the word on the face, its meaning on the reverse. */
function WordCard({ entry }: { entry: DictionaryEntry }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`${entry.transliteration}. ${flipped ? "Show word" : "Reveal meaning"}`}
      className="perspective group relative block h-56 w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      <div
        className={cn(
          "preserve-3d relative h-full w-full transition-transform duration-700 ease-luxe",
          flipped && "[transform:rotateY(180deg)]",
        )}
      >
        {/* Front */}
        <div className="backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-4xl border border-border/70 bg-card/70 px-4 py-6 text-center shadow-luxe">
          <span className="font-arabic text-sm text-royal-500/60">{entry.number}</span>
          <span
            dir="rtl"
            className="mt-3 font-arabic-display text-3xl font-semibold text-foreground sm:text-4xl"
          >
            {entry.word}
          </span>
          <span className="mt-3 font-serif text-base italic text-muted-foreground">
            {entry.transliteration}
          </span>
          <span className="mt-4 font-sans text-[0.6rem] uppercase tracking-luxe text-royal-500/70 transition group-hover:text-royal-500">
            Tap to reveal
          </span>
        </div>

        {/* Back */}
        <div className="backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-4xl border border-royal-400/30 bg-gradient-to-br from-navy-900 to-royal-900 px-5 py-6 text-center text-warm-50 [transform:rotateY(180deg)]">
          <span
            dir="rtl"
            className="font-arabic-display text-xl font-medium text-warm-100/90"
          >
            {entry.word}
          </span>
          <div className="my-3 h-px w-10 bg-warm-100/30" />
          <p className="font-serif text-lg leading-snug text-warm-50">{entry.meaning}</p>
          <p className="mt-3 font-sans text-xs leading-relaxed text-warm-100/60">{entry.note}</p>
        </div>
      </div>
    </button>
  );
}

/** Our Dictionary — the private language of two people. */
export function DictionarySection() {
  return (
    <SectionShell id={chapter.id} mood={chapter.mood}>
      <div className="container relative">
        <ChapterHeading chapter={chapter} align="center" />

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-center font-serif text-xl italic text-muted-foreground">
            A handful of words that mean nothing to the world — and everything to us.
          </p>
        </Reveal>

        <RevealGroup
          stagger={0.07}
          className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4"
        >
          {dictionary.map((entry) => (
            <RevealItem key={entry.number}>
              <WordCard entry={entry} />
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Outro */}
        <div className="mx-auto mt-20 max-w-lg text-center">
          <Reveal>
            <p className="font-serif text-2xl italic text-muted-foreground">
              {dictionaryOutro.lead}
            </p>
            <p className="font-display text-3xl font-light text-foreground/80">
              {dictionaryOutro.small}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 font-serif text-2xl italic text-muted-foreground">
              {dictionaryOutro.lead2}
            </p>
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-gradient-blue mt-1 font-display text-4xl font-semibold sm:text-6xl"
            >
              {dictionaryOutro.strong}
            </motion.p>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
