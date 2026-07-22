/** Our Dictionary — the private language of two people. */

export type DictionaryEntry = {
  number: string;
  word: string; // Arabic, as spoken
  transliteration: string;
  meaning: string;
  note: string;
};

export const dictionary: DictionaryEntry[] = [
  {
    number: "٠١",
    word: "نعمل واحد؟",
    transliteration: "Neʿmel waḥed?",
    meaning: "Shall we do one — together?",
    note: "The sentence that started almost every adventure.",
  },
  {
    number: "٠٢",
    word: "عباطة",
    transliteration: "ʿAbāṭa",
    meaning: "Sweet, harmless silliness.",
    note: "Our favourite kind of nonsense.",
  },
  {
    number: "٠٣",
    word: "بووووووديييييي",
    transliteration: "Boooodyyy",
    meaning: "His name — stretched with love.",
    note: "The longer the vowels, the bigger the smile.",
  },
  {
    number: "٠٤",
    word: "منونتييييي",
    transliteration: "Manontyyy",
    meaning: "Her name — sung, not spoken.",
    note: "Reserved for very good moods only.",
  },
  {
    number: "٠٥",
    word: "سورييييي",
    transliteration: "Sorryyy",
    meaning: "An apology impossible to stay mad at.",
    note: "Comes with puppy eyes, as standard.",
  },
  {
    number: "٠٦",
    word: "نووووووووو",
    transliteration: "Noooooo",
    meaning: "A 'no' that usually becomes a 'yes'.",
    note: "Purely for dramatic effect.",
  },
  {
    number: "٠٧",
    word: "يسسسسسسس",
    transliteration: "Yesssss",
    meaning: "The happiest word we own.",
    note: "The answer to the only question that matters.",
  },
  {
    number: "٠٨",
    word: "معلششش",
    transliteration: "Maʿlesh",
    meaning: "It's okay. Never mind. We're fine.",
    note: "The gentlest way to let something go.",
  },
];

export const dictionaryOutro = {
  lead: "To everyone else…",
  small: "they're just words.",
  lead2: "To us…",
  strong: "they are memories.",
};
