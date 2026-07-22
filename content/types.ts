/** Shared content types for the whole experience. */

export type Aspect = "portrait" | "landscape" | "square" | "tall" | "wide";

/**
 * A single memory (photo/video slot).
 * `src` is optional on purpose: the site is fully composed with elegant
 * placeholders until real photos are dropped into /public/media/<chapter>/.
 * To add a photo, set `src` to "/media/<chapter>/<file>" — nothing else changes.
 */
export type MediaItem = {
  id: string;
  src?: string;
  alt: string;
  caption?: string;
  aspect?: Aspect;
  /** Optional focal hint for object-position, e.g. "50% 30%". */
  focus?: string;
};

export type ChapterId =
  | "childhood"
  | "eyes"
  | "beginning"
  | "first-picture"
  | "everyday"
  | "trips"
  | "ramadan"
  | "gifts"
  | "golden-promise"
  | "love"
  | "doctor"
  | "engineer"
  | "together"
  | "achievement"
  | "dictionary"
  | "journey"
  | "today";

/** A colour mood so each chapter feels distinct yet part of one book. */
export type Mood = {
  /** Tailwind gradient stops for the chapter's ambient background. */
  gradient: string;
  /** Accent hex used for glows, rules, small flourishes. */
  accent: string;
  /** "light" | "dark" — drives text colour on the ambient layer. */
  scheme: "light" | "dark";
};

export type Chapter = {
  id: ChapterId;
  index: number;
  emoji: string;
  /** Icon name from lucide-react. */
  icon: string;
  eyebrow: string;
  title: string;
  /** Short poetic subtitle shown under the title. */
  subtitle?: string;
  /** Narrative paragraphs (English). */
  narrative: string[];
  mood: Mood;
  /** How many placeholder slots to compose the gallery with. */
  slots?: number;
  /** Show in the jump menu. */
  inMenu?: boolean;
};
