import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import TechMarquee from "@/components/tech-marquee";
import About from "@/components/about";
import Skills from "@/components/skills";
import ArchitectureLab from "@/components/architecture-lab";
import GithubStats from "@/components/github-stats";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Testimonials from "@/components/testimonials";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <ArchitectureLab />
        <GithubStats />
        <Experience />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
