"use client";

import { ThemeToggle } from "@/components/motion/theme-toggle";
import { useCoordinates } from "@/components/Hero/CoordinateTracker";

export function HeaderBar() {
  const { coords } = useCoordinates();

  return (
    <header className="flex w-full items-center justify-between px-6 py-4 md:px-10">
      {/* Left: Logo */}
      <a href="/" className="text-sm font-medium tracking-tight">
        iamshakibali
      </a>

      {/* Right: Coordinates + Theme toggle */}
      <div className="flex items-center gap-5">
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