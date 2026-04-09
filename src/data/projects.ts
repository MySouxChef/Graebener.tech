export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  thumbnail: string;
  thumbnailExists: boolean;
  demoPath: string;
  githubUrl?: string;
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
    techStack: ["Next.js", "Claude AI", "GitHub API", "TypeScript"],
    thumbnail: "/images/projects/webbuilder-thumb.png",
    thumbnailExists: false,
    demoPath: "",
    githubUrl: "https://github.com/MySouxChef/website-demos",
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
    techStack: ["Next.js", "TypeScript", "Supabase", "Claude AI", "Stripe", "Tailwind"],
    thumbnail: "/images/projects/mysouxchef-thumb.png",
    thumbnailExists: true,
    demoPath: "/projects/mysouxchef/index.html",
    githubUrl: "https://github.com/MySouxChef/MySouxChef",
    featured: true,
  },
  {
    slug: "ai-agent-dashboard",
    title: "AI Agent Dashboard",
    description:
      "Real-time monitoring dashboard for autonomous AI agents with task management and analytics.",
    longDescription:
      "A comprehensive dashboard for managing and monitoring autonomous AI agents. Features include real-time task tracking, performance analytics, agent communication logs, and automated workflow visualization. Built with a focus on clean UX and instant data updates.",
    techStack: ["React", "TypeScript", "WebSocket", "D3.js", "Tailwind"],
    thumbnail: "/images/projects/ai-dashboard-thumb.png",
    thumbnailExists: false,
    demoPath: "/projects/ai-agent-dashboard/index.html",
    featured: true,
  },
  {
    slug: "smart-automation-cli",
    title: "Smart Automation CLI",
    description:
      "Intelligent command-line tool that automates repetitive development workflows using AI.",
    longDescription:
      "A CLI tool that learns from your development patterns and automates repetitive tasks. Uses natural language processing to understand commands and can generate boilerplate, run test suites, and manage deployments with simple conversational inputs.",
    techStack: ["Python", "OpenAI", "Click", "Rich"],
    thumbnail: "/images/projects/cli-thumb.png",
    thumbnailExists: false,
    demoPath: "/projects/smart-automation-cli/index.html",
    featured: true,
  },
  {
    slug: "neural-code-reviewer",
    title: "Neural Code Reviewer",
    description:
      "AI-powered code review system that provides intelligent feedback and security analysis.",
    longDescription:
      "An automated code review system that uses large language models to analyze pull requests, identify potential bugs, suggest improvements, and flag security vulnerabilities. Integrates directly with GitHub via webhooks for seamless developer experience.",
    techStack: ["Next.js", "Claude API", "GitHub API", "PostgreSQL"],
    thumbnail: "/images/projects/code-reviewer-thumb.png",
    thumbnailExists: false,
    demoPath: "/projects/neural-code-reviewer/index.html",
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
