"use client";

import { useEffect, useState } from "react";
import { CalendarHeart } from "lucide-react";
import { countdownTo, nextAnniversary, pad, type Countdown } from "@/lib/utils";
import { useMounted } from "@/lib/hooks";
import { SectionShell } from "./section-shell";
import { Reveal } from "@/components/effects/reveal";

function useCountdown(): { c: Countdown; label: number } {
  const [target] = useState(() => nextAnniversary());
  const [c, setC] = useState<Countdown>(() => countdownTo(target));
  useEffect(() => {
    const id = setInterval(() => setC(countdownTo(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  return { c, label: target.getFullYear() };
}

const UNITS: Array<{ key: keyof Countdown; label: string }> = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

/** Countdown to our next 24 August. */
export function CountdownSection() {
  const mounted = useMounted();
  const { c, label } = useCountdown();

  return (
    <SectionShell
      id="countdown"
      register={false}
      mood={{
        gradient: "from-burgundy-900 via-navy-900 to-navy-950",
        accent: "#e0969f",
        scheme: "dark",
      }}
    >
      <div className="container relative text-center">
        <Reveal>
          <CalendarHeart className="mx-auto mb-5 h-8 w-8 text-burgundy-300" />
          <p className="eyebrow text-warm-100/60">Our next anniversary</p>
          <h2 className="mt-3 font-display text-4xl font-medium sm:text-6xl">
            Counting down to 24 August {label}
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-3 sm:gap-5">
          {UNITS.map(({ key, label }) => (
            <div
              key={key}
              className="glass-dark flex flex-col items-center rounded-3xl px-2 py-6 sm:py-8"
            >
              <span className="font-display text-4xl font-semibold tabular-nums text-warm-50 sm:text-6xl">
                {mounted ? (key === "days" ? c[key] : pad(c[key])) : "—"}
              </span>
              <span className="mt-2 font-sans text-[0.6rem] uppercase tracking-luxe text-warm-100/50 sm:text-xs">
                {label}
              </span>
            </div>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 font-serif text-xl italic text-warm-100/70">
            Another year of us — almost here.
          </p>
        </Reveal>
      </div>
    </SectionShell>
  );
}
