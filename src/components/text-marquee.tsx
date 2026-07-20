const phrases = [
  { text: "BUILDING RELIABLE SYSTEMS", outlined: false },
  { text: "SHIPPING CLEAN CODE", outlined: true },
  { text: "JAVA · NEXT.JS · LARAVEL", outlined: false },
  { text: "OPEN TO NEW ROLES", outlined: true },
];

export default function TextMarquee() {
  const sequence = [...phrases, ...phrases];

  return (
    <div className="relative overflow-hidden border-y border-border-subtle bg-surface/40 py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <div
        className="marquee-track flex w-max items-center gap-10"
        style={{ animationDuration: "26s" }}
      >
        {sequence.map((phrase, i) => (
          <div key={i} className="flex shrink-0 items-center gap-10">
            <span
              className="font-display whitespace-nowrap text-4xl font-semibold tracking-tight sm:text-6xl"
              style={
                phrase.outlined
                  ? {
                      color: "transparent",
                      WebkitTextStroke: "1.5px var(--accent)",
                    }
                  : { color: "var(--foreground)" }
              }
            >
              {phrase.text}
            </span>
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
