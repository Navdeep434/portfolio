"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { getCursorStyle, subscribeCursorStyle } from "@/lib/cursor-style";
import { useMediaQuery } from "@/hooks/use-media-query";

const INTERACTIVE_SELECTOR = "a, button, [data-cursor-hover]";

export default function CustomCursor() {
  const enabled = useMediaQuery("(pointer: fine)");
  const style = useSyncExternalStore(subscribeCursorStyle, getCursorStyle, () => "ring" as const);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);
  const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const dotX = useSpring(x, { stiffness: 900, damping: 45, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 900, damping: 45, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  const velocityX = useVelocity(ringX);
  const skewX = useTransform(velocityX, [-1500, 1500], [-18, 18]);
  const stretchX = useTransform(velocityX, [-1500, 0, 1500], [1.3, 1, 1.3]);

  useEffect(() => {
    if (!enabled) return;

    let lastX = -100;
    let lastY = -100;

    const applyHoverState = (target: HTMLElement | null) => {
      if (target) {
        setHovering(true);
        setLabel(target.getAttribute("data-cursor-text"));
        setHoveredRect(target.getBoundingClientRect());
      } else {
        setHovering(false);
        setLabel(null);
        setHoveredRect(null);
      }
    };

    const onMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      x.set(lastX);
      y.set(lastY);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.(
        INTERACTIVE_SELECTOR
      ) as HTMLElement | null;
      if (target) applyHoverState(target);
    };

    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      const stillInside = related?.closest?.(INTERACTIVE_SELECTOR);
      if (!stillInside) applyHoverState(null);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    // Scrolling moves content under a stationary cursor without firing
    // mouseover/mouseout, so the hover state (and "VIEW" label) can get
    // stuck on whatever was last actually moused over. Re-check what's
    // under the cursor's last known position whenever the page scrolls.
    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        const el = document.elementFromPoint(lastX, lastY) as HTMLElement | null;
        const target = el?.closest?.(INTERACTIVE_SELECTOR) as HTMLElement | null;
        applyHoverState(target);
      });
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      window.removeEventListener("scroll", onScroll, true);
      cancelAnimationFrame(scrollRaf);
    };
  }, [x, y, enabled]);

  if (!enabled) return null;

  // ---- Terminal blinking caret ----
  if (style === "terminal") {
    return (
      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 4 : 3,
          height: hovering ? 26 : 20,
          scale: pressed ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="cursor-caret-blink pointer-events-none fixed left-0 top-0 z-[70] bg-accent will-change-transform"
      />
    );
  }

  // ---- Crosshair reticle ----
  if (style === "crosshair") {
    return (
      <>
        <motion.div
          aria-hidden="true"
          style={{ y: ringY, top: 0, left: 0 }}
          className="pointer-events-none fixed z-[70] h-px w-full bg-accent/25 will-change-transform"
        />
        <motion.div
          aria-hidden="true"
          style={{ x: ringX, top: 0, left: 0 }}
          className="pointer-events-none fixed z-[70] h-full w-px bg-accent/25 will-change-transform"
        />
        <motion.div
          aria-hidden="true"
          style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
          animate={{
            width: hovering ? 28 : 16,
            height: hovering ? 28 : 16,
            borderColor: hovering ? "var(--accent)" : "color-mix(in srgb, var(--accent) 60%, transparent)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="pointer-events-none fixed left-0 top-0 z-[70] rounded-sm border will-change-transform"
        />
      </>
    );
  }

  // ---- Magnetic frame-snap ----
  if (style === "frame") {
    if (hoveredRect) {
      return (
        <motion.div
          aria-hidden="true"
          animate={{
            width: hoveredRect.width + 12,
            height: hoveredRect.height + 12,
            x: hoveredRect.left - 6,
            y: hoveredRect.top - 6,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="pointer-events-none fixed left-0 top-0 z-[70] rounded-xl border border-accent bg-accent-soft will-change-transform"
        />
      );
    }
    return (
      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: pressed ? 0.7 : 1 }}
        className="pointer-events-none fixed left-0 top-0 z-[70] h-2 w-2 rounded-full bg-accent will-change-transform"
      />
    );
  }

  // ---- Elastic gradient blob ----
  if (style === "blob") {
    return (
      <motion.div
        aria-hidden="true"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          skewX,
          scaleX: stretchX,
        }}
        animate={{
          width: label ? 60 : hovering ? 42 : 24,
          height: label ? 60 : hovering ? 42 : 24,
          scale: pressed ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 opacity-80 blur-[1px] will-change-transform"
      >
        {label && (
          <span className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-wide text-[#1c1005] blur-none">
            {label}
          </span>
        )}
      </motion.div>
    );
  }

  // ---- Minimal outline-only ring ----
  if (style === "minimal") {
    return (
      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 34 : 22,
          height: hovering ? 34 : 22,
          opacity: hovering ? 1 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full border border-accent will-change-transform"
      />
    );
  }

  // ---- Icon swap ----
  if (style === "icon") {
    return (
      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 34 : 10,
          height: hovering ? 34 : 10,
          scale: pressed ? 0.85 : 1,
          backgroundColor: hovering ? "var(--accent)" : "var(--accent)",
        }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
        className="pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-full will-change-transform"
      >
        {hovering && <FiArrowUpRight size={14} className="text-[#1c1005]" />}
      </motion.div>
    );
  }

  // ---- Default: dot + ring ----
  const ringSize = label ? 72 : hovering ? 46 : 30;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: hovering ? 0 : pressed ? 0.6 : 1 }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none fixed left-0 top-0 z-[70] h-1.5 w-1.5 rounded-full bg-accent will-change-transform"
      />

      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: ringSize,
          height: ringSize,
          scale: pressed ? 0.9 : 1,
          backgroundColor: label
            ? "var(--surface)"
            : hovering
              ? "var(--accent-soft)"
              : "transparent",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        className="pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-full border border-accent will-change-transform"
      >
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
            className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-accent"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
