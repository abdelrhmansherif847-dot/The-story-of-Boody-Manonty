/** Favourite quotes — small truths from our story. */

export type Quote = {
  text: string;
  attribution?: string;
  arabic?: boolean;
};

export const quotes: Quote[] = [
  { text: "Some memories are only meant for two hearts." },
  { text: "We didn't only dream together. We succeeded together." },
  {
    text: "She chose medicine to heal people. And without trying, she healed my heart too.",
    attribution: "Boody, about Manonty",
  },
  {
    text: "The most beautiful thing I'll ever build is our future.",
    attribution: "Boody",
  },
  { text: "نعمل واحد؟", arabic: true },
  { text: "To everyone else they're just words. To us, they are memories." },
];
