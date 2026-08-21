"use client";

import { useCallback, useRef, type PointerEvent } from "react";

export function useHoverGesture() {
  const hovering = useRef(false);

  const enter = useCallback((e: PointerEvent) => {
    if (e.pointerType === "touch") return false;
    hovering.current = true;
    return true;
  }, []);

  const leave = useCallback((e: PointerEvent) => {
    if (e.pointerType === "touch") return false;
    hovering.current = false;
    return true;
  }, []);

  return { enter, leave };
}
