"use client";

import { ThemeToggle } from "@/components/motion/theme-toggle";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background text-foreground transition-colors">
      <ThemeToggle
        variant="circle-blur"
        start="top-right"
        className="absolute right-6 top-6 z-10 size-9 rounded-full text-neutral-400 hover:text-foreground hover:bg-neutral-200 dark:hover:bg-white/10"
        iconClassName="size-5"
      />
    </main>
  );
}
