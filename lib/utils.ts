import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with conflict resolution (shadcn convention). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Clamp a number between min and max. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Pad a number to two digits (for clocks/counters). */
export function pad(n: number) {
  return n.toString().padStart(2, "0");
}

/** The day everything changed. Single source of truth. */
export const ANNIVERSARY = new Date("2023-08-24T00:00:00");

export type Duration = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
};

/**
 * Human-friendly elapsed time since a date, expressed as a calendar-accurate
 * breakdown (years/months/days) plus live clock parts. Used by the love counter.
 */
export function elapsedSince(from: Date, now: Date = new Date()): Duration {
  let years = now.getFullYear() - from.getFullYear();
  let months = now.getMonth() - from.getMonth();
  let days = now.getDate() - from.getDate();
  let hours = now.getHours() - from.getHours();
  let minutes = now.getMinutes() - from.getMinutes();
  let seconds = now.getSeconds() - from.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }
  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }
  if (hours < 0) {
    hours += 24;
    days -= 1;
  }
  if (days < 0) {
    // Borrow days from the previous month
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  const totalDays = Math.floor((now.getTime() - from.getTime()) / 86_400_000);

  return { years, months, days, hours, minutes, seconds, totalDays };
}

/** Milliseconds until the next anniversary (Aug 24) from `now`. */
export function nextAnniversary(now: Date = new Date()): Date {
  const year =
    now.getMonth() > 7 || (now.getMonth() === 7 && now.getDate() >= 24)
      ? now.getFullYear() + 1
      : now.getFullYear();
  return new Date(year, 7, 24, 0, 0, 0);
}

export type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function countdownTo(target: Date, now: Date = new Date()): Countdown {
  const diff = Math.max(0, target.getTime() - now.getTime());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}
