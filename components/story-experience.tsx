"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { chapterById } from "@/content/chapters";
import { getMedia } from "@/content/media";
import type { ChapterId } from "@/content/types";
import { site } from "@/content/site";
import { useExperience } from "@/components/providers/experience-provider";
import { useKonami } from "@/lib/hooks";

import { ScrollProgress } from "@/components/effects/scroll-progress";
import { TopBar } from "@/components/chrome/top-bar";
import { ChapterMenu } from "@/components/chrome/chapter-menu";
import { SearchOverlay } from "@/components/chrome/search-overlay";
import { AudioController } from "@/components/chrome/audio-controller";

import { Gate } from "@/components/sections/gate";
import { Prelude } from "@/components/sections/prelude";
import { LoveCounter } from "@/components/sections/love-counter";
import { ChapterSection } from "@/components/sections/chapter-section";
import { EyesChapter } from "@/components/sections/eyes";
import { GiftsSection } from "@/components/sections/gifts";
import { DoctorChapter } from "@/components/sections/doctor";
import { EngineerChapter } from "@/components/sections/engineer";
import { TogetherSection } from "@/components/sections/together";
import { AchievementSection } from "@/components/sections/achievement";
import { DictionarySection } from "@/components/sections/dictionary";
import { QuotesSection } from "@/components/sections/quotes";
import { TimelineSection } from "@/components/sections/timeline";
import { CountdownSection } from "@/components/sections/countdown";
import { FinalScene } from "@/components/sections/final-scene";

/** A standard, data-driven chapter (heading + narrative + gallery). */
function Standard({ id }: { id: ChapterId }) {
  return <ChapterSection chapter={chapterById[id]} items={getMedia(id)} />;
}

/** A small, hidden delight — the Konami code makes the whole page bloom hearts. */
function Confetti({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[90] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-2xl"
              style={{ left: `${(i * 53) % 100}%`, top: "-5%" }}
              initial={{ y: "-10%", opacity: 0, rotate: 0 }}
              animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: 360 }}
              transition={{ duration: 2.6 + (i % 5) * 0.3, delay: (i % 7) * 0.08, ease: "easeIn" }}
            >
              {["❤️", "💙", "🤍", "💜"][i % 4]}
            </motion.span>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function StoryExperience() {
  const { unlocked } = useExperience();
  const [egg, setEgg] = useState(false);

  useKonami(() => {
    setEgg(true);
    setTimeout(() => setEgg(false), 3200);
  });

  return (
    <AnimatePresence mode="wait">
      {!unlocked ? (
        <motion.div key="gate" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
          <Gate />
        </motion.div>
      ) : (
        <motion.div
          key="story"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <ScrollProgress />
          <TopBar />
          <ChapterMenu />
          <SearchOverlay />
          <AudioController />
          <Confetti show={egg} />

          <main>
            <Prelude />
            <LoveCounter />

            <Standard id="childhood" />
            <EyesChapter />
            <Standard id="beginning" />
            <Standard id="first-picture" />
            <Standard id="everyday" />
            <Standard id="trips" />
            <Standard id="ramadan" />
            <GiftsSection />
            <Standard id="love" />

            <DoctorChapter />
            <EngineerChapter />
            <TogetherSection />
            <AchievementSection />

            <DictionarySection />
            <QuotesSection />
            <TimelineSection />

            <Standard id="today" />
            <CountdownSection />
            <FinalScene />
          </main>

          <footer className="relative bg-black py-16 text-center text-warm-100/50">
            <p className="font-display text-2xl tracking-[0.3em]">{site.monogram}</p>
            <p className="mt-4 font-serif text-lg italic">{site.tagline}</p>
            <p className="mt-6 font-sans text-[0.65rem] uppercase tracking-luxe text-warm-100/30">
              Made with love · {site.couple} · Since {site.anniversaryLabel}
            </p>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
