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
    id: "Node.js",
    color: "#84cc16",
    title: "Secure, RBAC-driven service architecture",
    copy: "A production request path with JWT-based auth, role-based access control, and validated boundaries between layers.",
    nodes: [
      { name: "Client", detail: "Validated request" },
      { name: "Express API", detail: "JWT · RBAC · REST" },
      { name: "Service layer", detail: "Business rules" },
      { name: "MySQL", detail: "Reliable persistence" },
    ],
    pulse: "$ system.status → RBAC enforced on every route",
  },
  {
    id: "Next.js",
    color: "#38bdf8",
    title: "Fast interface delivery",
    copy: "A progressive frontend path tuned for a useful first paint, component reusability, and instant user feedback.",
    nodes: [
      { name: "Edge", detail: "Route & cache" },
      { name: "Server UI", detail: "Streamed shell" },
      { name: "React", detail: "Interactive components" },
      { name: "User", detail: "Instant feedback" },
    ],
    pulse: "$ system.status → progressively enhanced by default",
  },
  {
    id: "Real-time",
    color: "#f472b6",
    title: "Real-time communication architecture",
    copy: "A bidirectional event path for live consultations, chat, and order tracking without polling.",
    nodes: [
      { name: "Client", detail: "WebSocket connect" },
      { name: "Socket.io gateway", detail: "Event routing" },
      { name: "Event handlers", detail: "Business logic" },
      { name: "MongoDB", detail: "Live state" },
    ],
    pulse: "$ system.status → sub-second event delivery",
  },
];

export type SkillCategory = {
  title: string;
  items: { name: string; icon: string }[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    items: [
      { name: "React.js", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "JavaScript (ES6+)", icon: "javascript" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Bootstrap", icon: "bootstrap" },
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Express.js", icon: "express" },
      { name: "REST APIs", icon: "api" },
      { name: "JWT Authentication", icon: "jwt" },
      { name: "Socket.io", icon: "socketio" },
    ],
  },
  {
    title: "Database",
    items: [
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB", icon: "mongodb" },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Postman", icon: "postman" },
      { name: "Jira", icon: "jira" },
      { name: "Redis", icon: "redis" },
      { name: "Docker", icon: "docker" },
    ],
  },
];

