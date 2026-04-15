import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore my portfolio of agentic engineering and full-stack projects.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading>Projects</SectionHeading>
        <p className="mb-12 max-w-2xl text-lg text-text-muted">
          A collection of projects showcasing agentic engineering, AI
          integration, and modern full-stack development.
        </p>
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
