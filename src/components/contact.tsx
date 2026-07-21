"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  FiCode,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiSend,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiFlag,
} from "react-icons/fi";
import FadeIn from "@/components/fade-in";
import SectionKicker from "@/components/section-kicker";
import ConfettiBurst from "@/components/confetti-burst";
import { socials, personalInfo } from "@/lib/data";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "success";

const socialLinks = [
  { label: "GitHub", href: socials.github, icon: FiGithub },
  { label: "GitHub (Freelance)", href: socials.githubFreelance, icon: FiCode },
  { label: "LinkedIn", href: socials.linkedin, icon: FiLinkedin },
  { label: "Email", href: `mailto:${socials.email}`, icon: FiMail },
];

const bioDetails = [
  { label: personalInfo.phone, icon: FiPhone },
  { label: personalInfo.location, icon: FiMapPin },
  { label: personalInfo.dob, icon: FiCalendar },
  { label: personalInfo.nationality, icon: FiFlag },
];

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.message.trim()) {
    errors.message = "Please add a short message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [burstId, setBurstId] = useState(0);

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    window.location.href = `mailto:${socials.email}?subject=${encodeURIComponent(
      `Portfolio message from ${values.name}`
    )}&body=${encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`)}`;

    setStatus("success");
    setBurstId((n) => n + 1);
    setValues({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <SectionKicker index="07" label="Contact" />
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Let&apos;s build something
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
              Have a role, project, or idea in mind? My inbox is open — I
              usually reply within a day or two.
            </p>

            <div className="mt-10 flex gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  data-cursor-hover
                  whileHover={{ y: -3 }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle text-foreground/80 transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
              {bioDetails.map(({ label, icon: Icon }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-sm text-muted"
                >
                  <Icon size={14} className="text-accent" />
                  {label}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.1}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="glass relative rounded-3xl p-8"
            >
              <ConfettiBurst burstId={burstId} />
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-foreground/90"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange("name")}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className="w-full rounded-xl border border-border-subtle bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                    placeholder="Jane Doe"
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-xs text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-foreground/90"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange("email")}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className="w-full rounded-xl border border-border-subtle bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                    placeholder="jane@example.com"
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-foreground/90"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={values.message}
                    onChange={handleChange("message")}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className="w-full resize-none rounded-xl border border-border-subtle bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                    placeholder="Tell me a bit about your project..."
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1.5 text-xs text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                data-cursor-hover
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-[#1c1005] transition-shadow hover:shadow-lg hover:shadow-accent/25"
              >
                Send Message
                <FiSend size={15} />
              </button>

              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-center text-sm text-accent"
                >
                  Thanks! Your email client should be opening now.
                </motion.p>
              )}
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
