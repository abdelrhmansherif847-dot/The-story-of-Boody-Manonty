"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, Search, Sun, Moon, Volume2, VolumeX, EyeOff, Eye } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { useExperience } from "@/components/providers/experience-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { useMounted } from "@/lib/hooks";
import { LoveCounterMini } from "@/components/sections/love-counter";

function IconButton({
  label,
  onClick,
  active,
  children,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      title={label}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 transition-all duration-300 hover:bg-muted hover:text-foreground",
        active && "bg-accent/15 text-accent",
      )}
    >
      {children}
    </button>
  );
}

/** The persistent, glassy control strip at the top of the experience. */
export function TopBar() {
  const {
    setMenuOpen,
    setSearchOpen,
    privateMode,
    togglePrivate,
    muted,
    toggleMuted,
    hasAudio,
  } = useExperience();
  const { theme, toggle } = useTheme();
  const mounted = useMounted();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass border-b border-border/60 py-2" : "border-b border-transparent py-3",
      )}
    >
      <div className="container flex items-center justify-between gap-3">
        {/* Monogram → back to top */}
        <a
          href="#top"
          className="group flex items-center gap-2"
          aria-label="Back to the beginning"
        >
          <span className="font-display text-lg font-semibold tracking-[0.2em] text-foreground transition group-hover:text-accent">
            {site.monogram}
          </span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="mr-1 hidden sm:block">
            <LoveCounterMini />
          </div>

          <IconButton label="Search memories" onClick={() => setSearchOpen(true)}>
            <Search className="h-[1.15rem] w-[1.15rem]" />
          </IconButton>

          {hasAudio && (
            <IconButton
              label={muted ? "Play music" : "Mute music"}
              onClick={toggleMuted}
              active={!muted}
            >
              {muted ? <VolumeX className="h-[1.15rem] w-[1.15rem]" /> : <Volume2 className="h-[1.15rem] w-[1.15rem]" />}
            </IconButton>
          )}

          <IconButton
            label={privateMode ? "Show photos" : "Private mode"}
            onClick={togglePrivate}
            active={privateMode}
          >
            {privateMode ? <EyeOff className="h-[1.15rem] w-[1.15rem]" /> : <Eye className="h-[1.15rem] w-[1.15rem]" />}
          </IconButton>

          <IconButton label="Toggle theme" onClick={toggle}>
            {mounted && theme === "dark" ? (
              <Sun className="h-[1.15rem] w-[1.15rem]" />
            ) : (
              <Moon className="h-[1.15rem] w-[1.15rem]" />
            )}
          </IconButton>

          <IconButton label="Open chapters" onClick={() => setMenuOpen(true)}>
            <Menu className="h-[1.15rem] w-[1.15rem]" />
          </IconButton>
        </div>
      </div>
    </motion.header>
  );
}
