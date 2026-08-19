"use client";

import dynamic from "next/dynamic";
import {
  Dribbble,
  Twitter,
  Linkedin,
  Github,
  Mail,
  FileText,
} from "lucide-react";
import { content } from "@/lib/content";

// three.js touches the DOM — load the canvas client-side only.
const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

// Maps content.socials[].label -> lucide icon. Labels must match content.ts.
const socialIcons = {
  Dribbble,
  X: Twitter,
  LinkedIn: Linkedin,
  GitHub: Github,
} as const;

export default function Home() {
  return (
    <main className="relative flex min-h-screen overflow-hidden">
      {/* Text Content - Left 2/5 */}
      <section className="relative z-10 flex w-2/5 flex-col justify-between p-8 md:p-12">
        {/* Header */}
        <header>
          <span className="text-sm font-semibold uppercase tracking-widest">
            {content.name}
          </span>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 flex-col justify-center">
          <h1 className="max-w-md text-3xl font-bold tracking-tight md:text-5xl">
            {content.headline}
          </h1>
          <p className="mt-4 max-w-sm text-sm text-neutral-400 md:text-base">
            {content.subtext}
          </p>

          {/* CTA row */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={content.resumeUrl}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
            >
              <FileText size={16} />
              Resume
            </a>
            <a
              href={`mailto:${content.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-4 py-2.5 text-sm font-medium transition-colors hover:border-neutral-400"
            >
              <Mail size={16} />
              {content.email}
            </a>
          </div>

          {/* Socials */}
          <div className="mt-8 flex items-center gap-3">
            {content.socials.map((s) => {
              const Icon = socialIcons[s.label as keyof typeof socialIcons];
              return (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="rounded-full border border-neutral-800 p-2 text-neutral-400 transition-colors hover:border-neutral-500 hover:text-white"
                >
                  {Icon ? <Icon size={16} /> : null}
                </a>
              );
            })}
          </div>
        </div>

        <footer />
      </section>

      {/* Three.js Scene - Right 3/5 */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        <Scene />
      </div>
    </main>
  );
}
