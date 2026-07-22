"use client";

import { HardHat, Ruler, Compass } from "lucide-react";
import { chapterById } from "@/content/chapters";
import { characters } from "@/content/characters";
import { getMedia } from "@/content/media";
import { SectionShell } from "./section-shell";
import { Reveal } from "@/components/effects/reveal";
import { SplitText } from "@/components/effects/split-text";
import { BlueprintDraw } from "@/components/effects/blueprint";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

const chapter = chapterById.engineer;
const boody = characters.boody;

/** Boody — a blueprint-and-concrete chapter about building things that last. */
export function EngineerChapter() {
  const items = getMedia("engineer");

  return (
    <SectionShell id={chapter.id} mood={chapter.mood}>
      {/* blueprint grid wash */}
      <div
        aria-hidden
        className="absolute inset-0 -z-[1] bg-blueprint [background-size:28px_28px] opacity-40"
      />

      <div className="container relative">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left — the drawing */}
          <Reveal direction="right">
            <div className="relative rounded-4xl border border-royal-300/20 bg-navy-950/40 p-6 shadow-luxe">
              <div className="mb-4 flex items-center justify-between text-royal-200/60">
                <span className="flex items-center gap-2 font-sans text-[0.65rem] uppercase tracking-luxe">
                  <Compass className="h-4 w-4" /> Drawing № 24·08
                </span>
                <span className="font-sans text-[0.65rem] uppercase tracking-luxe">
                  Scale 1 : ∞
                </span>
              </div>
              <div className="aspect-[3/2] w-full">
                <BlueprintDraw color="#94a6ff" />
              </div>
              <p className="mt-4 text-center font-sans text-[0.65rem] uppercase tracking-luxe text-royal-200/50">
                Project: Our Future
              </p>
            </div>
          </Reveal>

          {/* Right — identity + quote */}
          <div>
            <Reveal>
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-royal-400/10 ring-1 ring-royal-400/20">
                  <HardHat className="h-6 w-6 text-royal-300" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="eyebrow text-royal-300">{boody.role}</p>
                  <p className="font-display text-2xl font-medium text-warm-50">{boody.name}</p>
                </div>
              </div>
            </Reveal>

            <SplitText
              as="h2"
              text="The Engineer"
              className="font-display text-5xl font-semibold tracking-tight text-warm-50 sm:text-7xl"
            />

            <Reveal delay={0.15}>
              <p className="mt-8 font-serif text-2xl leading-relaxed text-warm-100/80 sm:text-3xl">
                Engineering taught me how to build structures.
              </p>
              <p className="mt-4 font-serif text-2xl leading-relaxed text-warm-100/60 sm:text-3xl">
                Life taught me that the most beautiful thing I'll ever build
              </p>
              <p className="mt-2 flex items-center gap-3 font-display text-4xl font-medium text-royal-300 sm:text-5xl">
                <Ruler className="h-8 w-8" strokeWidth={1.4} /> is our future.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 md:mt-20">
          <GalleryGrid items={items} accent={chapter.mood.accent} columns="sm:columns-2 lg:columns-4" />
        </div>
      </div>
    </SectionShell>
  );
}
