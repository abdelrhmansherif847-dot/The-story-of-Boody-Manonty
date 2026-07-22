"use client";

import type { Chapter, MediaItem } from "@/content/types";
import { SectionShell } from "./section-shell";
import { ChapterHeading, ChapterNarrative } from "./chapter-heading";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { Particles } from "@/components/effects/particles";

/**
 * The default chapter template — an editorial opening (kicker, title,
 * subtitle, narration) followed by a masonry gallery of memories.
 * Special chapters (Eyes, Doctor, Engineer, Together, …) have their own files.
 */
export function ChapterSection({
  chapter,
  items,
}: {
  chapter: Chapter;
  items: MediaItem[];
}) {
  const dark = chapter.mood.scheme === "dark";

  return (
    <SectionShell id={chapter.id} mood={chapter.mood}>
      {dark && <Particles quantity={30} color="255,255,255" className="opacity-40" />}
      <div className="container relative">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <ChapterHeading chapter={chapter} />
          <ChapterNarrative lines={chapter.narrative} dark={dark} className="lg:pb-3" />
        </div>

        <div className="mt-16 md:mt-20">
          <GalleryGrid items={items} accent={chapter.mood.accent} />
        </div>
      </div>
    </SectionShell>
  );
}
