import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Grain from "@/components/grain";
import CustomCursor from "@/components/custom-cursor";
import HoverFix from "@/components/hover-fix";
import ScrollProgress from "@/components/scroll-progress";
import ScrollToTop from "@/components/scroll-to-top";
import KonamiEasterEgg from "@/components/konami-easter-egg";
import CursorSpotlight from "@/components/cursor-spotlight";
import Analytics from "@/components/analytics";
import PersonSchema from "@/components/person-schema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://navdeepraushan.in";
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Navdeep Raushan — Full-Stack Developer",
    template: "%s — Navdeep Raushan",
  },
  description:
    "Full-Stack Developer building scalable systems across Node.js, Express, React, and Next.js. Explore my projects, experience, and skills.",
  keywords: [
    "Navdeep Raushan",
    "Software Engineer",
    "Full-Stack Developer",
    "Node.js Developer",
    "Express.js",
    "React Developer",
    "Next.js Developer",
    "JavaScript",
    "MongoDB",
    "MySQL",
    "Socket.io",
    "Portfolio",
  ],
  authors: [{ name: "Navdeep Raushan", url: siteUrl }],
  creator: "Navdeep Raushan",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Navdeep Raushan — Full-Stack Developer",
    description:
      "Full-Stack Developer building scalable systems across Node.js, React & Next.js.",
    siteName: "Navdeep Raushan Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Navdeep Raushan — Full-Stack Developer",
    description:
      "Full-Stack Developer building scalable systems across Node.js, React & Next.js.",
    images: ["/og-image.png"],
  },
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
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
      className={`${inter.variable} ${bricolage.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <PersonSchema />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-accent">
        <Grain />
        <CustomCursor />
        <HoverFix />
        <ScrollProgress />
        <ScrollToTop />
        <KonamiEasterEgg />
        <CursorSpotlight />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
