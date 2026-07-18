"use client";

import { useEffect, useState } from "react";
import { FiGithub, FiStar, FiUsers, FiBox } from "react-icons/fi";
import FadeIn from "@/components/fade-in";
import SpotlightCard from "@/components/spotlight-card";
import AnimatedCounter from "@/components/animated-counter";
import { githubUsername, socials } from "@/lib/data";

type GithubProfile = {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  name: string | null;
  bio: string | null;
};

export default function GithubStats() {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/users/${githubUsername}`)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setProfile(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "error") {
    return (
      <section id="github" className="relative py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <FadeIn>
            <div className="glass rounded-3xl p-8 text-center">
              <FiGithub className="mx-auto mb-3 text-muted" size={22} />
              <p className="text-sm text-muted">
                Live GitHub stats will appear here once a real username is set
                in{" "}
                <code className="rounded bg-surface-2 px-1.5 py-0.5 text-xs">
                  src/lib/data.ts
                </code>
                .
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <FadeIn>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            GitHub Activity
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            What I&apos;ve been shipping
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <FadeIn delay={0.05}>
            <SpotlightCard className="flex h-full flex-col justify-between rounded-3xl border border-border-subtle bg-surface/60 p-8">
              <div className="flex items-center gap-4">
                {profile?.avatar_url && (
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border-subtle">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={profile.avatar_url}
                      alt={`${githubUsername} avatar`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-display text-base font-semibold text-foreground">
                    {profile?.name ?? githubUsername}
                  </p>
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="text-sm text-accent hover:underline"
                  >
                    @{githubUsername}
                  </a>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <FiBox className="mx-auto mb-2 text-accent" size={16} />
                  <p className="font-display text-xl font-semibold text-foreground">
                    <AnimatedCounter value={profile?.public_repos ?? 0} />
                  </p>
                  <p className="text-xs text-muted">Repos</p>
                </div>
                <div className="text-center">
                  <FiUsers className="mx-auto mb-2 text-accent" size={16} />
                  <p className="font-display text-xl font-semibold text-foreground">
                    <AnimatedCounter value={profile?.followers ?? 0} />
                  </p>
                  <p className="text-xs text-muted">Followers</p>
                </div>
                <div className="text-center">
                  <FiStar className="mx-auto mb-2 text-accent" size={16} />
                  <p className="font-display text-xl font-semibold text-foreground">
                    <AnimatedCounter value={profile?.following ?? 0} />
                  </p>
                  <p className="text-xs text-muted">Following</p>
                </div>
              </div>
            </SpotlightCard>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex h-full flex-col gap-4">
              <div className="overflow-hidden rounded-3xl border border-border-subtle">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&hide_border=true&bg_color=00000000&title_color=34d399&icon_color=34d399&text_color=9aa0a6&ring_color=34d399`}
                  alt="GitHub stats"
                  className="w-full"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-3xl border border-border-subtle">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&hide_border=true&background=00000000&ring=34d399&fire=34d399&currStreakLabel=34d399&sideLabels=9aa0a6&currStreakNum=f2f4f3&sideNums=f2f4f3&dates=6b7075`}
                  alt="GitHub streak stats"
                  className="w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
