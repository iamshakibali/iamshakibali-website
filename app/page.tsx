"use client";

import { CoordinateProvider, useCoordinates } from "@/components/Hero/CoordinateTracker";
import { HeaderBar } from "@/components/Hero/HeaderBar";
import { HeroText } from "@/components/Hero/HeroText";
import { ActionButtons } from "@/components/Hero/ActionButtons";
import { GitHubGraph } from "@/components/Hero/GitHubGraph";

function HeroContent() {
  const { handleMouseMove } = useCoordinates();

  return (
    <div
      className="relative flex min-h-screen flex-col bg-background text-foreground"
      onMouseMove={handleMouseMove}
    >
      <HeaderBar />

      <div className="flex flex-1 flex-col justify-center px-6 pb-20 pt-12 md:px-10">
        <div className="max-w-2xl space-y-10">
          <HeroText />
          <ActionButtons />
          <GitHubGraph />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <CoordinateProvider>
      <HeroContent />
    </CoordinateProvider>
  );
}