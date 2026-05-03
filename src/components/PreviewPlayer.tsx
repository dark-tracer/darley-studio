import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

const MAX_SECONDS = 30;

export function PreviewPlayer({
  src,
  title,
  fullTrackUrl,
}: {
  src: string;
  title: string;
  fullTrackUrl?: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const [time, setTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      const t = Math.min(audio.currentTime, MAX_SECONDS);
      setTime(t);
      setProgress(t / MAX_SECONDS);
      if (audio.currentTime >= MAX_SECONDS) {
        audio.pause();
        audio.currentTime = 0;
        setPlaying(false);
        setProgress(0);
        setTime(0);
      }
    };
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
      setTime(0);
    };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const remaining = Math.max(0, MAX_SECONDS - time);

  return (
    <div className="flex items-center gap-4 rounded-md border border-border/60 bg-card/40 backdrop-blur-sm px-4 py-3">
      <audio ref={audioRef} src={src} preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause ${title} preview` : `Play ${title} preview`}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-ember)] text-[color:var(--color-ember-foreground)] hover:opacity-90 transition ember-glow"
      >
        {playing ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
      </button>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="truncate text-sm font-medium text-foreground">{title}</p>
          <p className="shrink-0 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            30s preview · {Math.ceil(remaining)}s left
          </p>
        </div>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-foreground/15">
          <div
            className="h-full bg-[color:var(--color-ember)] transition-[width] duration-150 ease-linear"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        {fullTrackUrl && (
          <a
            href={fullTrackUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block text-[10px] uppercase tracking-[0.22em] text-foreground/60 hover:text-[color:var(--color-ember)] transition"
          >
            Hear the full track ↗
          </a>
        )}
      </div>
    </div>
  );
}
