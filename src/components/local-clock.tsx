"use client";

import { useEffect, useState } from "react";

export default function LocalClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }).format(new Date())
      );
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span className="hidden items-center gap-1.5 rounded-full border border-border-subtle px-3 py-1.5 font-mono text-xs text-muted lg:flex">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {time} IST
    </span>
  );
}
