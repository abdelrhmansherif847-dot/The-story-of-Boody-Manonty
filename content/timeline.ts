/**
 * Our Journey — the milestones, in order.
 *
 * Dates you know for certain are set precisely; the rest use soft labels
 * so the timeline stays honest and is effortless to refine later. Edit the
 * `when`/`label` fields any time — the visual timeline updates automatically.
 */

export type Milestone = {
  id: string;
  when: string; // display label, e.g. "24 August 2023"
  title: string;
  detail: string;
  icon: string; // lucide icon name
  emoji: string;
  /** Chapter this milestone links to (for "jump" behaviour). */
  chapter?: string;
  highlight?: boolean;
};

export const milestones: Milestone[] = [
  {
    id: "before",
    when: "Once upon a time",
    title: "Two separate stories",
    detail:
      "Two children, growing up apart — with no idea the other one existed.",
    icon: "Baby",
    emoji: "👶",
    chapter: "childhood",
  },
  {
    id: "beginning",
    when: "24 August 2023",
    title: "The day everything changed",
    detail: "The moment two separate stories quietly became one.",
    icon: "Sparkles",
    emoji: "🤍",
    chapter: "beginning",
    highlight: true,
  },
  {
    id: "first-picture",
    when: "Soon after",
    title: "Our first picture together",
    detail: "A little nervous, a little unsure — already home.",
    icon: "Camera",
    emoji: "📸",
    chapter: "first-picture",
  },
  {
    id: "first-trip",
    when: "Our first escape",
    title: "The first trip",
    detail: "New streets, new skies, the same hand to hold.",
    icon: "Waves",
    emoji: "🌊",
    chapter: "trips",
  },
  {
    id: "gold-gift",
    when: "A glowing moment",
    title: "The first gold gift",
    detail: "Chosen slowly, given with a heart that was paying attention.",
    icon: "Gem",
    emoji: "🎁",
    chapter: "gifts",
  },
  {
    id: "ramadan",
    when: "Under the crescent",
    title: "Our first Ramadan",
    detail: "Lanterns, gratitude, and quiet prayers for one another.",
    icon: "Moon",
    emoji: "🌙",
    chapter: "ramadan",
  },
  {
    id: "diploma",
    when: "Results day",
    title: "We succeeded together",
    detail: "American Diploma Mathematics — 770 and 780. Side by side.",
    icon: "GraduationCap",
    emoji: "🎓",
    chapter: "achievement",
    highlight: true,
  },
  {
    id: "today",
    when: "Today",
    title: "Still being written",
    detail: "More certain of each other than ever.",
    icon: "Sun",
    emoji: "✨",
    chapter: "today",
    highlight: true,
  },
];
