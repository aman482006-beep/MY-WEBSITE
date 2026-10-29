import { getLatestVideos } from "@/lib/youtube";

export const revalidate = 3600;

export async function GET() {
  const result = await getLatestVideos();

  if (result.error === "not-configured") {
    return Response.json({ configured: false, videos: [] }, { status: 503 });
  }

  if (result.error === "request-failed") {
    return Response.json({ configured: false, videos: [] }, { status: 502 });
  }

  return Response.json(
    { configured: true, videos: result.videos },
    { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
  );
}
