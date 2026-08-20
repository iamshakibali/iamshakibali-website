"use client";

import { useEffect, useState } from "react";

export function useHoverCapable() {
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(hover: hover)");
    setCapable(mql.matches);
    const handler = (e: MediaQueryListEvent) => setCapable(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return capable;
}
