import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Grain from "@/components/grain";
import CustomCursor from "@/components/custom-cursor";
import ScrollProgress from "@/components/scroll-progress";
import KonamiEasterEgg from "@/components/konami-easter-egg";
import CursorSpotlight from "@/components/cursor-spotlight";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://navdeep434.github.io/portfolio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Navdeep Raushan — Full-Stack Software Engineer",
    template: "%s — Navdeep Raushan",
  },
  description:
    "Full-Stack Engineer building scalable systems across Java/Spring Boot, Next.js/TypeScript, and Laravel. Explore my projects, experience, and skills.",
  keywords: [
    "Software Engineer",
    "Full-Stack Developer",
    "Java",
    "Spring Boot",
    "Next.js",
    "TypeScript",
    "Laravel",
    "React",
    "Portfolio",
  ],
  authors: [{ name: "Navdeep Raushan" }],
  creator: "Navdeep Raushan",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Navdeep Raushan — Full-Stack Software Engineer",
    description:
      "Full-Stack Engineer building scalable systems across Java, Next.js & Laravel.",
    siteName: "Navdeep Raushan Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Navdeep Raushan — Full-Stack Software Engineer",
    description:
      "Full-Stack Engineer building scalable systems across Java, Next.js & Laravel.",
    images: ["/og-image.png"],
  },
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored || 'dark';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-accent">
        <Grain />
        <CustomCursor />
        <ScrollProgress />
        <KonamiEasterEgg />
        <CursorSpotlight />
        {children}
      </body>
    </html>
  );
}
