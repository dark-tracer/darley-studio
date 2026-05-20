import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { releases, type Release } from "@/data/music";
import { PreviewPlayer } from "@/components/PreviewPlayer";

export const Route = createFileRoute("/music")({
  head: () => ({
    meta: [
      { title: "Music by Darley — Ghanaian Singer | Afrobeats, Hiplife & Alté Soul" },
      { name: "description", content: "Stream every release from Darley, a Ghanaian singer and songwriter weaving Afrobeats, hiplife and alté soul in English, Twi and Ewe — on Spotify, Apple Music and YouTube." },
      { property: "og:title", content: "Music by Darley — Ghanaian Singer | Afrobeats & Hiplife" },
      { property: "og:description", content: "The full discography of Ghanaian artist Darley — Afrobeats, hiplife and alté soul across all streaming platforms." },
    ],
  }),

  component: MusicPage,
});

function MusicPage() {
  const sorted = [...releases].sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
  return (
    <>
      <PageHeader
        eyebrow="Discography"
        title="Music"
        subtitle="Every song from Ghanaian singer Darley — a discography moving through Afrobeats, hiplife and alté soul. Each one was true the day I made it."
      />

      <section className="container-prose pb-24">
        <div className="space-y-6">
          {sorted.map((r) => (
            <ReleaseRow key={r.slug} release={r} />
          ))}
        </div>
      </section>
    </>
  );
}

function ReleaseRow({ release }: { release: Release }) {
  const [open, setOpen] = useState(release.featured ?? false);
  const year = new Date(release.releaseDate).getFullYear();

  return (
    <article className="group rounded-md border border-border/60 bg-card/40 backdrop-blur-sm overflow-hidden transition hover:border-[color:var(--color-ember)]/50">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left grid grid-cols-[auto_1fr_auto] items-center gap-5 p-5 md:p-6"
        aria-expanded={open}
      >
        <img
          src={release.cover}
          alt={`${release.title} cover`}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-20 w-20 md:h-24 md:w-24 rounded-sm object-cover"
        />
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-ember)]">{year}</p>
          <h3 className="mt-1 font-display text-2xl md:text-3xl">{release.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2 max-w-2xl">{release.shortDescription}</p>
        </div>
        <div className="text-foreground/60">
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      {open && (
        <div className="px-5 md:px-6 pb-6 md:pb-8 grid md:grid-cols-2 gap-8 animate-fade-up">
          <div>
            <p className="text-foreground/85 leading-relaxed">{release.story}</p>
            {release.lyricsExcerpt && (
              <blockquote className="mt-6 border-l-2 border-[color:var(--color-ember)] pl-4 font-display italic text-foreground/80">
                {release.lyricsExcerpt}
              </blockquote>
            )}
            <div className="mt-6 flex flex-wrap gap-2">
              {Object.entries(release.links).map(([k, v]) =>
                v ? (
                  <a
                    key={k}
                    href={v}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-sm border border-foreground/20 px-3 py-2 text-xs uppercase tracking-[0.22em] text-foreground/80 hover:border-[color:var(--color-ember)] hover:text-[color:var(--color-ember)] transition"
                  >
                    {k === "appleMusic" ? "Apple Music" : k.charAt(0).toUpperCase() + k.slice(1)}
                  </a>
                ) : null,
              )}
            </div>
          </div>
          {release.previewUrl && (
            <div className="self-start">
              <PreviewPlayer
                src={release.previewUrl}
                title={release.title}
                fullTrackUrl={release.links.spotify}
              />
            </div>
          )}
        </div>
      )}
    </article>
  );
}

export function PageHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <section className="relative pt-40 pb-20 md:pt-48 md:pb-28">
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{ background: "var(--gradient-section)" }}
      />
      <div className="container-prose relative">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-6 font-display text-6xl md:text-8xl leading-none text-balance">{title}</h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-lg text-foreground/75 font-display italic">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
