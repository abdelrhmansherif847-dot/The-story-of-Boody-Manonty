"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type ExperienceContextValue = {
  /** Has the correct password been entered this session? */
  unlocked: boolean;
  unlock: () => void;
  lock: () => void;

  /** Private mode blurs all photos so the story can be browsed discreetly. */
  privateMode: boolean;
  togglePrivate: () => void;

  /** Ambient music (ready for a future track dropped at /audio/theme.mp3). */
  muted: boolean;
  toggleMuted: () => void;
  hasAudio: boolean;
  setHasAudio: (v: boolean) => void;

  /** Which chapter is currently in view (drives nav highlighting). */
  activeChapter: string | null;
  setActiveChapter: (id: string | null) => void;

  /** Global menu + search overlays. */
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

const PRIVATE_KEY = "our-story-private";

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [privateMode, setPrivateMode] = useState(false);
  const [muted, setMuted] = useState(true);
  const [hasAudio, setHasAudio] = useState(false);
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const restored = useRef(false);

  useEffect(() => {
    try {
      setPrivateMode(window.localStorage.getItem(PRIVATE_KEY) === "1");
    } catch {
      /* ignore */
    }
    restored.current = true;
  }, []);

  const unlock = useCallback(() => setUnlocked(true), []);
  const lock = useCallback(() => {
    setUnlocked(false);
    setMenuOpen(false);
    setSearchOpen(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }, []);

  const togglePrivate = useCallback(() => {
    setPrivateMode((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(PRIVATE_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const toggleMuted = useCallback(() => setMuted((m) => !m), []);

  const value = useMemo<ExperienceContextValue>(
    () => ({
      unlocked,
      unlock,
      lock,
      privateMode,
      togglePrivate,
      muted,
      toggleMuted,
      hasAudio,
      setHasAudio,
      activeChapter,
      setActiveChapter,
      menuOpen,
      setMenuOpen,
      searchOpen,
      setSearchOpen,
    }),
    [
      unlocked,
      unlock,
      lock,
      privateMode,
      togglePrivate,
      muted,
      toggleMuted,
      hasAudio,
      activeChapter,
      menuOpen,
      searchOpen,
    ],
  );

  return (
    <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>
  );
}

export function useExperience() {
  const ctx = useContext(ExperienceContext);
  if (!ctx) throw new Error("useExperience must be used within ExperienceProvider");
  return ctx;
}
