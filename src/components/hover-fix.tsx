"use client";

import { useEffect } from "react";

/**
 * Browsers (Chrome especially) don't re-evaluate :hover on elements that
 * scroll under a stationary cursor -- :hover is only recomputed on actual
 * pointer movement. That leaves hover styles (borders, glows, color
 * changes) stuck on whatever was last physically moused over. Standard
 * fix: briefly disable pointer-events during scroll so the browser is
 * forced to invalidate and recompute hover state once scrolling settles.
 */
export default function HoverFix() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      document.body.style.pointerEvents = "none";
      clearTimeout(timer);
      timer = setTimeout(() => {
        document.body.style.pointerEvents = "";
      }, 60);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
      document.body.style.pointerEvents = "";
    };
  }, []);

  return null;
}
