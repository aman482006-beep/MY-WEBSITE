"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const featuredVideos = [
  { id: "pRhaLS19QVc", number: "01" },
  { id: "BO7gNpYI31U", number: "02" },
  { id: "voUd1rKiaFc", number: "03" },
] as const;

export function LatestVideos() {
  const [videoTitles, setVideoTitles] = useState<Record<string, string>>({});
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all(
      featuredVideos.map(async (video) => {
        const watchUrl = `https://www.youtube.com/watch?v=${video.id}`;
        try {
          const response = await fetch(
            `https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`
          );
          if (!response.ok) return [video.id, ""] as const;
          const metadata = (await response.json()) as { title?: string };
          return [video.id, metadata.title?.trim() ?? ""] as const;
        } catch {
          return [video.id, ""] as const;
        }
      })
    ).then((entries) => {
      if (!cancelled) {
        setVideoTitles(
          Object.fromEntries(entries.filter(([, title]) => Boolean(title)))
        );
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="aj-section aj-videos-section" id="latest-videos">
      <div className="aj-container">
        <div className="aj-section-heading aj-section-heading-inline">
          <div>
            <p className="aj-eyebrow aj-eyebrow-accent">CREATOR</p>
            <h2>Featured on YouTube</h2>
            <p className="aj-heading-subtitle">A few videos from my channel, all in one place.</p>
          </div>
          <a className="aj-text-link" href="https://www.youtube.com/@AmanJain-4/videos" target="_blank" rel="noopener noreferrer">
            Watch all videos <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="aj-video-grid">
          {featuredVideos.map((video) => (
            <article key={video.id} className={"aj-video-card" + (activeVideoId === video.id ? " is-playing" : "")}>
              <div className="aj-video-thumbnail">
                {activeVideoId === video.id ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&playsinline=1&rel=0`}
                    title={videoTitles[video.id] || `YouTube video ${video.number}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    className="aj-video-inline-trigger"
                    onClick={() => setActiveVideoId(video.id)}
                    aria-label={`Play ${videoTitles[video.id] || `YouTube video ${video.number}`} here`}
                  >
                    <Image
                      src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                      alt={`YouTube thumbnail for featured video ${video.number}`}
                      fill
                      sizes="(max-width: 700px) 48vw, 22vw"
                    />
                  </button>
                )}
              </div>
              <div className="aj-video-info">
                <span className="aj-video-label">YOUTUBE · {video.number}</span>
                <h3>{videoTitles[video.id] || "Loading video title…"}</h3>
                <span className="aj-video-cta">{activeVideoId === video.id ? "Playing here" : "Click thumbnail to play"} <span aria-hidden="true">{activeVideoId === video.id ? "✓" : "▶"}</span></span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
