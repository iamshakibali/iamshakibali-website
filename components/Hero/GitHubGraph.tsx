"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

function generateContributions() {
  const weeks = 20;
  const days = 7;
  const grid: number[][] = [];

  for (let w = 0; w < weeks; w++) {
    const week: number[] = [];
    for (let d = 0; d < days; d++) {
      const rand = Math.random();
      let level = 0;
      if (rand > 0.6) level = 1;
      if (rand > 0.8) level = 2;
      if (rand > 0.93) level = 3;
      if (rand > 0.98) level = 4;
      week.push(level);
    }
    grid.push(week);
  }
  return grid;
}

const LEVEL_CLASSES = [
  "bg-neutral-200 dark:bg-neutral-800",
  "bg-green-200 dark:bg-green-900/60",
  "bg-green-300 dark:bg-green-700/60",
  "bg-green-400 dark:bg-green-500/60",
  "bg-green-500 dark:bg-green-400/60",
];

export function GitHubGraph() {
  const [grid, setGrid] = useState<number[][]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setGrid(generateContributions());
  }, []);

  if (!mounted) return <div className="h-[125px]" />;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-xs text-neutral-500">GitHub Activity</span>
      </div>

      <div className="flex gap-[3px]">
        {grid.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((level, di) => (
              <motion.div
                key={`${wi}-${di}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: (wi * 7 + di) * 0.002,
                  ease: "easeOut",
                }}
                className={`h-2.5 w-2.5 rounded-[3px] ${LEVEL_CLASSES[level]}`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1.5 text-xs text-neutral-500">
        <span>Less</span>
        <div className="flex gap-[3px]">
          {[0, 1, 2, 3, 4].map((l) => (
            <div
              key={l}
              className={`h-2.5 w-2.5 rounded-[3px] ${LEVEL_CLASSES[l]}`}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}