"use client";

import Image from "next/image";
import { Camera, Lock } from "lucide-react";
import { motion } from "framer-motion";
import type { Aspect, MediaItem } from "@/content/types";
import { cn } from "@/lib/utils";
import { useExperience } from "@/components/providers/experience-provider";

const ASPECT_CLASS: Record<Aspect, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  tall: "aspect-[2/3]",
  wide: "aspect-[16/10]",
};

function hashHue(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
  return h;
}

/**
 * A single memory. Renders a real, optimised photo when `src` is present;
 * otherwise an elegant, on-theme placeholder so the gallery always looks
 * composed. Honours private mode (blur) and is fully keyboard-accessible.
 */
export function MediaTile({
  item,
  accent = "#4655ef",
  index = 0,
  priority = false,
  onOpen,
  className,
}: {
  item: MediaItem;
  accent?: string;
  index?: number;
  priority?: boolean;
  onOpen?: () => void;
  className?: string;
}) {
  const { privateMode } = useExperience();
  const aspect = ASPECT_CLASS[item.aspect ?? "portrait"];
  const hue = hashHue(item.id);

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      aria-label={item.caption ? `Open memory: ${item.caption}` : "Open memory"}
      className={cn(
        "group relative block w-full overflow-hidden rounded-2xl border border-border/60 bg-muted/40 shadow-luxe outline-none focus-visible:ring-2 focus-visible:ring-ring",
        aspect,
        className,
      )}
    >
      {item.src ? (
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          priority={priority}
          style={{ objectPosition: item.focus ?? "center" }}
          className={cn(
            "object-cover transition-all duration-700 ease-luxe group-hover:scale-[1.05]",
            privateMode && "scale-110 blur-2xl",
          )}
        />
      ) : (
        // Placeholder — intentional and beautiful until a photo is dropped in.
        // Anchored on the chapter's accent (so each chapter's tiles feel
        // on-theme) with a per-item angle for gentle variety.
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${115 + (hue % 130)}deg, ${accent}e6, ${accent}55 48%, hsl(222 47% 9%))`,
          }}
        >
          <div className="absolute inset-0 grain-overlay opacity-70" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-warm-50/90">
            <span className="font-display text-3xl tracking-[0.35em] opacity-40">
              B·M
            </span>
            <Camera className="h-5 w-5 opacity-40" strokeWidth={1.4} />
          </div>
        </div>
      )}

      {/* Caption + hover sheen */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {item.caption && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
          <span className="translate-y-2 font-serif text-lg italic text-warm-50 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            {item.caption}
          </span>
        </div>
      )}

      {privateMode && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm">
          <Lock className="h-5 w-5 text-foreground/70" />
        </div>
      )}
    </motion.button>
  );
}
