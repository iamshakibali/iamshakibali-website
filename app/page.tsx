"use client";

import Folder from "@/components/Folder";
import { ThemeToggle } from "@/components/motion/theme-toggle";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950">
      <ThemeToggle
        variant="circle-blur"
        start="top-right"
        className="absolute right-6 top-6 z-10 size-9 rounded-full text-neutral-400 hover:text-white hover:bg-white/10"
        iconClassName="size-5"
      />
      <Folder size="lg" color="black" />
    </main>
  );
}
