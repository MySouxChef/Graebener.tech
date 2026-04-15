"use client";

import { useState, useRef } from "react";
import { Maximize2, Minimize2, Loader2 } from "lucide-react";

interface ProjectViewerProps {
  demoPath: string;
  title: string;
}

export function ProjectViewer({ demoPath, title }: ProjectViewerProps) {
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div ref={containerRef} className="overflow-hidden rounded-sm border border-[rgba(240,240,250,0.1)] bg-[rgba(240,240,250,0.03)]">
      <div className="flex items-center justify-between border-b border-[rgba(240,240,250,0.1)] bg-[rgba(240,240,250,0.03)] px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
          <span className="ml-3 font-mono text-xs text-text-muted">
            {title}
          </span>
        </div>
        <button
          onClick={toggleFullscreen}
          className="text-text-muted transition-colors hover:text-[#f0f0fa]"
          aria-label="Toggle fullscreen"
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>

      <div className="relative aspect-video w-full bg-white">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
            <Loader2 className="h-8 w-8 animate-spin text-[#f0f0fa]" />
          </div>
        )}
        <iframe
          src={demoPath}
          title={`${title} demo`}
          className="h-full w-full border-0"
          sandbox="allow-scripts allow-same-origin"
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
}
