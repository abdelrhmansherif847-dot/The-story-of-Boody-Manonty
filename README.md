# ❤️ Our Story — Boody & Manonty

> _Some memories are only meant for two hearts._

A private, timeless, cinematic memory experience — built like a luxury
coffee-table book that you _scroll_. It opens with a password screen, then
unfolds chapter by chapter: childhood, the day everything changed, trips,
Ramadan, gifts, a doctor, an engineer, a private dictionary, and a final
question with only one answer.

This is not a photo gallery. It's a museum of one love story.

---

## ✨ Highlights

- **Cinematic password gate** — the door to the story (`24/8/2023`).
- **Live love counter** — counting every second since 24 August 2023.
- **18 chapters**, each with its own colour-mood, narration and gallery.
- **Our First Golden Promise** — a cinematic, jewellery-boutique chapter for the
  first gold gift: dark gold-lit stage, glass reflection, slow zoom, and gold dust.
- **Hand in Hand** — an intimate chapter about connection (matching bracelets,
  two spoons that make a heart): warm-lit cinematic frames, slow zoom, reflections.
- **Before We Knew Each Other** — a nostalgic, vintage-film Childhood opening:
  sepia photo prints, golden light, dust, handwritten type, and a symbolic
  convergence of two childhoods (Boody → Manonty → destiny).
- **Special chapters** for Manonty (a calm, white-and-blue medical world with a
  living heartbeat) and Boody (a self-drawing architectural blueprint).
- **“Together”** — a GSAP scroll sequence where a blueprint dissolves into a
  heartbeat, and the heartbeat becomes a heart.
- **Animated SAT / American Diploma score cards** (770 & 780) with count-up rings.
- **Our Dictionary** — flip cards for the couple's private words (Arabic + English).
- **Interactive timeline**, **treasure box**, **quote spotlight**,
  **anniversary countdown**, and a hushed **final scene**.
- **Memory search**, **chapter menu**, **dark / light mode**, **private mode**
  (blur all photos), a **music player** ready for a future track, and a couple of
  **hidden easter eggs** (try the Konami code ↑↑↓↓←→←→ B A).
- Fully **responsive**, **accessible**, and tuned for **60 FPS** with lazy-loaded,
  optimised images and reduced-motion support.

---

## 🧱 Tech stack

| Layer        | Choice                                        |
| ------------ | --------------------------------------------- |
| Framework    | **Next.js 15** (App Router) + **React 19**    |
| Language     | **TypeScript** (strict)                       |
| Styling      | **Tailwind CSS** + a bespoke design system    |
| Motion       | **Framer Motion** + **GSAP** (ScrollTrigger)  |
| Icons        | **lucide-react**                              |
| UI utilities | shadcn-style (`cn`, CVA), class-variance-authority |
| Fonts        | Playfair Display, Cormorant Garamond, Inter, El Messiri, Tajawal |

---

## 🚀 Getting started

```bash
pnpm install     # or: npm install / yarn
pnpm dev         # start the dev server → http://localhost:3000
pnpm build       # production build
pnpm start       # serve the production build
pnpm typecheck   # strict TypeScript check
pnpm lint        # eslint
```

> The password to enter is **24/8/2023** (several spellings are accepted:
> `24-8-2023`, `2482023`, `٢٤/٨/٢٠٢٣`, …).

---

## 📁 Project structure

```
app/                     Next.js App Router (layout, page, metadata, icon, manifest)
components/
  ├─ providers/          Theme + Experience (unlock, private mode, audio) contexts
  ├─ ui/                 shadcn-style primitives (Button)
  ├─ effects/            Reveal, Parallax, Particles, SplitText, TiltCard,
  │                      Heartbeat, Blueprint, ScrollProgress
  ├─ gallery/            MediaTile (photo or elegant placeholder), grid, lightbox
  ├─ chrome/             TopBar, ChapterMenu, SearchOverlay, AudioController
  ├─ sections/           Every chapter + Gate, Prelude, LoveCounter, Together,
  │                      Achievement, Dictionary, Timeline, Quotes, Countdown, Final
  └─ story-experience.tsx  Orchestrates the whole cinematic scroll
content/                 ALL the words & data — edit here to update the story
  ├─ chapters.ts         Chapter order, titles, narration, colour moods
  ├─ media.ts            The photo manifest (see “Adding photos”)
  ├─ dictionary.ts       The private words
  ├─ timeline.ts         Journey milestones
  ├─ achievement.ts      The scores
  ├─ quotes.ts, characters.ts, site.ts
lib/                     utils (dates, counter), hooks, fonts, password
public/media/            Drop your photos here (per-chapter folders)
public/audio/            Drop theme.mp3 here for music
```

**Everything you'd want to edit lives in `content/`** — the code never needs to
change to add a memory, a word, a milestone, or a new photo.

---

## 📸 Adding your photos

The site is designed to look complete **before** any photos exist — every gallery
shows an elegant, on-theme placeholder. To add real memories:

1. Drop images into the matching folder, e.g. `public/media/childhood/01.jpg`.
2. Set the `src` on the matching slot in **`content/media.ts`**:
   ```ts
   { id: "childhood-1", src: "/media/childhood/01.jpg", caption: "Before we knew", aspect: "portrait" }
   ```

Galleries, the lightbox, and search update automatically. Full guide:
[`public/media/README.md`](public/media/README.md).

## 🎵 Adding music

Drop a track at `public/audio/theme.mp3` and the sound control appears in the top
bar automatically. It never autoplays (starts on tap), fades gently, and loops.
See [`public/audio/README.md`](public/audio/README.md).

---

## 🎨 Customising

- **Password** → `content/site.ts` (and `lib/password.ts` for accepted formats).
- **Names / roles / lines** → `content/characters.ts`.
- **Chapter text & moods** → `content/chapters.ts`.
- **Colours** → the brand palette (navy, royal, steel, olive, forest, chocolate,
  plum, burgundy, gold, warm white) lives in `tailwind.config.ts`; light/dark
  surface tokens live in `app/globals.css`.

---

## ♿ Accessibility & performance

- Semantic HTML, keyboard-navigable lightbox/menu/search, visible focus rings,
  ARIA labels, and `prefers-reduced-motion` support throughout.
- `next/image` optimisation (AVIF/WebP, lazy loading, responsive sizes), route is
  statically prerendered, fonts self-hosted with `display: swap`.
- Theme is set before first paint (no flash), and the whole story is one static
  route for instant navigation.

---

## 🚢 Deploy

Any Next.js host works. The simplest is **Vercel**: import the repo and deploy —
no environment variables required. (The site is intentionally `noindex` — it's a
private keepsake.)

---

_Made with love. Since 24 August 2023._
