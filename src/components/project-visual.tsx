import type { CSSProperties } from "react";

type ProjectVisualProps = {
  className?: string;
  color?: string;
};

export default function ProjectVisual({
  className,
  color = "var(--accent)",
}: ProjectVisualProps) {
  return (
    <div
      aria-hidden="true"
      style={{ "--project-color": color } as CSSProperties}
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl border border-border-subtle bg-surface-2 ${className ?? ""}`}
    >
      <div
        className="project-visual-glow pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 rounded-full"
        style={{ marginLeft: "-8rem", marginTop: "-8rem" }}
      />

      <div
        className="orbit-ring pointer-events-none left-1/2 top-1/2 h-40 w-40"
        style={{ marginLeft: "-5rem", marginTop: "-5rem" }}
      >
        <span className="orbit-dot" />
      </div>
      <div
        className="orbit-ring orbit-ring-b pointer-events-none left-1/2 top-1/2 h-52 w-52"
        style={{ marginLeft: "-6.5rem", marginTop: "-6.5rem" }}
      >
        <span className="orbit-dot" />
      </div>

      <div className="visual-window-tilt glass relative z-10 w-[85%] max-w-xs rounded-xl border border-border-subtle p-3.5 shadow-xl shadow-black/20">
        <div className="flex items-center gap-1.5 border-b border-border-subtle pb-2.5">
          <span className="h-2 w-2 rounded-full bg-foreground/15" />
          <span className="h-2 w-2 rounded-full bg-foreground/15" />
          <span className="h-2 w-2 rounded-full bg-foreground/15" />
        </div>
        <div className="mt-3 space-y-2">
          <div
            className="h-2 w-[45%] rounded-full"
            style={{ backgroundColor: "var(--project-color)" }}
          />
          <div
            className="h-2 w-[80%] rounded-full opacity-30"
            style={{ backgroundColor: "var(--project-color)" }}
          />
          <div
            className="h-2 w-[65%] rounded-full opacity-30"
            style={{ backgroundColor: "var(--project-color)" }}
          />
          <div
            className="h-2 w-[34%] rounded-full opacity-30"
            style={{ backgroundColor: "var(--project-color)" }}
          />
        </div>
      </div>
    </div>
  );
}
