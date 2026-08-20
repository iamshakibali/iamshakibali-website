"use client";

const GRID: string[] = [
  "#e5e5e5 #00bc7d #5ee9b5 #5ee9b5 #5ee9b5 #5ee9b5 #5ee9b5 #e5e5e5 #5ee9b5 #5ee9b5 #5ee9b5 #5ee9b5",
  "#096     #00bc7d #096     #5ee9b5 #00bc7d #00bc7d #5ee9b5 #5ee9b5 #5ee9b5 #00bc7d #00bc7d #5ee9b5",
  "#e5e5e5 #5ee9b5 #e5e5e5 #5ee9b5 #5ee9b5 #5ee9b5 #00bc7d #e5e5e5 #5ee9b5 #00bc7d #00bc7d #00bc7d",
  "#5ee9b5 #096     #5ee9b5 #5ee9b5 #5ee9b5 #e5e5e5 #096     #00bc7d #096     #00bc7d #5ee9b5 #00bc7d",
  "#e5e5e5 #e5e5e5 #096     #e5e5e5 #e5e5e5 #5ee9b5 #e5e5e5 #096     #e5e5e5 #e5e5e5 #e5e5e5 #e5e5e5",
];

export function GitHubHoverCard() {
  return (
    <div className="flex h-[146px] w-[290px] flex-col items-start rounded-[12px] bg-white p-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.08)] dark:bg-zinc-900 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <div className="flex w-full items-center justify-between">
        <span className="size-[20px] shrink-0 text-[#525252] dark:text-zinc-400">
          <img
            src="/icons/github.svg"
            alt=""
            width={20}
            height={20}
            className="size-full"
          />
        </span>
        <p className="text-[12.8px] leading-[19.2px] tracking-[-0.256px] whitespace-nowrap">
          <span className="font-semibold text-[#262626] dark:text-zinc-100">187</span>
          <span className="font-normal text-[#737373] dark:text-zinc-400"> contributions in 2026</span>
        </p>
      </div>
      <div className="flex w-full flex-col pt-[12px]">
        <div className="grid w-full grid-cols-12 gap-[3px]">
          {GRID.flatMap((row) =>
            row.split(" ").map((color, i) => (
              <div
                key={`${row}-${i}`}
                className="size-[14px] rounded-[3px] sm:size-[15px]"
                style={{ background: color }}
              />
            )),
          )}
        </div>
      </div>
    </div>
  );
}
