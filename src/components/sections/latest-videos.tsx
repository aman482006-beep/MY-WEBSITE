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
            <a
              key={video.id}
              className="aj-video-card"
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Play ${videoTitles[video.id] || `YouTube video ${video.number}`}`}
            >
              <div className="aj-video-thumbnail">
                <Image
                  src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                  alt={`YouTube thumbnail for featured video ${video.number}`}
                  fill
                  sizes="(max-width: 700px) 48vw, 22vw"
                />
              </div>
              <div className="aj-video-info">
                <span className="aj-video-label">YOUTUBE · {video.number}</span>
                <h3>{videoTitles[video.id] || "Loading video title…"}</h3>
                <span className="aj-video-cta">Click to play <span aria-hidden="true">↗</span></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
