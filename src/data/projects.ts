export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  techDetails: string;
  techStack: string[];
  thumbnail: string;
  thumbnailExists: boolean;
  demoPath: string;
  gallery?: string[];
  liveUrl?: string;
  externalLink?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "web-builder",
    title: "AI Web Builder",
    description:
      "Agentic website generator that creates full websites from prompts, pushes them to GitHub, and displays them in a searchable portfolio.",
    longDescription:
      "An AI-powered website generation system built with agentic engineering. Describe the website you need and the agent builds it — complete HTML, CSS, and JavaScript — then automatically pushes it to a GitHub repository. All generated sites are displayed in a searchable gallery portfolio with live previews, industry filters, and tag-based search.",
    techDetails:
      "The pipeline is a three-stage agent loop: a Claude-driven planner decomposes the prompt into page structure and content briefs, a generator stage emits self-contained HTML/CSS/JS per page (no build step, no dependencies — every site is a static folder), and a publisher stage commits the bundle to a demo GitHub repo via the GitHub REST API.\n\nEach generated site is paired with a `meta.json` manifest (title, description, industry, tags, status, color accent). The portfolio route `/webbuilder` hits `GET /api/sites`, which walks `public/webbuilder/sites/*/meta.json` server-side, filters on `status === \"published\"`, and returns sorted metadata. Individual sites render inside sandboxed iframes so untrusted generated markup can't touch the parent page.\n\nKey decisions: keeping sites as flat static folders avoids the deploy complexity of per-site builds; storing provenance in `meta.json` rather than a database keeps the gallery deterministically reproducible from the repo alone; GitHub-as-storage makes every generated site independently cloneable.",
    techStack: ["Next.js", "Claude AI", "GitHub API", "TypeScript"],
    thumbnail: "/images/projects/webbuilder-thumb.png",
    thumbnailExists: true,
    demoPath: "",
    externalLink: "/webbuilder",
    featured: true,
  },
  {
    slug: "mysouxchef",
    title: "MySouxChef",
    description:
      "AI personal assistant for chefs — manage inventory, menus, recipes, food cost, and alerts all from one chat interface.",
    longDescription:
      "MySouxChef is an AI-powered kitchen management platform where chefs talk to their kitchen through a single chat interface. Ask about inventory levels, recipe costs, menu pricing, and get instant answers powered by Claude AI using your real kitchen data. Features include photo-based inventory scanning, invoice processing, smart par level alerts, vendor price tracking, shelf-life monitoring, recipe costing, team collaboration with role-based access, and Stripe-powered subscription billing with a 14-day free trial.",
    techDetails:
      "Built on Next.js App Router with a Supabase Postgres backend using row-level security for multi-tenant isolation — every query is scoped to the chef's kitchen, enforced at the database layer rather than the application layer. The chat experience is a Claude agent that calls typed tools against the kitchen schema: `get_inventory(sku)`, `cost_recipe(id)`, `price_menu_item(id)`, `alert_low_stock()`. Structured output keeps the LLM from hallucinating numbers — every figure it quotes comes from a SQL query it just ran.\n\nInventory capture uses Claude's vision models: snap a photo of a walk-in shelf or a vendor invoice, and a parser stage extracts SKUs, quantities, and unit prices into staged rows the chef confirms before commit. Par-level alerts run as scheduled jobs that compare current counts to usage-weighted thresholds.\n\nBilling uses Stripe subscriptions with a 14-day trial; role-based access (owner / manager / line cook) is enforced via Supabase RLS policies so a line cook literally cannot read cost data.",
    techStack: ["Next.js", "TypeScript", "Supabase", "Claude AI", "Stripe", "Tailwind"],
    thumbnail: "/images/projects/mysouxchef-thumb.png",
    thumbnailExists: true,
    demoPath: "/projects/mysouxchef/index.html",
    featured: true,
  },
  {
    slug: "speed-to-lead",
    title: "Speed to Lead",
    description:
      "AI-powered lead response system that engages prospects in under 5 seconds across SMS, email, and live chat — with personalized, context-aware messages.",
    longDescription:
      "An automated lead response pipeline that eliminates slow follow-up. The moment a prospect submits a form, AI analyzes their intent and generates personalized responses dispatched simultaneously across SMS (Twilio), email (Resend), and live chat. Includes lead scoring, smart routing to the right team member, CRM sync, and a real-time analytics dashboard. Built as a service offering for businesses that lose deals to slow response times.",
    techDetails:
      "The end-to-end budget is sub-5 seconds from form submission to first outbound message. Form posts hit a Next.js route handler that immediately enqueues the lead and returns 200 — no blocking work on the inbound request. A Fluid Compute worker pulls the event, runs a Claude call for intent classification and message generation, and fans out to Twilio (SMS) and Resend (email) in parallel. Live chat is pushed over a Supabase Realtime channel for the agent's inbox.\n\nLead scoring is a small rubric-based Claude call (not ML): it scores 0–100 on fit, urgency, and deal size, and returns a routing key. The dispatcher then looks up which team member owns that key and attaches the lead. Everything — submissions, model calls, dispatches, replies — writes to a Supabase event log that powers the real-time analytics dashboard.\n\nKey decisions: inbound and outbound are fully decoupled so a slow model call can't drop a form submission; Claude is only used where judgement matters (intent, tone, routing) — templates do the rest; response-time SLA is measured end-to-end, not per-stage, so regressions surface immediately.",
    techStack: ["Next.js", "Claude AI", "Twilio", "Resend", "Supabase"],
    thumbnail: "/images/projects/speed-to-lead-thumb.png",
    thumbnailExists: true,
    demoPath: "/projects/speed-to-lead/index.html",
    featured: true,
  },
  {
    slug: "db-reactivation",
    title: "Database Reactivation",
    description:
      "AI-powered workflow that mines your existing CRM, segments cold leads, and runs personalized re-engagement campaigns to recover lost revenue.",
    longDescription:
      "Most businesses are sitting on hundreds of dormant contacts that already know them. This system imports your CRM or contact database, uses AI to segment contacts by recency, value, and intent, then generates personalized multi-channel outreach sequences. Staggered drip campaigns via SMS and email re-engage cold leads with context-aware messaging. Includes response routing, A/B testing, compliance filtering, and a revenue attribution dashboard. Pairs with Speed to Lead for full pipeline coverage.",
    techDetails:
      "Pairs with Speed to Lead and shares its Supabase + Twilio + Resend infrastructure. The distinct work is the reactivation pipeline itself: CSV or CRM imports land in a staging table, a compliance stage strips contacts that have opted out or bounced, then a Claude segmenter tags each contact with recency, estimated value, and intent signal from prior notes or activity logs.\n\nCampaign sequences are templated but personalized per segment: Claude drafts the opener per contact using last-touch context, subsequent touches in the drip are chosen from a library based on prior response behavior. Sends are staggered across time zones and throttled to respect deliverability quotas. Replies route back into Speed to Lead's inbox so hot responses get the same sub-5s treatment as fresh leads.\n\nA/B tests are first-class: each sequence has variants, assignment is sticky per contact, and the revenue attribution dashboard reports lift per variant with contact-level cost vs. closed-deal value so ROI is directly visible.",
    techStack: ["Next.js", "Claude AI", "Twilio", "Resend", "Supabase"],
    thumbnail: "/images/projects/db-reactivation-thumb.png",
    thumbnailExists: true,
    demoPath: "/projects/db-reactivation/index.html",
    featured: true,
  },
  {
    slug: "poker",
    title: "Poker Trainer",
    description:
      "9-handed $1/$2 No-Limit Hold'em training sim with AI opponents, drill mode, and Claude-powered hand review.",
    longDescription:
      "A web-based poker trainer built for sharpening real No-Limit Hold'em decisions, not for entertainment. You sit at seat 0 of a 9-handed $1/$2 NLHE table against 8 AI opponents that each play to a distinct archetype — TAG, LAG, Nit, Calling Station, Maniac, Rock, Fish, Reg — so you face a realistic mix of playing styles. Drill Mode lets you practice specific spots (preflop opens, 3-bet pots, flush draws, river bluff-catching). Every hand can be sent for AI review that grades your decisions street by street with EV estimates and notes. Session stats, bankroll tracking, hand history, and a built-in strategy guide round it out, all stored locally — no accounts, no servers, no money.",
    techDetails:
      "Built on Next.js 16 (App Router) with React 19 and TypeScript. The code is split along strict boundaries: pure game logic (dealing, hand evaluation, pot math, action validation) lives in `lib/poker/` with zero React imports — it's a standalone engine that's easy to unit-test and can be re-used for headless simulations. The bot engine in `lib/ai/` implements eight playing archetypes as rule-based policies keyed off hand strength, position, pot odds, and stack depth; keeping bots deterministic rather than LLM-driven means they're fast, cheap, and consistent across hands.\n\nAI analysis is a two-track setup. The default is local: an Ollama server runs the review model on the user's machine, so nothing leaves the box and there are no API costs. Optional fallback is the Anthropic SDK with Claude for higher-quality reviews when the user configures an API key. The review prompt ships the full hand history in structured form plus a RAG-style recall of similar past hands pulled from the user's own session log — the model grades each street with EV notes and flags leaks.\n\nPersistence is localStorage-only: no backend, no accounts. Session stats, bankroll across sessions, and hand history are all client-side. Recharts drives the stats visualisations. The result is a fully offline-capable training tool that respects privacy and costs nothing to run.",
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Ollama", "Claude API", "Recharts"],
    thumbnail: "/images/projects/poker-thumb.png",
    thumbnailExists: true,
    demoPath: "",
    gallery: [
      "/images/projects/poker-gallery/01-table.png",
      "/images/projects/poker-gallery/02-drill-mode.png",
      "/images/projects/poker-gallery/03-action.png",
    ],
    featured: true,
  },
  {
    slug: "rag-memory",
    title: "RAG Memory",
    description:
      "Local MCP server that helps Claude Code discover the right skill, agent, or resource for a task using hybrid retrieval.",
    longDescription:
      "Claude Code users end up with dozens of skills, subagents, and curated references scattered across `~/.claude/`. Finding the right one at the right moment becomes the bottleneck — so this MCP server exposes a single `find_resource` tool that Claude can call before solving a task from scratch. It indexes three source trees (skills, superpowers agents, curated resources), returns the best-fit matches with ready-to-use invocation hints like `Skill(\"name\")` or `Agent(subagent_type=\"name\")`, and runs entirely offline against a local SQLite database. No network calls, no API keys, no external services — just a discovery layer that turns a growing personal catalog into something actually searchable.",
    techDetails:
      "Python 3.13 with `uv` for dependency management. The server talks MCP over stdio (`mcp>=1.2.0`) so it drops into any MCP-aware client with one config entry. Storage is SQLite with two extensions: `sqlite-vec` for 768-dim vector search and FTS5 for full-text search, kept in a single `~/.claude/rag/memory.db` file that's trivially portable.\n\nRetrieval is hybrid. A query is embedded locally via Ollama (`nomic-embed-text`, 768-dim) and run as a cosine-distance search; the same query is tokenised and run through FTS5's BM25 ranker. The two ranked lists are merged via Reciprocal Rank Fusion (score = Σ 1 / (k + rank)), which avoids the cold-start failure mode of pure vector search — if a query happens to use the exact terms a skill's description uses, lexical match still wins, and vice versa for synonyms.\n\nA deliberate choice: the embedding target is just `name + description + when_to_use` from each SKILL's frontmatter — never the full body. This keeps embeddings cheap, the index tiny, and the signal aligned with the discovery task. Full bodies are there if you want to read them; they don't need to be in the vector space.\n\nModule boundaries are strict and one-way: `ollama.py` (HTTP only) → `store.py` (SQL only) → `sources.py` (filesystem parsing) → `index.py` (sync + change detection) → `search.py` (hybrid retrieval) → `server.py` (MCP plumbing). Lazy indexing on first query; a separate `rag-memory-reindex` CLI entry point does full rebuilds. Tests inject a fake embedding function so the suite runs with no network or Ollama dependency.",
    techStack: ["Python 3.13", "MCP", "Ollama", "sqlite-vec", "SQLite FTS5", "pytest", "uv"],
    thumbnail: "/images/projects/rag-memory-thumb.svg",
    thumbnailExists: true,
    demoPath: "",
    gallery: [
      "/images/projects/rag-memory-gallery/01-sources.svg",
      "/images/projects/rag-memory-gallery/02-hybrid-retrieval.svg",
      "/images/projects/rag-memory-gallery/03-modules.svg",
    ],
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
