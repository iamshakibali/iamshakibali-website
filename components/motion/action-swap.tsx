"use client";
// beui.dev/components/motion/action-swap

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ActionSwapIconProps {
  /** Current value; when it changes, children swap with an animation. */
  value: string;
  animation?: "blur" | "slide" | "scale";
  children: ReactNode;
  className?: string;
}

export function ActionSwapIcon({
  value,
  animation = "blur",
  children,
  className,
}: ActionSwapIconProps) {
  const variants = {
    blur: {
      initial: { opacity: 0, filter: "blur(4px)" },
      animate: { opacity: 1, filter: "blur(0px)" },
      exit: { opacity: 0, filter: "blur(4px)" },
    },
    slide: {
      initial: { opacity: 0, y: 4 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -4 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
    },
  }[animation];

  return (
    <span className={cn("relative inline-flex", className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={value}
          className="inline-flex"
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
