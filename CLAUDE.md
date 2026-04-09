# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Graebener.tech is a dark, futuristic portfolio website showcasing agentic engineering projects. Built with Next.js 15 (App Router), Tailwind CSS v4, and Motion (Framer Motion).

## Commands

- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Production build
- `npm run start` — Serve production build
- `npm run lint` — Run ESLint

## Architecture

**Tech Stack:** Next.js 15 (App Router, TypeScript), Tailwind CSS v4 (CSS-first config in `globals.css` via `@theme {}`), Motion for animations, tsParticles for hero background.

**Key Patterns:**
- Server Components by default. Client components (`'use client'`) only for: ParticleBackground, Navbar, ContactForm, ProjectViewer, AnimatedText, GlowCard, SectionHeading, TechStackGrid, ProjectGrid
- tsParticles must use `next/dynamic` with `ssr: false` (not just `'use client'`)
- All theme tokens defined in `src/app/globals.css` — no `tailwind.config.js`
- Tailwind v4 color classes use `bg-bg-primary`, `text-accent`, `border-border` etc. (mapped via `@theme inline`)

**Content Systems:**
- **Projects:** Static HTML demos in `public/projects/{slug}/index.html`, metadata in `src/data/projects.ts`, served via sandboxed iframes in ProjectViewer
- **Webbuilder Sites:** Static HTML demos in `public/webbuilder/sites/[slug]/` with `index.html` + `meta.json`. API route `/api/sites` lists them, cards link directly to static files. SiteGallery + SiteCard display them at `/webbuilder`
- **Blog:** MDX files in `content/blog/` with gray-matter frontmatter, compiled via `next-mdx-remote/rsc` + `rehype-pretty-code`

**Directory Layout:**
- `src/app/` — Pages and routes (App Router)
- `src/components/` — Organized by feature: `hero/`, `about/`, `projects/`, `blog/`, `contact/`, `layout/`, `ui/`
- `src/data/` — Static data (project metadata)
- `src/lib/` — Utilities (`mdx.ts` for blog, `utils.ts` for `cn()`)
- `content/blog/` — MDX blog posts
- `public/projects/` — Static project demo files

## Adding New Content

**New project:** Add entry to `src/data/projects.ts`, create `public/projects/{slug}/index.html`

**New webbuilder site:** Add folder to `public/webbuilder/sites/[slug]/` with `index.html` (self-contained HTML/CSS/JS with assets) + `meta.json` (title, description, industry, category, tags, status, color_accent). Push and deploy — card appears automatically at `/webbuilder`.

**New blog post:** Create `content/blog/{slug}.mdx` with frontmatter: `title`, `description`, `date`, `tags`, `published`

## Git Workflow (git-auto skill)

This project uses the **git-auto** skill (`.claude/skills/git-auto/SKILL.md`) for all git operations. When performing any git action — commits, pushes, branch creation, PRs — follow the skill's instructions:

- **Auto-accept permissions** are configured in `.claude/settings.local.json` (safety-first: force pushes blocked, pushes to main/master/prod require confirmation, everything else auto-approved)
- **Use conventional commits**: `feat:`, `fix:`, `refactor:`, `docs:`, `style:`, `test:`, `chore:`
- **Stage files explicitly** — never use `git add -A` or `git add .`
- **Log every git session** to `.claude/git-auto-log.json` after completing any git workflow
- **Create PRs** with structured descriptions using `gh pr create`
- **Review workflow periodically** — run the review process when 20+ sessions accumulate or the user asks
- Never commit `.env`, credentials, API keys, or secrets
- Never force push to main, master, or prod
- If a pre-commit hook fails, fix the issue and create a NEW commit (never --amend)

## Design System

Dark cyberpunk aesthetic. Key colors: cyan accent `#00f0ff`, purple `#7b2ff7`, pink `#ff2d55`. Backgrounds: `#0a0a0f`, `#12121a`. Fonts: Inter (sans), JetBrains Mono (mono). CSS utility classes: `.glow-text`, `.glow-box`, `.glitch-text`, `.grid-bg`
