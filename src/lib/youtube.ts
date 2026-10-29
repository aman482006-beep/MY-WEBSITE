import "server-only";

export type YouTubeVideo = {
  id: string;
  title: string;
  publishedAt: string;
  duration: string;
  thumbnail: string;
  url: string;
};

type YouTubeChannelResponse = {
  items?: Array<{ contentDetails?: { relatedPlaylists?: { uploads?: string } } }>;
};

type PlaylistResponse = {
  items?: Array<{ contentDetails?: { videoId?: string } }>;
};

type YouTubeApiVideo = {
  id: string;
  snippet?: {
    title?: string;
    publishedAt?: string;
    thumbnails?: Record<string, { url?: string }>;
  };
  contentDetails?: { duration?: string };
};

type VideosResponse = { items?: YouTubeApiVideo[] };

export type LatestYouTubeResult = {
  configured: boolean;
  videos: YouTubeVideo[];
  error?: "not-configured" | "request-failed";
};

function durationSeconds(isoDuration: string): number {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  return Number(match[1] || 0) * 3600 + Number(match[2] || 0) * 60 + Number(match[3] || 0);
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remaining = seconds % 60;
  return hours > 0
    ? hours + ":" + String(minutes).padStart(2, "0") + ":" + String(remaining).padStart(2, "0")
    : minutes + ":" + String(remaining).padStart(2, "0");
}

async function youtubeGet<T>(endpoint: string, params: Record<string, string>, key: string): Promise<T> {
  const query = new URLSearchParams({ ...params, key });
  const response = await fetch("https://www.googleapis.com/youtube/v3/" + endpoint + "?" + query.toString(), {
    next: { revalidate: 3600 },
  });
  if (!response.ok) throw new Error("YouTube API request failed: " + response.status);
  return (await response.json()) as T;
}

/** Shared server-side feed for the homepage, creator page and the public API route. */
export async function getLatestVideos(): Promise<LatestYouTubeResult> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return { configured: false, videos: [], error: "not-configured" };

  try {
    const channel = await youtubeGet<YouTubeChannelResponse>("channels", {
      part: "contentDetails",
      forHandle: "AmanJain-4",
      maxResults: "1",
    }, key);
    const uploadsPlaylist = channel.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsPlaylist) return { configured: true, videos: [] };

    const playlist = await youtubeGet<PlaylistResponse>("playlistItems", {
      part: "contentDetails",
      playlistId: uploadsPlaylist,
      maxResults: "50",
    }, key);
    const ids = [...new Set((playlist.items ?? []).map((item) => item.contentDetails?.videoId).filter((id): id is string => Boolean(id)))];
    if (ids.length === 0) return { configured: true, videos: [] };

    const detail = await youtubeGet<VideosResponse>("videos", {
      part: "snippet,contentDetails",
      id: ids.join(","),
    }, key);

    const videos = (detail.items ?? [])
      .map((video) => {
        const duration = durationSeconds(video.contentDetails?.duration ?? "");
        const thumbnails = video.snippet?.thumbnails ?? {};
        const thumbnail = thumbnails.maxres?.url ?? thumbnails.high?.url ?? thumbnails.medium?.url ?? "https://i.ytimg.com/vi/" + video.id + "/hqdefault.jpg";
        return {
          id: video.id,
          title: video.snippet?.title ?? "Untitled video",
          publishedAt: video.snippet?.publishedAt ?? new Date(0).toISOString(),
          durationSeconds: duration,
          duration: formatDuration(duration),
          thumbnail,
          url: "https://www.youtube.com/watch?v=" + video.id,
        };
      })
      // Keep short-form uploads out of this long-form showcase.
      .filter((video) => video.durationSeconds > 180)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 3)
      .map(({ id, title, publishedAt, duration, thumbnail, url }) => ({ id, title, publishedAt, duration, thumbnail, url }));

    return { configured: true, videos };
  } catch {
    return { configured: false, videos: [], error: "request-failed" };
  }
}
