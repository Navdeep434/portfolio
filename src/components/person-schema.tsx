import { socials } from "@/lib/data";

const siteUrl = "https://navdeepraushan.in";

export default function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Navdeep Raushan",
    jobTitle: "Full-Stack Software Engineer",
    url: siteUrl,
    email: `mailto:${socials.email}`,
    sameAs: [socials.github, socials.githubFreelance, socials.linkedin],
    knowsAbout: [
      "Java",
      "Spring Boot",
      "Next.js",
      "TypeScript",
      "Laravel",
      "React",
      "SQL Server",
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
