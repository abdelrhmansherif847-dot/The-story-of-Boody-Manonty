"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Camera } from "lucide-react";
import type { MediaItem } from "@/content/types";

/**
 * A cinematic, keyboard-accessible lightbox.
 *  · ← / → to move · Esc to close · click the backdrop to dismiss
 * Works with placeholder slots too (shows the same elegant fallback large).
 */
export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: MediaItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const open = index !== null;
  const current = open ? items[index] : null;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      const next = (index + dir + items.length) % items.length;
      onIndexChange(next);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go, onClose]);

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={current.caption ?? "Memory"}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 z-10 rounded-full border border-white/15 bg-white/5 p-3 text-white/80 transition hover:bg-white/15"
          >
            <X className="h-5 w-5" />
          </button>

          {items.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label="Previous"
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-white/5 p-3 text-white/80 transition hover:bg-white/15 md:left-8"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label="Next"
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-white/5 p-3 text-white/80 transition hover:bg-white/15 md:right-8"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <motion.figure
            key={current.id}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[86vh] w-[92vw] max-w-4xl flex-col items-center"
          >
            <div className="relative flex max-h-[74vh] w-full items-center justify-center overflow-hidden rounded-2xl">
              {current.src ? (
                <Image
                  src={current.src}
                  alt={current.alt}
                  width={1400}
                  height={1800}
                  className="max-h-[74vh] w-auto rounded-2xl object-contain shadow-2xl"
                />
              ) : (
                <div className="flex aspect-[3/4] w-full max-w-sm flex-col items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-navy-800 to-navy-950 text-white/60">
                  <span className="font-display text-4xl tracking-[0.35em] opacity-40">
                    B·M
                  </span>
                  <Camera className="mt-3 h-6 w-6 opacity-40" strokeWidth={1.4} />
                  <span className="mt-4 px-8 text-center font-serif text-sm italic opacity-60">
                    A place kept for a photograph
                  </span>
                </div>
              )}
            </div>
            <figcaption className="mt-5 flex items-center gap-4 text-center text-white/80">
              {current.caption && (
                <span className="font-serif text-xl italic">{current.caption}</span>
              )}
              {index !== null && (
                <span className="font-sans text-xs uppercase tracking-luxe text-white/40">
                  {index + 1} / {items.length}
                </span>
              )}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
