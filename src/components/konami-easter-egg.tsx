"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

type Particle = {
  id: number;
  x: number;
  rotation: number;
  color: string;
  delay: number;
  drift: number;
};

const colors = ["#34d399", "#6ee7b7", "#fbbf24", "#60a5fa", "#f472b6"];

export default function KonamiEasterEgg() {
  const [active, setActive] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const progress = useRef(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const expected = KONAMI[progress.current];
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === expected) {
        progress.current += 1;
        if (progress.current === KONAMI.length) {
          progress.current = 0;
          triggerEasterEgg();
        }
      } else {
        progress.current = key === KONAMI[0] ? 1 : 0;
      }
    };

    const triggerEasterEgg = () => {
      const burst: Particle[] = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.3,
        drift: (Math.random() - 0.5) * 200,
      }));
      setParticles(burst);
      setActive(true);
      setTimeout(() => setActive(false), 3200);
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ y: "-10vh", x: `${p.x}vw`, opacity: 1, rotate: 0 }}
              animate={{
                y: "110vh",
                x: `calc(${p.x}vw + ${p.drift}px)`,
                rotate: p.rotation,
                opacity: [1, 1, 0],
              }}
              transition={{ duration: 2.6, delay: p.delay, ease: "easeIn" }}
              style={{ backgroundColor: p.color }}
              className="absolute h-2.5 w-2.5 rounded-sm"
            />
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl px-8 py-6 text-center shadow-2xl"
          >
            <p className="font-display text-lg font-semibold text-accent">
              🎮 Achievement Unlocked
            </p>
            <p className="mt-1 text-sm text-muted">
              You found the Konami code. Bonus points for curiosity.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
