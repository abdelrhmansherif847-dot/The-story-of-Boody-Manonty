"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Lock } from "lucide-react";
import { menuChapters } from "@/content/chapters";
import { site } from "@/content/site";
import { useExperience } from "@/components/providers/experience-provider";
import { cn } from "@/lib/utils";

/** A full-screen index of the story — jump to any chapter. */
export function ChapterMenu() {
  const { menuOpen, setMenuOpen, activeChapter, lock } = useExperience();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    if (menuOpen) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen, setMenuOpen]);

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className="fixed inset-0 z-[70] overflow-y-auto bg-navy-950/95 text-warm-50 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Chapters"
        >
          <div aria-hidden className="absolute inset-0 grain-overlay opacity-20" />
          <div className="container relative flex min-h-full flex-col py-8">
            <div className="flex items-center justify-between">
              <span className="font-display text-lg tracking-[0.2em]">{site.monogram}</span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-warm-100/80 transition hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-10 font-sans text-xs uppercase tracking-luxe text-warm-100/40">
              The chapters
            </p>

            <nav className="mt-4 flex-1">
              <ul className="divide-y divide-white/5">
                {menuChapters.map((c, i) => (
                  <motion.li
                    key={c.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.03, duration: 0.5 }}
                  >
                    <a
                      href={`#${c.id}`}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "group flex items-baseline gap-4 py-3 transition-colors sm:gap-6 sm:py-4",
                        activeChapter === c.id ? "text-warm-50" : "text-warm-100/60 hover:text-warm-50",
                      )}
                    >
                      <span className="w-8 font-sans text-xs tabular-nums text-warm-100/30">
                        {c.index.toString().padStart(2, "0")}
                      </span>
                      <span className="text-xl" aria-hidden>
                        {c.emoji}
                      </span>
                      <span className="font-display text-2xl font-medium transition-transform duration-300 group-hover:translate-x-1 sm:text-4xl">
                        {c.title}
                      </span>
                      {activeChapter === c.id && (
                        <span className="ml-auto hidden self-center font-sans text-[0.6rem] uppercase tracking-luxe text-royal-300 sm:inline">
                          You're here
                        </span>
                      )}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
              <p className="font-serif text-lg italic text-warm-100/50">{site.tagline}</p>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  lock();
                }}
                className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-sans text-xs uppercase tracking-luxe text-warm-100/70 transition hover:bg-white/10"
              >
                <Lock className="h-3.5 w-3.5" /> Lock
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
