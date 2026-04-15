"use client";

import { useState } from "react";
import { Copy, Check, Download } from "lucide-react";

interface SkillViewerProps {
  rawFile: string;
  slug: string;
}

export function SkillViewer({ rawFile, slug }: SkillViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(rawFile);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([rawFile], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="overflow-hidden rounded-sm border border-[rgba(240,240,250,0.1)] bg-[rgba(240,240,250,0.03)]">
      <div className="flex items-center justify-between border-b border-[rgba(240,240,250,0.1)] bg-[rgba(240,240,250,0.03)] px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
          <span className="ml-3 font-mono text-xs text-text-muted">
            {slug}.md
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-sm border border-[rgba(240,240,250,0.1)] px-2.5 py-1 font-mono text-xs text-text-muted transition-all hover:border-[rgba(240,240,250,0.35)] hover:text-[#f0f0fa]"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-sm border border-[rgba(240,240,250,0.1)] px-2.5 py-1 font-mono text-xs text-text-muted transition-all hover:border-[rgba(240,240,250,0.35)] hover:text-[#f0f0fa]"
          >
            <Download size={12} />
            Download
          </button>
        </div>
      </div>

      <pre className="max-h-[600px] overflow-auto p-4 font-mono text-sm leading-relaxed text-text-muted">
        <code>{rawFile}</code>
      </pre>
    </div>
  );
}
