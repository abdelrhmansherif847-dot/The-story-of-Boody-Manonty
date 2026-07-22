"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { chapterById } from "@/content/chapters";
import { getMedia } from "@/content/media";
import type { MediaItem } from "@/content/types";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { Reveal } from "@/components/effects/reveal";

const chapter = chapterById.eyes;

/** A single, slowly-zooming eye panel with one line of text. */
function EyePanel({ item, caption }: { item?: MediaItem; caption: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.35, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div
      ref={ref}
      className="relative flex min-h-[90svh] items-center justify-center overflow-hidden"
    >
      <motion.div
        style={reduced ? undefined : { scale, y }}
        className="absolute inset-0"
      >
        {item?.src ? (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          // Placeholder evoking an iris in darkness.
          <div className="absolute inset-0 bg-navy-950">
            <div className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,theme(colors.royal.500)_0%,theme(colors.navy.800)_35%,theme(colors.navy.950)_70%)] opacity-70 blur-sm" />
            <div className="absolute left-1/2 top-1/2 h-[16vmin] w-[16vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy-950 shadow-[0_0_60px_20px_rgba(0,0,0,0.6)]" />
          </div>
        )}
      </motion.div>

      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/70" />

      <Reveal className="relative z-10" amount={0.6}>
        <p className="px-6 text-center font-display text-3xl font-light tracking-wide text-warm-50 sm:text-5xl">
          {caption}
        </p>
      </Reveal>
    </div>
  );
}

/** Our Eyes — a hushed, cinematic interlude. */
export function EyesChapter() {
  const items = getMedia("eyes");
  return (
    <section id={chapter.id} className="relative bg-navy-950 text-warm-50">
      <div className="container py-24 text-center md:py-32">
        <Reveal>
          <span className="text-2xl" aria-hidden>
            {chapter.emoji}
          </span>
          <p className="eyebrow mt-4 text-warm-100/50">
            Chapter {chapter.index.toString().padStart(2, "0")} · {chapter.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-5xl font-semibold sm:text-7xl">
            {chapter.title}
          </h2>
        </Reveal>
      </div>

      <EyePanel item={items[0]} caption="His eyes." />
      <EyePanel item={items[1]} caption="Her eyes." />
      <EyePanel item={items[2]} caption="And the moment they met." />
    </section>
  );
}
