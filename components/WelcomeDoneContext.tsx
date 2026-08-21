"use client";

import { createContext, useContext } from "react";

export const WelcomeDoneContext = createContext(false);

export function useWelcomeDone() {
  return useContext(WelcomeDoneContext);
}