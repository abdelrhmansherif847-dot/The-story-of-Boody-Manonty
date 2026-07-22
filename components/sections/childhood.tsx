"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { chapterById } from "@/content/chapters";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { Particles } from "@/components/effects/particles";
import { Reveal } from "@/components/effects/reveal";

const chapter = chapterById.childhood;
const DIR = "/media/childhood";

type FrameProps = {
  src: string;
  alt: string;
  ratio: string; // "width / height"
  caption?: string;
  tilt?: number;
  kenBurns?: boolean;
  circle?: boolean;
  className?: string;
};

/**
 * A vintage photograph: a warm print with a soft cream mat, gently graded to
 * sepia, finished with grain and a vignette, and (optionally) drifting with a
 * slow ken-burns "camera move". Aspect matches the photo so nothing is cropped.
 */
function VintageFrame({
  src,
  alt,
  ratio,
  caption,
  tilt = 0,
  kenBurns = false,
  circle = false,
  className,
}: FrameProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.figure
      initial={{ opacity: 0, y: 30, rotate: tilt * 0.4 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative bg-warm-50 shadow-[0_26px_60px_-28px_rgba(60,40,20,0.6)]",
        circle ? "rounded-full p-2" : "rounded-[3px] p-2.5",
        caption && !circle ? "pb-9" : "",
        className,
      )}
    >
      <div
        className={cn("relative overflow-hidden", circle ? "rounded-full" : "rounded-[1px]")}
        style={{ aspectRatio: ratio }}
      >
        <motion.div
          className="absolute inset-0"
          animate={kenBurns && !reduced ? { scale: [1.04, 1.12] } : {}}
          transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 80vw, 30rem"
            className="object-cover"
            style={{ filter: "sepia(0.36) saturate(0.86) contrast(1.04) brightness(1.03)" }}
          />
        </motion.div>
        {/* warm wash, vignette, grain */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-amber-100/10 mix-blend-multiply" />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_46px_rgba(70,45,18,0.5)]" />
        <div className="pointer-events-none absolute inset-0 grain-overlay opacity-40" />
      </div>
      {caption && !circle && (
        <figcaption className="absolute inset-x-0 bottom-2 text-center font-script text-xl text-chocolate-700">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

/** A small handwritten label. */
function Hand({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("font-script text-chocolate-500", className)}>{children}</span>
  );
}

/** Before We Knew Each Other — the nostalgic opening scene of the story. */
export function ChildhoodChapter() {
  return (
    <section
      id={chapter.id}
      className="relative overflow-hidden bg-gradient-to-b from-warm-100 via-[#f4e7d0] to-warm-100 py-24 text-chocolate-900 md:py-36"
    >
      {/* golden light blooms + dust + grain */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(214,170,90,0.35),transparent),radial-gradient(50%_40%_at_80%_80%,rgba(214,170,90,0.22),transparent)]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 grain-overlay opacity-30" />
      <Particles quantity={34} color="170, 128, 66" maxRadius={2.2} />

      <div className="container relative">
        {/* ── Title ── */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Hand className="text-2xl sm:text-3xl">{chapter.eyebrow}…</Hand>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-chocolate-900 sm:text-6xl md:text-7xl">
              Before We Knew Each Other
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-2xl font-serif text-xl italic leading-relaxed text-chocolate-700 sm:text-2xl">
              “Once upon a time, two children were growing up under the same sky,
              completely unaware that one day, their paths would become one.”
            </p>
          </Reveal>
        </div>

        {/* ── Boody's childhood ── */}
        <div className="mx-auto mt-24 max-w-4xl">
          <Reveal>
            <div className="mb-10 text-center sm:text-left">
              <Hand className="text-3xl sm:text-4xl">Boody</Hand>
              <p className="eyebrow mt-2 text-chocolate-500">His beginning</p>
            </div>
          </Reveal>

          <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:items-end sm:gap-10">
            <VintageFrame
              src={`${DIR}/boody-young.jpg`}
              alt="Boody as a small boy beside an ornate marble fountain."
              ratio="512 / 720"
              caption="a boy full of questions"
              tilt={-3}
              kenBurns
              className="w-56 sm:w-64"
            />
            <VintageFrame
              src={`${DIR}/boody-sea.jpg`}
              alt="Boody as a boy by the Bosphorus, the bridge behind him."
              ratio="376 / 1230"
              tilt={2.5}
              className="w-40 sm:w-44"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-10 max-w-xl text-center font-serif text-xl italic text-chocolate-700">
              A curly-haired boy by the Bosphorus — chasing the sea breeze,
              already dreaming of building things that last.
            </p>
          </Reveal>
        </div>

        {/* ── Manonty's childhood ── */}
        <div className="mx-auto mt-28 max-w-4xl">
          <Reveal>
            <div className="mb-10 text-center sm:text-right">
              <Hand className="text-3xl sm:text-4xl">Manonty</Hand>
              <p className="eyebrow mt-2 text-chocolate-500">Her beginning</p>
            </div>
          </Reveal>

          <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:items-start sm:gap-10">
            <VintageFrame
              src={`${DIR}/manonty-child.jpg`}
              alt="Manonty as a little girl, a treasured old portrait."
              ratio="468 / 559"
              caption="bright eyes, big heart"
              tilt={3}
              kenBurns
              className="w-56 sm:w-64"
            />
            <div className="flex gap-6">
              <VintageFrame
                src={`${DIR}/manonty-1.jpg`}
                alt="Manonty, a little older."
                ratio="919 / 1158"
                tilt={-2}
                className="w-36 sm:w-40"
              />
              <VintageFrame
                src={`${DIR}/manonty-2.jpg`}
                alt="Manonty, growing up."
                ratio="792 / 1125"
                tilt={2}
                className="mt-8 w-36 sm:w-40"
              />
            </div>
          </div>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-10 max-w-xl text-center font-serif text-xl italic text-chocolate-700">
              A little girl with bright eyes and a gentle heart — who would grow
              up to heal people, and one heart in particular.
            </p>
          </Reveal>
        </div>

        {/* ── The convergence ── */}
        <div className="mx-auto mt-28 max-w-3xl text-center">
          <Reveal>
            <Hand className="text-2xl sm:text-3xl">Two children. The same sky.</Hand>
          </Reveal>

          <div className="relative mt-10 flex items-center justify-center gap-6 sm:gap-16">
            <motion.div
              initial={{ x: -40, opacity: 0, rotate: -6 }}
              whileInView={{ x: 0, opacity: 1, rotate: -4 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <VintageFrame
                src={`${DIR}/boody-young.jpg`}
                alt="Young Boody."
                ratio="1 / 1"
                circle
                className="w-24 sm:w-32"
              />
            </motion.div>

            {/* connecting light */}
            <div className="relative flex flex-1 items-center justify-center">
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="h-px w-full origin-center bg-gradient-to-r from-transparent via-gold-400 to-transparent"
              />
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute text-gold-500"
              >
                <Sparkles className="h-6 w-6" />
              </motion.span>
            </div>

            <motion.div
              initial={{ x: 40, opacity: 0, rotate: 6 }}
              whileInView={{ x: 0, opacity: 1, rotate: 4 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <VintageFrame
                src={`${DIR}/manonty-child.jpg`}
                alt="Young Manonty."
                ratio="1 / 1"
                circle
                className="w-24 sm:w-32"
              />
            </motion.div>
          </div>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-10 max-w-lg font-serif text-lg italic text-chocolate-600">
              …unaware that destiny was already, quietly, writing their story.
            </p>
          </Reveal>

          {/* Ending quote */}
          <Reveal delay={0.1}>
            <blockquote className="mt-16">
              <p className="font-script text-3xl text-chocolate-500 sm:text-4xl">
                Every memory before us…
              </p>
              <p className="mt-2 font-display text-3xl font-semibold text-chocolate-900 sm:text-5xl">
                was quietly leading us to each other.
              </p>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
