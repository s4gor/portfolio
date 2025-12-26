'use client';

import { useEffect } from "react";

export default function ConsoleEasterEgg() {
  useEffect(() => {
    console.log(
      "%cHello from s4gor! 👋\n%cThanks for checking out my portfolio code!",
      "font-weight: bold; font-size: 24px; color: #0ea5e9;", // sky-500
      "font-size: 14px; color: #64748b;" // slate-500
    );
  }, []);

  return null;
}
