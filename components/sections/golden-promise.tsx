"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Gem, Sparkles } from "lucide-react";
import { chapterById } from "@/content/chapters";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { Particles } from "@/components/effects/particles";
import { Reveal } from "@/components/effects/reveal";
import { SplitText } from "@/components/effects/split-text";

const chapter = chapterById["golden-promise"];
const PHOTO = "/media/golden-promise/necklace.jpeg";

/**
 * Our First Golden Promise — one of the emotional highlights of the story.
 * A dark, jewellery-boutique stage: golden light, glass reflection, a slow
 * scroll-driven zoom, floating gold dust, and the two quotes that make a gift
 * priceless. Not a product showcase — a memory held in the hands.
 */
export function GoldenPromise() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });
  // Slow, cinematic zoom as the piece travels through the viewport.
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.05, 1.14]);
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 0.7, 0.4]);

  return (
    <section
      id={chapter.id}
      className="relative overflow-hidden bg-[#0a0805] py-28 text-warm-50 md:py-40"
    >
      {/* Warm dark base + soft gold vignette */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(80,58,20,0.55),#0a0805_70%)]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 grain-overlay opacity-30" />
      <Particles quantity={40} color="226, 192, 95" maxRadius={2.6} />

      <div className="container relative">
        {/* Title */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="text-2xl" aria-hidden>
                {chapter.emoji}
              </span>
              <span className="eyebrow text-gold-300/80">
                Chapter {chapter.index.toString().padStart(2, "0")} · {chapter.eyebrow}
              </span>
            </div>
          </Reveal>
          <SplitText
            as="h2"
            text="Our First Golden Promise"
            className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
            wordClassName="text-gradient-gold"
            stagger={0.06}
          />
          <Reveal delay={0.15}>
            <p className="mx-auto mt-5 max-w-md font-serif text-2xl italic text-gold-100/70">
              The first gift of forever.
            </p>
          </Reveal>
        </div>

        {/* The centerpiece — displayed like a treasure under light */}
        <div ref={stageRef} className="relative mx-auto mt-20 max-w-md">
          {/* radiant spotlight */}
          <motion.div
            aria-hidden
            style={reduced ? undefined : { opacity: glow }}
            className="absolute -inset-16 -z-[1] rounded-full bg-[radial-gradient(circle,rgba(207,162,78,0.55),transparent_65%)] blur-2xl"
          />

          <div className="relative overflow-hidden rounded-[2rem] border border-gold-300/40 shadow-gold">
            <motion.div
              style={reduced ? undefined : { scale }}
              className="relative aspect-[4/5] w-full"
            >
              <Image
                src={PHOTO}
                alt="The first gold gift — an emerald-green pendant framed by a halo of diamonds on a gold chain, resting in cream suede."
                fill
                priority
                sizes="(max-width: 640px) 92vw, 28rem"
                style={{ objectPosition: "50% 46%" }}
                className="object-cover"
              />
            </motion.div>

            {/* moving light sheen across the glass */}
            {!reduced && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(255,246,214,0.35)_50%,transparent_65%)] bg-[length:220%_100%] animate-shimmer"
              />
            )}
            {/* gold rim highlight */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-gold-200/20"
            />
          </div>

          {/* glass reflection beneath */}
          <div
            aria-hidden
            className="relative mx-auto mt-0.5 h-28 w-[94%] overflow-hidden opacity-25 blur-[2px] [mask-image:linear-gradient(to_bottom,black,transparent)] [transform:scaleY(-1)]"
          >
            <Image
              src={PHOTO}
              alt=""
              fill
              sizes="28rem"
              style={{ objectPosition: "50% 92%" }}
              className="object-cover"
            />
          </div>

          <Reveal delay={0.1}>
            <p className="mt-6 flex items-center justify-center gap-2 text-center font-sans text-[0.65rem] uppercase tracking-luxe text-gold-200/50">
              <Sparkles className="h-3.5 w-3.5" /> Held to the light · kept forever
            </p>
          </Reveal>
        </div>

        {/* First quote */}
        <Reveal>
          <blockquote className="mx-auto mt-24 max-w-2xl text-center">
            <p className="font-serif text-2xl italic leading-relaxed text-gold-100/90 sm:text-3xl">
              “Gold has value because it lasts.
              <br />
              But this gift became priceless because of the love behind it.”
            </p>
          </blockquote>
        </Reveal>

        {/* Cinematic close-up of the green stone + a personal note */}
        <div className="mx-auto mt-24 grid max-w-3xl items-center gap-10 sm:grid-cols-[auto_1fr]">
          <Reveal direction="right">
            <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-full border border-gold-300/40 shadow-gold sm:h-52 sm:w-52">
              <Image
                src={PHOTO}
                alt="Close-up of the emerald-green centre stone, wrapped in a halo of tiny diamonds."
                fill
                sizes="13rem"
                style={{ objectPosition: "50% 88%", transform: "scale(2.4)" }}
                className="object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-gold-100/30"
              />
            </div>
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <div className="text-center sm:text-left">
              <p className="flex items-center justify-center gap-2 font-sans text-xs uppercase tracking-luxe text-gold-300/70 sm:justify-start">
                <Gem className="h-4 w-4" /> A closer look
              </p>
              <p className="mt-4 font-serif text-xl leading-relaxed text-gold-100/85 sm:text-2xl">
                A deep green stone, wrapped in a halo of light — and green, of all
                the colours in the world. The one woven through so much of us,
                now set in gold that will outlast everything.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Ending quote */}
        <Reveal>
          <blockquote className="mx-auto mt-24 max-w-2xl text-center">
            <p className="font-display text-3xl font-light leading-snug text-warm-50 sm:text-4xl">
              “It wasn't just the first piece of gold.
            </p>
            <p className="text-gradient-gold mt-3 font-display text-3xl font-semibold leading-snug sm:text-5xl">
              It was the first promise I could hold in my hands.”
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
