import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; OpenGraphBot/1.0; +https://example.com)",
    },
    next: {
      revalidate: 60 * 60 * 24, // 24 hours
    },
  });
  if (!res.ok)
    return NextResponse.json(
      { error: "Failed to fetch target" },
      { status: 500 }
    );
  const html = await res.text();
  const $ = await cheerio.load(html);
  const og = {
    title: $('meta[property="og:title"]').attr("content") || null,
    image: $('meta[property="og:image"]').attr("content") || null,
  };
  return NextResponse.json(og);
}
