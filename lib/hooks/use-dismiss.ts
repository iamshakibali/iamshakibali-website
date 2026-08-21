"use client";

import { useEffect, type RefObject } from "react";

export function useDismiss(
  open: boolean,
  onDismiss: () => void,
  anchorRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!anchorRef.current?.contains(e.target as Node) && !(e.target as Element).closest?.('[role="tooltip"]')) {
        onDismiss();
      }
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open, onDismiss, anchorRef]);
}
