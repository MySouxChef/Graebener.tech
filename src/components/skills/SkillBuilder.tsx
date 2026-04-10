"use client";

import { useState } from "react";
import { Copy, Check, Download, Eye, Code, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { GlowButton } from "@/components/ui/GlowButton";
import { saveSkill } from "@/lib/saved-skills";

const CATEGORIES = [
  "Code Generation",
  "Code Review",
  "DevOps",
  "Testing",
  "Documentation",
  "AI & Agents",
  "Utilities",
  "Other",
];

interface SkillForm {
  title: string;
  description: string;
  category: string;
  tags: string;
  author: string;
  version: string;
  body: string;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function generateMarkdown(form: SkillForm): string {
  const tags = form.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return `---
title: "${form.title}"
description: "${form.description}"
category: "${form.category}"
tags: [${tags.map((t) => `"${t}"`).join(", ")}]
author: "${form.author}"
version: "${form.version}"
published: true
---

${form.body}`;
}

export function SkillBuilder() {
  const router = useRouter();
  const [form, setForm] = useState<SkillForm>({
    title: "",
    description: "",
    category: "Other",
    tags: "",
    author: "Graebener",
    version: "1.0.0",
    body: `# Skill Name

You are a [role]. When the user asks you to [task], follow these steps:

## Process

1. **Step 1** — Description
2. **Step 2** — Description
3. **Step 3** — Description

## Output Format

\`\`\`
Describe the expected output format here.
\`\`\`

## Rules

- Rule 1
- Rule 2
- Rule 3`,
  });

  const [view, setView] = useState<"edit" | "preview">("edit");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const markdown = generateMarkdown(form);
  const slug = generateSlug(form.title);

  const update = (field: keyof SkillForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug || "skill"}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    if (!form.title || !form.description) return;

    const tags = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    saveSkill({
      slug,
      title: form.title,
      description: form.description,
      category: form.category,
      tags,
      author: form.author,
      version: form.version,
      rawFile: markdown,
      createdAt: new Date().toISOString(),
    });

    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      router.push("/skills");
    }, 1500);
  };

  const inputClass =
    "w-full rounded-sm border border-border bg-bg-card px-4 py-2.5 font-mono text-sm text-text-primary placeholder-text-muted/50 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50";

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left: Form */}
      <div className="space-y-5">
        <div>
          <label className="mb-1.5 block font-mono text-xs text-text-muted">
            Title *
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="Code Review Agent"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1.5 block font-mono text-xs text-text-muted">
            Description *
          </label>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="What does this skill do?"
            rows={2}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block font-mono text-xs text-text-muted">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className={inputClass}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-xs text-text-muted">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => update("tags", e.target.value)}
              placeholder="review, security, quality"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block font-mono text-xs text-text-muted">
              Author
            </label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => update("author", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-xs text-text-muted">
              Version
            </label>
            <input
              type="text"
              value={form.version}
              onChange={(e) => update("version", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block font-mono text-xs text-text-muted">
            Skill Body (Markdown) *
          </label>
          <textarea
            value={form.body}
            onChange={(e) => update("body", e.target.value)}
            rows={16}
            className={`${inputClass} resize-y`}
          />
        </div>
      </div>

      {/* Right: Preview / Output */}
      <div>
        <div className="sticky top-24">
          {/* Toggle tabs */}
          <div className="mb-4 flex items-center gap-2">
            <button
              onClick={() => setView("preview")}
              className={`flex items-center gap-1.5 rounded-sm border px-3 py-1.5 font-mono text-xs transition-all ${
                view === "preview"
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-text-muted hover:border-accent/50"
              }`}
            >
              <Eye size={12} /> Preview
            </button>
            <button
              onClick={() => setView("edit")}
              className={`flex items-center gap-1.5 rounded-sm border px-3 py-1.5 font-mono text-xs transition-all ${
                view === "edit"
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-text-muted hover:border-accent/50"
              }`}
            >
              <Code size={12} /> Raw Output
            </button>
          </div>

          {/* Content */}
          <div className="overflow-hidden rounded-sm border border-border bg-bg-card">
            <div className="flex items-center justify-between border-b border-border bg-bg-secondary px-4 py-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-3 font-mono text-xs text-text-muted">
                  {slug || "skill"}.md
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-sm border border-border px-2.5 py-1 font-mono text-xs text-text-muted transition-all hover:border-accent hover:text-accent"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {view === "edit" ? (
              <pre className="max-h-[500px] overflow-auto p-4 font-mono text-xs leading-relaxed text-text-muted">
                <code>{markdown}</code>
              </pre>
            ) : (
              <div className="max-h-[500px] overflow-auto p-4">
                {form.title ? (
                  <div>
                    <h2 className="mb-2 font-mono text-xl font-bold text-text-primary">
                      {form.title}
                    </h2>
                    <p className="mb-4 text-sm text-text-muted">
                      {form.description}
                    </p>
                    <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-text-muted">
                      {form.body}
                    </div>
                  </div>
                ) : (
                  <p className="text-center font-mono text-sm text-text-muted">
                    Start filling in the form to see a preview...
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-wrap gap-3">
            <GlowButton onClick={handleSave}>
              {saved ? <Check size={14} /> : <Save size={14} />}
              {saved ? "Saved!" : "Save & Publish"}
            </GlowButton>
            <GlowButton onClick={handleCopy} variant="outline">
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied!" : "Copy Markdown"}
            </GlowButton>
            <GlowButton onClick={handleDownload} variant="outline">
              <Download size={14} /> Download .md
            </GlowButton>
          </div>
        </div>
      </div>
    </div>
  );
}
