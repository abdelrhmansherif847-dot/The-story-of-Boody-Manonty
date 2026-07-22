/** The two people this whole museum is built for. */

export type Character = {
  key: "boody" | "manonty";
  emoji: string;
  name: string;
  role: string;
  line: string;
  accent: string;
};

export const characters: Record<Character["key"], Character> = {
  boody: {
    key: "boody",
    emoji: "👷🏻‍♂️",
    name: "Boody",
    role: "Civil Engineer",
    line: "I build bridges, buildings, dreams — and one day I hope to build a beautiful future.",
    accent: "#6b7dfb",
  },
  manonty: {
    key: "manonty",
    emoji: "👩🏻‍⚕️",
    name: "Manonty",
    role: "Medical Doctor",
    line: "She heals people with science and kindness.",
    accent: "#4d7599",
  },
};
