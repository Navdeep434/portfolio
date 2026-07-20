"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { FiArrowDown, FiArrowRight, FiDownload } from "react-icons/fi";
import MagneticButton from "@/components/magnetic-button";
import Terminal from "@/components/terminal";
import ParticleField from "@/components/particle-field";
import { withBasePath } from "@/lib/base-path";

const nameWords = ["Navdeep", "Raushan"];

const nameContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045 },
  },
};

const letter: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const yBlobFast = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -140]
  );
  const yBlobMid = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -80]
  );
  const yBlobSlow = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -180]
  );
  const yGrid = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -40]
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.55],
    shouldReduceMotion ? [1, 1] : [1, 0]
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.55],
    shouldReduceMotion ? [0, 0] : [0, 60]
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-28"
    >
      <div className="mesh-bg">
        <motion.div
          style={{ y: yBlobFast }}
          className="mesh-blob left-[-10%] top-[-10%] h-[420px] w-[420px] bg-accent"
        />
        <motion.div
          style={{ y: yBlobMid }}
          className="mesh-blob right-[-5%] top-[15%] h-[360px] w-[360px] bg-accent-2"
        />
        <motion.div
          style={{ y: yBlobSlow }}
          className="mesh-blob bottom-[-15%] left-[20%] h-[380px] w-[380px] bg-accent"
        />
        <motion.div style={{ y: yGrid }} className="grid-pattern absolute inset-0" />
        <ParticleField />
      </div>

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-8">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface/60 px-4 py-1.5 text-sm text-muted"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              Available for new opportunities
            </motion.p>

            <h1 className="sr-only">Navdeep Raushan</h1>

            <motion.div
              variants={nameContainer}
              initial="hidden"
              animate="visible"
              aria-hidden="true"
              className="font-display flex flex-wrap gap-x-[0.22em] text-[clamp(2.75rem,9vw,6.5rem)] font-semibold leading-[0.92] tracking-tight text-foreground"
            >
              {nameWords.map((word, wi) => (
                <span key={wi} className="inline-flex whitespace-nowrap">
                  {word.split("").map((char, ci) => (
                    <motion.span key={ci} variants={letter} className="inline-block">
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-5 max-w-lg text-lg leading-relaxed text-muted"
            >
              <span className="text-gradient font-medium">Full-Stack Developer</span>{" "}
              building scalable systems across{" "}
              <span className="text-foreground">Node.js</span>,{" "}
              <span className="text-foreground">React</span> &{" "}
              <span className="text-foreground">Next.js</span> — secure APIs,
              real-time features, code that holds up in production.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#1c1005] transition-shadow hover:shadow-lg hover:shadow-accent/25"
              >
                View Projects
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </MagneticButton>
              <MagneticButton
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Contact Me
              </MagneticButton>
              <MagneticButton
                href={withBasePath("/resume.pdf")}
                download="Navdeep-Raushan-Resume.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-transparent px-6 py-3 text-sm font-semibold text-muted transition-colors hover:text-accent"
              >
                <FiDownload />
                Download Resume
              </MagneticButton>
            </motion.div>
          </div>

          <div className="-rotate-2 lg:mb-2 lg:translate-x-4">
            <Terminal />
          </div>
        </div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        data-cursor-hover
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <FiArrowDown size={20} />
      </motion.a>
    </section>
  );
}
