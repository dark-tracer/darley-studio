import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/music", label: "Music" },
  { to: "/videos", label: "Videos" },
  { to: "/about", label: "About" },
  { to: "/press-kit", label: "Press" },
  { to: "/connect", label: "Connect" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[color:var(--color-ink)]/85 backdrop-blur-md border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <nav className="container-prose flex items-center justify-between py-5">
        <Link to="/" className="font-display text-2xl tracking-[0.25em] text-foreground hover:text-[color:var(--color-ember)] transition-colors">
          DARLEY
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-[color:var(--color-ember)]" }}
              className="text-sm uppercase tracking-[0.22em] text-foreground/75 hover:text-[color:var(--color-ember)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          aria-label="Menu"
          className="md:hidden text-foreground"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-[color:var(--color-ink)]/95 backdrop-blur-lg border-t border-border/60 animate-fade-in">
          <div className="container-prose flex flex-col gap-1 py-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-[color:var(--color-ember)]" }}
                className="py-3 text-base uppercase tracking-[0.22em] text-foreground/80"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
