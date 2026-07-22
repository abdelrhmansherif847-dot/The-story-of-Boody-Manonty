/**
 * The gate is a keepsake lock, not a security boundary. We simply
 * normalise the input so every natural way of writing the date opens it:
 *   24/8/2023 · 24-8-2023 · 24.8.2023 · 2482023 · 24 8 2023 · ٢٤/٨/٢٠٢٣
 */

const ARABIC_DIGITS: Record<string, string> = {
  "٠": "0",
  "١": "1",
  "٢": "2",
  "٣": "3",
  "٤": "4",
  "٥": "5",
  "٦": "6",
  "٧": "7",
  "٨": "8",
  "٩": "9",
};

function toWesternDigits(value: string): string {
  return value.replace(/[٠-٩]/g, (d) => ARABIC_DIGITS[d] ?? d);
}

/** Reduce any date-ish string to its bare digit sequence. */
function normalize(value: string): string {
  return toWesternDigits(value).replace(/\D/g, "");
}

// 24 August 2023 → "2482023"
const KEY = normalize("24/8/2023");

export function isCorrectPassword(input: string): boolean {
  const digits = normalize(input);
  if (!digits) return false;
  // Accept with or without a leading zero on the month (2482023 / 24082023).
  return digits === KEY || digits === "24082023";
}
