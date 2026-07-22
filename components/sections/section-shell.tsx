"use client";

import { useEffect, useRef } from "react";
import type { Mood } from "@/content/types";
import { cn } from "@/lib/utils";
import { useExperience } from "@/components/providers/experience-provider";

/**
 * The consistent frame around every chapter: an ambient, mood-tinted
 * background, a fine grain layer, a scroll anchor, and scroll-spy that reports
 * the section to the global nav when it reaches the centre of the viewport.
 */
export function SectionShell({
  id,
  mood,
  children,
  className,
  fullHeight = false,
  register = true,
}: {
  id: string;
  mood?: Mood;
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
  register?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const { setActiveChapter } = useExperience();

  useEffect(() => {
    if (!register) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActiveChapter(id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [id, register, setActiveChapter]);

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "relative w-full overflow-hidden",
        mood?.scheme === "dark" ? "text-warm-50" : "text-foreground",
        fullHeight ? "min-h-[100svh]" : "py-24 md:py-36",
        className,
      )}
    >
      {mood && (
        <>
          <div
            aria-hidden
            className={cn("absolute inset-0 -z-10 bg-gradient-to-br", mood.gradient)}
          />
          <div aria-hidden className="absolute inset-0 -z-10 grain-overlay opacity-40" />
        </>
      )}
      {children}
    </section>
  );
}
