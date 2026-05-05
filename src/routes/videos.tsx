import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play, X } from "lucide-react";
import { musicVideos, eduVideos, type VideoItem, type EduVideo } from "@/data/videos";
import { PageHeader } from "./music";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Videos — Darley" },
      { name: "description", content: "Music videos, live performances, and a portfolio of dance & music education work — including award-winning student showcases." },
      { property: "og:title", content: "Videos & Education Portfolio — Darley" },
      { property: "og:description", content: "Music visuals plus dance and music education work, including back-to-back Ghana Inter-School Festival wins." },
    ],
  }),
  component: VideosPage,
});

function VideosPage() {
  const [active, setActive] = useState<{ id?: string; src?: string; title: string } | null>(null);

  return (
    <>
      <PageHeader
        eyebrow="Visuals & Portfolio"
        title="Videos"
        subtitle="Two halves of one life: the music I make, and the young artists I teach."
      />

      {/* Music videos */}
      <section className="container-prose pb-24">
        <header className="flex items-end justify-between mb-10 border-b border-border/60 pb-4">
          <h2 className="font-display text-3xl md:text-4xl">Music Videos & Visuals</h2>
          <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{musicVideos.length} pieces</span>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {musicVideos.map((v) => (
            <VideoCard key={v.id} v={v} onPlay={() => setActive({ id: v.youtubeId, title: v.title })} />
          ))}
        </div>
      </section>

      {/* Education portfolio */}
      <section className="container-prose pb-32">
        <header className="flex items-end justify-between mb-10 border-b border-border/60 pb-4">
          <div>
            <p className="eyebrow">Educator Portfolio</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">Dance & Music Education</h2>
          </div>
          <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{eduVideos.length} pieces</span>
        </header>
        <p className="max-w-2xl mb-10 text-foreground/75 leading-relaxed">
          A working archive of student showcases, competition footage, rehearsals, and class sessions.
          Featured: my dance team's <span className="text-[color:var(--color-ember)]">first-place wins at the Ghana Inter-School Festival in 2023 and 2024</span>.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {eduVideos.map((v) => (
            <EduCard
              key={v.id}
              v={v}
              onPlay={() =>
                setActive(
                  v.src ? { src: v.src, title: v.title } : { id: v.youtubeId, title: v.title },
                )
              }
            />
          ))}
        </div>
      </section>

      {active && <Lightbox active={active} onClose={() => setActive(null)} />}
    </>
  );
}

function VideoCard({ v, onPlay }: { v: VideoItem; onPlay: () => void }) {
  return (
    <button
      onClick={onPlay}
      className="group text-left rounded-md overflow-hidden border border-border/60 bg-card/40 hover:border-[color:var(--color-ember)]/60 transition"
    >
      <div className="relative aspect-video overflow-hidden bg-ash">
        <img
          src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`}
          alt={v.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-[color:var(--color-ember)]/95 text-[color:var(--color-ember-foreground)] shadow-[var(--shadow-glow)] transition group-hover:scale-110">
            <Play size={20} className="ml-0.5" />
          </div>
        </div>
        <span className="absolute top-3 left-3 rounded-sm bg-ink/70 backdrop-blur px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-foreground/85">
          {labelFor(v.category)}
        </span>
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--color-ember)]">{v.date}</p>
        <h3 className="mt-1 font-display text-xl leading-tight">{v.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{v.description}</p>
      </div>
    </button>
  );
}

function EduCard({ v, onPlay }: { v: EduVideo; onPlay: () => void }) {
  return (
    <button
      onClick={onPlay}
      className="group text-left rounded-md overflow-hidden border border-border/60 bg-card/40 hover:border-[color:var(--color-ember)]/60 transition"
    >
      <div className="relative aspect-video overflow-hidden bg-ash">
        {v.src ? (
          <video
            src={v.src}
            preload="metadata"
            muted
            playsInline
            className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition"
          />
        ) : (
          <img
            src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`}
            alt={v.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-[color:var(--color-ember)]/95 text-[color:var(--color-ember-foreground)] shadow-[var(--shadow-glow)] transition group-hover:scale-110">
            <Play size={20} className="ml-0.5" />
          </div>
        </div>
        <span className="absolute top-3 left-3 rounded-sm bg-[color:var(--color-ember)]/90 px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-ember-foreground)]">
          {v.label}
        </span>
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--color-ember)]">{v.date}</p>
        <h3 className="mt-1 font-display text-xl leading-tight">{v.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{v.description}</p>
      </div>
    </button>
  );
}

function labelFor(c: VideoItem["category"]) {
  return c === "music-video" ? "Music Video" : c === "lyric" ? "Lyric Video" : c === "live" ? "Live" : "Behind the Scenes";
}

function Lightbox({
  active,
  onClose,
}: {
  active: { id?: string; src?: string; title: string };
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-ink/90 backdrop-blur-md p-4 animate-fade-in"
      onClick={onClose}
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute top-6 right-6 text-foreground/80 hover:text-[color:var(--color-ember)] transition"
      >
        <X size={28} />
      </button>
      <div className="w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
        {active.src ? (
          <video
            src={active.src}
            controls
            autoPlay
            playsInline
            className="h-full w-full rounded-md border border-border/60 bg-black"
          />
        ) : (
          <iframe
            title={active.title}
            src={`https://www.youtube.com/embed/${active.id}?autoplay=1&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full rounded-md border border-border/60"
          />
        )}
      </div>
    </div>
  );
}
