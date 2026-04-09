import { NextResponse } from "next/server";

const REPO_OWNER = "MySouxChef";
const REPO_NAME = "website-demos";
const SITES_PATH = "sites";

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

export interface SiteEntry {
  slug: string;
  meta: SiteMeta;
}

export async function GET() {
  try {
    // Fetch directory listing from GitHub API
    const res = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${SITES_PATH}`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ sites: [] }, { status: 200 });
    }

    const contents = await res.json();
    const dirs = contents.filter(
      (item: { type: string; name: string }) =>
        item.type === "dir" && !item.name.startsWith("_")
    );

    // Fetch meta.json for each site
    const sites: SiteEntry[] = [];

    await Promise.all(
      dirs.map(async (dir: { name: string }) => {
        try {
          const metaRes = await fetch(
            `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${SITES_PATH}/${dir.name}/meta.json`,
            { next: { revalidate: 60 } }
          );
          if (!metaRes.ok) return;
          const meta: SiteMeta = await metaRes.json();
          if (meta.status === "published") {
            sites.push({ slug: dir.name, meta });
          }
        } catch {
          // Skip sites with invalid meta
        }
      })
    );

    sites.sort((a, b) => a.meta.title.localeCompare(b.meta.title));

    return NextResponse.json({ sites });
  } catch {
    return NextResponse.json({ sites: [] }, { status: 200 });
  }
}
