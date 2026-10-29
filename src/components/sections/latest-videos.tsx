import Image from "next/image";
import { getLatestVideos } from "@/lib/youtube";

export async function LatestVideos() {
  const { videos } = await getLatestVideos();

  return (
    <section className="aj-section aj-videos-section" id="latest-videos">
      <div className="aj-container">
        <div className="aj-section-heading aj-section-heading-inline">
          <div>
            <p className="aj-eyebrow aj-eyebrow-accent">CREATOR</p>
            <h2>Latest on YouTube</h2>
            <p className="aj-heading-subtitle">Latest long-form videos. Shorts are filtered out.</p>
          </div>
          <a className="aj-text-link" href="https://www.youtube.com/@AmanJain-4/videos" target="_blank" rel="noopener noreferrer">
            Watch all videos <span aria-hidden="true">→</span>
          </a>
        </div>

        {videos.length > 0 ? (
          <div className="aj-video-grid">
            {videos.map((video) => (
              <a key={video.id} className="aj-video-card" href={video.url} target="_blank" rel="noopener noreferrer">
                <div className="aj-video-thumbnail">
                  <Image src={video.thumbnail} alt={`Thumbnail for ${video.title}`} fill sizes="(max-width: 700px) 45vw, 30vw" />
                  <span className="aj-video-duration">{video.duration}</span>
                  <span className="aj-play-button" aria-hidden="true">▶</span>
                </div>
                <h3>{video.title}</h3>
                <p>{new Date(video.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
              </a>
            ))}
          </div>
        ) : (
          <div className="aj-video-unavailable aj-video-friendly-fallback">
            <span className="aj-video-unavailable-icon" aria-hidden="true">▶</span>
            <div>
              <h3>Finance, learning and useful ideas — on YouTube.</h3>
              <p>Browse the channel for the latest videos. Featured videos will appear here when available.</p>
            </div>
            <a href="https://www.youtube.com/@AmanJain-4/videos" target="_blank" rel="noopener noreferrer">
              Visit the channel <span aria-hidden="true">↗</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
