"use client";

import { motion } from "framer-motion";
import { ChevronDown, HardHat, Stethoscope } from "lucide-react";
import { site } from "@/content/site";
import { characters } from "@/content/characters";
import { Particles } from "@/components/effects/particles";
import { Parallax } from "@/components/effects/parallax";
import { Reveal } from "@/components/effects/reveal";
import { SplitText } from "@/components/effects/split-text";

/** The cinematic overture: two lives, years passing, then the day it all began. */
export function Prelude() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        id="top"
        className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-navy-950 px-6 text-center text-warm-50"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,theme(colors.navy.800),theme(colors.navy.950)_65%)]"
        />
        <div aria-hidden className="absolute inset-0 -z-10 grain-overlay opacity-30" />
        <Particles quantity={54} color="200, 214, 255" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="eyebrow mb-8 text-warm-100/60"
        >
          {site.couple}
        </motion.p>

        <SplitText
          as="h1"
          text="Our Story"
          className="font-display text-[18vw] font-semibold leading-none tracking-tight sm:text-[12rem]"
          stagger={0.12}
        />

        <Reveal delay={0.6}>
          <p className="mx-auto mt-8 max-w-md font-serif text-xl italic text-warm-100/70 sm:text-2xl">
            A museum of two hearts — kept, so we never forget how it felt.
          </p>
        </Reveal>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-10 flex flex-col items-center gap-2 text-warm-100/50"
        >
          <span className="font-sans text-[0.65rem] uppercase tracking-luxe">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.span>
        </motion.div>
      </section>

      {/* ── Two children, two lives ──────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-900 py-24 text-warm-50 md:py-36">
        <div aria-hidden className="absolute inset-0 -z-10 grain-overlay opacity-20" />
        <div className="container">
          <Reveal>
            <p className="mx-auto max-w-2xl text-center font-serif text-2xl leading-relaxed text-warm-100/80 sm:text-3xl">
              The story begins before we ever met.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-10">
            {[characters.boody, characters.manonty].map((c, i) => (
              <Parallax key={c.key} speed={i === 0 ? 0.25 : -0.25}>
                <Reveal direction={i === 0 ? "right" : "left"} delay={i * 0.15}>
                  <div className="glass-dark flex flex-col items-center rounded-4xl px-8 py-12 text-center">
                    <span
                      className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/15"
                      style={{ background: `${c.accent}18` }}
                    >
                      {c.key === "boody" ? (
                        <HardHat className="h-7 w-7" style={{ color: c.accent }} strokeWidth={1.4} />
                      ) : (
                        <Stethoscope className="h-7 w-7" style={{ color: c.accent }} strokeWidth={1.4} />
                      )}
                    </span>
                    <h3 className="font-display text-3xl font-medium">{c.name}</h3>
                    <p className="mt-1 font-sans text-xs uppercase tracking-luxe text-warm-100/50">
                      {c.role}
                    </p>
                    <p className="mt-6 font-serif text-lg italic text-warm-100/75">{c.line}</p>
                  </div>
                </Reveal>
              </Parallax>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-16 max-w-2xl text-center font-serif text-xl leading-relaxed text-warm-100/70 sm:text-2xl">
              Two children. Two different lives. Growing up separately — without
              ever knowing that destiny was already, quietly, writing our story.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Years pass ───────────────────────────────────────── */}
      <section className="relative flex min-h-[80svh] items-center justify-center overflow-hidden bg-navy-950 py-24 text-warm-50">
        <div aria-hidden className="absolute inset-0 -z-10 grain-overlay opacity-20" />
        <div className="container flex flex-col items-center gap-10 text-center">
          {["Years pass…", "Life changes…", "Until…"].map((line, i) => (
            <Reveal key={line} delay={i * 0.15} amount={0.6}>
              <p
                className="font-display text-4xl font-light tracking-wide text-warm-100/80 sm:text-6xl"
                style={{ opacity: 1 - i * 0.12 }}
              >
                {line}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── The magical date ─────────────────────────────────── */}
      <section
        id="beginning-hero"
        className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-navy-950 px-6 text-center text-warm-50"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,theme(colors.royal.900),theme(colors.navy.950)_70%)]"
        />
        <Particles quantity={60} color="220, 227, 255" maxRadius={2.6} />

        <div className="relative">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 block text-5xl"
          >
            ❤️
          </motion.span>

          <SplitText
            as="h2"
            text="24 August 2023"
            className="font-display text-5xl font-semibold tracking-tight sm:text-8xl"
            wordClassName="text-gradient-blue"
            stagger={0.14}
          />

          <Reveal delay={0.5}>
            <p className="mx-auto mt-8 max-w-md font-serif text-2xl italic text-warm-100/80 sm:text-3xl">
              Everything changes.
            </p>
          </Reveal>

          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-10 h-px w-40 origin-center bg-gradient-to-r from-transparent via-warm-100/60 to-transparent"
          />
        </div>
      </section>
    </>
  );
}
