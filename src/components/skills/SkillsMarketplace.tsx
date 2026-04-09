"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { SkillCard } from "@/components/skills/SkillCard";
import type { SkillMeta } from "@/lib/skills";

interface SkillsMarketplaceProps {
  skills: SkillMeta[];
  categories: string[];
}

export function SkillsMarketplace({ skills, categories }: SkillsMarketplaceProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return skills.filter((skill) => {
      const matchesSearch =
        !search ||
        skill.title.toLowerCase().includes(search.toLowerCase()) ||
        skill.description.toLowerCase().includes(search.toLowerCase()) ||
        skill.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesCategory = !activeCategory || skill.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [skills, search, activeCategory]);

  return (
    <div>
      {/* Search bar */}
      <div className="relative mb-8">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search skills..."
          className="w-full rounded-sm border border-border bg-bg-card py-3 pl-11 pr-4 font-mono text-sm text-text-primary placeholder-text-muted/50 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50"
        />
      </div>

      {/* Category filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`rounded-sm border px-3 py-1.5 font-mono text-xs transition-all ${
            !activeCategory
              ? "border-accent bg-accent/10 text-accent"
              : "border-border text-text-muted hover:border-accent/50 hover:text-accent"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            className={`rounded-sm border px-3 py-1.5 font-mono text-xs transition-all ${
              activeCategory === cat
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-text-muted hover:border-accent/50 hover:text-accent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center font-mono text-text-muted">
          <span className="text-accent">$</span> No skills found matching your
          query.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
}
