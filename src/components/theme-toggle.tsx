"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import { useIsDarkMode } from "@/hooks/use-is-dark-mode";
import { useMediaQuery } from "@/hooks/use-media-query";

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => void;
};

function applyTheme(next: boolean) {
  document.documentElement.classList.toggle("dark", next);
  localStorage.setItem("theme", next ? "dark" : "light");
}

export default function ThemeToggle() {
  const isDark = useIsDarkMode();
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggle = () => {
    const next = !isDark;
    const doc = document as DocumentWithViewTransition;
    const btn = buttonRef.current;

    if (!doc.startViewTransition || prefersReducedMotion || !btn) {
      applyTheme(next);
      return;
    }

    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    document.documentElement.style.setProperty("--toggle-x", `${x}px`);
    document.documentElement.style.setProperty("--toggle-y", `${y}px`);

    doc.startViewTransition(() => applyTheme(next));
  };

  return (
    <button
      ref={buttonRef}
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-foreground/80 transition-colors hover:border-accent hover:text-accent"
    >
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex items-center justify-center"
      >
        {isDark ? <FiMoon size={16} /> : <FiSun size={16} />}
      </motion.span>
    </button>
  );
}
