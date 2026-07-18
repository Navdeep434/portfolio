type SectionKickerProps = {
  index: string;
  label: string;
};

export default function SectionKicker({ index, label }: SectionKickerProps) {
  return (
    <p className="mb-3 flex items-center gap-2.5 text-sm font-medium uppercase tracking-[0.2em] text-accent">
      <span className="font-mono text-xs text-muted">{index}</span>
      {label}
    </p>
  );
}
