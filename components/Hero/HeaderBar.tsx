"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { ThemeToggle } from "@/components/motion/theme-toggle";
import { EmojiReaction } from "@/components/motion/emoji-reaction";
import { useCoordinates } from "@/components/Hero/CoordinateTracker";

export function HeaderBar() {
  const { coords } = useCoordinates();
  const [logoHovered, setLogoHovered] = useState(false);

  return (
    <header className="flex w-full items-center justify-between px-6 py-4 md:px-10">
      {/* Left: Emoji reaction + Logo with avatar hover */}
      <div className="flex items-center gap-3">
        <EmojiReaction size="sm" align="left" />
        <div
          className="relative flex h-8 items-center"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          <a
            href="/"
            className="relative z-10 text-sm font-medium tracking-tight"
          >
            iamshakibali
          </a>
          <AnimatePresence>
            {logoHovered && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.92 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute left-0 top-full z-20 mt-4"
              >
                <div className="rounded-2xl border-8 border-foreground/10">
                  <Image
                    src="/avatar.png"
                    alt="Shakib Ali"
                    width={244}
                    height={248}
                    className="rounded-xl"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right: Coordinates + Theme toggle */}
      <div className="flex h-8 items-center gap-5">
        <span className="hidden font-mono text-[10px] text-neutral-400 md:inline">
          X:{String(coords.x).padStart(4, "\u00A0")} - Y:{String(coords.y).padStart(4, "\u00A0")}
        </span>
        <ThemeToggle
          variant="circle-blur"
          start="top-right"
          className="flex size-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-200 hover:text-foreground dark:hover:bg-white/10"
          iconClassName="size-4"
        />
      </div>
    </header>
  );
}