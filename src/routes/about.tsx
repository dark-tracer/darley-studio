import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, ArrowRight } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import { PageHeader } from "./music";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Darley (Isabella Narh)" },
      { name: "description", content: "From KABAWIL stages in Germany to teaching in Ghana — the story behind Darley, an independent Ghanaian artist and educator." },
      { property: "og:title", content: "About Darley — Isabella Narh" },
      { property: "og:description", content: "Singer, songwriter, performer, and music & dance educator." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="The story" title="About" />

      <section className="container-prose pb-24 grid gap-16 md:grid-cols-[1fr_1.2fr] items-start">
        <div className="md:sticky md:top-28">
          <img
            src={portrait}
            alt="Darley — portrait in warm window light"
            width={1280}
            height={1600}
            loading="lazy"
            className="w-full rounded-md object-cover shadow-[var(--shadow-deep)]"
          />
          <div className="mt-6 grid grid-cols-2 gap-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <div className="rounded-sm border border-border/60 p-3">
              <p className="text-[color:var(--color-ember)]">Languages</p>
              <p className="mt-1 normal-case tracking-normal text-foreground/85">English · German · French</p>
            </div>
            <div className="rounded-sm border border-border/60 p-3">
              <p className="text-[color:var(--color-ember)]">Based in</p>
              <p className="mt-1 normal-case tracking-normal text-foreground/85">Accra, Ghana</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 text-lg leading-relaxed text-foreground/85">
          <p>
            I am Isabella Narh. On stage and in the studio, I go by Darley.
          </p>
          <p>
            I grew up between languages and rhythms — Twi at home, English at school, music in every room. I started performing young and never really stopped. For several years I lived and worked in Germany with KABAWIL, performing in over twenty productions for audiences of 500 and more. The discipline of that work — night after night, body and voice in conversation with strangers — shaped everything I do now.
          </p>
          <p>
            When I came home to Ghana, I started teaching. I joined Peculiar International School as a music and dance educator, working with young people who reminded me why I started. My student dance team has gone on to win first place at the <span className="text-[color:var(--color-ember)]">Ghana Inter-School Festival two years in a row</span> — in 2023 and 2024. There is no version of my career I am more proud of.
          </p>
          <p>
            Alongside teaching, I write and release music independently. <em>Rescue Me</em> and <em>Away</em> are the first songs I have put out under the name Darley. They are quiet, honest, and exactly what I needed to hear. There is more on the way.
          </p>
          <p>
            I work in English, with workable German and French, and I am ALX Africa-certified in Virtual Assistance Skills. I welcome conversations about performance, collaboration, teaching residencies, and cultural programmes.
          </p>

          <div className="pt-6 flex flex-wrap gap-3">
            <a
              href="/Isabella_Narh_CV.pdf"
              download
              className="inline-flex items-center gap-2 rounded-sm bg-[color:var(--color-ember)] px-5 py-3 text-xs uppercase tracking-[0.25em] text-[color:var(--color-ember-foreground)] hover:opacity-90 transition"
            >
              <Download size={16} /> Download CV
            </a>
            <Link
              to="/press-kit"
              className="inline-flex items-center gap-2 rounded-sm border border-foreground/30 px-5 py-3 text-xs uppercase tracking-[0.25em] text-foreground hover:border-[color:var(--color-ember)] hover:text-[color:var(--color-ember)] transition"
            >
              Press kit <ArrowRight size={14} />
            </Link>
            <Link
              to="/connect"
              className="inline-flex items-center gap-2 rounded-sm border border-foreground/30 px-5 py-3 text-xs uppercase tracking-[0.25em] text-foreground hover:border-[color:var(--color-ember)] hover:text-[color:var(--color-ember)] transition"
            >
              Get in touch <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-prose pb-32">
        <div className="rounded-md border border-border/60 bg-card/40 p-8 md:p-12">
          <p className="eyebrow">Selected milestones</p>
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {milestones.map((m) => (
              <li key={m.title} className="border-l-2 border-[color:var(--color-ember)] pl-4">
                <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-ember)]">{m.year}</p>
                <p className="mt-1 font-display text-xl">{m.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{m.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

const milestones = [
  { year: "2024", title: "Ghana Inter-School Festival — 1st Place", detail: "Second consecutive win with my student dance team." },
  { year: "2024", title: "Released 'Rescue Me'", detail: "Lead single under the name Darley." },
  { year: "2024", title: "Released 'Away'", detail: "Twi & Ewe-influenced single on toxic cycles." },
  { year: "2023", title: "Ghana Inter-School Festival — 1st Place", detail: "First win with the dance team at Peculiar International." },
  { year: "2022", title: "ALX Africa — Certified", detail: "Virtual Assistance Skills programme." },
  { year: "2018–2022", title: "KABAWIL, Germany", detail: "20+ productions, performing for audiences of 500+." },
];
