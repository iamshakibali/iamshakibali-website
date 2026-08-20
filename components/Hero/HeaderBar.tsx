"use client";

import { ThemeToggle } from "@/components/motion/theme-toggle";
import { useCoordinates } from "@/components/Hero/CoordinateTracker";

export function HeaderBar() {
  const { coords } = useCoordinates();

  return (
    <header className="flex w-full items-center justify-between px-6 py-4 md:px-10">
      {/* Left: Name */}
      <div className="text-sm font-medium">Iamshakibali</div>

      {/* Right: Nav + Coordinates + Theme toggle */}
      <div className="flex items-center gap-5">
        <nav className="hidden items-center gap-4 text-sm text-neutral-500 md:flex">
          <a
            href="#"
            className="transition-colors hover:text-foreground"
          >
            Playground
          </a>
          <a
            href="#"
            className="transition-colors hover:text-foreground"
          >
            Contribution
          </a>
        </nav>
        <span className="hidden font-mono text-xs text-neutral-400 md:inline">
          {String(coords.x).padStart(4, "\u00A0")} ·{" "}
          {String(coords.y).padStart(4, "\u00A0")}
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