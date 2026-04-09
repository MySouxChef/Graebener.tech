import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GridBackground } from "@/components/ui/GridBackground";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, " ")} — Web Builder`,
  };
}

export default async function SiteViewerPage({ params }: Props) {
  const { slug } = await params;

  return (
    <GridBackground className="min-h-screen pt-28 pb-6">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/webbuilder"
            className="inline-flex items-center gap-2 font-mono text-sm text-text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={16} /> Back to Gallery
          </Link>
        </div>

        {/* Viewer */}
        <div className="overflow-hidden rounded-sm border border-border bg-bg-card">
          {/* Terminal chrome */}
          <div className="flex items-center justify-between border-b border-border bg-bg-secondary px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-3 font-mono text-xs text-text-muted">
                {slug}
              </span>
            </div>
          </div>

          <iframe
            src={`/webbuilder/sites/${slug}/index.html`}
            title={slug}
            className="w-full border-0 bg-white"
            style={{ height: "80vh" }}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </GridBackground>
  );
}