export type ExperienceItem = {
  role: string;
  company: string;
  location: string;
  duration: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Full Stack Developer",
    company: "RCS Tech",
    location: "Bengaluru, Karnataka",
    duration: "Jul 2025 — Present",
    bullets: [
      "Developing enterprise Vendor Management and Procurement-to-Pay (P2P) systems using Node.js and Express.js.",
      "Designing secure RESTful APIs with JWT-based authentication and role-based access control (RBAC).",
      "Building automated compliance reporting modules to streamline regulatory and operational processes.",
      "Optimizing MySQL queries and backend services for improved scalability and performance.",
    ],
  },
  {
    role: "Full Stack Developer (Freelance)",
    company: "Independent",
    location: "New Delhi, India",
    duration: "Aug 2024 — Jun 2025",
    bullets: [
      "Developed NandNiwas — an old age home & resort management system with room management, resident tracking, and automated invoice generation.",
      "Built 96Astro — an astrology platform enabling course purchases, real-time text/video consultations, and integrated e-commerce.",
      "Designed admin modules for astrologer management, order handling, and user activity monitoring.",
      "Implemented real-time communication using Socket.io and secure payment workflows.",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "Einsicht Technologies",
    location: "Hyderabad, India",
    duration: "Jan 2023 — Aug 2024",
    bullets: [
      "Developed a telecom CRM system managing SIM cards, tariffs, smartphones, and customer lifecycle workflows.",
      "Built and maintained responsive frontend applications using React.js.",
      "Designed RESTful APIs and backend services using Node.js and MySQL.",
      "Collaborated with cross-functional teams to deliver high-quality, production-ready solutions.",
    ],
  },
  {
    role: "Full Stack Developer (Freelance)",
    company: "Einsicht Technologies",
    location: "Hyderabad, India",
    duration: "Apr 2022 — Dec 2022",
    bullets: [
      "Developed Metallorum, an online gold listing and selling platform.",
      "Implemented real-time pricing updates via API integrations.",
      "Designed secure backend architecture and integrated payment gateway workflows.",
      "Built a dashboard for managing product listings, transactions, and analytics.",
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
    slug: "vendor-management-p2p",
    title: "Vendor Management & P2P Platform",
    description:
      "Enterprise procurement workflows covering vendor onboarding, invoice processing, approval hierarchies, and compliance automation.",
    tech: ["Node.js", "Express.js", "MySQL", "JWT", "RBAC"],
    featured: true,
    tone: "#84cc16",
    year: "2025",
    role: "Full Stack Developer",
    problem:
      "Procurement teams were managing vendor onboarding, invoices, and approvals through disconnected spreadsheets and email threads, making compliance tracking slow and error-prone.",
    solution:
      "Built a Node.js/Express platform with JWT-based authentication and role-based access control, covering the full procure-to-pay workflow from vendor onboarding through invoice approval, with automated compliance reporting.",
    highlights: [
      "Centralized vendor onboarding and invoice approval into a single auditable workflow.",
      "Enforced per-role access control (RBAC), reducing unauthorized approval risk.",
      "Optimized MySQL queries to keep compliance reporting fast at scale.",
    ],
  },
  {
    slug: "nandniwas",
    title: "NandNiwas",
    description:
      "A full-stack booking and billing platform for a facility serving both long-term residents and short-term resort guests.",
    tech: ["Node.js", "React.js", "MySQL"],
    tone: "#e2661c",
    year: "2024",
    role: "Full Stack Developer (Freelance)",
    problem:
      "The facility needed to manage two very different guest types — long-term residents and short-term resort stays — through one system, without a unified way to track rooms, billing, or occupancy.",
    solution:
      "Built a full-stack room booking and billing automation system with admin dashboards for resident tracking, room allocation, and automated invoice generation.",
    highlights: [
      "Unified long-term resident and short-term resort bookings in a single system.",
      "Automated invoice generation, cutting manual billing work.",
      "Gave staff a real-time view of room allocation and occupancy.",
    ],
  },
  {
    slug: "96astro",
    title: "96Astro",
    description:
      "An astrology course marketplace with real-time consultations and integrated e-commerce.",
    tech: ["Node.js", "React.js", "Socket.io"],
    tone: "#f472b6",
    year: "2024",
    role: "Full Stack Developer (Freelance)",
    problem:
      "The client wanted to sell astrology courses and connect users with astrologers for live consultations, but needed real-time communication and order management in one platform.",
    solution:
      "Built a course marketplace with integrated e-commerce, real-time text/video consultations via Socket.io, and admin modules for astrologer and order management.",
    highlights: [
      "Enabled live text/video consultations between users and astrologers in real time.",
      "Built admin tooling for astrologer management and order handling.",
      "Integrated secure payments and order lifecycle tracking end-to-end.",
    ],
  },
  {
    slug: "telecom-crm",
    title: "Telecom CRM Tool",
    description:
      "A CRM platform for managing SIM cards, tariffs, smartphones, and customer lifecycle workflows.",
    tech: ["Node.js", "React.js", "MySQL"],
    tone: "#38bdf8",
    year: "2023",
    role: "Full Stack Developer",
    problem:
      "Customer service teams needed a single system to manage SIM cards, tariffs, devices, and offers across the full customer lifecycle, instead of juggling multiple disconnected tools.",
    solution:
      "Built scalable RESTful APIs with Node.js, integrated with React.js dashboards, including offer management workflows for new and existing customers.",
    highlights: [
      "Consolidated SIM, tariff, and device management into one CRM.",
      "Built offer management workflows for new and existing customers.",
      "Owned debugging and testing to keep the system stable in production.",
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
      "Navdeep picked up our Node.js and Express services with almost no ramp-up time and immediately started raising the right questions about edge cases we hadn't considered. The APIs he shipped are still the most stable part of our backend.",
    name: "Engineering Manager",
    role: "Full-time role — placeholder, replace with a real quote",
  },
  {
    quote:
      "I hired Navdeep to build a full booking and billing platform on a tight timeline. He communicated clearly, scoped the work realistically, and delivered exactly what we agreed on — no scope creep, no surprises.",
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
  email: "hello@navdeepraushan.in",
};
