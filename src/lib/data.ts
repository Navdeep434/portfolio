export type ArchitectureLab = {
  id: string;
  color: string;
  title: string;
  copy: string;
  nodes: { name: string; detail: string }[];
  pulse: string;
};

export const architectureLabs: ArchitectureLab[] = [
  {
    id: "Java",
    color: "#fbbf24",
    title: "Resilient service architecture",
    copy: "A production-minded request path with clear boundaries, validation at the edge, and graceful failure handling.",
    nodes: [
      { name: "Client", detail: "Validated request" },
      { name: "Spring API", detail: "Auth · REST · cache" },
      { name: "Domain", detail: "Business rules" },
      { name: "SQL Server", detail: "Reliable persistence" },
    ],
    pulse: "$ system.status → 18ms avg service latency",
  },
  {
    id: "Next.js",
    color: "#34d399",
    title: "Fast interface delivery",
    copy: "A progressive frontend path tuned for a useful first paint, end-to-end type safety, and instant user feedback.",
    nodes: [
      { name: "Edge", detail: "Route & cache" },
      { name: "Server UI", detail: "Streamed shell" },
      { name: "React", detail: "Interactive islands" },
      { name: "User", detail: "Instant feedback" },
    ],
    pulse: "$ system.status → progressively enhanced by default",
  },
  {
    id: "Laravel",
    color: "#fb7185",
    title: "Pragmatic product backend",
    copy: "A maintainable application flow for shipping business value quickly without sacrificing structure.",
    nodes: [
      { name: "Route", detail: "Request entry" },
      { name: "Controller", detail: "Orchestration" },
      { name: "Service", detail: "Domain logic" },
      { name: "MySQL", detail: "Models & queues" },
    ],
    pulse: "$ system.status → built for iterative delivery",
  },
];

export type SkillCategory = {
  title: string;
  items: { name: string; icon: string }[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Backend",
    items: [
      { name: "Java", icon: "java" },
      { name: "Spring Boot", icon: "spring" },
      { name: "Laravel", icon: "laravel" },
      { name: "PHP", icon: "php" },
      { name: "REST APIs", icon: "api" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "Next.js", icon: "nextjs" },
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwind" },
    ],
  },
  {
    title: "Database",
    items: [
      { name: "SQL Server", icon: "mssql" },
      { name: "MySQL", icon: "mysql" },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", icon: "git" },
      { name: "Docker", icon: "docker" },
      { name: "Postman", icon: "postman" },
      { name: "CI/CD", icon: "cicd" },
    ],
  },
];

