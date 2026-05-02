import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, ArrowRight, FileText, Image as ImageIcon, Music, Mic } from "lucide-react";
import { PageHeader } from "./music";

export const Route = createFileRoute("/press-kit")({
  head: () => ({
    meta: [
      { title: "Press Kit — Darley (Isabella Narh)" },
      { name: "description", content: "Download Darley's press kit: bio, CV, high-resolution photos, and contact details for press, bookings, and collaborations." },
      { property: "og:title", content: "Press Kit — Darley" },
      { property: "og:description", content: "Bio, CV, photos, and contact for press and bookings." },
    ],
  }),
  component: PressKitPage,
});

function PressKitPage() {
  return (
    <>
      <PageHeader
        eyebrow="For press & bookings"
        title="Press Kit"
        subtitle="Everything you need to write about, book, or collaborate with Darley — in one place."
      />

      <section className="container-prose pb-16">
        <div className="rounded-md border border-border/60 bg-card/40 p-8 md:p-12">
          <p className="eyebrow">What's inside</p>
          <ul className="mt-6 grid gap-5 md:grid-cols-2">
            {contents.map((c) => (
              <li key={c.title} className="flex gap-4">
                <div className="mt-1 text-[color:var(--color-ember)]">
                  <c.icon size={18} />
                </div>
                <div>
                  <p className="font-display text-lg">{c.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{c.detail}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="/Isabella_Narh_CV.pdf"
              download
              className="inline-flex items-center gap-2 rounded-sm bg-[color:var(--color-ember)] px-5 py-3 text-xs uppercase tracking-[0.25em] text-[color:var(--color-ember-foreground)] hover:opacity-90 transition"
            >
              <Download size={16} /> Download press kit
            </a>
            <Link
              to="/connect"
              className="inline-flex items-center gap-2 rounded-sm border border-foreground/30 px-5 py-3 text-xs uppercase tracking-[0.25em] text-foreground hover:border-[color:var(--color-ember)] hover:text-[color:var(--color-ember)] transition"
            >
              Request more <ArrowRight size={14} />
            </Link>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Currently the download includes the official CV. A full media pack with high-resolution photos and stage plot is available on request.
          </p>
        </div>
      </section>

      <section className="container-prose pb-32 grid gap-6 md:grid-cols-3">
        <div className="rounded-sm border border-border/60 p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-ember)]">Bookings</p>
          <p className="mt-3 text-foreground/85">For live performances, residencies, and cultural programmes.</p>
        </div>
        <div className="rounded-sm border border-border/60 p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-ember)]">Press</p>
          <p className="mt-3 text-foreground/85">For interviews, features, and editorial requests.</p>
        </div>
        <div className="rounded-sm border border-border/60 p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-ember)]">Collaborations</p>
          <p className="mt-3 text-foreground/85">For songwriting, features, and teaching residencies.</p>
        </div>
      </section>
    </>
  );
}

const contents = [
  { icon: FileText, title: "Artist bio", detail: "Short and long-form biographies in English, ready to copy into editorial coverage." },
  { icon: FileText, title: "Full CV", detail: "Performance history, teaching, education, languages, and certifications." },
  { icon: ImageIcon, title: "Press photos", detail: "High-resolution portraits and live shots cleared for editorial use (on request)." },
  { icon: Music, title: "Music & links", detail: "Streaming links for Rescue Me, Away, and the latest covers across all platforms." },
  { icon: Mic, title: "Selected milestones", detail: "Awards, productions, and notable performances — including KABAWIL and the Ghana Inter-School Festival." },
  { icon: FileText, title: "Contact details", detail: "Direct email and booking enquiries for press, performance, and collaborations." },
];
