"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";
import { chapterById } from "@/content/chapters";
import { getMedia } from "@/content/media";
import { SectionShell } from "./section-shell";
import { ChapterHeading, ChapterNarrative } from "./chapter-heading";
import { Reveal } from "@/components/effects/reveal";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

const chapter = chapterById.gifts;

/** Gifts — a treasure box that opens to reveal the little treasures. */
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
                className="w-full"
              >
                <GalleryGrid items={items} accent={chapter.mood.accent} columns="sm:columns-2 lg:columns-3" />
                <Reveal delay={0.1}>
                  <p className="mt-12 text-center font-serif text-xl italic text-muted-foreground">
                    …and one of them — gold, and glowing — deserves its own light.
                    <span className="mt-1 block font-sans text-xs uppercase not-italic tracking-luxe text-gold-600">
                      Just ahead ↓
                    </span>
                  </p>
                </Reveal>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionShell>
  );
}
