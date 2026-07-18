import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowUpRight, FiGithub } from "react-icons/fi";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FadeIn from "@/components/fade-in";
import { projects } from "@/lib/data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <FadeIn>
            <Link
              href="/#projects"
              data-cursor-hover
              className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              <FiArrowLeft size={14} /> Back to projects
            </Link>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-border-subtle bg-surface-2 px-3 py-1 text-xs font-medium text-muted">
                {project.year}
              </span>
              <span className="rounded-full border border-border-subtle bg-surface-2 px-3 py-1 text-xs font-medium text-muted">
                {project.role}
              </span>
            </div>
            <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              {project.description}
            </p>

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

            <div className="mt-6 flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  <FiGithub size={15} /> View code
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-[#04120c] transition-shadow hover:shadow-lg hover:shadow-accent/25"
                >
                  Live demo <FiArrowUpRight size={15} />
                </a>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="glass mt-12 aspect-video w-full rounded-3xl bg-gradient-to-br from-accent/15 to-transparent" />
          </FadeIn>

          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            <FadeIn delay={0.1}>
              <h2 className="font-display text-lg font-semibold text-foreground">
                The problem
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {project.problem}
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h2 className="font-display text-lg font-semibold text-foreground">
                The solution
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {project.solution}
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <h2 className="mt-14 font-display text-lg font-semibold text-foreground">
              Key outcomes
            </h2>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="mt-20 border-t border-border-subtle pt-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                Next project
              </p>
              <Link
                href={`/projects/${next.slug}`}
                data-cursor-hover
                className="group mt-3 flex items-center justify-between rounded-2xl border border-border-subtle bg-surface/60 p-6 transition-colors hover:border-accent/50"
              >
                <span className="font-display text-lg font-semibold text-foreground">
                  {next.title}
                </span>
                <FiArrowUpRight
                  size={18}
                  className="text-accent transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  );
}
