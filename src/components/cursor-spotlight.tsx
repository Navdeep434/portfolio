"use client";

import { useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function CursorSpotlight() {
  const enabled = useMediaQuery("(pointer: fine)");

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    const onMove = (e: MouseEvent) => {
      root.style.setProperty("--spot-x-global", `${e.clientX}px`);
      root.style.setProperty("--spot-y-global", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled]);

  if (!enabled) return null;

  return <div className="cursor-spotlight-global" aria-hidden="true" />;
}
