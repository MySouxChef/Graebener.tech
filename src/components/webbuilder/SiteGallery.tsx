"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Loader2 } from "lucide-react";
import { SiteCard } from "./SiteCard";

interface SiteMeta {
  title: string;
  description: string;
  industry: string;
  category: string;
  tags: string[];
  status: string;
  color_accent?: string;
  client_name?: string;
}

interface SiteEntry {
  slug: string;
  meta: SiteMeta;
}

export function SiteGallery() {
  const [sites, setSites] = useState<SiteEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/sites")
      .then((res) => res.json())
      .then((data) => {
        setSites(data.sites || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const industries = useMemo(() => {
    const set = new Set(sites.map((s) => s.meta.industry));
    return Array.from(set).sort();
  }, [sites]);

  const filtered = useMemo(() => {
    return sites.filter((site) => {
      const matchesSearch =
        !search ||
        site.meta.title.toLowerCase().includes(search.toLowerCase()) ||
        site.meta.description.toLowerCase().includes(search.toLowerCase()) ||
        site.meta.tags.some((t) =>
          t.toLowerCase().includes(search.toLowerCase())
        );

      const matchesIndustry =
        !activeIndustry || site.meta.industry === activeIndustry;

      return matchesSearch && matchesIndustry;
    });
  }, [sites, search, activeIndustry]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-[#f0f0fa]" />
      </div>
    );
  }

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
          placeholder="Search websites..."
          className="w-full rounded-sm border border-[rgba(240,240,250,0.15)] bg-transparent py-3 pl-11 pr-4 text-sm text-text-primary placeholder-text-muted/50 transition-colors focus:border-[rgba(240,240,250,0.35)] focus:outline-none normal-case"
        />
      </div>

      {industries.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveIndustry(null)}
            className={`rounded-sm border px-3 py-1.5 text-xs transition-all ${
              !activeIndustry
                ? "border-[rgba(240,240,250,0.35)] bg-[rgba(240,240,250,0.1)] text-[#f0f0fa]"
                : "border-[rgba(240,240,250,0.1)] text-text-muted hover:border-[rgba(240,240,250,0.2)] hover:text-[#f0f0fa]"
            }`}
          >
            All
          </button>
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() =>
                setActiveIndustry(activeIndustry === ind ? null : ind)
              }
              className={`rounded-sm border px-3 py-1.5 text-xs capitalize transition-all ${
                activeIndustry === ind
                  ? "border-[rgba(240,240,250,0.35)] bg-[rgba(240,240,250,0.1)] text-[#f0f0fa]"
                  : "border-[rgba(240,240,250,0.1)] text-text-muted hover:border-[rgba(240,240,250,0.2)] hover:text-[#f0f0fa]"
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-text-muted">
          {sites.length === 0
            ? "No websites generated yet. Push a site to the repo to see it here."
            : "No sites matching your search."}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((site) => (
            <SiteCard
              key={site.slug}
              slug={site.slug}
              title={site.meta.title}
              description={site.meta.description}
              industry={site.meta.industry}
              tags={site.meta.tags}
              colorAccent={site.meta.color_accent}
            />
          ))}
        </div>
      )}
    </div>
  );
}
