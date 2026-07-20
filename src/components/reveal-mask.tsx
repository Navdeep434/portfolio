"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealMaskProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "left" | "right";
};

export default function RevealMask({
  children,
  delay = 0,
  className,
  direction = "left",
}: RevealMaskProps) {
  const hiddenClip =
    direction === "left" ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";

  return (
    <motion.div
      className={className}
      initial={{ clipPath: hiddenClip }}
      whileInView={{ clipPath: "inset(0 0 0 0)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay, ease: [0.65, 0, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}
