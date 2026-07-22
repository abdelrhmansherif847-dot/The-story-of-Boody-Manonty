"use client";

import { useState } from "react";
import type { MediaItem } from "@/content/types";
import { cn } from "@/lib/utils";
import { MediaTile } from "./media-tile";
import { Lightbox } from "./lightbox";
import { RevealGroup, RevealItem } from "@/components/effects/reveal";

/**
 * Editorial masonry gallery. Uses CSS multi-column flow for a natural,
 * magazine-like rhythm, and opens a shared lightbox on selection.
 */
export function GalleryGrid({
  items,
  accent,
  columns = "sm:columns-2 lg:columns-3",
  className,
}: {
  items: MediaItem[];
  accent?: string;
  columns?: string;
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  if (!items.length) return null;

  return (
    <>
      <RevealGroup
        stagger={0.08}
        className={cn("columns-1 gap-4 [column-fill:_balance] sm:gap-5", columns, className)}
      >
        {items.map((item, i) => (
          <RevealItem key={item.id} className="mb-4 break-inside-avoid sm:mb-5">
            <MediaTile
              item={item}
              accent={accent}
              index={i}
              priority={i < 2}
              onOpen={() => setOpenIndex(i)}
            />
          </RevealItem>
        ))}
      </RevealGroup>

      <Lightbox
        items={items}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </>
  );
}
