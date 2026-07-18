import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { socials } from "@/lib/data";

const socialLinks = [
  { label: "GitHub", href: socials.github, icon: FiGithub },
  { label: "LinkedIn", href: socials.linkedin, icon: FiLinkedin },
  { label: "Email", href: `mailto:${socials.email}`, icon: FiMail },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border-subtle py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row lg:px-8">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} Navdeep Raushan. All rights reserved.
        </p>

        <div className="flex gap-4">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              data-cursor-hover
              className="text-muted transition-colors hover:text-accent"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
