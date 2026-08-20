"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ActionButtonsProps {
  onHoverChange?: (id: string | null) => void;
}

const buttons = [
  {
    id: "email",
    label: "Email",
    href: "mailto:hello@imahskaibali.com",
    preview: (
      <div className="space-y-1.5">
        <p className="text-xs font-medium">Send me an email</p>
        <p className="text-xs text-neutral-500">hello@imahskaibali.com</p>
      </div>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/iamshakibali",
    preview: (
      <div className="space-y-1.5">
        <p className="text-xs font-medium">View my repositories</p>
        <p className="text-xs text-neutral-500">12 public repos · 230+ contributions</p>
      </div>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/imahskaibali",
    preview: (
      <div className="space-y-1.5">
        <p className="text-xs font-medium">Connect with me</p>
        <p className="text-xs text-neutral-500">3k+ connections</p>
      </div>
    ),
  },
];

export function ActionButtons({ onHoverChange }: ActionButtonsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleHover = (id: string | null) => {
    setHoveredId(id);
    onHoverChange?.(id);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {buttons.map((btn) => (
        <div key={btn.id} className="relative">
          <a
            href={btn.href}
            target={btn.id !== "email" ? "_blank" : undefined}
            rel={btn.id !== "email" ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-700/50 px-3.5 py-2 text-xs font-medium text-neutral-300 transition-all hover:border-neutral-500 hover:text-foreground"
            onMouseEnter={() => handleHover(btn.id)}
            onMouseLeave={() => handleHover(null)}
          >
            {btn.label}
          </a>
          <AnimatePresence>
            {hoveredId === btn.id && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.96 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute left-0 top-full mt-2 w-56 rounded-lg border border-neutral-700/50 bg-neutral-900 p-3 shadow-lg dark:bg-neutral-900"
              >
                {btn.preview}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}