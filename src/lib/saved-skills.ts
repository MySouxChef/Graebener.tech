import type { SkillMeta } from "./skills";

const STORAGE_KEY = "graebener-saved-skills";

export interface SavedSkill {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  version: string;
  rawFile: string;
  createdAt: string;
}

export function getSavedSkills(): SavedSkill[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSkill(skill: SavedSkill): void {
  const existing = getSavedSkills();
  const idx = existing.findIndex((s) => s.slug === skill.slug);
  if (idx >= 0) {
    existing[idx] = skill;
  } else {
    existing.push(skill);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function deleteSavedSkill(slug: string): void {
  const existing = getSavedSkills().filter((s) => s.slug !== slug);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function savedSkillToMeta(skill: SavedSkill): SkillMeta {
  return {
    slug: skill.slug,
    title: skill.title,
    description: skill.description,
    category: skill.category,
    tags: skill.tags,
    author: skill.author,
    version: skill.version,
    published: true,
  };
}
