"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FadeIn from "@/components/fade-in";
import SectionKicker from "@/components/section-kicker";
import ProjectCard from "@/components/project-card";
import { projects } from "@/lib/data";

const filters = ["All", "React.js", "MySQL", "Socket.io"];

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.tech.includes(filter));

  return (
    <section id="projects" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <FadeIn>
          <SectionKicker index="05" label="Projects" />
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Selected work
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted">
            Full-time and freelance builds across procurement, hospitality,
            and e-commerce — real systems, real users.
          </p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="mt-10 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-medium uppercase tracking-wide text-muted">
              Filter
            </span>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                data-cursor-hover
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  filter === f
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-border-subtle text-muted hover:border-accent/50 hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </FadeIn>

        <motion.div layout className="mt-8 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const wide = filter === "All" && Boolean(project.featured);
              return (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={wide ? "md:col-span-2" : ""}
                >
                  <ProjectCard
                    project={project}
                    index={projects.findIndex((p) => p.slug === project.slug)}
                    total={projects.length}
                    wide={wide}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <p className="mt-8 text-center text-sm text-muted">
            No projects match this filter yet.
          </p>
        )}
      </div>
    </section>
  );
}
