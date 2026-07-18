import type { IconType } from "react-icons";
import { FaJava, FaLaravel, FaPhp, FaReact, FaGitAlt, FaDocker } from "react-icons/fa";
import {
  SiSpringboot,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiMysql,
} from "react-icons/si";
import { TbDatabase } from "react-icons/tb";

const items: { name: string; icon: IconType }[] = [
  { name: "Java", icon: FaJava },
  { name: "Spring Boot", icon: SiSpringboot },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: FaReact },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Laravel", icon: FaLaravel },
  { name: "PHP", icon: FaPhp },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "SQL Server", icon: TbDatabase },
  { name: "MySQL", icon: SiMysql },
  { name: "Git", icon: FaGitAlt },
  { name: "Docker", icon: FaDocker },
];

export default function TechMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-border-subtle bg-surface/40 py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <div className="marquee-track flex w-max gap-12">
        {[...items, ...items].map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={`${item.name}-${i}`}
              className="flex shrink-0 items-center gap-2.5 text-muted"
            >
              <Icon size={20} className="text-accent/80" />
              <span className="text-sm font-medium whitespace-nowrap">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
