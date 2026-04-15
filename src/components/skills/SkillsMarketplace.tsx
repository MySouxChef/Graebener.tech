"use client";

import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { SkillCard } from "@/components/skills/SkillCard";
import type { SkillMeta } from "@/lib/skills";
import { getSavedSkills, savedSkillToMeta } from "@/lib/saved-skills";

interface SkillsMarketplaceProps {
  skills: SkillMeta[];
  categories: string[];
}

export function SkillsMarketplace({ skills, categories }: SkillsMarketplaceProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [savedSkillMetas, setSavedSkillMetas] = useState<SkillMeta[]>([]);

  useEffect(() => {
    const saved = getSavedSkills().map(savedSkillToMeta);
    setSavedSkillMetas(saved);
  }, []);

  const allSkills = useMemo(() => {
    const slugs = new Set(skills.map((s) => s.slug));
    const merged = [...skills];
    for (const saved of savedSkillMetas) {
      if (!slugs.has(saved.slug)) {
        merged.push(saved);
      }
    }
    return merged.sort((a, b) => a.title.localeCompare(b.title));
  }, [skills, savedSkillMetas]);

  const allCategories = useMemo(() => {
    const cats = new Set([...categories]);
    for (const s of savedSkillMetas) {
      cats.add(s.category);
    }
    return Array.from(cats).sort();
  }, [categories, savedSkillMetas]);

  const filtered = useMemo(() => {
    return allSkills.filter((skill) => {
      const matchesSearch =
        !search ||
        skill.title.toLowerCase().includes(search.toLowerCase()) ||
        skill.description.toLowerCase().includes(search.toLowerCase()) ||
        skill.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesCategory = !activeCategory || skill.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [allSkills, search, activeCategory]);

  return (
    <div>
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
          className="w-full rounded-sm border border-[rgba(240,240,250,0.15)] bg-transparent py-3 pl-11 pr-4 text-sm text-text-primary placeholder-text-muted/50 transition-colors focus:border-[rgba(240,240,250,0.35)] focus:outline-none normal-case"
        />
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`rounded-sm border px-3 py-1.5 text-xs transition-all ${
            !activeCategory
              ? "border-[rgba(240,240,250,0.35)] bg-[rgba(240,240,250,0.1)] text-[#f0f0fa]"
              : "border-[rgba(240,240,250,0.1)] text-text-muted hover:border-[rgba(240,240,250,0.2)] hover:text-[#f0f0fa]"
          }`}
        >
          All
        </button>
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            className={`rounded-sm border px-3 py-1.5 text-xs transition-all ${
              activeCategory === cat
                ? "border-[rgba(240,240,250,0.35)] bg-[rgba(240,240,250,0.1)] text-[#f0f0fa]"
                : "border-[rgba(240,240,250,0.1)] text-text-muted hover:border-[rgba(240,240,250,0.2)] hover:text-[#f0f0fa]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-text-muted">
          No skills found matching your query.
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