export type ExperienceItem = {
  role: string;
  company: string;
  duration: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Software Engineer",
    company: "Company Name",
    duration: "2025 — Present",
    bullets: [
      "Designed and shipped REST APIs in Spring Boot serving production traffic across multiple client applications.",
      "Built full-stack features end-to-end with Next.js/TypeScript on the frontend and Java or Laravel on the backend.",
      "Optimized SQL Server queries and schema design, reducing average response times on key endpoints.",
    ],
  },
  {
    role: "Backend Developer",
    company: "Previous Company",
    duration: "2024 — 2025",
    bullets: [
      "Maintained and extended Laravel MVC applications, including auth, billing, and admin tooling.",
      "Collaborated with frontend engineers to define clean API contracts and reduce integration bugs.",
      "Introduced CI/CD pipelines that cut deployment time and manual QA overhead.",
    ],
  },
  {
    role: "Junior Developer",
    company: "First Company",
    duration: "2023 — 2024",
    bullets: [
      "Contributed to internal tools using PHP and MySQL.",
      "Picked up Java and Spring fundamentals while assisting on a backend migration project.",
      "Wrote unit and integration tests to improve coverage on legacy modules.",
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  featured?: boolean;
  year: string;
  role: string;
  problem: string;
  solution: string;
  highlights: string[];
  tone: string;
};

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    description:
      "A scalable full-stack application with a Spring Boot backend and a Next.js frontend, demonstrating clean API design and modern UI patterns.",
    tech: ["Java", "Spring Boot", "Next.js", "SQL Server"],
    github: "https://github.com/Navdeep434",
    live: "https://example.com",
    featured: true,
    tone: "#34d399",
    year: "2024",
    role: "Full-Stack Engineer",
    problem:
      "The client needed a way to manage inventory across multiple warehouses in real time, but the existing spreadsheet-based process caused stock discrepancies and slow reporting.",
    solution:
      "Built a Spring Boot REST API backed by SQL Server for inventory transactions, paired with a Next.js dashboard for real-time stock visibility, filtering, and audit history.",
    highlights: [
      "Reduced stock discrepancy incidents by centralizing writes through a single validated API layer.",
      "Cut manual reporting time by replacing spreadsheet exports with a live dashboard.",
      "Designed the schema and indexing strategy to keep multi-warehouse queries fast at scale.",
    ],
  },
  {
    slug: "project-two",
    title: "Project Two",
    description:
      "A Laravel-powered platform with role-based access control, background jobs, and a responsive dashboard built with Tailwind CSS.",
    tech: ["Laravel", "PHP", "MySQL", "Tailwind"],
    github: "https://github.com/buildwithcode915",
    live: "https://example.com",
    year: "2023",
    role: "Backend Developer",
    tone: "#fbbf24",
    problem:
      "An internal admin tool had grown organically with no clear permission model, making it risky to add new staff roles without accidentally over-granting access.",
    solution:
      "Rebuilt the authorization layer in Laravel using policies and role-based gates, added background job queues for slow operations, and rebuilt the admin UI with a responsive Tailwind dashboard.",
    highlights: [
      "Introduced a role/permission model that made adding new staff roles a config change, not a code change.",
      "Moved slow report generation to background jobs, keeping the UI responsive.",
      "Delivered a fully responsive dashboard usable on tablets for warehouse staff.",
    ],
  },
  {
    slug: "project-three",
    title: "Project Three",
    description:
      "A TypeScript microservice-oriented system with REST APIs, automated testing, and a CI/CD pipeline for continuous delivery.",
    tech: ["TypeScript", "Node.js", "Docker", "CI/CD"],
    github: "https://github.com/buildwithcode915",
    year: "2023",
    role: "Backend Engineer",
    tone: "#38bdf8",
    problem:
      "A monolithic service had become hard to deploy safely — a single bug in any part of the codebase could block releases for the whole team.",
    solution:
      "Split the monolith into a small set of TypeScript microservices with clear API contracts, containerized with Docker, and wired up a CI/CD pipeline for independent, automated deployments.",
    highlights: [
      "Enabled independent deployments per service, cutting release risk significantly.",
      "Added automated integration tests that run in CI before every merge.",
      "Standardized service scaffolding so new services could be spun up in under an hour.",
    ],
  },
  {
    slug: "project-four",
    title: "Project Four",
    description:
      "An internal tool for data visualization and reporting, built with React and backed by a Java REST API.",
    tech: ["React", "Java", "REST APIs"],
    github: "https://github.com/Navdeep434",
    live: "https://example.com",
    year: "2022",
    role: "Full-Stack Developer",
    tone: "#a78bfa",
    problem:
      "Leadership had no easy way to see trends across business metrics without asking an analyst to manually pull and chart the data every week.",
    solution:
      "Built a Java REST API exposing aggregated metrics and a React frontend with interactive charts, filters, and scheduled exports.",
    highlights: [
      "Gave leadership self-serve access to metrics that previously required a manual request.",
      "Cut analyst time spent on recurring report requests.",
      "Designed the API to support new metrics without frontend changes.",
    ],
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Navdeep picked up our Spring Boot service with almost no ramp-up time and immediately started raising the right questions about edge cases we hadn't considered. The API he shipped is still the most stable part of our backend.",
    name: "Engineering Manager",
    role: "Full-time role — placeholder, replace with a real quote",
  },
  {
    quote:
      "I hired Navdeep for a Laravel dashboard rebuild on a tight deadline. He communicated clearly, scoped the work realistically, and delivered exactly what we agreed on — no scope creep, no surprises.",
    name: "Freelance Client",
    role: "Freelance project — placeholder, replace with a real quote",
  },
  {
    quote:
      "What stood out working alongside Navdeep was how comfortable he was moving between backend and frontend without losing quality on either side. That's rare.",
    name: "Teammate",
    role: "Cross-functional project — placeholder, replace with a real quote",
  },
];

export const githubUsername = "Navdeep434";
export const githubFreelanceUsername = "buildwithcode915";

export const socials = {
  github: `https://github.com/${githubUsername}`,
  githubFreelance: `https://github.com/${githubFreelanceUsername}`,
  linkedin: "https://www.linkedin.com/in/navdeep-raushan-656895157",
  email: "n.navdeepraushan98@gmail.com",
};
