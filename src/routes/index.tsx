import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Play, ArrowRight, Headphones } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import heroSmoke from "@/assets/hero-smoke.mp4.asset.json";
import { releases } from "@/data/music";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Darley — Music for the moments you cannot put into words." },
      { name: "description", content: "Official site of Darley (Isabella Narh) — Ghanaian singer, songwriter and educator. Listen to Rescue Me and Away." },
      { property: "og:title", content: "Darley — Ghanaian Singer & Songwriter" },
      { property: "og:description", content: "Cinematic, emotionally honest music rooted in Ghanaian culture." },
    ],
  }),
  component: Home,
});

function Home() {
  const rescue = releases.find((r) => r.slug === "rescue-me")!;
  const away = releases.find((r) => r.slug === "away")!;

  return (
    <>
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Darley singing in warm light against a dark background"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <video
          src={heroSmoke.url}
          autoPlay
          loop
          muted
          playsInline
          poster={heroImg}
          aria-hidden="true"
          style={{ filter: "sepia(1) saturate(3) hue-rotate(-15deg)", opacity: 0.005 }}
          className="absolute inset-0 h-full w-full object-cover mix-blend-screen animate-fade-up"
        />
        <div className="absolute inset-0 hero-overlay" />
        {/* Smoke / ember layers */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-[480px] w-[480px] smoke-layer animate-smoke" />
        <div className="pointer-events-none absolute bottom-10 right-10 h-32 w-32 rounded-full bg-[color:var(--color-ember)]/20 blur-3xl animate-ember-pulse" />

        <div className="relative z-10 container-prose flex h-full flex-col justify-end pb-24 md:pb-32">
          <p className="eyebrow animate-fade-up" style={{ animationDelay: "0.1s" }}>Singer · Songwriter · Educator</p>
          <h1
            className="mt-6 font-display text-[clamp(4rem,14vw,11rem)] leading-[0.9] tracking-tight text-balance animate-fade-up"
            style={{ animationDelay: "0.25s" }}
          >
            DARLEY
          </h1>
          <p
            className="mt-6 max-w-xl text-lg md:text-xl text-foreground/85 font-display italic animate-fade-up"
            style={{ animationDelay: "0.45s" }}
          >
            Music for the moments you cannot put into words.
          </p>
          <div
            className="mt-10 flex flex-wrap gap-3 animate-fade-up"
            style={{ animationDelay: "0.6s" }}
          >
            <Link
              to="/music"
              className="group inline-flex items-center gap-3 rounded-sm bg-[color:var(--color-ember)] px-6 py-3.5 text-xs uppercase tracking-[0.25em] text-[color:var(--color-ember-foreground)] hover:opacity-90 transition ember-glow"
            >
              <Headphones size={16} /> Listen now
            </Link>
            <Link
              to="/videos"
              className="group inline-flex items-center gap-3 rounded-sm border border-foreground/30 px-6 py-3.5 text-xs uppercase tracking-[0.25em] text-foreground hover:border-[color:var(--color-ember)] hover:text-[color:var(--color-ember)] transition"
            >
              <Play size={16} /> Watch videos
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="relative py-28 md:py-40">
        <div className="container-tight">
          <p className="eyebrow">A short introduction</p>
          <div className="mt-8 space-y-6 font-display text-2xl md:text-3xl leading-snug text-balance text-foreground/90">
            <p>
              I'm Darley. I write the songs I needed to hear when I had no words of my own.
            </p>
            <p className="text-foreground/75">
              My music moves between English, Twi and Ewe — between soul, alté and the rhythms I grew up inside of. It is honest before it is anything else.
            </p>
            <p className="text-foreground/75">
              I am a Ghanaian storyteller. I teach. I perform. I write because I can't not. If something here moves you, stay a while.
            </p>
          </div>
        </div>
      </section>

      {/* RESCUE ME — featured */}
      <FeaturedTrack release={rescue} side="left" />

      {/* AWAY — featured */}
      <FeaturedTrack release={away} side="right" />

      {/* NEWSLETTER */}
      <Newsletter />
    </>
  );
}

function FeaturedTrack({ release, side }: { release: typeof releases[number]; side: "left" | "right" }) {
  const reverse = side === "right";
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: "var(--gradient-section)" }}
      />
      <div className={`container-prose relative grid gap-12 md:gap-16 md:grid-cols-2 items-center ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        <div className="relative aspect-square w-full max-w-[520px] mx-auto">
          <div className="absolute -inset-6 rounded-md bg-[color:var(--color-ember)]/10 blur-2xl" />
          <img
            src={release.cover}
            alt={`${release.title} cover art`}
            loading="lazy"
            width={1024}
            height={1024}
            className="relative h-full w-full rounded-md object-cover shadow-[var(--shadow-deep)]"
          />
        </div>

        <div>
          <p className="eyebrow">Featured · {new Date(release.releaseDate).getFullYear()}</p>
          <h2 className="mt-6 font-display text-5xl md:text-6xl leading-none">{release.title}</h2>
          <p className="mt-6 text-foreground/80 leading-relaxed text-lg max-w-prose">
            {release.story}
          </p>

          {release.embed && (
            <div className="mt-8 overflow-hidden rounded-md border border-border/60">
              <iframe
                title={`${release.title} player`}
                src={release.embed.src}
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="block"
              />
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {release.links.spotify && <PlatformLink href={release.links.spotify} label="Spotify" />}
            {release.links.appleMusic && <PlatformLink href={release.links.appleMusic} label="Apple Music" />}
            {release.links.youtube && <PlatformLink href={release.links.youtube} label="YouTube" />}
          </div>

          <Link
            to="/music"
            className="mt-10 inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-[color:var(--color-ember)] hover:gap-3 transition-all"
          >
            All releases <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function PlatformLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-sm border border-foreground/20 px-4 py-2 text-xs uppercase tracking-[0.22em] text-foreground/85 hover:border-[color:var(--color-ember)] hover:text-[color:var(--color-ember)] transition"
    >
      {label} <ArrowRight size={12} />
    </a>
  );
}

function Newsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || trimmedName.length > 100) return setError("Please share your name (under 100 chars).");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail) || trimmedEmail.length > 200) return setError("Please enter a valid email.");
    setError("");
    setSubmitted(true);
  }

  return (
    <section className="relative py-28 md:py-36">
      <div className="container-tight text-center">
        <p className="eyebrow justify-center">What's coming</p>
        <h2 className="mt-6 font-display text-4xl md:text-5xl text-balance">
          Be the first to know when new music drops.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Quiet emails. Only when there is something true to send.
        </p>

        {submitted ? (
          <p className="mt-10 font-display text-2xl text-[color:var(--color-ember)]">
            Thank you, {name.split(" ")[0]}. I'll be in touch soon.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="text"
              required
              maxLength={100}
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 rounded-sm bg-[color:var(--color-input)]/60 border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[color:var(--color-ember)]"
            />
            <input
              type="email"
              required
              maxLength={200}
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-sm bg-[color:var(--color-input)]/60 border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[color:var(--color-ember)]"
            />
            <button
              type="submit"
              className="rounded-sm bg-[color:var(--color-ember)] px-6 py-3 text-xs uppercase tracking-[0.25em] text-[color:var(--color-ember-foreground)] hover:opacity-90 transition"
            >
              Subscribe
            </button>
          </form>
        )}
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      </div>
    </section>
  );
}
