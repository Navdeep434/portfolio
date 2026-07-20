import type { IconType } from "react-icons";
import {
  FaJava,
  FaLaravel,
  FaPhp,
  FaReact,
  FaGitAlt,
  FaDocker,
} from "react-icons/fa";
import {
  SiSpringboot,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiMysql,
  SiPostman,
} from "react-icons/si";
import { TbApi, TbDatabase } from "react-icons/tb";
import { VscGitPullRequest } from "react-icons/vsc";
import FadeIn from "@/components/fade-in";
import SpotlightCard from "@/components/spotlight-card";
import SectionKicker from "@/components/section-kicker";
import { skillCategories } from "@/lib/data";

const iconMap: Record<string, IconType> = {
  java: FaJava,
  spring: SiSpringboot,
  laravel: FaLaravel,
  php: FaPhp,
  api: TbApi,
  nextjs: SiNextdotjs,
  react: FaReact,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  mssql: TbDatabase,
  mysql: SiMysql,
  git: FaGitAlt,
  docker: FaDocker,
  postman: SiPostman,
  cicd: VscGitPullRequest,
};

// Bento layout: Backend is the hero tile (most items, tallest); the rest
// arrange around it instead of four identical equal-width columns.
const tileSpan = [
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
];
const tileRadius = ["rounded-3xl", "rounded-2xl", "rounded-xl", "rounded-xl"];

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <FadeIn>
          <SectionKicker index="02" label="Skills" />
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            A toolkit spanning three ecosystems
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted">
            Comfortable owning a feature from database schema to deployed UI.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:auto-rows-[minmax(0,1fr)] lg:grid-cols-4">
          {skillCategories.map((category, ci) => (
            <FadeIn
              key={category.title}
              delay={ci * 0.08}
              className={`h-full ${tileSpan[ci % tileSpan.length]}`}
            >
              <SpotlightCard
                className={`h-full border border-border-subtle bg-surface/60 p-6 transition-colors hover:border-accent/40 ${tileRadius[ci % tileRadius.length]}`}
              >
                <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-muted">
                  {category.title}
                </h3>
                <div
                  className={`mt-5 grid gap-2 ${ci === 0 ? "sm:grid-cols-2" : "grid-cols-1"}`}
                >
                  {category.items.map((item) => {
                    const Icon = iconMap[item.icon];
                    return (
                      <div
                        key={item.name}
                        data-cursor-hover
                        className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-all hover:border-accent/40 hover:bg-accent-soft"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-muted transition-colors group-hover:text-accent">
                          {Icon ? <Icon size={16} /> : null}
                        </span>
                        <span className="text-sm font-medium text-foreground/90">
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
