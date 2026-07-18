"use client";

import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight, FiUser, FiServer, FiCpu, FiDatabase } from "react-icons/fi";
import FadeIn from "@/components/fade-in";
import SectionKicker from "@/components/section-kicker";
import { architectureLabs } from "@/lib/data";

const nodeIcons = [FiUser, FiServer, FiCpu, FiDatabase];

export default function ArchitectureLab() {
  const [activeId, setActiveId] = useState(architectureLabs[0].id);
  const active = architectureLabs.find((l) => l.id === activeId) ?? architectureLabs[0];

  return (
    <section id="lab" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <FadeIn>
          <SectionKicker index="03" label="Architecture Lab" />
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            See how I think about architecture
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted">
            Pick an ecosystem and follow a request from entry point to data.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="glass flex flex-col justify-between rounded-3xl p-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                  Live lab
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-foreground">
                  Interactive system map
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Each ecosystem I work in has a different shape. Switch tabs
                  to see how a request flows through it, end to end.
                </p>
              </div>

              <div
                role="tablist"
                aria-label="Architecture ecosystems"
                className="mt-8 flex flex-col gap-2"
              >
                {architectureLabs.map((lab) => (
                  <button
                    key={lab.id}
                    role="tab"
                    aria-selected={activeId === lab.id}
                    onClick={() => setActiveId(lab.id)}
                    data-cursor-hover
                    className={`group flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                      activeId === lab.id
                        ? "border-accent bg-accent-soft text-accent"
                        : "border-border-subtle text-muted hover:border-accent/40 hover:text-foreground"
                    }`}
                  >
                    {lab.id}
                    <FiArrowRight
                      size={14}
                      className={`transition-transform ${
                        activeId === lab.id ? "translate-x-0" : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ "--lab-color": active.color } as CSSProperties}
                className="rounded-3xl border border-border-subtle bg-surface/60 p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className="text-xs font-medium uppercase tracking-[0.2em]"
                      style={{ color: "var(--lab-color)" }}
                    >
                      Architecture / {active.id}
                    </p>
                    <h4 className="mt-2 font-display text-lg font-semibold text-foreground">
                      {active.title}
                    </h4>
                  </div>
                  <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-border-subtle px-3 py-1 text-xs font-medium text-muted">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: "var(--lab-color)" }}
                    />
                    Healthy
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {active.copy}
                </p>

                <div className="mt-8 flex flex-wrap items-start gap-x-3 gap-y-6">
                  {active.nodes.map((node, i) => {
                    const Icon = nodeIcons[i % nodeIcons.length];
                    const isLast = i === active.nodes.length - 1;
                    return (
                      <div key={node.name} className="flex items-center gap-3">
                        <div className="flex w-24 flex-col items-center gap-2 text-center">
                          <div
                            className="flex h-11 w-11 items-center justify-center rounded-xl border"
                            style={{
                              borderColor: "var(--lab-color)",
                              color: "var(--lab-color)",
                              backgroundColor: "color-mix(in srgb, var(--lab-color) 12%, transparent)",
                            }}
                          >
                            <Icon size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {node.name}
                            </p>
                            <p className="mt-0.5 text-xs text-muted">
                              {node.detail}
                            </p>
                          </div>
                        </div>
                        {!isLast && (
                          <div
                            className="hidden h-px w-6 self-start mt-5 sm:block"
                            style={{
                              backgroundImage:
                                "linear-gradient(to right, var(--lab-color), transparent)",
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-2 px-4 py-3 font-mono text-xs text-muted">
                  <span
                    className="h-1.5 w-1.5 animate-pulse rounded-full"
                    style={{ backgroundColor: "var(--lab-color)" }}
                  />
                  {active.pulse}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
