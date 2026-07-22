"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { chapterById } from "@/content/chapters";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { Particles } from "@/components/effects/particles";
import { Reveal } from "@/components/effects/reveal";
import { SplitText } from "@/components/effects/split-text";

const chapter = chapterById.eyes;
const DIR = "/media/eyes";

// The signature treatment: each eye fades into the darkness so it seems to
// float, lit from within.
const EYE_MASK =
  "radial-gradient(ellipse 74% 70% at 50% 46%, #000 38%, rgba(0,0,0,0.35) 62%, transparent 82%)";
const MACRO_MASK =
  "radial-gradient(circle at 50% 50%, #000 46%, rgba(0,0,0,0.4) 66%, transparent 84%)";

/** A single eye, floating in the dark, with a slow cinematic zoom. */
function EyeFrame({
  src,
  alt,
  focus = "50% 46%",
  className,
  zoom = true,
  mask = EYE_MASK,
}: {
  src: string;
  alt: string;
  focus?: string;
  className?: string;
  zoom?: boolean;
  mask?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.3, 1.08, 1.24]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={reduced || !zoom ? undefined : { scale }} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 92vw, 42rem"
          className="object-cover"
          style={{ objectPosition: focus, maskImage: mask, WebkitMaskImage: mask }}
        />
      </motion.div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <Reveal className="flex justify-center">
      <span className="glass-dark rounded-full px-5 py-2 font-sans text-[0.65rem] uppercase tracking-luxe text-warm-100/80">
        {children}
      </span>
    </Reveal>
  );
}

// Every other glimpse of Manonty's eyes.
const HER_EYES = [
  { src: "manonty-eye-1.jpg", focus: "46% 38%" },
  { src: "manonty-eye-2.jpg", focus: "50% 50%" },
  { src: "manonty-eye-3.jpg", focus: "46% 46%" },
  { src: "manonty-eye-5.jpg", focus: "50% 50%" },
  { src: "manonty-eye-6.jpg", focus: "50% 50%" },
  { src: "manonty-eye-7.jpg", focus: "50% 48%" },
  { src: "manonty-eye-8.jpg", focus: "50% 45%" },
];

/** Our Eyes — a hushed, mysterious interlude where the eyes speak first. */
export function EyesChapter() {
  return (
    <section id={chapter.id} className="relative overflow-hidden bg-black text-warm-50">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,theme(colors.navy.950),#000_75%)]"
      />
      <Particles quantity={40} color="188, 201, 255" className="opacity-50" />

      <div className="container relative py-24 md:py-32">
        {/* Title */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="text-2xl" aria-hidden>
              {chapter.emoji}
            </span>
            <p className="eyebrow mt-4 text-warm-100/50">
              Chapter {chapter.index.toString().padStart(2, "0")} · {chapter.eyebrow}
            </p>
          </Reveal>
          <SplitText
            as="h2"
            text="Our Eyes"
            className="mt-4 font-display text-5xl font-semibold tracking-tight text-warm-50 sm:text-7xl"
          />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-xl font-serif text-xl italic leading-relaxed text-warm-100/70 sm:text-2xl">
              “They say the eyes never lie. Maybe that's why our story began
              before we ever spoke.”
            </p>
          </Reveal>
        </div>

        {/* His eyes — two dramatic macros */}
        <div className="mt-24 flex flex-col items-center gap-8">
          <Label>His eyes</Label>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {["eye-macro-1.jpg", "eye-macro-2.jpg"].map((src) => (
              <div key={src} className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-8 -z-[1] rounded-full bg-[radial-gradient(circle,rgba(107,125,251,0.22),transparent_70%)] blur-2xl"
                />
                <EyeFrame
                  src={`${DIR}/${src}`}
                  alt="A macro close-up of Boody's eye."
                  focus="50% 52%"
                  mask={MACRO_MASK}
                  className="aspect-square w-64 sm:w-80"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Her eyes — many glimpses */}
        <div className="mt-28 flex flex-col items-center gap-6">
          <Label>Her eyes</Label>
          <EyeFrame
            src={`${DIR}/manonty-eye-4.jpg`}
            alt="A close-up of Manonty's eye."
            focus="50% 50%"
            className="aspect-[3/2] w-full max-w-2xl"
          />
          <div className="flex w-full max-w-4xl flex-wrap items-center justify-center gap-5">
            {HER_EYES.map((e) => (
              <EyeFrame
                key={e.src}
                src={`${DIR}/${e.src}`}
                alt="A close-up of Manonty's eye."
                focus={e.focus}
                className="aspect-[3/2] w-40 opacity-90 sm:w-44"
              />
            ))}
          </div>
        </div>

        {/* Both together — two worlds meet */}
        <div className="mt-28">
          <Label>The moment two worlds met</Label>
          <div className="relative mx-auto mt-8 flex max-w-3xl items-center justify-center">
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-1/2"
            >
              <EyeFrame
                src={`${DIR}/eye-macro-1.jpg`}
                alt="Boody's eye."
                focus="60% 50%"
                zoom={false}
                mask={MACRO_MASK}
                className="aspect-square w-full"
              />
            </motion.div>
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-1/2"
            >
              <EyeFrame
                src={`${DIR}/manonty-eye-4.jpg`}
                alt="Manonty's eye."
                focus="40% 50%"
                zoom={false}
                className="aspect-square w-full"
              />
            </motion.div>
            <motion.div
              aria-hidden
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-8 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-royal-300/70 to-transparent"
            />
          </div>
        </div>

        {/* Ending quote */}
        <Reveal>
          <blockquote className="mx-auto mt-24 max-w-2xl text-center">
            <p className="font-serif text-2xl italic text-warm-100/70 sm:text-3xl">In your eyes…</p>
            <p className="text-gradient-blue mt-2 font-display text-3xl font-semibold sm:text-5xl">
              I found the place I never knew I was searching for.
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
