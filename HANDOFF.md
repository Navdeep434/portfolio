# Session Handoff — Navdeep Raushan Portfolio

Reference doc for continuing this project in a fresh session. Read this first before touching anything.

## What this is

A Next.js 16 (App Router, static export) portfolio for **Navdeep Raushan**, deployed to GitHub Pages at a custom domain, built with Tailwind v4 + Framer Motion.

- **Live site**: https://navdeepraushan.in
- **Repo**: https://github.com/Navdeep434/portfolio (branch: `master`)
- **Local path**: `D:\Projects\portfolio-new`
- **Dev server**: `npm run dev -- -p 3001` (port 3000 is occupied by something else on this machine — always use 3001)

## Real identity — do not regress this

Early in the project the site was built around a **placeholder** Java/Spring Boot/Laravel stack from a generic brief. Partway through, the user supplied their **actual resume** and the site was fully rewritten to match. The real facts:

- **Real stack**: Node.js, Express.js, React.js, Next.js, JavaScript (ES6+), MySQL, MongoDB, Socket.io, JWT/RBAC, Tailwind CSS, Bootstrap, Redis, Docker, Jira, Postman, Git/GitHub
- **NOT**: Java, Spring Boot, Laravel, PHP, SQL Server, TypeScript — if you see any of these creep back in anywhere, it's a regression, remove it
- **Experience** (newest first, in `src/lib/data.ts`): RCS Tech (Jul 2025–Present) → Freelance/Independent, New Delhi (Aug 2024–Jun 2025) → Einsicht Technologies (Jan 2023–Aug 2024) → Einsicht Technologies Freelance (Apr 2022–Dec 2022). **A "Rim Softech LLP" entry (Nov 2020–Nov 2021) exists in the real resume but was explicitly excluded by the user** — never add it back.
- **Years of experience**: stated as **"3+"** on the site (the resume itself says "4+" but the user explicitly corrected this down to 3+ — use 3+, not 4+)
- **Projects**: Vendor Management & P2P Platform, NandNiwas (old age home/resort system), 96Astro (astrology platform), Telecom CRM Tool — all real, from the resume
- **GitHub**: `Navdeep434` (main/office) and `buildwithcode915` (freelance) — both used across the site (nav, footer, command palette, terminal, project links)
- **LinkedIn**: `https://www.linkedin.com/in/navdeep-raushan-656895157` (note: the resume PDF prints a shortened vanity version without the numeric suffix — the working URL has the suffix, don't "fix" it)
- **Email**: `hello@navdeepraushan.in` (already migrated off the personal Gmail — this is live/working, confirmed by the user)
- **Education**: B.Tech Mechanical Engineering, Techno Engineering College Banipur, 2016–2020, DGPA 7.65 (only appears on the resume PDF, not the site itself)

## Design system

Deliberately moved **off** a generic "AI portfolio" look (near-black + single neon-green accent, Inter+Space Grotesk everywhere, uniform rounded-2xl cards) after research showed that's a well-documented AI-generated-design cliché.

- **Palette**: warm terracotta/copper accent — dark mode `--accent: #e2661c`, light mode `--accent: #c2500f` — on a warm charcoal (dark, `#0f0b07`) / warm bone (light, `#f7f1e6`) ground. Defined in `src/app/globals.css` under `:root` / `.dark`.
- **Type**: Bricolage Grotesque (display/headings, has real character at large sizes) + Inter (body only) + JetBrains Mono (terminal/code). Loaded via `next/font/google` in `src/app/layout.tsx`.
- **Deliberate asymmetry**: bento-style Skills grid (largest category gets the hero tile), varied corner radii instead of uniform rounding, testimonial cards have independent slight rotation, hero uses oversized kinetic name typography in an asymmetric two-column layout (not centered-stack).
- Full-page color hex `#1c1005` is used as the "text-on-accent" contrast color (buttons filled with the accent) — matches the warm ink tone, not black.

## Infra / deployment

- **Static export**: `next.config.ts` has `output: "export"`, `images.unoptimized: true`, `trailingSlash: true`. No `basePath` (site serves from domain root, not a subpath).
- **Custom domain**: `navdeepraushan.in`, DNS already pointed at GitHub Pages, HTTPS cert approved (apex + www). Confirmed live via `curl` (`Server: GitHub.com`). No `CNAME` file needed in the repo for Actions-based Pages deploys — the domain is registered at the repo/Pages-settings level directly.
- **Deploy pipeline**: `.github/workflows/deploy.yml` — builds and deploys to GitHub Pages automatically on every push to `master`. Takes ~40–50s.
- **GitHub CLI**: installed on this machine at `C:\Program Files\GitHub CLI\gh.exe` (**not on PATH** in Bash tool sessions — always use the full path, e.g. `"/c/Program Files/GitHub CLI/gh.exe" run list`). Authenticated as `Navdeep434`.
- **Analytics**: GA4 + Microsoft Clarity integration code is live (`src/components/analytics.tsx`) but inert — activates automatically once `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_CLARITY_ID` repo variables are set (Settings → Secrets and variables → Actions → Variables). Same pattern for `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
- **Google Search Console**: not yet submitted — needs the user's own Google login, I can't do this on their behalf. Sitemap is ready at `https://navdeepraushan.in/sitemap.xml`.

## Generated binary assets (no source files checked in)

These were generated via throwaway Node scripts in the scratchpad (not committed) using `pdf-lib` and `sharp`. If they need regenerating, recreate the script from scratch — the pattern is: `npm init -y && npm install pdf-lib` (or `sharp`), write a `generate.js`, run it, copy the output into `public/`, delete the scratch folder.

- `public/resume.pdf` — generated from the real resume content, styled to match the site (terracotta accent, same fonts-as-close-as-pdf-lib-allows). Regenerate if experience/skills/projects change.
- `public/og-image.png` — 1200×630 Open Graph preview image, matches current tech pills (Node.js/Express.js/React/Next.js/MongoDB). Regenerate if the headline stack changes.
- `src/app/icon.svg`, `src/app/apple-icon.png`, `src/app/favicon.ico` — "NR" monogram, recolored to the terracotta palette. Some environment-level auto-tooling redesigned the original letter-stroke version of this icon mid-session (see "Known quirks" below) — treat the current SVG as authoritative, don't revert it.
- `public/avatar.jpg` — real photo, converted from HEIC and optimized (330KB → 145KB).

## Known quirks in this dev environment — read before debugging

1. **Something else commits to this repo in parallel.** Multiple times this session, commits appeared (`Create CNAME`, `Remove basePath from next.config.ts`, `favicon updated`, a generic `updates` commit that matched files I was independently mid-edit on) that I never made. Always `git fetch && git status` before assuming the working tree state, and don't be surprised if `git status` is already clean when you expected to commit — check if the changes already landed.
2. **The browser preview tool's tab reports `document.hidden: true` permanently.** This pauses Framer Motion's internal `requestAnimationFrame` loops, so `useScroll`/`useTransform`-driven animations (parallax, scroll-to-top ring, confetti sizing, view-transition theme toggle) cannot be visually verified as "animating" in this session's browser tool — you'll see correct *structural* state (right classes, right initial values) but scroll-linked motion values won't visibly update. This is a tooling limitation, not a site bug — don't chase it.
3. **Git Bash mangles POSIX-style env var values that start with `/`.** E.g. `NEXT_PUBLIC_BASE_PATH=/portfolio` becomes `C:/Program Files/Git/portfolio`. Use the PowerShell tool for any command setting such env vars.
4. **`gh` is not on PATH** in Bash tool sessions even though it's installed — always call it via the full path.
5. **External GitHub badge services are unreliable.** `github-readme-stats.vercel.app` returns intermittent `503`s; the original `github-readme-streak-stats.herokuapp.com` is likely permanently dead (Heroku killed free tier years ago) — already switched to `streak-stats.demolab.com`. Both images in `src/components/github-stats.tsx` have `onError` handlers that remove themselves from the DOM on failure — don't remove that safety net.

## Verification routine (do this before every push)

```
npx tsc --noEmit      # must be silent
npx eslint src         # must be silent
npm run build           # must complete with all routes listed, no errors
rm -rf out              # clean up static export output before committing
```

Then `git add -A -- ':!node_modules' ':!out'`, commit, push, and watch the deploy:
```
"/c/Program Files/GitHub CLI/gh.exe" run watch <run-id> --exit-status
```

## Suggested prompt to paste into a new session

> This is a Next.js 16 portfolio for Navdeep Raushan, deployed to GitHub Pages at navdeepraushan.in. Read `HANDOFF.md` in the project root (`D:\Projects\portfolio-new`) first — it has the real identity/stack facts (Node.js/Express/React/Next.js, NOT Java/Spring/Laravel), the design system, deployment setup, and known environment quirks from the previous session. Dev server: `npm run dev -- -p 3001`. [Then state what you want done next.]
