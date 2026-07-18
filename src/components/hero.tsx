"use client";

import { motion, type Variants } from "framer-motion";
import { FiArrowDown, FiArrowRight, FiDownload } from "react-icons/fi";
import MagneticButton from "@/components/magnetic-button";
import Terminal from "@/components/terminal";
import ParticleField from "@/components/particle-field";

const headline = "Full-Stack Engineer building scalable systems across Java, Next.js & Laravel.";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.028 },
  },
};

const word: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <div className="mesh-bg">
        <div className="mesh-blob left-[-10%] top-[-10%] h-[420px] w-[420px] bg-accent" />
        <div className="mesh-blob right-[-5%] top-[15%] h-[360px] w-[360px] bg-accent-2" />
        <div className="mesh-blob bottom-[-15%] left-[20%] h-[380px] w-[380px] bg-accent" />
        <div className="grid-pattern absolute inset-0" />
        <ParticleField />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface/60 px-4 py-1.5 text-sm text-muted"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Available for new opportunities
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-2xl font-medium text-muted sm:text-3xl"
        >
          Hi, I&apos;m Navdeep Raushan
        </motion.h1>

        <motion.h2
          variants={container}
          initial="hidden"
          animate="visible"
          className="mt-3 max-w-4xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          {headline.split(" ").map((w, i) => (
            <motion.span key={i} variants={word} className="mr-3 inline-block">
              {w === "Java," || w === "Next.js" || w === "Laravel." ? (
                <span className="text-gradient">{w}</span>
              ) : (
                w
              )}
            </motion.span>
          ))}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 max-w-xl text-lg text-muted"
        >
          I design robust APIs, ship polished frontends, and connect the two
          with clean, maintainable code — from Spring Boot services to
          Next.js interfaces.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#04120c] transition-shadow hover:shadow-lg hover:shadow-accent/25"
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
            href="/resume.pdf"
            download="Navdeep-Raushan-Resume.pdf"
            className="inline-flex items-center gap-2 rounded-full border border-transparent px-6 py-3 text-sm font-semibold text-muted transition-colors hover:text-accent"
          >
            <FiDownload />
            Download Resume
          </MagneticButton>
        </motion.div>

        <Terminal />
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        data-cursor-hover
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-muted"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <FiArrowDown size={20} />
      </motion.a>
    </section>
  );
}
