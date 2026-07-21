import FadeIn from "@/components/fade-in";
import SectionKicker from "@/components/section-kicker";
import { education } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <FadeIn>
          <SectionKicker index="06" label="Education" />
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Where it started
          </h2>
        </FadeIn>

        <div className="relative mt-16 pl-8 sm:pl-10">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border-subtle sm:left-[11px]" />

          <ol className="space-y-14">
            {education.map((item, i) => (
              <li key={`${item.school}-${item.degree}`} className="relative">
                <FadeIn delay={i * 0.05} x={-20} y={0} duration={0.5}>
                  <span className="absolute -left-8 top-1.5 flex h-3.5 w-3.5 items-center justify-center sm:-left-10">
                    <span className="absolute h-3.5 w-3.5 rounded-full bg-accent/25" />
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  </span>

                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {item.degree}{" "}
                      <span className="text-muted">· {item.school}</span>
                    </h3>
                    <span className="text-sm font-medium text-accent">
                      {item.duration}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted">{item.location}</p>

                  <ul className="mt-4 space-y-2">
                    {item.details.map((detail, di) => (
                      <li
                        key={di}
                        className="flex gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
