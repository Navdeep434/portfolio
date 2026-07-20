import { FiMessageSquare } from "react-icons/fi";
import FadeIn from "@/components/fade-in";
import SectionKicker from "@/components/section-kicker";
import SpotlightCard from "@/components/spotlight-card";
import { testimonials } from "@/lib/data";

// Pinned-note treatment: slight independent rotation/offset per card
// instead of a perfectly aligned three-column grid.
const cardStyle = [
  { rotate: "-1.5deg", offset: "lg:mt-0", radius: "rounded-2xl" },
  { rotate: "1deg", offset: "lg:mt-8", radius: "rounded-3xl" },
  { rotate: "-0.75deg", offset: "lg:-mt-2", radius: "rounded-xl" },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <FadeIn>
          <SectionKicker index="06" label="Testimonials" />
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            What people say about working with me
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted">
            Placeholder quotes — swap these for real feedback from managers,
            teammates, or clients.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {testimonials.map((t, i) => {
            const style = cardStyle[i % cardStyle.length];
            return (
              <FadeIn key={t.name} delay={i * 0.1} y={34} className={style.offset}>
                <div
                  style={{ transform: `rotate(${style.rotate})` }}
                  className="group/tilt transition-transform duration-300 hover:rotate-0"
                >
                  <SpotlightCard
                    className={`flex h-full flex-col border border-border-subtle bg-surface/60 p-7 shadow-lg shadow-black/5 ${style.radius}`}
                  >
                    <FiMessageSquare className="text-accent" size={20} />
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-6 border-t border-border-subtle pt-4">
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="mt-0.5 text-xs text-muted">{t.role}</p>
                    </div>
                  </SpotlightCard>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
