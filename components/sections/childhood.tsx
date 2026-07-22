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

const SEPIA = "sepia(0.34) saturate(0.88) contrast(1.04) brightness(1.03)";

type Frame = {
  src: string;
  alt: string;
  w: number;
  h: number;
  caption?: string;
  tilt?: number;
  kenBurns?: boolean;
};

/**
 * A vintage photograph print: a warm cream mat, sepia grade, vignette + grain,
 * a slow ken-burns "camera move" on hero frames, and a gentle scatter tilt.
 * Uses intrinsic sizing so the frames flow naturally in a masonry.
 */
function VintageFrame({
  src,
  alt,
  w,
  h,
  caption,
  tilt = 0,
  kenBurns = false,
  className,
}: Frame & { className?: string }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.figure
      initial={{ opacity: 0, y: 26, rotate: tilt * 0.4 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      whileHover={{ scale: 1.03, rotate: tilt * 0.5, zIndex: 5 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative bg-warm-50 p-2.5 shadow-[0_24px_54px_-26px_rgba(60,40,20,0.6)]",
        caption ? "pb-9" : "",
        className,
      )}
    >
      <div className="relative overflow-hidden">
        <motion.div
          className="relative"
          animate={kenBurns && !reduced ? { scale: [1.04, 1.12] } : {}}
          transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <Image
            src={src}
            alt={alt}
            width={w}
            height={h}
            sizes="(max-width: 640px) 44vw, 22rem"
            className="block h-auto w-full object-cover"
            style={{ filter: SEPIA }}
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-amber-100/10 mix-blend-multiply" />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_44px_rgba(70,45,18,0.5)]" />
        <div className="pointer-events-none absolute inset-0 grain-overlay opacity-40" />
      </div>
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-2 text-center font-script text-lg text-chocolate-700">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

/** Circular vintage portrait, for the closing convergence. */
function CirclePortrait({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <figure className={cn("relative rounded-full bg-warm-50 p-2 shadow-[0_20px_44px_-22px_rgba(60,40,20,0.7)]", className)}>
      <div className="relative aspect-square w-full overflow-hidden rounded-full">
        <Image src={src} alt={alt} fill sizes="9rem" className="object-cover" style={{ filter: SEPIA }} />
        <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_30px_rgba(70,45,18,0.5)]" />
        <div className="pointer-events-none absolute inset-0 rounded-full grain-overlay opacity-40" />
      </div>
    </figure>
  );
}

function Hand({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("font-script text-chocolate-500", className)}>{children}</span>;
}

// ── The collages ───────────────────────────────────────────────
const BOODY: Frame[] = [
  { src: "boody-toddler.jpg", alt: "Boody as a toddler in a studio portrait.", w: 439, h: 1280, caption: "the very beginning", tilt: -3 },
  { src: "boody-studio.jpg", alt: "Boody as a small boy, a kindergarten portrait.", w: 856, h: 1280, tilt: 2, kenBurns: true },
  { src: "boody-young.jpg", alt: "Boody by an ornate marble fountain.", w: 512, h: 720, caption: "a boy full of questions", tilt: -2 },
  { src: "boody-istanbul.jpg", alt: "Boody smiling in an İstanbul t-shirt.", w: 270, h: 532, tilt: 3 },
  { src: "boody-plaid.jpg", alt: "Boody a little older, in a red plaid shirt.", w: 1089, h: 608, tilt: -2 },
  { src: "boody-sea.jpg", alt: "Boody by the Bosphorus, the bridge behind him.", w: 376, h: 1230, caption: "by the Bosphorus", tilt: 2 },
];

const MANONTY_GROWN: Frame[] = [
  { src: "manonty-1.jpg", alt: "Manonty, a little older.", w: 919, h: 1158, tilt: -2 },
  { src: "manonty-red.jpg", alt: "Manonty growing up.", w: 702, h: 913, tilt: 2 },
  { src: "manonty-green.jpg", alt: "Manonty, a bright smile held back.", w: 678, h: 1358, tilt: -3 },
];

/** Before We Knew Each Other — the nostalgic opening scene of the story. */
export function ChildhoodChapter() {
  return (
    <section
      id={chapter.id}
      className="relative overflow-hidden bg-gradient-to-b from-warm-100 via-[#f4e7d0] to-warm-100 py-24 text-chocolate-900 md:py-36"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(214,170,90,0.35),transparent),radial-gradient(50%_40%_at_80%_80%,rgba(214,170,90,0.22),transparent)]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 grain-overlay opacity-30" />
      <Particles quantity={34} color="170, 128, 66" maxRadius={2.2} />

      <div className="container relative">
        {/* Title */}
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

        {/* Boody */}
        <div className="mx-auto mt-24 max-w-5xl">
          <Reveal>
            <div className="mb-10 text-center sm:text-left">
              <Hand className="text-3xl sm:text-4xl">Boody</Hand>
              <p className="eyebrow mt-2 text-chocolate-500">His beginning · a boy growing up in Istanbul</p>
            </div>
          </Reveal>
          <div className="columns-2 gap-4 sm:columns-3 sm:gap-6">
            {BOODY.map((f) => (
              <VintageFrame key={f.src} {...f} src={`${DIR}/${f.src}`} className="mb-4 break-inside-avoid sm:mb-6" />
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-xl text-center font-serif text-xl italic text-chocolate-700">
              A curly-haired boy by the Bosphorus — chasing the sea breeze,
              already dreaming of building things that last.
            </p>
          </Reveal>
        </div>

        {/* Manonty */}
        <div className="mx-auto mt-28 max-w-5xl">
          <Reveal>
            <div className="mb-10 text-center sm:text-right">
              <Hand className="text-3xl sm:text-4xl">Manonty</Hand>
              <p className="eyebrow mt-2 text-chocolate-500">Her beginning · a little girl with a gentle heart</p>
            </div>
          </Reveal>

          <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center">
            <VintageFrame
              src={`${DIR}/manonty-child.jpg`}
              alt="Manonty as a little girl, a treasured old portrait."
              w={468}
              h={559}
              caption="bright eyes, big heart"
              tilt={3}
              kenBurns
              className="w-64 shrink-0 sm:w-72"
            />
            <div className="columns-2 gap-4 sm:gap-6 lg:max-w-md">
              {MANONTY_GROWN.map((f) => (
                <VintageFrame key={f.src} {...f} src={`${DIR}/${f.src}`} className="mb-4 break-inside-avoid sm:mb-6" />
              ))}
            </div>
          </div>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-10 max-w-xl text-center font-serif text-xl italic text-chocolate-700">
              A little girl with bright eyes and a gentle heart — who would grow
              up to heal people, and one heart in particular.
            </p>
          </Reveal>
        </div>

        {/* The convergence */}
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
              <CirclePortrait src={`${DIR}/boody-young.jpg`} alt="Young Boody." className="w-24 sm:w-32" />
            </motion.div>

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
              <CirclePortrait src={`${DIR}/manonty-child.jpg`} alt="Young Manonty." className="w-24 sm:w-32" />
            </motion.div>
          </div>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-10 max-w-lg font-serif text-lg italic text-chocolate-600">
              …unaware that destiny was already, quietly, writing their story.
            </p>
          </Reveal>

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
