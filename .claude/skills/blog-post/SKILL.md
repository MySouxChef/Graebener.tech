---
name: blog-post
description: >
  Creates, saves, commits, and deploys blog posts to the Graebener.tech website.
  Use this skill whenever the user wants to: write a blog post, create a new article,
  publish a post, add to the blog, write about a topic, "new post", "blog about X",
  "write an article about X", "publish something about X", "add a blog entry",
  or any variation of creating written content for the Graebener.tech blog.
  Also trigger on casual phrases like "let's blog", "post about this",
  "write something up", or "I want to write about".
---

# Blog Post — Graebener.tech Blog Automation

This skill handles the full lifecycle of a blog post: writing, saving, committing, and deploying.

---

## Blog Post Format

All posts are MDX files stored in `content/blog/{slug}.mdx` with gray-matter frontmatter.

```mdx
---
title: "Post Title Here"
description: "A compelling one-line description for SEO and card previews."
date: "YYYY-MM-DD"
tags: ["tag1", "tag2", "tag3"]
published: true
---

Post content in Markdown/MDX...
```

### Frontmatter Rules
- **title**: Clear, engaging, not clickbait. Title case.
- **description**: 1-2 sentences. Shows on blog cards and SEO meta tags.
- **date**: Today's date in `YYYY-MM-DD` format.
- **tags**: 3-5 relevant lowercase tags. Common tags: `AI`, `agentic`, `engineering`, `automation`, `web-dev`, `claude`, `agents`, `typescript`, `next-js`, `devtools`.
- **published**: Set to `true` to make it visible. Use `false` for drafts.
- **slug**: Derived from filename. Use lowercase kebab-case: `my-post-title.mdx`

---

## Workflow

### Step 1: Gather Info

If the user provides a topic, proceed. If vague, ask:
- What's the topic or angle?
- Who's the audience? (developers, business owners, general tech)
- Any specific points to cover?

### Step 2: Write the Post

Generate a well-structured blog post following these guidelines:

**Voice & Tone:**
- Technical but accessible — explain concepts, don't assume
- Practical and opinionated — share real experience, not generic advice
- Focused on agentic engineering, AI, and modern development
- First person when sharing experience, second person when teaching
- No fluff, filler, or padding — every paragraph should earn its place

**Structure:**
- Open with a hook — a bold statement, question, or real scenario
- Use `##` headings to break into scannable sections
- Include code examples where relevant (TypeScript preferred)
- Use bullet lists and bold key terms for scannability
- End with a takeaway, call to action, or forward-looking statement
- Target 800-1500 words (4-7 minute read)

**MDX Rules:**
- Standard markdown syntax works
- Code blocks with language hints: ` ```typescript `
- Do NOT use JSX/React components — the MDX compiler will choke on raw `<Component>` syntax
- Avoid curly braces `{}` outside of code blocks (MDX interprets them)
- Use HTML entities for special characters if needed: `&mdash;` for —

### Step 3: Save the File

Write the MDX file to `content/blog/{slug}.mdx`:
- Slug = title in lowercase kebab-case, no special characters
- Example: "Building AI Agents" → `building-ai-agents.mdx`
- Verify the file doesn't already exist before writing

### Step 4: Commit & Push

Follow the git-auto skill conventions:
```bash
git add content/blog/{slug}.mdx
git commit -m 'docs: add blog post "{title}"'
git push
```

### Step 5: Deploy

```bash
vercel --prod --yes
```

Wait for deployment to complete and confirm it succeeded.

### Step 6: Confirm

Report to the user:
- Post title and slug
- Live URL: `https://graebener.tech/blog/{slug}`
- Reading time estimate
- Tags applied

---

## Quick Reference

| Field | Location |
|-------|----------|
| Blog directory | `content/blog/` |
| File format | `.mdx` (Markdown + frontmatter) |
| Frontmatter parser | `gray-matter` |
| MDX compiler | `next-mdx-remote/rsc` + `rehype-pretty-code` |
| Blog listing page | `src/app/blog/page.tsx` |
| Blog post page | `src/app/blog/[slug]/page.tsx` |
| Blog card component | `src/components/blog/BlogCard.tsx` |
| MDX component overrides | `src/components/blog/MdxComponents.tsx` |
| Live URL pattern | `https://graebener.tech/blog/{slug}` |

---

## Examples

**User says:** "Write a blog post about building Claude Code skills"

**Skill does:**
1. Generates `content/blog/building-claude-code-skills.mdx` with frontmatter + ~1000 words
2. Runs `git add content/blog/building-claude-code-skills.mdx`
3. Runs `git commit -m 'docs: add blog post "Building Claude Code Skills"'`
4. Runs `git push`
5. Runs `vercel --prod --yes`
6. Reports: "Published! Live at https://graebener.tech/blog/building-claude-code-skills"

**User says:** "Draft a post about speed to lead — don't publish yet"

**Skill does:**
1. Generates the MDX file with `published: false` in frontmatter
2. Commits with `docs: add draft blog post "Speed to Lead"`
3. Does NOT deploy (draft won't show on the site until published is flipped to true)
4. Reports: "Draft saved. Flip `published: true` when ready and deploy."
