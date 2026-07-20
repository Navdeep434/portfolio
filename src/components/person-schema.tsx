import { socials } from "@/lib/data";

const siteUrl = "https://navdeepraushan.in";

export default function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Navdeep Raushan",
    jobTitle: "Full-Stack Developer",
    url: siteUrl,
    email: `mailto:${socials.email}`,
    sameAs: [socials.github, socials.githubFreelance, socials.linkedin],
    knowsAbout: [
      "Node.js",
      "Express.js",
      "React",
      "Next.js",
      "JavaScript",
      "Socket.io",
      "MongoDB",
      "MySQL",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
