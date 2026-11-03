import Image from "next/image";

const featuredVideos = [
  { id: "pRhaLS19QVc", number: "01" },
  { id: "BO7gNpYI31U", number: "02" },
  { id: "voUd1rKiaFc", number: "03" },
] as const;

export function LatestVideos() {
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
              aria-label={`Watch featured YouTube video ${video.number}`}
            >
              <div className="aj-video-thumbnail">
                <Image
                  src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                  alt={`YouTube thumbnail for featured video ${video.number}`}
                  fill
                  sizes="(max-width: 700px) 45vw, 30vw"
                />
                <span className="aj-play-button" aria-hidden="true">▶</span>
              </div>
              <h3>Featured video {video.number}</h3>
              <p>Watch on YouTube <span aria-hidden="true">↗</span></p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
