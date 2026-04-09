import { NextRequest, NextResponse } from "next/server";

const REPO_OWNER = "MySouxChef";
const REPO_NAME = "website-demos";
const SITES_PATH = "sites";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Sanitize slug
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return new NextResponse("Invalid slug", { status: 400 });
  }

  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${SITES_PATH}/${slug}/index.html`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      return new NextResponse("Site not found", { status: 404 });
    }

    const html = await res.text();

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch {
    return new NextResponse("Error fetching site", { status: 500 });
  }
}
