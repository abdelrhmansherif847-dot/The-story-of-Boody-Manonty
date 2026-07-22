/** SAT / American Diploma — Mathematics. Proof we grew together. */

export type ScoreCard = {
  key: "boody" | "manonty";
  name: string;
  emoji: string;
  subject: string;
  score: number;
  max: number;
  accent: string;
};

export const scores: ScoreCard[] = [
  {
    key: "boody",
    name: "Boody",
    emoji: "👷🏻‍♂️",
    subject: "American Diploma · Mathematics",
    score: 770,
    max: 800,
    accent: "#6b7dfb",
  },
  {
    key: "manonty",
    name: "Manonty",
    emoji: "👩🏻‍⚕️",
    subject: "American Diploma · Mathematics",
    score: 780,
    max: 800,
    accent: "#cfa24e",
  },
];

export const achievementQuote = {
  soft: "We didn't only dream together.",
  strong: "We succeeded together.",
};
