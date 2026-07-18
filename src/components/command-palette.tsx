"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiCode,
  FiCpu,
  FiBriefcase,
  FiFolder,
  FiMessageSquare,
  FiMail,
  FiSun,
  FiMoon,
  FiGithub,
  FiLinkedin,
  FiCopy,
  FiDownload,
  FiHome,
  FiTerminal,
  FiMousePointer,
} from "react-icons/fi";
import { socials } from "@/lib/data";
import {
  CURSOR_STYLES,
  cursorStyleLabels,
  setCursorStyle,
} from "@/lib/cursor-style";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    // autoFocus can race with the Framer Motion entrance animation and
    // React's own commit timing, occasionally losing the first keystrokes
    // typed right after opening. Focusing explicitly after paint is reliable.
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(raf);
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    // Capture phase so this always fires first, regardless of what else
    // on the page might handle or stop the event during bubbling.
    document.addEventListener("keydown", handler, true);
    return () => document.removeEventListener("keydown", handler, true);
  }, []);

  const goTo = useCallback(
    (hash: string) => {
      setOpen(false);
      if (window.location.pathname !== "/") {
        router.push(`/${hash}`);
      } else {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [router]
  );

  const toggleTheme = useCallback(() => {
    const isDark = document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", !isDark);
    localStorage.setItem("theme", !isDark ? "dark" : "light");
    setOpen(false);
  }, []);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(socials.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setOpen(false);
    }, 700);
  }, []);

  const openLink = useCallback((href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
    setOpen(false);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        data-cursor-hover
        className="hidden items-center gap-2 rounded-full border border-border-subtle px-3.5 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-accent md:flex"
        aria-label="Open command palette"
      >
        <FiTerminal size={12} />
        Search
        <kbd className="ml-1 rounded border border-border-subtle bg-surface-2 px-1.5 py-0.5 font-mono text-[10px]">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-1/2 top-24 z-[91] w-[90vw] max-w-lg -translate-x-1/2"
            >
              <Command
                label="Command Palette"
                className="glass overflow-hidden rounded-2xl shadow-2xl shadow-black/30"
              >
                <div className="flex items-center gap-2 border-b border-border-subtle px-4">
                  <FiTerminal className="text-muted" size={15} />
                  <Command.Input
                    ref={inputRef}
                    placeholder="Type a command or search..."
                    className="w-full bg-transparent py-3.5 text-sm text-foreground outline-none placeholder:text-muted"
                  />
                </div>
                <Command.List className="max-h-80 overflow-y-auto p-2">
                  <Command.Empty className="px-3 py-6 text-center text-sm text-muted">
                    No results found.
                  </Command.Empty>

                  <Command.Group heading="Navigate" className="px-1 py-1 text-xs font-medium uppercase tracking-wide text-muted [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2">
                    <Command.Item
                      onSelect={() => goTo("#hero")}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/90 aria-selected:bg-accent-soft aria-selected:text-accent"
                    >
                      <FiHome size={15} /> Home
                    </Command.Item>
                    <Command.Item
                      onSelect={() => goTo("#about")}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/90 aria-selected:bg-accent-soft aria-selected:text-accent"
                    >
                      <FiUser size={15} /> About
                    </Command.Item>
                    <Command.Item
                      onSelect={() => goTo("#skills")}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/90 aria-selected:bg-accent-soft aria-selected:text-accent"
                    >
                      <FiCode size={15} /> Skills
                    </Command.Item>
                    <Command.Item
                      onSelect={() => goTo("#lab")}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/90 aria-selected:bg-accent-soft aria-selected:text-accent"
                    >
                      <FiCpu size={15} /> Architecture Lab
                    </Command.Item>
                    <Command.Item
                      onSelect={() => goTo("#experience")}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/90 aria-selected:bg-accent-soft aria-selected:text-accent"
                    >
                      <FiBriefcase size={15} /> Experience
                    </Command.Item>
                    <Command.Item
                      onSelect={() => goTo("#projects")}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/90 aria-selected:bg-accent-soft aria-selected:text-accent"
                    >
                      <FiFolder size={15} /> Projects
                    </Command.Item>
                    <Command.Item
                      onSelect={() => goTo("#testimonials")}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/90 aria-selected:bg-accent-soft aria-selected:text-accent"
                    >
                      <FiMessageSquare size={15} /> Testimonials
                    </Command.Item>
                    <Command.Item
                      onSelect={() => goTo("#contact")}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/90 aria-selected:bg-accent-soft aria-selected:text-accent"
                    >
                      <FiMail size={15} /> Contact
                    </Command.Item>
                  </Command.Group>

                  <Command.Group heading="Actions" className="px-1 py-1 text-xs font-medium uppercase tracking-wide text-muted [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2">
                    <Command.Item
                      onSelect={toggleTheme}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/90 aria-selected:bg-accent-soft aria-selected:text-accent"
                    >
                      <FiSun size={15} className="dark:hidden" />
                      <FiMoon size={15} className="hidden dark:block" />
                      Toggle theme
                    </Command.Item>
                    <Command.Item
                      onSelect={copyEmail}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/90 aria-selected:bg-accent-soft aria-selected:text-accent"
                    >
                      <FiCopy size={15} /> {copied ? "Copied!" : "Copy email address"}
                    </Command.Item>
                    <Command.Item
                      onSelect={() => openLink(socials.github)}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/90 aria-selected:bg-accent-soft aria-selected:text-accent"
                    >
                      <FiGithub size={15} /> Open GitHub
                    </Command.Item>
                    <Command.Item
                      onSelect={() => openLink(socials.githubFreelance)}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/90 aria-selected:bg-accent-soft aria-selected:text-accent"
                    >
                      <FiCode size={15} /> Open GitHub (Freelance)
                    </Command.Item>
                    <Command.Item
                      onSelect={() => openLink(socials.linkedin)}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/90 aria-selected:bg-accent-soft aria-selected:text-accent"
                    >
                      <FiLinkedin size={15} /> Open LinkedIn
                    </Command.Item>
                    <Command.Item
                      onSelect={() => {
                        const link = document.createElement("a");
                        link.href = "/resume.pdf";
                        link.download = "Navdeep-Raushan-Resume.pdf";
                        link.click();
                        setOpen(false);
                      }}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/90 aria-selected:bg-accent-soft aria-selected:text-accent"
                    >
                      <FiDownload size={15} /> Download Resume
                    </Command.Item>
                  </Command.Group>

                  <Command.Group heading="Cursor Style" className="px-1 py-1 text-xs font-medium uppercase tracking-wide text-muted [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2">
                    {CURSOR_STYLES.map((style) => (
                      <Command.Item
                        key={style}
                        onSelect={() => {
                          setCursorStyle(style);
                          setOpen(false);
                        }}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/90 aria-selected:bg-accent-soft aria-selected:text-accent"
                      >
                        <FiMousePointer size={15} /> {cursorStyleLabels[style]}
                      </Command.Item>
                    ))}
                  </Command.Group>
                </Command.List>
              </Command>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
