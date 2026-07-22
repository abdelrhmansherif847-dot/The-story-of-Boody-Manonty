"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, CornerDownLeft } from "lucide-react";
import { chapters } from "@/content/chapters";
import { dictionary } from "@/content/dictionary";
import { quotes } from "@/content/quotes";
import { allMedia } from "@/content/media";
import { useExperience } from "@/components/providers/experience-provider";
import { cn } from "@/lib/utils";

type Result = {
  id: string;
  chapter: string;
  title: string;
  detail: string;
  kind: "Chapter" | "Word" | "Quote" | "Memory";
  emoji?: string;
};

/** A flat, searchable index of everything in the book. */
function buildIndex(): Result[] {
  const idx: Result[] = [];

  for (const c of chapters) {
    idx.push({
      id: `c-${c.id}`,
      chapter: c.id,
      title: c.title,
      detail: [c.subtitle, ...c.narrative].filter(Boolean).join(" "),
      kind: "Chapter",
      emoji: c.emoji,
    });
  }
  for (const d of dictionary) {
    idx.push({
      id: `d-${d.number}`,
      chapter: "dictionary",
      title: `${d.word} · ${d.transliteration}`,
      detail: `${d.meaning} ${d.note}`,
      kind: "Word",
      emoji: "📖",
    });
  }
  quotes.forEach((q, i) =>
    idx.push({
      id: `q-${i}`,
      chapter: "quotes",
      title: q.text,
      detail: q.attribution ?? "A favourite line",
      kind: "Quote",
      emoji: "❝",
    }),
  );
  for (const m of allMedia()) {
    if (!m.caption) continue;
    idx.push({
      id: `m-${m.id}`,
      chapter: m.chapter,
      title: m.caption,
      detail: `A memory from ${m.chapter.replace("-", " ")}`,
      kind: "Memory",
      emoji: "📸",
    });
  }
  return idx;
}

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useExperience();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(buildIndex, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index.filter((r) => r.kind === "Chapter");
    return index
      .map((r) => {
        const hay = `${r.title} ${r.detail}`.toLowerCase();
        const score = hay.includes(q) ? (r.title.toLowerCase().includes(q) ? 2 : 1) : 0;
        return { r, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((x) => x.r);
  }, [query, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
      // Global "/" to open search
      if (e.key === "/" && !searchOpen) {
        const el = document.activeElement;
        const typing = el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
        if (!typing) {
          e.preventDefault();
          setSearchOpen(true);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, setSearchOpen]);

  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  const go = (chapter: string) => {
    setSearchOpen(false);
    const el = document.getElementById(chapter);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="fixed inset-0 z-[75] flex items-start justify-center bg-navy-950/80 px-4 pt-[12vh] backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSearchOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Search memories"
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-4xl border border-white/10 bg-card shadow-luxe"
          >
            <div className="flex items-center gap-3 border-b border-border px-5 py-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search memories, words, chapters…"
                aria-label="Search"
                className="w-full bg-transparent font-sans text-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="rounded-full p-1.5 text-muted-foreground transition hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ul className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <li className="px-4 py-10 text-center font-serif text-lg italic text-muted-foreground">
                  Nothing found — but every memory is still here somewhere.
                </li>
              ) : (
                results.map((r) => (
                  <li key={r.id}>
                    <button
                      onClick={() => go(r.chapter)}
                      className="group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition hover:bg-muted"
                    >
                      <span className="text-xl" aria-hidden>
                        {r.emoji}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-display text-lg text-foreground">
                          {r.title}
                        </span>
                        <span className="block truncate font-sans text-xs text-muted-foreground">
                          {r.detail}
                        </span>
                      </span>
                      <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 font-sans text-[0.6rem] uppercase tracking-wide2 text-muted-foreground">
                        {r.kind}
                      </span>
                      <CornerDownLeft className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
                    </button>
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
