"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { chapterById } from "@/content/chapters";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { Particles } from "@/components/effects/particles";
import { Reveal } from "@/components/effects/reveal";
import { SplitText } from "@/components/effects/split-text";
import { SectionShell } from "./section-shell";

const chapter = chapterById["journey-together"];
const DIR = "/media/journey-together";

type Photo = { src: string; w: number; h: number; alt: string };

/** A featured photo with a slow, continuous ken-burns "camera move". */
function PhotoFrame({ src, alt, ratio, pan = 1, className }: { src: string; alt: string; ratio: string; pan?: number; className?: string }) {
  const reduced = usePrefersReducedMotion();
  return (
    <div className={cn("relative overflow-hidden rounded-[1.75rem] shadow-luxe", className)} style={{ aspectRatio: ratio }}>
      <motion.div
        className="absolute inset-0"
        animate={reduced ? {} : { scale: [1.06, 1.13], x: ["0%", `${pan * -3}%`], y: ["0%", "-2%"] }}
        transition={{ duration: 17, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <Image src={src} alt={alt} fill sizes="(max-width: 640px) 92vw, 30rem" className="object-cover" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-warm-50/25" />
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-gradient-to-t from-chocolate-900/10 to-transparent" />
    </div>
  );
}

function Caption({ index, title, line, className }: { index: string; title: string; line: string; className?: string }) {
  return (
    <div className={cn("glass rounded-3xl p-8 shadow-luxe sm:p-10", className)}>
      <span className="font-script text-2xl text-gold-500">{index}</span>
      <h3 className="mt-2 font-display text-3xl font-medium text-chocolate-900 sm:text-4xl">{title}</h3>
      <p className="mt-4 font-serif text-xl italic leading-relaxed text-chocolate-700">{line}</p>
    </div>
  );
}

/** A featured "memory page": photo one side, caption the other. */
function MemoryPage({ index, src, alt, ratio, title, line, reverse, pan }: { index: string; src: string; alt: string; ratio: string; title: string; line: string; reverse?: boolean; pan?: number }) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
      <Reveal direction={reverse ? "left" : "right"} className={reverse ? "lg:order-2" : ""}>
        <PhotoFrame src={src} alt={alt} ratio={ratio} pan={pan} className="mx-auto w-full max-w-md" />
      </Reveal>
      <Reveal direction={reverse ? "right" : "left"} className={reverse ? "lg:order-1" : ""}>
        <Caption index={index} title={title} line={line} />
      </Reveal>
    </div>
  );
}

/** A gallery tile — a clean framed photo with a gentle hover zoom. */
function Tile({ photo }: { photo: Photo }) {
  return (
    <Reveal className="mb-4 break-inside-avoid sm:mb-5">
      <figure className="group relative overflow-hidden rounded-2xl shadow-luxe ring-1 ring-warm-50/40">
        <Image
          src={`${DIR}/${photo.src}`}
          alt={photo.alt}
          width={photo.w}
          height={photo.h}
          sizes="(max-width: 640px) 46vw, 30vw"
          className="block h-auto w-full transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.05]"
        />
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-chocolate-900/15 to-transparent" />
      </figure>
    </Reveal>
  );
}

/** A themed group of memories, with a small header and a masonry. */
function Group({ index, title, line, photos }: { index: string; title: string; line: string; photos: Photo[] }) {
  const few = photos.length <= 2;
  return (
    <div>
      <Reveal>
        <div className="mb-8 text-center">
          <span className="font-script text-2xl text-gold-500">{index}</span>
          <h3 className="mt-1 font-display text-3xl font-medium text-chocolate-900 sm:text-4xl">{title}</h3>
          <p className="mx-auto mt-3 max-w-lg font-serif text-xl italic text-chocolate-700">{line}</p>
        </div>
      </Reveal>
      <div
        className={cn(
          "mx-auto",
          few ? "grid max-w-2xl gap-4 sm:grid-cols-2 sm:gap-5" : "max-w-4xl columns-2 gap-4 sm:columns-3 sm:gap-5",
        )}
      >
        {photos.map((p) => (few ? (
          <Reveal key={p.src}>
            <figure className="group relative overflow-hidden rounded-2xl shadow-luxe ring-1 ring-warm-50/40">
              <Image src={`${DIR}/${p.src}`} alt={p.alt} width={p.w} height={p.h} sizes="(max-width:640px) 46vw, 22rem" className="block h-auto w-full transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.05]" />
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-chocolate-900/15 to-transparent" />
            </figure>
          </Reveal>
        ) : (
          <Tile key={p.src} photo={p} />
        )))}
      </div>
    </div>
  );
}

