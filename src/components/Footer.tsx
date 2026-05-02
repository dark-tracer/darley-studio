import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Music2, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-[color:var(--color-ink)]/60 mt-32">
      <div className="container-prose py-14 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl tracking-[0.25em]">DARLEY</p>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Music for the moments you cannot put into words.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <Link to="/music" className="hover:text-[color:var(--color-ember)] transition-colors">Music</Link>
          <Link to="/videos" className="hover:text-[color:var(--color-ember)] transition-colors">Videos</Link>
          <Link to="/about" className="hover:text-[color:var(--color-ember)] transition-colors">About</Link>
          <Link to="/connect" className="hover:text-[color:var(--color-ember)] transition-colors">Connect</Link>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-ember)]">Find me</p>
          <div className="mt-4 flex gap-4">
            <a href="mailto:darleynarh@gmail.com" aria-label="Email" className="text-foreground/70 hover:text-[color:var(--color-ember)] transition-colors"><Mail size={20} /></a>
            <a href="https://www.instagram.com/darley_musik" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-foreground/70 hover:text-[color:var(--color-ember)] transition-colors"><Instagram size={20} /></a>
            <a href="https://youtube.com/@darleymusik" target="_blank" rel="noreferrer" aria-label="YouTube" className="text-foreground/70 hover:text-[color:var(--color-ember)] transition-colors"><Youtube size={20} /></a>
            <a href="https://open.spotify.com/artist/2dy1sWEQieJNbkj43DCT6x" target="_blank" rel="noreferrer" aria-label="Spotify" className="text-foreground/70 hover:text-[color:var(--color-ember)] transition-colors"><Music2 size={20} /></a>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">darleynarh@gmail.com</p>
        </div>
      </div>
      <div className="border-t border-border/40">
        <div className="container-prose py-6 text-xs text-muted-foreground flex flex-col md:flex-row md:justify-between gap-2">
          <p>© {new Date().getFullYear()} Darley · Isabella Narh. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase">Made with light & shadow</p>
        </div>
      </div>
    </footer>
  );
}
