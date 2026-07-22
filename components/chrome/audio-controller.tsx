"use client";

import { useEffect, useRef } from "react";
import { useExperience } from "@/components/providers/experience-provider";

/**
 * Ambient music, ready for the future. Drop a track at
 *   /public/audio/theme.mp3
 * and the sound control appears automatically in the top bar. Playback only
 * starts after a user gesture (the sound toggle), respecting autoplay rules,
 * and fades gently in and out.
 */
export function AudioController() {
  const { muted, hasAudio, setHasAudio } = useExperience();
  const ref = useRef<HTMLAudioElement>(null);
  const fadeRef = useRef<number | null>(null);

  const fadeTo = (target: number, onDone?: () => void) => {
    const el = ref.current;
    if (!el) return;
    if (fadeRef.current) window.clearInterval(fadeRef.current);
    fadeRef.current = window.setInterval(() => {
      const delta = target - el.volume;
      if (Math.abs(delta) < 0.04) {
        el.volume = target;
        if (fadeRef.current) window.clearInterval(fadeRef.current);
        onDone?.();
      } else {
        el.volume = Math.max(0, Math.min(1, el.volume + Math.sign(delta) * 0.04));
      }
    }, 60);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasAudio) return;
    if (!muted) {
      el.volume = 0;
      el.play()
        .then(() => fadeTo(0.55))
        .catch(() => {
          /* autoplay blocked until a gesture — ignore */
        });
    } else {
      fadeTo(0, () => el.pause());
    }
  }, [muted, hasAudio]);

  return (
    <audio
      ref={ref}
      src="/audio/theme.mp3"
      loop
      preload="none"
      onCanPlay={() => setHasAudio(true)}
      onError={() => setHasAudio(false)}
      aria-hidden
    />
  );
}
