"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { socials } from "@/lib/data";

const introLines = [
  { prompt: true, text: "whoami" },
  { prompt: false, text: 'navdeep_raushan --role "Full-Stack Developer"' },
  { prompt: true, text: "cat stack.json" },
  { prompt: false, text: '{ "backend": ["Node.js", "Express.js", "Socket.io"],' },
  { prompt: false, text: '  "frontend": ["React", "Next.js", "JavaScript"],' },
  { prompt: false, text: '  "database": ["MySQL", "MongoDB"] }' },
];

const INTRO_TEXT = introLines.map((l) => l.text).join("\n");

type OutputLine = { text: string; type: "input" | "output" };

const HELP_TEXT = [
  "Available commands:",
  "  help       show this list",
  "  about      short bio",
  "  skills     tech stack summary",
  "  projects   scroll to projects",
  "  contact    scroll to contact form",
  "  github     open GitHub profile (main)",
  "  freelance  open GitHub profile (freelance)",
  "  linkedin   open LinkedIn profile",
  "  whoami     who am I",
  "  clear      clear the terminal",
  "  sudo hire-me   (try it)",
];

function runCommand(raw: string): { output: string[]; clear?: boolean } {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case "":
      return { output: [] };
    case "help":
      return { output: HELP_TEXT };
    case "about":
      return {
        output: [
          "Full-stack developer working across Node.js/Express, React/Next.js,",
          "and MySQL/MongoDB. I like clean APIs and interfaces that don't fight the user.",
        ],
      };
    case "skills":
      return {
        output: [
          "backend:  Node.js, Express.js, REST APIs, JWT, Socket.io",
          "frontend: React.js, Next.js, JavaScript (ES6+), Tailwind CSS",
          "database: MySQL, MongoDB",
          "tools:    Git, GitHub, Postman, Jira, Redis, Docker",
        ],
      };
    case "projects":
      document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
      return { output: ["→ scrolling to projects..."] };
    case "contact":
      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
      return { output: ["→ scrolling to contact..."] };
    case "github":
      window.open(socials.github, "_blank", "noopener,noreferrer");
      return { output: [`→ opening ${socials.github}`] };
    case "freelance":
      window.open(socials.githubFreelance, "_blank", "noopener,noreferrer");
      return { output: [`→ opening ${socials.githubFreelance}`] };
    case "linkedin":
      window.open(socials.linkedin, "_blank", "noopener,noreferrer");
      return { output: [`→ opening ${socials.linkedin}`] };
    case "whoami":
      return { output: ["navdeep_raushan (full-stack developer)"] };
    case "clear":
      return { output: [], clear: true };
    case "sudo hire-me":
      return {
        output: [
          "Permission granted. ✅",
          "Reaching out via the contact form is the fastest way.",
        ],
      };
    default:
      return { output: [`command not found: ${cmd} — type "help" for a list`] };
  }
}

export default function Terminal() {
  const [typed, setTyped] = useState("");
  const [introDone, setIntroDone] = useState(false);
  const [history, setHistory] = useState<OutputLine[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTyped(INTRO_TEXT.slice(0, i));
      if (i >= INTRO_TEXT.length) {
        clearInterval(interval);
        setIntroDone(true);
      }
    }, 18);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history, typed]);

  const typedLines = typed.split("\n");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { output, clear } = runCommand(input);
    if (clear) {
      setHistory([]);
    } else {
      setHistory((prev) => [
        ...prev,
        { text: input, type: "input" },
        ...output.map((text) => ({ text, type: "output" as const })),
      ]);
    }
    setInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.85 }}
      onClick={() => inputRef.current?.focus()}
      className="glass w-full max-w-lg overflow-hidden rounded-2xl shadow-xl shadow-black/10"
    >
      <div className="flex items-center gap-1.5 border-b border-border-subtle px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        <span className="ml-3 text-xs text-muted">zsh — portfolio</span>
      </div>
      <div
        ref={bodyRef}
        className="max-h-[220px] min-h-[168px] overflow-y-auto px-5 py-4 font-mono text-[13px] leading-relaxed"
      >
        {introLines.map((line, i) => {
          const content = typedLines[i] ?? "";
          if (content.length === 0 && typed.length < INTRO_TEXT.length) return null;
          return (
            <div key={i} className="flex gap-2">
              {line.prompt && <span className="text-accent">➜</span>}
              <span className={line.prompt ? "text-foreground" : "text-muted"}>
                {content}
                {!introDone && i === typedLines.length - 1 && (
                  <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-accent align-middle" />
                )}
              </span>
            </div>
          );
        })}

        {introDone && (
          <>
            {history.map((line, i) =>
              line.type === "input" ? (
                <div key={i} className="mt-2 flex gap-2">
                  <span className="text-accent">➜</span>
                  <span className="text-foreground">{line.text}</span>
                </div>
              ) : (
                <div key={i} className="pl-5 text-muted">
                  {line.text}
                </div>
              )
            )}

            <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2">
              <span className="text-accent">➜</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                spellCheck={false}
                aria-label="Terminal command input"
                placeholder="type help..."
                className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted/50"
              />
            </form>
          </>
        )}
      </div>
    </motion.div>
  );
}
