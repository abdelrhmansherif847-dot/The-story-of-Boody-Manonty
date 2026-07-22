import {
  Playfair_Display,
  Cormorant_Garamond,
  Inter,
  El_Messiri,
  Tajawal,
  Dancing_Script,
} from "next/font/google";

/**
 * Typography voices of the book.
 *  · Playfair Display — the grand display serif (titles, the "movie" moments)
 *  · Cormorant Garamond — the intimate reading serif (narration)
 *  · Inter — clean sans for UI, labels, numbers
 *  · El Messiri — elegant Arabic display (the dictionary, the final word)
 *  · Tajawal — calm Arabic sans for body Arabic
 * All are loaded self-hosted by next/font with `display: swap`.
 */
export const fontDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const fontSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const fontArabicDisplay = El_Messiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic-display",
  display: "swap",
});

export const fontArabic = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-arabic",
  display: "swap",
});

/** A warm, handwritten voice — used for the nostalgic Childhood chapter. */
export const fontScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-script",
  display: "swap",
});

export const fontVariables = [
  fontDisplay.variable,
  fontSerif.variable,
  fontSans.variable,
  fontArabicDisplay.variable,
  fontArabic.variable,
  fontScript.variable,
].join(" ");
