"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const colors = ["#34d399", "#6ee7b7", "#fbbf24", "#60a5fa", "#f472b6"];

type Particle = {
  id: number;
  x: number;
  y: number;
  rotate: number;
  color: string;
  delay: number;
};

function generateParticles(): Particle[] {
  return Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 240,
    y: -(Math.random() * 130 + 50),
    rotate: Math.random() * 360,
    color: colors[i % colors.length],
    delay: Math.random() * 0.12,
  }));
}

type ConfettiBurstProps = {
  burstId: number;
};

export default function ConfettiBurst({ burstId }: ConfettiBurstProps) {
  const [lastBurstId, setLastBurstId] = useState(burstId);
  const [particles, setParticles] = useState<Particle[]>([]);

  if (burstId !== lastBurstId) {
    setLastBurstId(burstId);
    if (burstId !== 0) setParticles(generateParticles());
  }

  if (burstId === 0 || particles.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-16 z-20 flex justify-center"
    >
      {particles.map((p) => (
        <motion.span
          key={`${burstId}-${p.id}`}
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
          animate={{ opacity: 0, x: p.x, y: p.y, rotate: p.rotate }}
          transition={{ duration: 0.9, delay: p.delay, ease: "easeOut" }}
          style={{ backgroundColor: p.color }}
          className="absolute bottom-0 h-2 w-2 rounded-sm"
        />
      ))}
    </div>
  );
}
