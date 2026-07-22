"use client";

import { motion } from "framer-motion";
import { Stethoscope, HeartPulse, Plus } from "lucide-react";
import { chapterById } from "@/content/chapters";
import { characters } from "@/content/characters";
import { getMedia } from "@/content/media";
import { SectionShell } from "./section-shell";
import { Reveal } from "@/components/effects/reveal";
import { SplitText } from "@/components/effects/split-text";
import { HeartbeatLine } from "@/components/effects/heartbeat";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

const chapter = chapterById.doctor;
const manonty = characters.manonty;

/** Manonty — a clean, luminous, hospital-calm chapter. */
export function DoctorChapter() {
  const items = getMedia("doctor");

  return (
    <SectionShell id={chapter.id} mood={chapter.mood}>
      {/* soft floating medical crosses */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden">
        {[
          { top: "12%", left: "8%", d: 0 },
          { top: "68%", left: "14%", d: 1.2 },
          { top: "24%", left: "86%", d: 0.6 },
          { top: "78%", left: "80%", d: 1.8 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute text-steel-300/40"
            style={{ top: p.top, left: p.left }}
            animate={{ y: [0, -16, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, delay: p.d, repeat: Infinity, ease: "easeInOut" }}
          >
            <Plus className="h-6 w-6" strokeWidth={1.2} />
          </motion.div>
        ))}
      </div>

      <div className="container relative">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left — identity + quote */}
          <div>
            <Reveal>
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-royal-500/10 ring-1 ring-royal-500/20">
                  <Stethoscope className="h-6 w-6 text-royal-500" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="eyebrow text-royal-600">{manonty.role}</p>
                  <p className="font-display text-2xl font-medium">{manonty.name}</p>
                </div>
              </div>
            </Reveal>

            <SplitText
              as="h2"
              text="The Doctor"
              className="font-display text-5xl font-semibold tracking-tight text-steel-800 sm:text-7xl"
            />

            <Reveal delay={0.15}>
              <p className="mt-8 font-serif text-2xl leading-relaxed text-steel-700 sm:text-3xl">
                She chose medicine to heal people.
              </p>
              <p className="mt-3 font-serif text-2xl italic leading-relaxed text-steel-500 sm:text-3xl">
                And without trying…
              </p>
              <p className="mt-3 font-serif text-3xl font-medium leading-relaxed text-royal-600 sm:text-4xl">
                she healed my heart too.
              </p>
            </Reveal>
          </div>

          {/* Right — a calm "vitals" card */}
          <Reveal direction="left" delay={0.1}>
            <div className="glass relative overflow-hidden rounded-4xl p-8 shadow-luxe">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-sans text-xs uppercase tracking-luxe text-steel-500">
                  <HeartPulse className="h-4 w-4 text-burgundy-500" /> Steady & strong
                </span>
                <span className="font-display text-lg text-steel-700">72 bpm</span>
              </div>
              <HeartbeatLine color="#4655ef" className="my-6 h-28" />
              <p className="text-center font-serif text-xl italic text-steel-600">
                “Some hearts are healed by science.
                <br /> Mine was healed by her.”
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 md:mt-20">
          <GalleryGrid items={items} accent={chapter.mood.accent} columns="sm:columns-2 lg:columns-4" />
        </div>
      </div>
    </SectionShell>
  );
}
