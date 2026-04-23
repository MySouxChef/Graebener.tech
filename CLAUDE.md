# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Graebener.tech is a dark, futuristic portfolio website showcasing agentic engineering projects. Built with Next.js 16 (App Router), Tailwind CSS v4, and Motion (Framer Motion).

## Commands

- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Production build
- `npm run start` — Serve production build
- `npm run lint` — Run ESLint

No test framework is configured yet (Playwright is in devDependencies but no tests exist).

## Architecture

**Tech Stack:** Next.js 16 (App Router, TypeScript, React 19), Tailwind CSS v4 (CSS-first config in `globals.css` via `@theme inline`), Motion for animations, tsParticles for hero background.

**Key Patterns:**
- Server Components by default. Client components (`'use client'`) only when interactivity is needed
- tsParticles must use `next/dynamic` with `ssr: false` (not just `'use client'`)
- All theme tokens defined in `src/app/globals.css` — no `tailwind.config.js`
- Tailwind v4 color classes use `bg-bg-primary`, `text-accent`, `border-border` etc. (mapped via `@theme inline`)
- `next.config.ts` is an empty placeholder — no custom config

**Routes:**
- `/` — Homepage
- `/projects` and `/projects/[slug]` — Project showcase with iframe demos
- `/blog` and `/blog/[slug]` — MDX blog with `next-mdx-remote/rsc` + `rehype-pretty-code`
- `/skills` and `/skills/[slug]` — Skills marketplace (MD files + localStorage for user-built skills)
- `/skills/builder` — Interactive skill builder
- `/webbuilder` and `/webbuilder/[slug]` — Generated website gallery
- `/contact` — Contact form (Formspree)
- `sitemap.ts`, `robots.ts` — SEO generation

**Content Systems:**
- **Projects:** Static HTML demos in `public/projects/{slug}/index.html`, metadata in `src/data/projects.ts` (slug, title, description, longDescription, techStack[], demoPath, featured, etc.), served via sandboxed iframes
- **Blog:** MDX files in `content/blog/` with gray-matter frontmatter, compiled via `next-mdx-remote/rsc` + `rehype-pretty-code`. Helpers in `src/lib/mdx.ts`
- **Skills:** Markdown files in `content/skills/` with gray-matter frontmatter (title, description, category, tags, author, version, published). User-built skills saved to localStorage via `src/lib/saved-skills.ts`
- **Webbuilder Sites:** Static HTML demos in `public/webbuilder/sites/[slug]/` with `index.html` + `meta.json`. API route `GET /api/sites` reads `meta.json` files, filters by `status="published"`, returns sorted metadata

**Directory Layout:**
- `src/app/` — Pages, routes, API routes (App Router)
- `src/components/` — Organized by feature: `hero/`, `about/`, `projects/`, `blog/`, `contact/`, `layout/`, `ui/`
- `src/data/` — Static data (project metadata)
- `src/lib/` — Utilities (`mdx.ts` for blog, `skills.ts` for skills, `saved-skills.ts` for localStorage skills, `utils.ts` for `cn()`)
- `content/blog/` — MDX blog posts
- `content/skills/` — Markdown skill files
- `public/projects/` — Static project demo files
- `public/webbuilder/sites/` — Generated website demos

## Adding New Content

**New project:** Add entry to `src/data/projects.ts`, create `public/projects/{slug}/index.html`

**New webbuilder site:** Add folder to `public/webbuilder/sites/[slug]/` with `index.html` (self-contained HTML/CSS/JS with assets) + `meta.json` (title, description, industry, category, tags, status, color_accent, client_name). Card appears automatically at `/webbuilder`.

**New blog post:** Create `content/blog/{slug}.mdx` with frontmatter: `title`, `description`, `date` (YYYY-MM-DD), `tags`, `published`

**New skill:** Create `content/skills/{slug}.md` with frontmatter: `title`, `description`, `category` (one of: Code Generation, Code Review, DevOps, Testing, Documentation, AI & Agents, Utilities, Other), `tags`, `author`, `version`, `published`

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

Premium dark tech-firm aesthetic. Pure black background (`#000000`), spectral white text (`#f0f0fa`). Fonts: Barlow (sans, weights 400-700), JetBrains Mono (mono). Sentence case body text; uppercase reserved for `.eyebrow` labels, nav links, and badges. Glass-card surfaces: `rgba(255,255,255,0.03)` bg, `rgba(255,255,255,0.08)` border, `16px` radius, `backdrop-blur`. Ghost buttons with `12px` radius. Subtle WebGL atmospheric shader background. 3D project carousel on homepage using CSS transforms + Motion. Full design docs in `DESIGN.md`.
