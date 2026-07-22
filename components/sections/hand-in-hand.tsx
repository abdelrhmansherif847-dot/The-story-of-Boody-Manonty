"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Hand } from "lucide-react";
import { chapterById } from "@/content/chapters";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { Particles } from "@/components/effects/particles";
import { Reveal } from "@/components/effects/reveal";
import { SplitText } from "@/components/effects/split-text";

const chapter = chapterById["hand-in-hand"];
const DIR = "/media/hand-in-hand";

const ASPECT: Record<string, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[16/11]",
  square: "aspect-square",
};

/**
 * A cinematic photo frame: soft warm glow, a slow scroll-driven zoom, a moving
 * light sheen across the glass, and a gentle reflection beneath — so each
 * memory feels held to the light rather than pinned to a grid.
 */
function CineFrame({
  src,
  alt,
  aspect = "portrait",
  focus = "50% 50%",
  className,
}: {
  src: string;
  alt: string;
  aspect?: keyof typeof ASPECT;
  focus?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.16, 1.02]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div
        aria-hidden
        className="absolute -inset-6 -z-[1] rounded-full bg-[radial-gradient(circle,rgba(216,162,78,0.28),transparent_70%)] blur-2xl"
      />
      <div className="relative overflow-hidden rounded-[1.75rem] border border-gold-300/25 shadow-luxe">
        <motion.div
          style={reduced ? undefined : { scale }}
          className={cn("relative w-full", ASPECT[aspect])}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 92vw, 40rem"
            style={{ objectPosition: focus }}
            className="object-cover"
          />
        </motion.div>
        {!reduced && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_40%,rgba(255,244,214,0.22)_50%,transparent_60%)] bg-[length:220%_100%] animate-shimmer"
          />
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-warm-50/10"
        />
      </div>

      {/* glass reflection */}
      <div
        aria-hidden
        className="relative mx-auto mt-0.5 h-20 w-[92%] overflow-hidden opacity-20 blur-[2px] [mask-image:linear-gradient(to_bottom,black,transparent)] [transform:scaleY(-1)]"
      >
        <Image src={src} alt="" fill sizes="40rem" style={{ objectPosition: focus }} className="object-cover" />
      </div>
    </div>
  );
}

function Line({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <p className="mx-auto mt-8 max-w-xl text-center font-serif text-xl italic leading-relaxed text-warm-100/75 sm:text-2xl">
        {children}
      </p>
    </Reveal>
  );
}

/** Hand in Hand — a calm, intimate chapter about connection, not objects. */
export function HandInHand() {
  return (
    <section
      id={chapter.id}
      className="relative overflow-hidden bg-[#0b0806] py-28 text-warm-50 md:py-40"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(74,52,24,0.5),#0b0806_72%)]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 grain-overlay opacity-25" />
      <Particles quantity={38} color="230, 202, 150" maxRadius={2.4} />

      <div className="container relative">
        {/* Title */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-300/10 ring-1 ring-gold-300/25">
                <Hand className="h-5 w-5 text-gold-300" strokeWidth={1.4} />
              </span>
              <span className="eyebrow text-gold-200/70">
                Chapter {chapter.index.toString().padStart(2, "0")} · {chapter.eyebrow}
              </span>
            </div>
          </Reveal>
          <SplitText
            as="h2"
            text="Hand in Hand"
            className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-warm-50 sm:text-7xl"
          />
          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-md font-serif text-2xl italic text-warm-100/70">
              This chapter isn't about objects. It's about connection.
            </p>
          </Reveal>
        </div>

        {/* Opening quote */}
        <Reveal>
          <blockquote className="mx-auto mt-16 max-w-2xl text-center">
            <p className="font-display text-2xl font-light leading-snug text-warm-100/90 sm:text-4xl">
              “Before forever became a promise…
            </p>
            <p className="mt-2 font-display text-2xl font-medium leading-snug text-gold-200 sm:text-4xl">
              it began with a simple touch.”
            </p>
          </blockquote>
        </Reveal>

        {/* Hero — hands & matching bracelets over the water */}
        <div className="mx-auto mt-20 max-w-md">
          <CineFrame
            src={`${DIR}/hands-water-1.jpg`}
            alt="Two hands resting together over turquoise water, wearing matching black beaded bracelets."
            aspect="portrait"
            focus="45% 48%"
          />
          <Line>Two wrists. The same beads. A quiet way of saying — mine.</Line>
        </div>

        {/* The heart made of spoons */}
        <div className="mx-auto mt-24 max-w-3xl">
          <CineFrame
            src={`${DIR}/tea-heart.jpg`}
            alt="Two hands each holding a teaspoon, the spoons crossing to form a heart, beside two glasses of tea."
            aspect="landscape"
            focus="50% 42%"
          />
          <Line>
            Two spoons. One heart. Some things you never plan — they simply
            happen when you're together.
          </Line>
        </div>

        {/* Detail diptych — the matching charms + the moment again */}
        <div className="mx-auto mt-24 grid max-w-4xl items-start gap-6 sm:grid-cols-2 sm:gap-8">
          <CineFrame
            src={`${DIR}/charms.jpg`}
            alt="Close-up of the matching bracelets with little white cat charms, black beads and periwinkle stones."
            aspect="portrait"
            focus="50% 45%"
          />
          <div className="flex flex-col">
            <CineFrame
              src={`${DIR}/hands-water-2.jpg`}
              alt="Hands together over the water, a second gentle frame of the same quiet moment."
              aspect="portrait"
              focus="45% 48%"
            />
          </div>
        </div>
        <Line>
          Two little companions, always facing the same way — the small blue
          bead that matches everything we love.
        </Line>

        {/* Ending quote */}
        <Reveal>
          <blockquote className="mx-auto mt-24 max-w-2xl text-center">
            <p className="font-serif text-2xl italic text-warm-100/70 sm:text-3xl">
              “Sometimes… the strongest words are never spoken.
            </p>
            <p className="mt-3 font-display text-3xl font-semibold text-warm-50 sm:text-5xl">
              They are simply held.”
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
