"use client";

import { type CSSProperties } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiArrowUpRight, FiGithub } from "react-icons/fi";
import TiltCard from "@/components/tilt-card";
import SpotlightCard from "@/components/spotlight-card";
import ProjectVisual from "@/components/project-visual";
import type { Project } from "@/lib/data";

type ProjectCardProps = {
  project: Project;
  index: number;
  total: number;
  wide?: boolean;
};

export default function ProjectCard({ project, index, total, wide = false }: ProjectCardProps) {
  const counter = (
    <span className="font-mono text-xs text-muted">
      {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </span>
  );

  const arrowLink = (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`${project.title} case study`}
      data-cursor-hover
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-muted transition-all duration-200 hover:-rotate-6 hover:border-accent hover:bg-accent hover:text-[#1c1005]"
    >
      <FiArrowUpRight size={15} />
    </Link>
  );

  const visual = (className: string) => (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`${project.title} preview`}
      data-cursor-hover
      data-cursor-text="View"
      className={`block ${className}`}
    >
      <ProjectVisual className="h-full w-full" color={project.tone} />
    </Link>
  );

  const title = (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor-hover
      className="font-display text-xl font-semibold text-foreground transition-colors hover:text-accent"
    >
      {project.title}
    </Link>
  );

  const tags = (
    <div className="mt-6 flex flex-wrap gap-2">
      {project.tech.map((t) => (
        <span
          key={t}
          className="rounded-full border border-border-subtle bg-surface-2 px-3 py-1 text-xs font-medium text-muted"
        >
          {t}
        </span>
      ))}
    </div>
  );

  const footer = (
    <div className="mt-6 flex items-center justify-between">
      <Link
        href={`/projects/${project.slug}`}
        data-cursor-hover
        className="group/link inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent"
      >
        Read case study
        <FiArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
      </Link>

      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} GitHub repository`}
          data-cursor-hover
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <FiGithub size={15} />
        </a>
      )}
    </div>
  );

  return (
    <TiltCard maxTilt={wide ? 2 : 4} scale={1} className="h-full">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="h-full"
      >
        <SpotlightCard
          style={{ "--project-color": project.tone } as CSSProperties}
          className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border-subtle bg-surface/60 p-6 transition-shadow duration-300 hover:shadow-[0_25px_55px_-25px_var(--project-color)] sm:p-8"
        >
          {wide ? (
            <div className="flex flex-1 flex-col gap-6 lg:flex-row lg:items-center">
              <div className="flex flex-1 flex-col">
                <div className="flex items-center justify-between">
                  {counter}
                  {arrowLink}
                </div>
                <div className="mt-4">{title}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                {tags}
                {footer}
              </div>
              {visual("h-56 w-full lg:h-72 lg:w-[42%]")}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                {counter}
                {arrowLink}
              </div>
              {visual("mt-5 h-48")}
              <div className="relative mt-6 flex flex-1 flex-col">
                {title}
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                {tags}
                {footer}
              </div>
            </>
          )}
        </SpotlightCard>
      </motion.div>
    </TiltCard>
  );
}
