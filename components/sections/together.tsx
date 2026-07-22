"use client";

import { useEffect, useRef } from "react";
import { chapterById } from "@/content/chapters";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { HeartbeatLine } from "@/components/effects/heartbeat";

const chapter = chapterById.together;

/**
 * Together — architecture meets medicine.
 * A sticky stage where, as you scroll, a blueprint dissolves into a heartbeat,
 * and the heartbeat resolves into a heart. GSAP ScrollTrigger scrubs the whole
 * transformation; a sensible static state is shown when motion is reduced.
 */
export function TogetherSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const blueprintRef = useRef<HTMLDivElement>(null);
  const heartbeatRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let ctx: { revert: () => void } | undefined;
    let mounted = true;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (!mounted) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.set(heartbeatRef.current, { opacity: 0 });
        gsap.set(heartRef.current, { opacity: 0, scale: 0.6 });
        gsap.set([textRefs.current[1], textRefs.current[2]], { opacity: 0, y: 20 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        // Blueprint → heartbeat
        tl.to(blueprintRef.current, { opacity: 0, scale: 0.92, duration: 1 }, 0)
          .to(textRefs.current[0], { opacity: 0, y: -20, duration: 1 }, 0)
          .to(heartbeatRef.current, { opacity: 1, duration: 1 }, 0.8)
          .to(textRefs.current[1], { opacity: 1, y: 0, duration: 1 }, 1)
          // Heartbeat → heart
          .to(heartbeatRef.current, { opacity: 0, duration: 1 }, 2)
          .to(textRefs.current[1], { opacity: 0, y: -20, duration: 1 }, 2)
          .to(heartRef.current, { opacity: 1, scale: 1, duration: 1.2 }, 2.2)
          .to(textRefs.current[2], { opacity: 1, y: 0, duration: 1 }, 2.6);
      }, sectionRef);
    })();

    return () => {
      mounted = false;
      ctx?.revert();
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id={chapter.id}
      className="relative bg-gradient-to-b from-navy-950 via-royal-900 to-burgundy-900 text-warm-50"
      style={{ minHeight: reduced ? "100svh" : "320svh" }}
    >
      <div aria-hidden className="absolute inset-0 grain-overlay opacity-20" />
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-6">
        <p className="eyebrow mb-2 text-warm-100/50">{chapter.eyebrow}</p>
        <h2 className="mb-10 text-center font-display text-4xl font-semibold sm:text-6xl">
          Together
        </h2>

        {/* Stage — three layers occupying the same space */}
        <div className="relative flex h-56 w-full max-w-2xl items-center justify-center sm:h-64">
          {/* Blueprint */}
          <div ref={blueprintRef} className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 400 200" className="h-full w-full" aria-hidden>
              <defs>
                <pattern id="tg-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M20 0H0V20" fill="none" stroke="#94a6ff" strokeWidth="0.4" opacity="0.25" />
                </pattern>
              </defs>
              <rect width="400" height="200" fill="url(#tg-grid)" />
              {/* building */}
              <path d="M120 170 V70 h60 V170" fill="none" stroke="#bcc9ff" strokeWidth="1.5" />
              <path d="M120 100 h60 M120 130 h60 M150 70 V170" fill="none" stroke="#bcc9ff" strokeWidth="1" opacity="0.7" />
              {/* bridge */}
              <path d="M40 170 h320 M60 170 Q200 90 340 170" fill="none" stroke="#94a6ff" strokeWidth="1.5" />
              <path d="M100 150 V170 M160 128 V170 M200 122 V170 M240 128 V170 M300 150 V170" stroke="#94a6ff" strokeWidth="0.8" opacity="0.7" />
            </svg>
          </div>

          {/* Heartbeat */}
          <div ref={heartbeatRef} className="absolute inset-0 flex items-center justify-center">
            <HeartbeatLine color="#f6dfe1" strokeWidth={3} className="h-40" />
          </div>

          {/* Heart formed of blueprint strokes */}
          <div ref={heartRef} className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 240 220" className="h-full w-auto" aria-hidden>
              <path
                d="M120 205 C40 150 20 95 40 65 C60 35 105 40 120 75 C135 40 180 35 200 65 C220 95 200 150 120 205 Z"
                fill="rgba(246,223,225,0.06)"
                stroke="#f6dfe1"
                strokeWidth="2"
              />
              {/* interior "structure" lines — buildings living inside the heart */}
              <path d="M120 75 V200 M80 90 V180 M160 90 V180 M60 120 H180 M55 150 H185" stroke="#e0969f" strokeWidth="0.8" opacity="0.5" fill="none" />
            </svg>
          </div>
        </div>

        {/* Captions (crossfaded) */}
        <div className="relative mt-10 h-20 w-full max-w-xl text-center">
          {[
            "Two disciplines — lines, loads, and careful geometry.",
            "Slowly, the lines begin to beat.",
            "Two people, building one life.",
          ].map((line, i) => (
            <p
              key={i}
              ref={(el) => {
                textRefs.current[i] = el;
              }}
              className="absolute inset-0 font-serif text-xl italic text-warm-100/85 sm:text-2xl"
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
