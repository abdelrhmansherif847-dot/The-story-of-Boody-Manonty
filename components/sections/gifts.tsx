"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gift, Gem, Sparkles } from "lucide-react";
import { chapterById } from "@/content/chapters";
import { getMedia } from "@/content/media";
import { SectionShell } from "./section-shell";
import { ChapterHeading, ChapterNarrative } from "./chapter-heading";
import { Reveal } from "@/components/effects/reveal";
import { TiltCard } from "@/components/effects/tilt-card";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { Particles } from "@/components/effects/particles";

const chapter = chapterById.gifts;

/** The luxury "First Gold Gift" — a jewellery-boutique moment. */
function GoldGift() {
  return (
    <TiltCard intensity={7} className="mx-auto max-w-md">
      <div className="relative overflow-hidden rounded-4xl border border-gold-300/40 bg-gradient-to-br from-gold-200/25 via-chocolate-100/40 to-gold-400/20 p-10 text-center shadow-gold backdrop-blur">
        {/* moving sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.5)_50%,transparent_70%)] bg-[length:200%_100%] animate-shimmer"
        />
        <span className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold-300/30 ring-1 ring-gold-400/40">
          <Gem className="h-9 w-9 text-gold-500" strokeWidth={1.3} />
        </span>
        <p className="eyebrow relative mt-6 text-gold-600">A glowing first</p>
        <h3 className="text-gradient-gold relative mt-2 font-display text-3xl font-semibold sm:text-4xl">
          The First Gold Gift
        </h3>
        <p className="relative mt-4 font-serif text-lg italic text-chocolate-700">
          Held to the light, turned slowly — the way you admire something precious
          in a quiet boutique.
        </p>
        {/* reflection */}
        <div
          aria-hidden
          className="relative mx-auto mt-6 h-10 w-2/3 rounded-full bg-gradient-to-b from-gold-300/40 to-transparent blur-md"
        />
      </div>
    </TiltCard>
  );
}

/** Gifts — opened from a treasure box. */
export function GiftsSection() {
  const [opened, setOpened] = useState(false);
  const items = getMedia("gifts");

  return (
    <SectionShell id={chapter.id} mood={chapter.mood}>
      <div className="container relative">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <ChapterHeading chapter={chapter} />
          <ChapterNarrative lines={chapter.narrative} className="lg:pb-3" />
        </div>

        {/* Treasure box */}
        <div className="relative mt-16 flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!opened ? (
              <motion.button
                key="box"
                type="button"
                onClick={() => setOpened(true)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1 }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col items-center gap-5 rounded-4xl border border-gold-300/40 bg-card/60 px-12 py-14 shadow-luxe backdrop-blur"
                aria-label="Open the treasure box"
              >
                <motion.span
                  animate={{ rotate: [0, -6, 6, 0], y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-gold-200 to-gold-400 text-chocolate-800 shadow-gold"
                >
                  <Gift className="h-11 w-11" strokeWidth={1.4} />
                </motion.span>
                <span className="font-serif text-2xl italic text-foreground">
                  A little treasure awaits
                </span>
                <span className="flex items-center gap-2 font-sans text-xs uppercase tracking-luxe text-gold-600">
                  <Sparkles className="h-4 w-4" /> Open the box
                </span>
              </motion.button>
            ) : (
              <motion.div
                key="revealed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full"
              >
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                  <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-gold-300/30 blur-3xl" />
                  <Particles quantity={26} color="226, 192, 95" maxRadius={2.4} />
                </div>
                <GoldGift />

                <div className="mt-14">
                  <Reveal>
                    <p className="mb-8 text-center font-serif text-xl italic text-muted-foreground">
                      …and every other little treasure, kept safe.
                    </p>
                  </Reveal>
                  <GalleryGrid items={items} accent={chapter.mood.accent} columns="sm:columns-2 lg:columns-3" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionShell>
  );
}
