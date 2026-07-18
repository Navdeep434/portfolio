import Image from "next/image";
import FadeIn from "@/components/fade-in";
import TiltCard from "@/components/tilt-card";
import SpotlightCard from "@/components/spotlight-card";
import AnimatedCounter from "@/components/animated-counter";
import SectionKicker from "@/components/section-kicker";

const focusAreas = [
  {
    title: "Backend Architecture",
    description:
      "Designing services in Java/Spring Boot and Laravel that stay maintainable as they scale.",
  },
  {
    title: "API Design",
    description:
      "Building REST APIs with clear contracts, consistent error handling, and solid documentation.",
  },
  {
    title: "Full-Stack Delivery",
    description:
      "Owning features end-to-end — from SQL schema to a polished Next.js interface.",
  },
];

const stats = [
  { value: 4, suffix: "+", label: "Years experience" },
  { value: 20, suffix: "+", label: "Projects shipped" },
  { value: 3, suffix: "", label: "Tech ecosystems" },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <FadeIn>
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/20 to-transparent blur-2xl" />
              <TiltCard maxTilt={8} className="relative">
                <div className="glass relative overflow-hidden rounded-[2rem] p-2 shadow-xl shadow-black/10">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] bg-surface-2">
                    <Image
                      src="/avatar.jpg"
                      alt="Portrait of Navdeep Raushan"
                      fill
                      sizes="(max-width: 1024px) 60vw, 380px"
                      className="object-cover"
                      priority={false}
                    />
                  </div>
                </div>
              </TiltCard>
              <div className="glass absolute -bottom-6 -right-6 rounded-2xl px-5 py-4 shadow-lg">
                <p className="font-display text-2xl font-semibold text-accent">
                  <AnimatedCounter value={4} suffix="+" />
                </p>
                <p className="text-xs text-muted">Years building software</p>
              </div>
            </div>
          </FadeIn>

          <div>
            <FadeIn>
              <SectionKicker index="01" label="About" />
              <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Engineering software that holds up in production
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-muted">
                I&apos;m a software engineer who moves comfortably across the
                stack — writing REST APIs in Java and Spring Boot, building
                MVC applications in Laravel, and shipping modern, reactive
                frontends in Next.js and TypeScript. I care about clean
                architecture, readable code, and systems that are easy to
                reason about six months later.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Most of my work sits at the intersection of backend
                architecture and full-stack delivery: designing the data
                model, exposing it through a well-considered API, and
                building the interface that makes it usable.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-8 border-y border-border-subtle py-6">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-2xl font-semibold text-foreground">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-1 text-xs text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {focusAreas.map((area, i) => (
                <FadeIn key={area.title} delay={0.15 + i * 0.08}>
                  <SpotlightCard className="h-full rounded-2xl border border-border-subtle bg-surface/60 p-5 transition-colors hover:border-accent/50">
                    <h3 className="font-display text-sm font-semibold text-foreground">
                      {area.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {area.description}
                    </p>
                  </SpotlightCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
