import type { Metadata } from "next";
import { SiteGallery } from "@/components/webbuilder/SiteGallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GridBackground } from "@/components/ui/GridBackground";

export const metadata: Metadata = {
  title: "Web Builder Portfolio",
  description:
    "Browse AI-generated websites — landing pages, portfolios, and more. Built with agentic engineering.",
};

export default function WebBuilderPage() {
  return (
    <GridBackground className="min-h-screen pt-28 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading>Web Builder Portfolio</SectionHeading>
        <p className="mb-12 max-w-2xl text-lg text-text-muted">
          AI-generated websites built with agentic engineering. Each site is
          created, pushed to GitHub, and displayed here automatically.
        </p>
        <SiteGallery />
      </div>
    </GridBackground>
  );
}
