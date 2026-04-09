import fs from "fs";
import path from "path";

const SITES_DIR = path.join(process.cwd(), "public", "webbuilder", "sites");

export async function GET() {
  if (!fs.existsSync(SITES_DIR)) {
    return Response.json({ sites: [] });
  }

  const entries = fs.readdirSync(SITES_DIR, { withFileTypes: true });
  const sites: { slug: string; meta: Record<string, unknown> }[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith("_")) continue;

    const metaPath = path.join(SITES_DIR, entry.name, "meta.json");
    if (!fs.existsSync(metaPath)) continue;

    const raw = fs.readFileSync(metaPath, "utf-8");
    const meta = JSON.parse(raw);

    if (meta.status !== "published") continue;

    sites.push({ slug: entry.name, meta });
  }

  sites.sort((a, b) =>
    (a.meta as { title: string }).title.localeCompare(
      (b.meta as { title: string }).title
    )
  );

  return Response.json({ sites });
}
