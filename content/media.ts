import type { Aspect, ChapterId, MediaItem } from "./types";

/**
 * ─────────────────────────────────────────────────────────────
 *  MEDIA MANIFEST  ·  how to add your photos
 * ─────────────────────────────────────────────────────────────
 *  1. Drop image files into:  /public/media/<chapter>/
 *        e.g. /public/media/childhood/01.jpg
 *  2. Point the matching slot below at it by setting `src`:
 *        { id: "childhood-1", src: "/media/childhood/01.jpg", ... }
 *
 *  Until a `src` is set, the slot renders as an elegant, on-theme
 *  placeholder — so the galleries look composed and intentional even
 *  before a single photo is added. Nothing else in the app needs to change.
 * ─────────────────────────────────────────────────────────────
 */

// A pleasing, repeating rhythm of shapes for editorial galleries.
const ASPECT_RHYTHM: Aspect[] = [
  "portrait",
  "landscape",
  "square",
  "tall",
  "landscape",
  "portrait",
  "wide",
  "square",
];

/** Evocative default captions per chapter (used until you write your own). */
const CAPTIONS: Partial<Record<ChapterId, string[]>> = {
  childhood: [
    "Before we knew",
    "Small hands, big dreams",
    "A different sky",
    "Learning to smile",
    "Somewhere, far away",
    "Two beginnings",
  ],
  eyes: ["His eyes", "Her eyes", "Ours"],
  beginning: [
    "The first hello",
    "24 · 08 · 2023",
    "Something shifted",
    "The very start",
  ],
  "first-picture": [
    "The first frame",
    "A little nervous",
    "Already home",
    "Us, for the first time",
  ],
  everyday: [
    "An ordinary Tuesday",
    "Midnight messages",
    "That laugh",
    "A look across the room",
    "Coffee, again",
    "Nothing special, everything special",
    "Just us",
    "The in-between",
  ],
  trips: [
    "Toward the sea",
    "Streets we'd never walked",
    "New horizons",
    "Somewhere new",
    "The road together",
    "Skies we'd never seen",
  ],
  ramadan: [
    "Lanterns in the window",
    "A softer light",
    "Grateful",
    "Under the crescent",
    "Quiet blessings",
  ],
  gifts: [
    "Wrapped with care",
    "Chosen slowly",
    "The thought behind it",
    "A little treasure",
    "For you",
  ],
  love: ["Us", "Reliable, patient love", "The hard days too", "Home", "Ours", "Simply, us"],
  doctor: ["The healer", "Science & kindness", "White coat", "Steady hands"],
  engineer: ["The builder", "Lines & dreams", "Bridges", "Blueprints"],
  today: [
    "Right now",
    "Older, softer",
    "Still us",
    "Still writing",
    "This morning",
    "Certain",
  ],
};

function buildSlots(chapter: ChapterId, count: number): MediaItem[] {
  const captions = CAPTIONS[chapter] ?? [];
  return Array.from({ length: count }, (_, i) => ({
    id: `${chapter}-${i + 1}`,
    // src is intentionally omitted — add "/media/<chapter>/<file>" to fill it.
    alt: `${captions[i] ?? "A memory"} — Boody & Manonty`,
    caption: captions[i],
    aspect: ASPECT_RHYTHM[i % ASPECT_RHYTHM.length],
  }));
}

/** Per-chapter media, keyed by chapter id. */
export const media: Partial<Record<ChapterId, MediaItem[]>> = {
  childhood: buildSlots("childhood", 6),
  eyes: buildSlots("eyes", 3),
  beginning: buildSlots("beginning", 4),
  "first-picture": buildSlots("first-picture", 4),
  everyday: buildSlots("everyday", 8),
  trips: buildSlots("trips", 6),
  ramadan: buildSlots("ramadan", 5),
  gifts: buildSlots("gifts", 5),
  love: buildSlots("love", 6),
  doctor: buildSlots("doctor", 4),
  engineer: buildSlots("engineer", 4),
  today: buildSlots("today", 6),
};

export function getMedia(chapter: ChapterId): MediaItem[] {
  return media[chapter] ?? [];
}

/** Every media item across the book, tagged with its chapter (for search). */
export function allMedia(): Array<MediaItem & { chapter: ChapterId }> {
  return (Object.keys(media) as ChapterId[]).flatMap((c) =>
    (media[c] ?? []).map((m) => ({ ...m, chapter: c })),
  );
}
