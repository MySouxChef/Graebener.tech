export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  thumbnail: string;
  demoPath: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "ai-agent-dashboard",
    title: "AI Agent Dashboard",
    description:
      "Real-time monitoring dashboard for autonomous AI agents with task management and analytics.",
    longDescription:
      "A comprehensive dashboard for managing and monitoring autonomous AI agents. Features include real-time task tracking, performance analytics, agent communication logs, and automated workflow visualization. Built with a focus on clean UX and instant data updates.",
    techStack: ["React", "TypeScript", "WebSocket", "D3.js", "Tailwind"],
    thumbnail: "/images/projects/ai-dashboard-thumb.png",
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
