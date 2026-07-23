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

/** A photograph with a slow, continuous ken-burns "camera move". */
function PhotoFrame({
  src,
  alt,
  ratio,
  pan = 1,
  className,
}: {
  src: string;
  alt: string;
  ratio: string;
  pan?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <div
      className={cn("relative overflow-hidden rounded-[1.75rem] shadow-luxe", className)}
      style={{ aspectRatio: ratio }}
    >
      <motion.div
        className="absolute inset-0"
        animate={
          reduced
            ? {}
            : { scale: [1.06, 1.13], x: [`${pan * 0}%`, `${pan * -3}%`], y: ["0%", "-2%"] }
        }
        transition={{ duration: 17, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <Image src={src} alt={alt} fill sizes="(max-width: 640px) 92vw, 30rem" className="object-cover" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-warm-50/25" />
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-gradient-to-t from-chocolate-900/10 to-transparent" />
    </div>
  );
}

function Caption({
  index,
  title,
  line,
  className,
}: {
  index: string;
  title: string;
  line: string;
  className?: string;
}) {
  return (
    <div className={cn("glass rounded-3xl p-8 shadow-luxe sm:p-10", className)}>
      <span className="font-script text-2xl text-gold-500">{index}</span>
      <h3 className="mt-2 font-display text-3xl font-medium text-chocolate-900 sm:text-4xl">
        {title}
      </h3>
      <p className="mt-4 font-serif text-xl italic leading-relaxed text-chocolate-700">{line}</p>
    </div>
  );
}

/** An editorial "memory page": photo on one side, caption on the other. */
function MemoryPage({
  index,
  src,
  alt,
  ratio,
  title,
  line,
  reverse,
  pan,
}: {
  index: string;
  src: string;
  alt: string;
  ratio: string;
  title: string;
  line: string;
  reverse?: boolean;
  pan?: number;
}) {
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

        {/* Memory pages */}
        <div className="mt-20 space-y-20 md:mt-24 md:space-y-28">
          <MemoryPage
            index="٠١"
            src={`${DIR}/boat.jpg`}
            alt="Boody and Manonty together on a boat, the sea and sky behind them."
            ratio="960 / 1280"
            title="Out on the water"
            line="Sunshine, salt air, and a smile I would cross any sea for."
            pan={1}
          />
          <MemoryPage
            index="٠٢"
            src={`${DIR}/candid.jpg`}
            alt="A candid, warm selfie of Boody and Manonty."
            ratio="521 / 802"
            title="The in-between"
            line="No occasion. No pose. Just us — being us."
            reverse
            pan={-1}
          />

          {/* Ramadan — a grouped moment */}
          <div>
            <Reveal>
              <div className="mb-8 text-center">
                <span className="font-script text-2xl text-gold-500">٠٣</span>
                <h3 className="mt-1 font-display text-3xl font-medium text-chocolate-900 sm:text-4xl">
                  Under the crescent
                </h3>
                <p className="mx-auto mt-3 max-w-lg font-serif text-xl italic text-chocolate-700">
                  Lanterns, lilies, and a quiet kind of joy — our warmest nights.
                </p>
              </div>
            </Reveal>
            <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2 sm:gap-8">
              <Reveal direction="right">
                <PhotoFrame src={`${DIR}/ramadan-1.jpg`} alt="Boody and Manonty at a Ramadan gathering, she holds lilies." ratio="960 / 1280" pan={1} />
              </Reveal>
              <Reveal direction="left" delay={0.1}>
                <PhotoFrame src={`${DIR}/ramadan-2.jpg`} alt="Boody and Manonty together under Ramadan decorations." ratio="960 / 1280" pan={-1} className="sm:mt-10" />
              </Reveal>
            </div>
          </div>

          <MemoryPage
            index="٠٤"
            src={`${DIR}/pharaoh.jpg`}
            alt="A playful artwork of Boody and Manonty as an ancient Egyptian king and queen."
            ratio="768 / 1344"
            title="In another life"
            line="A king and his queen. Some things, destiny simply decides twice."
            pan={1}
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