const GROUPS: { index: string; title: string; line: string; photos: Photo[] }[] = [
  {
    index: "٠١",
    title: "By the sea",
    line: "New horizons, new streets — and always the same hand to hold.",
    photos: [
      { src: "boat.jpg", w: 960, h: 1280, alt: "Boody and Manonty on a boat by the sea." },
      { src: "bosphorus-a.jpg", w: 1600, h: 900, alt: "Boody and Manonty by the water." },
      { src: "bosphorus-b.jpg", w: 1600, h: 900, alt: "Boody and Manonty smiling by the water." },
    ],
  },
  {
    index: "٠٢",
    title: "City lights",
    line: "The world lit up after dark — and so did we.",
    photos: [
      { src: "kuwait-night.jpg", w: 1600, h: 900, alt: "Boody and Manonty out at night, city lights behind." },
      { src: "night-mall.jpg", w: 960, h: 1280, alt: "Boody and Manonty on an evening out." },
    ],
  },
  {
    index: "٠٣",
    title: "Everyday, together",
    line: "No occasion. No pose. Just the ordinary days we'd never trade.",
    photos: [
      { src: "car-selfie.jpg", w: 1600, h: 900, alt: "A car selfie of Boody and Manonty." },
      { src: "candid.jpg", w: 521, h: 802, alt: "A candid selfie of Boody and Manonty." },
      { src: "mirror-navy.jpg", w: 900, h: 1600, alt: "A mirror selfie of Boody and Manonty." },
      { src: "mirror-ocam.jpg", w: 900, h: 1600, alt: "A full-length mirror selfie of Boody and Manonty." },
      { src: "mirror-olive.jpg", w: 900, h: 1600, alt: "A mirror selfie of Boody and Manonty out shopping." },
    ],
  },
  {
    index: "٠٤",
    title: "Under the crescent",
    line: "Lanterns, lilies, and a quiet kind of joy — our warmest nights.",
    photos: [
      { src: "ramadan-1.jpg", w: 960, h: 1280, alt: "Boody and Manonty at a Ramadan gathering, she holds lilies." },
      { src: "ramadan-2.jpg", w: 960, h: 1280, alt: "Boody and Manonty under Ramadan decorations." },
      { src: "ramadan-3.jpg", w: 960, h: 1280, alt: "Boody laughing beside Manonty at Ramadan." },
      { src: "ramadan-4.jpg", w: 960, h: 1280, alt: "Manonty with her lilies, Boody smiling beside her." },
    ],
  },
];

/** Our Journey Together — the emotional centrepiece, a cinematic memory book. */
export function OurJourneyTogether() {
  return (
    <SectionShell id={chapter.id} mood={chapter.mood}>
      <Particles quantity={30} color="200, 165, 90" maxRadius={2.2} className="opacity-70" />

      <div className="container relative">
        {/* Title */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="text-2xl" aria-hidden>
                {chapter.emoji}
              </span>
              <span className="eyebrow text-gold-600">
                Chapter {chapter.index.toString().padStart(2, "0")} · {chapter.eyebrow}
              </span>
            </div>
          </Reveal>
          <SplitText
            as="h2"
            text="Our Journey Together"
            className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-chocolate-900 sm:text-6xl md:text-7xl"
          />
          <Reveal delay={0.15}>
            <p className="mx-auto mt-8 max-w-xl font-serif text-2xl italic leading-relaxed text-chocolate-700">
              “Some people measure time in years. We measure it in moments.”
            </p>
          </Reveal>
        </div>

        {/* Featured opener */}
        <div className="mt-20 md:mt-24">
          <MemoryPage
            index="✦"
            src={`${DIR}/boat-marina.jpg`}
            alt="Boody and Manonty on the deck of a boat, the marina behind them."
            ratio="960 / 1280"
            title="Out on the water"
            line="Sunshine, salt air, and a smile I would cross any sea for."
            pan={1}
          />
        </div>

        {/* Grouped memories */}
        <div className="mt-20 space-y-20 md:mt-24 md:space-y-28">
          {GROUPS.map((g) => (
            <Group key={g.index} {...g} />
          ))}

          {/* Featured closer — the playful one */}
          <MemoryPage
            index="٠٥"
            src={`${DIR}/pharaoh.jpg`}
            alt="A playful artwork of Boody and Manonty as an ancient Egyptian king and queen."
            ratio="768 / 1344"
            title="In another life"
            line="A king and his queen. Some things, destiny simply decides twice."
            reverse
            pan={-1}
          />
        </div>

        {/* Ending quote */}
        <Reveal>
          <blockquote className="mx-auto mt-24 max-w-2xl text-center">
            <p className="font-serif text-2xl italic text-chocolate-700 sm:text-3xl">
              Every picture tells a story.
            </p>
            <p className="text-gradient-gold mt-2 font-display text-3xl font-semibold sm:text-5xl">
              Together, they became our forever.
            </p>
          </blockquote>
        </Reveal>
      </div>
    </SectionShell>
  );
}
