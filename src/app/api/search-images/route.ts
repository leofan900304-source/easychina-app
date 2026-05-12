import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const count = parseInt(searchParams.get("count") || "3");

  if (!query) {
    return NextResponse.json({ error: "Missing query parameter" }, { status: 400 });
  }

  try {
    // 使用 Unsplash 官方 API
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&per_page=${count}`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY || ""}`,
        },
      }
    );

    if (!res.ok) {
      // Fallback: return placeholder if API key not configured or error
      return NextResponse.json({
        images: [`https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80`],
        source: "fallback",
      });
    }

    const data: { results?: { urls?: { regular?: string } }[] } = await res.json();
    const images = data.results?.map((r) => r.urls?.regular) || [];

    return NextResponse.json({
      images: images.length > 0 ? images : [`https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80`],
      source: "unsplash",
    });
  } catch {
    return NextResponse.json({
      images: [`https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80`],
      source: "fallback",
    });
  }
}
