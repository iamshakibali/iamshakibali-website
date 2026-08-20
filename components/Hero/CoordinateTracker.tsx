"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface Coordinates {
  x: number;
  y: number;
}

interface CoordinateContextValue {
  coords: Coordinates;
  handleMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
}

const CoordinateContext = createContext<CoordinateContextValue>({
  coords: { x: 0, y: 0 },
  handleMouseMove: () => {},
});

export function CoordinateProvider({ children }: { children: ReactNode }) {
  const [coords, setCoords] = useState<Coordinates>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    });
  };

  return (
    <CoordinateContext.Provider value={{ coords, handleMouseMove }}>
      {children}
    </CoordinateContext.Provider>
  );
}

export function useCoordinates() {
  return useContext(CoordinateContext);
}