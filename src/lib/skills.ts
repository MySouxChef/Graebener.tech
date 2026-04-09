import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SKILLS_DIR = path.join(process.cwd(), "content", "skills");

export interface Skill {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  version: string;
  published: boolean;
  content: string;
  rawFile: string;
}

export type SkillMeta = Omit<Skill, "content" | "rawFile">;

const CATEGORIES = [
  "Code Generation",
  "Code Review",
  "DevOps",
  "Testing",
  "Documentation",
  "AI & Agents",
  "Utilities",
  "Other",
] as const;

export type SkillCategory = (typeof CATEGORIES)[number];

export function getCategories(): string[] {
  return [...CATEGORIES];
}

export function getAllSkills(): SkillMeta[] {
  if (!fs.existsSync(SKILLS_DIR)) return [];

  const files = fs.readdirSync(SKILLS_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const filePath = path.join(SKILLS_DIR, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);

      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        category: data.category ?? "Other",
        tags: data.tags ?? [],
        author: data.author ?? "Graebener",
        version: data.version ?? "1.0.0",
        published: data.published !== false,
      };
    })
    .filter((skill) => skill.published)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getSkillBySlug(slug: string): Skill | null {
  const filePath = path.join(SKILLS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    category: data.category ?? "Other",
    tags: data.tags ?? [],
    author: data.author ?? "Graebener",
    version: data.version ?? "1.0.0",
    published: data.published !== false,
    content,
    rawFile: raw,
  };
}

export function getSkillsByCategory(): Record<string, SkillMeta[]> {
  const skills = getAllSkills();
  const grouped: Record<string, SkillMeta[]> = {};

  for (const skill of skills) {
    if (!grouped[skill.category]) grouped[skill.category] = [];
    grouped[skill.category].push(skill);
  }

  return grouped;
}
