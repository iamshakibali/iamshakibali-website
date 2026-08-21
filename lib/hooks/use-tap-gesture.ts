"use client";

import { useCallback, useRef, type PointerEvent } from "react";

type Record<T> = { pointerType: string; state: T };

export function useTapGesture<T>() {
  const ref = useRef<Record<T> | null>(null);

  const start = useCallback((e: PointerEvent, state: T) => {
    ref.current = { pointerType: (e as PointerEvent).pointerType, state };
  }, []);

  const take = useCallback(() => {
    const v = ref.current;
    ref.current = null;
    return v;
  }, []);

  const drop = useCallback(() => {
    ref.current = null;
  }, []);

  return { start, take, drop };
}
