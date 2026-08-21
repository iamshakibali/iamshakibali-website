"use client";
// beui.dev/components/motion/action-swap

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ActionSwapIconProps {
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
  const reduce = useReducedMotion() ?? false;
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

  if (reduce) {
    return <span className={cn("inline-flex items-center justify-center", className)}>{children}</span>;
  }

  return (
    <span className={cn("relative inline-flex items-center justify-center", className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={value}
          className="inline-flex items-center justify-center"
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

export interface ActionSwapTextProps {
  value: string;
  animation?: "blur" | "cascade";
  className?: string;
}

export function ActionSwapText({
  value,
  animation = "blur",
  className,
}: ActionSwapTextProps) {
  const reduce = useReducedMotion() ?? false;

  if (reduce || animation !== "cascade" || typeof value !== "string") {
    const variants =
      animation === "blur"
        ? {
            initial: { opacity: 0, filter: "blur(4px)" },
            animate: { opacity: 1, filter: "blur(0px)" },
            exit: { opacity: 0, filter: "blur(4px)" },
          }
        : {
            initial: { opacity: 0, y: 6 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -6 },
          };
    return (
      <span className={cn("relative inline-flex items-center overflow-visible pr-[2px]", className)}>
        <span className="invisible whitespace-pre pr-[2px]" aria-hidden="true">
          {value}
        </span>
        <span className="sr-only">{value}</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={value}
            className="absolute inset-0 inline-flex items-center"
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={{ duration: 0.15, ease: "easeOut" }}
            aria-hidden="true"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </span>
    );
  }

  const chars = value.split("");

  return (
    <span className={cn("relative inline-flex items-center overflow-visible pr-[2px]", className)}>
      <span className="invisible whitespace-pre pr-[2px]" aria-hidden="true">
        {value}
      </span>
      <span className="sr-only">{value}</span>
      <span className="absolute inset-0 inline-flex items-center" aria-hidden="true">
        {chars.map((char, i) => (
          <motion.span
            key={`${value}-${i}`}
            initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              type: "spring",
              stiffness: 460,
              damping: 30,
              mass: 0.55,
              delay: i * 0.025,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    </span>
  );
}

export type ActionSwapCascadeTextProps = Omit<ActionSwapTextProps, "animation">;

export function ActionSwapCascadeText(props: ActionSwapCascadeTextProps) {
  return <ActionSwapText {...props} animation="cascade" />;
}

export type ActionSwapCascadeIconProps = Omit<ActionSwapIconProps, "animation">;

export function ActionSwapCascadeIcon(props: ActionSwapCascadeIconProps) {
  return <ActionSwapIcon {...props} animation="blur" />;
}
