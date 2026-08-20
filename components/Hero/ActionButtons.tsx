"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink } from "lucide-react";
import { GitHubGraph } from "@/components/Hero/GitHubGraph";

interface ButtonConfig {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  renderCard?: () => React.ReactNode;
}

const buttons: ButtonConfig[] = [
  {
    id: "email",
    label: "h@harshsingh.me",
    href: "mailto:hello@imahskaibali.com",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    renderCard: () => (
      <div className="space-y-2">
        <p className="text-sm font-medium">Send an email</p>
        <p className="text-xs text-neutral-500">hello@imahskaibali.com</p>
        <div className="pt-1">
          <span className="text-[11px] text-neutral-400">Opens your email client</span>
        </div>
      </div>
    ),
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/imahskaibali",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    renderCard: () => (
      <div className="space-y-2">
        <p className="text-sm font-medium">@imahskaibali</p>
        <p className="text-xs text-neutral-500">Product design engineer · Bangladesh</p>
        <div className="flex gap-4 pt-1 text-xs text-neutral-500">
          <span>1.2k followers</span>
          <span>847 following</span>
        </div>
      </div>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/iamshakibali",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    renderCard: () => (
      <div className="w-72">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">Iamshakibali</p>
              <p className="text-xs text-neutral-500">product design engineer</p>
            </div>
          </div>
          <ExternalLink size={14} className="text-neutral-400" />
        </div>
        <p className="text-sm mb-3">
          <span className="font-semibold text-foreground">230+</span>{" "}
          <span className="text-neutral-500">contributions in 2025</span>
        </p>
        <GitHubGraph compact />
        <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex gap-4 text-xs text-neutral-500">
          <span>
            <strong className="text-foreground">12</strong> repos
          </span>
          <span>
            <strong className="text-foreground">3</strong> orgs
          </span>
          <span>
            <strong className="text-foreground">847</strong> followers
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/imahskaibali",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    renderCard: () => (
      <div className="space-y-2">
        <div className="flex items-center gap-2 pb-3 border-b border-neutral-200 dark:border-neutral-800">
          <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600 dark:text-blue-400">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium">Shakib Ali</p>
            <p className="text-xs text-neutral-500">Product Design Engineer</p>
          </div>
        </div>
        <p className="text-xs text-neutral-500">Connect on LinkedIn to see shared posts and get in touch.</p>
      </div>
    ),
  },
];

export function ActionButtons() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const hovered = buttons.find((b) => b.id === hoveredId) ?? null;

  return (
    <div className="relative flex flex-wrap gap-2">
      {buttons.map((btn) => (
        <div key={btn.id} className="relative">
          <a
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-full border border-neutral-700/50 bg-white/5 px-3.5 py-2 text-xs font-medium text-neutral-400 transition-all hover:border-neutral-500 hover:text-foreground dark:hover:bg-white/10"
            onMouseEnter={() => setHoveredId(btn.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {btn.icon}
            {btn.label}
            <ExternalLink size={11} className="opacity-0 transition-opacity group-hover:opacity-60" />
          </a>
          <AnimatePresence>
            {hovered && hovered.id === btn.id && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute left-0 top-full z-20 mt-3 w-80 rounded-xl border border-neutral-700/60 bg-white p-4 shadow-xl dark:bg-neutral-900"
              >
                {btn.renderCard?.()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}