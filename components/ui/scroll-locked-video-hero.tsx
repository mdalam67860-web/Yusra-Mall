"use client";

import * as React from "react";
import { ArrowDown, Volume2, VolumeX } from "lucide-react";

export interface MetroHeroProps {
  videoSrc?: string;
  title?: string;
  scrollHint?: string;
  tagline?: string;
  signature?: { name: string; url: string } | false;
  scrubDistance?: number;
  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_VIDEO =
  "https://cdn.21st.dev/assets/mirror/21/21a77eac28eacbb7e142016eefeaa0b4a766619e51113629a3bc6df6af066c0f.mp4";

export function MetroHero({
  videoSrc = DEFAULT_VIDEO,
  title = "YUSRA MALL",
  scrollHint = "SCROLL TO EXPLORE",
  tagline = "Where shopping meets experience.",
  signature = false,
  scrubDistance = 2200,
  className = "",
  style,
}: MetroHeroProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const progressRef = React.useRef(0);
  const touchYRef = React.useRef<number | null>(null);
  const [progress, setProgress] = React.useState(0);
  const [muted, setMuted] = React.useState(true);
  const [videoReady, setVideoReady] = React.useState(false);

  const scrub = React.useCallback(
    (delta: number) => {
      const video = videoRef.current;
      const distance = Math.max(1, scrubDistance);

      if (!video || !videoReady || !Number.isFinite(video.duration) || video.duration <= 0) {
        return false;
      }

      const next = Math.max(
        0,
        Math.min(1, progressRef.current + delta / distance),
      );

      progressRef.current = next;
      video.currentTime = next * video.duration;
      setProgress(next);
      return true;
    },
    [scrubDistance, videoReady],
  );

  const handleWheel = (event: React.WheelEvent<HTMLElement>) => {
    const delta = event.deltaY;
    const atStart = progressRef.current <= 0 && delta < 0;
    const atEnd = progressRef.current >= 1 && delta > 0;

    if (atStart || atEnd) return;

    if (scrub(delta)) {
      event.preventDefault();
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    touchYRef.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLElement>) => {
    const currentY = event.touches[0]?.clientY;
    const previousY = touchYRef.current;

    if (currentY == null || previousY == null) return;

    const delta = previousY - currentY;
    const atStart = progressRef.current <= 0 && delta < 0;
    const atEnd = progressRef.current >= 1 && delta > 0;

    if (!atStart && !atEnd && scrub(delta)) {
      event.preventDefault();
    }

    touchYRef.current = currentY;
  };

  const handleTouchEnd = () => {
    touchYRef.current = null;
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
  };

  return (
    <section
      className={`relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-black text-white ${className}`}
      style={style}
      aria-label="Yusra Mall hero"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover opacity-90"
        src={videoSrc}
        muted={muted}
        playsInline
        preload="metadata"
        aria-hidden="true"
        onLoadedMetadata={() => setVideoReady(true)}
        onError={() => setVideoReady(false)}
      />

      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-black/75" />

      <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <div className="text-xs font-semibold tracking-[0.35em]">YUSRA MALL</div>
        <button
          type="button"
          onClick={toggleMute}
          className="rounded-full border border-white/40 bg-black/20 p-2 backdrop-blur transition hover:bg-white hover:text-black"
          aria-label={muted ? "Unmute video" : "Mute video"}
        >
          {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-10 sm:px-8 sm:pb-12 lg:px-12 lg:pb-16">
        <div className="max-w-5xl animate-float-in">
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.45em] text-white/70">
            {tagline}
          </p>
          <h1 className="text-[clamp(4rem,13vw,11rem)] font-black leading-[0.78] tracking-[-0.075em]">
            {title}
          </h1>
        </div>

        <div className="mt-10 flex items-end justify-between border-t border-white/30 pt-5 text-[10px] uppercase tracking-[0.25em]">
          <div className="flex items-center gap-3">
            <ArrowDown size={14} className="animate-bounce" />
            <span>{scrollHint}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>{Math.round(progress * 100)}%</span>
            <div className="h-px w-20 bg-white/30 sm:w-32">
              <div className="h-px bg-white transition-all" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
        </div>

        {signature && (
          <a
            href={signature.url}
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-2 right-5 text-[9px] uppercase tracking-[0.2em] text-white/50 hover:text-white"
          >
            {signature.name}
          </a>
        )}
      </div>
    </section>
  );
}

export default MetroHero;
