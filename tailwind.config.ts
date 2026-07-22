import type { Config } from "tailwindcss";

/**
 * Our Story — design system.
 *
 * The palette is drawn directly from the couple's favourite colours:
 * every shade of blue (navy → royal → steel), olive, forest green,
 * chocolate brown, deep purple, burgundy, warm white, black and red.
 *
 * Neutral/surface tokens are theme-aware (light + dark) and driven by CSS
 * variables declared in globals.css, so every chapter can shift its mood
 * while the whole experience stays coherent.
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        // Theme-aware surfaces (see :root / .dark in globals.css)
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        border: "hsl(var(--border) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },

        // ── Brand scales (fixed, used to paint each chapter's mood) ──
        navy: {
          50: "#eef2f8",
          100: "#d3dcec",
          200: "#a7b8d8",
          300: "#7b91c2",
          400: "#4f6aa6",
          500: "#324e8c",
          600: "#243a6d",
          700: "#1b2c54",
          800: "#131f3c",
          900: "#0b1428",
          950: "#060b18",
        },
        royal: {
          50: "#edf1ff",
          100: "#dbe3ff",
          200: "#bcc9ff",
          300: "#94a6ff",
          400: "#6b7dfb",
          500: "#4655ef",
          600: "#3139d1",
          700: "#282ea8",
          800: "#242a86",
          900: "#232a6b",
        },
        steel: {
          50: "#f1f5f9",
          100: "#e2eaf1",
          200: "#c6d5e3",
          300: "#9db7cd",
          400: "#6d92b2",
          500: "#4d7599",
          600: "#3c5d7f",
          700: "#334c67",
          800: "#2e4157",
          900: "#2a384a",
        },
        olive: {
          50: "#f7f8ee",
          100: "#ecefd4",
          200: "#d9e0ab",
          300: "#bfcb79",
          400: "#a3b352",
          500: "#7f8f36",
          600: "#63722a",
          700: "#4c5824",
          800: "#3e4722",
          900: "#353d20",
        },
        forest: {
          50: "#eef7f0",
          100: "#d6ecdb",
          200: "#aed8b9",
          300: "#7dbd8f",
          400: "#4e9c66",
          500: "#33804c",
          600: "#24663c",
          700: "#1e5132",
          800: "#1a412a",
          900: "#163625",
        },
        chocolate: {
          50: "#f7f2ee",
          100: "#ecdfd4",
          200: "#d8bda8",
          300: "#c09775",
          400: "#a9744b",
          500: "#8f5a34",
          600: "#73472a",
          700: "#5c3924",
          800: "#4b3022",
          900: "#3f2a20",
        },
        plum: {
          50: "#f6f2fb",
          100: "#eae1f6",
          200: "#d6c4ee",
          300: "#b99ce0",
          400: "#9a6fce",
          500: "#7f4db8",
          600: "#673c9a",
          700: "#54317d",
          800: "#472c67",
          900: "#3c2856",
        },
        burgundy: {
          50: "#fbf1f2",
          100: "#f6dfe1",
          200: "#eec1c6",
          300: "#e0969f",
          400: "#cd6572",
          500: "#b7414f",
          600: "#9c2f3d",
          700: "#822833",
          800: "#6d242e",
          900: "#5d222b",
        },
        gold: {
          100: "#f7edcf",
          200: "#eed99b",
          300: "#e2c05f",
          400: "#cfa24e",
          500: "#b4842f",
          600: "#8f6522",
        },
        // Warm white — the paper of this book
        warm: {
          50: "#fffdf9",
          100: "#fbf7ef",
          200: "#f4ecdd",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        display: ["var(--font-display)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "Tajawal", "sans-serif"],
        "arabic-display": ["var(--font-arabic-display)", "El Messiri", "serif"],
        script: ["var(--font-script)", "Dancing Script", "cursive"],
      },
      letterSpacing: {
        luxe: "0.28em",
        wide2: "0.16em",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        luxe: "0 30px 80px -40px rgba(11, 20, 40, 0.55)",
        glow: "0 0 60px -12px rgba(107, 125, 251, 0.45)",
        gold: "0 20px 60px -20px rgba(201, 162, 78, 0.55)",
      },
      backgroundImage: {
        grain: "var(--grain)",
        blueprint:
          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.14)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.1)" },
          "70%": { transform: "scale(1)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.7" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.16,1,0.3,1) both",
        float: "float 7s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        heartbeat: "heartbeat 2.4s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.6s cubic-bezier(0.16,1,0.3,1) infinite",
        "spin-slow": "spin-slow 26s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
