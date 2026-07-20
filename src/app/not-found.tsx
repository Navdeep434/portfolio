import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-32">
        <div className="mesh-bg">
          <div className="mesh-blob left-[10%] top-[10%] h-[360px] w-[360px] bg-accent" />
          <div className="mesh-blob right-[10%] bottom-[10%] h-[320px] w-[320px] bg-accent-2" />
          <div className="grid-pattern absolute inset-0" />
        </div>

        <div className="relative z-10 mx-auto max-w-lg text-center">
          <p className="font-display text-gradient text-[clamp(4rem,14vw,8rem)] font-semibold leading-none">
            404
          </p>

          <div className="glass mx-auto mt-8 max-w-md rounded-2xl p-5 text-left font-mono text-sm">
            <div className="flex items-center gap-1.5 border-b border-border-subtle pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              <span className="ml-3 text-xs text-muted">zsh — portfolio</span>
            </div>
            <p className="mt-3">
              <span className="text-accent">➜</span>{" "}
              <span className="text-foreground">cd {"{this-page}"}</span>
            </p>
            <p className="mt-1 text-muted">
              zsh: no such file or directory
            </p>
          </div>

          <p className="mt-8 text-base text-muted">
            The page you&apos;re looking for doesn&apos;t exist, or moved.
          </p>

          <Link
            href="/"
            data-cursor-hover
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#1c1005] transition-shadow hover:shadow-lg hover:shadow-accent/25"
          >
            <FiArrowLeft />
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
