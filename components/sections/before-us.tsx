"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { chapterById } from "@/content/chapters";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { Particles } from "@/components/effects/particles";
import { Reveal } from "@/components/effects/reveal";
import { SplitText } from "@/components/effects/split-text";

const chapter = chapterById["before-us"];
const DIR = "/media/before-us";

/** A hero portrait with a slow, continuous ken-burns move, in a gold frame. */
function Portrait({ src, alt, ratio, focus = "50% 40%", pan = 1, className }: { src: string; alt: string; ratio: string; focus?: string; pan?: number; className?: string }) {
  const reduced = usePrefersReducedMotion();
  return (
    <div className={cn("relative overflow-hidden rounded-[1.5rem] shadow-luxe ring-1 ring-gold-300/30", className)} style={{ aspectRatio: ratio }}>
      <motion.div
        className="absolute inset-0"
        animate={reduced ? {} : { scale: [1.05, 1.12], x: ["0%", `${pan * -3}%`], y: ["0%", "-2%"] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <Image src={src} alt={alt} fill sizes="(max-width: 640px) 92vw, 40rem" style={{ objectPosition: focus }} className="object-cover" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-gold-100/15" />
      <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-gradient-to-t from-black/45 via-transparent to-transparent" />
    </div>
  );
}

/** A gallery portrait tile — gold-lined, gentle hover zoom. */
function Tile({ src, w, h, alt, className }: { src: string; w: number; h: number; alt: string; className?: string }) {
  return (
    <figure className={cn("group relative overflow-hidden rounded-2xl shadow-luxe ring-1 ring-gold-300/25", className)}>
      <Image src={`${DIR}/${src}`} alt={alt} width={w} height={h} sizes="(max-width: 640px) 46vw, 22rem" className="block h-auto w-full transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.05]" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold-100/10" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 to-transparent" />
    </figure>
  );
}

function NameCard({ name, role, line }: { name: string; role: string; line: string }) {
  return (
    <div className="glass-dark rounded-3xl p-8 shadow-luxe sm:p-10">
      <p className="font-sans text-[0.65rem] uppercase tracking-luxe text-gold-300/80">{role}</p>
      <h3 className="text-gradient-gold mt-2 font-display text-4xl font-semibold sm:text-5xl">{name}</h3>
      <div className="my-5 h-px w-14 bg-gold-300/40" />
      <p className="font-serif text-xl italic leading-relaxed text-warm-100/80">{line}</p>
    </div>
  );
}

/** Before We Became Us — a premium, editorial introduction to the two of them. */
export function BeforeUsChapter() {
  return (
    <section id={chapter.id} className="relative overflow-hidden bg-black text-warm-50">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(80,58,20,0.35),#000_70%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 grain-overlay opacity-25" />
      <Particles quantity={30} color="207, 162, 78" maxRadius={2.2} />

      <div className="container relative py-24 md:py-32">
        {/* Title */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="text-xl" aria-hidden>
                {chapter.emoji}
              </span>
              <span className="eyebrow text-gold-300/70">{chapter.eyebrow}</span>
            </div>
          </Reveal>
          <SplitText
            as="h2"
            text="Before We Became Us"
            className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-warm-50 sm:text-6xl md:text-7xl"
          />
          <Reveal delay={0.15}>
            <p className="mx-auto mt-8 max-w-md font-serif text-2xl italic leading-relaxed text-warm-100/70">
              “Two different stories. Two different dreams. One beautiful destiny.”
            </p>
          </Reveal>
        </div>

        {/* Him */}
        <div className="mt-20 md:mt-28">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <Reveal direction="right">
              <Portrait src={`${DIR}/boody-1.jpg`} alt="A portrait of Boody." ratio="960 / 1280" focus="50% 38%" className="mx-auto w-full max-w-sm" />
            </Reveal>
            <Reveal direction="left" delay={0.1}>
              <NameCard
                name="Boody"
                role="The Engineer"
                line="A builder of bridges and dreams — quietly certain the most beautiful thing was still ahead."
              />
            </Reveal>
          </div>

          {/* his gallery */}
          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-4 sm:gap-6">
            {[
              { src: "boody-2.jpg", w: 960, h: 1280 },
              { src: "boody-3.jpg", w: 1125, h: 1500 },
              { src: "boody-4.jpg", w: 960, h: 1280 },
            ].map((p, i) => (
              <Reveal key={p.src} delay={i * 0.08}>
                <Tile {...p} alt="A portrait of Boody." />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Transition — two lives, one direction */}
        <div className="my-16 flex flex-col items-center gap-4 md:my-24">
          <motion.div
            aria-hidden
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="h-px w-48 origin-center bg-gradient-to-r from-transparent via-gold-300 to-transparent"
          />
          <Reveal>
            <p className="text-center font-serif text-lg italic text-warm-100/55">
              Two separate lives — quietly moving toward the same destination.
            </p>
          </Reveal>
        </div>

        {/* Her */}
        <div>
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <Reveal direction="left" className="lg:order-2">
              <Portrait src={`${DIR}/manonty-3.jpg`} alt="A portrait of Manonty." ratio="1500 / 876" focus="60% 42%" pan={-1} className="mx-auto w-full max-w-lg" />
            </Reveal>
            <Reveal direction="right" delay={0.1} className="lg:order-1">
              <NameCard
                name="Manonty"
                role="The Doctor"
                line="A healer with the gentlest heart — becoming, day by day, exactly who she was always meant to be."
              />
            </Reveal>
          </div>

          {/* her gallery */}
          <div className="mx-auto mt-8 max-w-4xl columns-2 gap-4 sm:columns-2 sm:gap-6 lg:columns-3">
            {[
              { src: "manonty-1.jpg", w: 1600, h: 900 },
              { src: "manonty-5.jpg", w: 844, h: 1500 },
              { src: "manonty-2.jpg", w: 1600, h: 1188 },
              { src: "manonty-4.jpg", w: 1600, h: 1083 },
            ].map((p, i) => (
              <Reveal key={p.src} delay={i * 0.06} className="mb-4 block break-inside-avoid sm:mb-6">
                <Tile {...p} alt="A portrait of Manonty." />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Ending quote */}
        <Reveal>
          <blockquote className="mx-auto mt-24 max-w-2xl text-center">
            <p className="font-serif text-2xl italic text-warm-100/70 sm:text-3xl">
              We were complete on our own…
            </p>
            <p className="text-gradient-gold mt-2 font-display text-3xl font-semibold sm:text-5xl">
              but together, we became something even more beautiful.
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
