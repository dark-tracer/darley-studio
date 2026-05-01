import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, Instagram, Youtube, Music2 } from "lucide-react";
import { PageHeader } from "./music";

export const Route = createFileRoute("/connect")({
  head: () => ({
    meta: [
      { title: "Connect — Darley" },
      { name: "description", content: "Get in touch with Darley for bookings, collaborations, media features, and education enquiries." },
      { property: "og:title", content: "Connect with Darley" },
      { property: "og:description", content: "Booking, collaboration, media, and education enquiries." },
    ],
  }),
  component: ConnectPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please share your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(200),
  subject: z.enum(["Booking", "Collaboration", "Media", "Education Enquiry", "Other"]),
  message: z.string().trim().min(10, "A few more words, please").max(2000),
});

function ConnectPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "Booking", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as string;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    // Build a mailto fallback so the message reaches her without a backend.
    const body = encodeURIComponent(`From: ${result.data.name} <${result.data.email}>\nSubject: ${result.data.subject}\n\n${result.data.message}`);
    window.location.href = `mailto:hello@darley.music?subject=${encodeURIComponent("[" + result.data.subject + "] " + result.data.name)}&body=${body}`;
    setSent(true);
  }

  return (
    <>
      <PageHeader
        eyebrow="Say hello"
        title="Connect"
        subtitle="For performance bookings, music collaborations, media features, and teaching or cultural-programme partnerships."
      />

      <section className="container-prose pb-32 grid gap-12 md:grid-cols-[1.2fr_1fr] items-start">
        <form onSubmit={onSubmit} className="rounded-md border border-border/60 bg-card/40 p-8 md:p-10 space-y-5">
          <Field label="Name" error={errors.name}>
            <input
              type="text"
              value={form.name}
              maxLength={100}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-sm bg-[color:var(--color-input)]/60 border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[color:var(--color-ember)]"
            />
          </Field>
          <Field label="Email" error={errors.email}>
            <input
              type="email"
              value={form.email}
              maxLength={200}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full rounded-sm bg-[color:var(--color-input)]/60 border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[color:var(--color-ember)]"
            />
          </Field>
          <Field label="Subject" error={errors.subject}>
            <select
              value={form.subject}
              onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
              className="w-full rounded-sm bg-[color:var(--color-input)]/60 border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[color:var(--color-ember)]"
            >
              <option>Booking</option>
              <option>Collaboration</option>
              <option>Media</option>
              <option>Education Enquiry</option>
              <option>Other</option>
            </select>
          </Field>
          <Field label="Message" error={errors.message}>
            <textarea
              rows={6}
              value={form.message}
              maxLength={2000}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full rounded-sm bg-[color:var(--color-input)]/60 border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[color:var(--color-ember)] resize-none"
            />
          </Field>
          <button
            type="submit"
            className="w-full rounded-sm bg-[color:var(--color-ember)] px-6 py-4 text-xs uppercase tracking-[0.25em] text-[color:var(--color-ember-foreground)] hover:opacity-90 transition ember-glow"
          >
            Send message
          </button>
          {sent && (
            <p className="text-sm text-[color:var(--color-ember)]">
              Your email client should be opening. If not, write to hello@darley.music directly.
            </p>
          )}
        </form>

        <aside className="space-y-8">
          <div>
            <p className="eyebrow">Direct</p>
            <a
              href="mailto:hello@darley.music"
              className="mt-4 inline-flex items-center gap-3 font-display text-2xl text-foreground hover:text-[color:var(--color-ember)] transition"
            >
              <Mail size={20} /> hello@darley.music
            </a>
          </div>

          <div>
            <p className="eyebrow">Follow</p>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Social href="https://instagram.com" Icon={Instagram} label="Instagram" handle="@darleymusic" />
              <Social href="https://youtube.com" Icon={Youtube} label="YouTube" handle="Darley" />
              <Social href="https://open.spotify.com" Icon={Music2} label="Spotify" handle="Darley" />
            </div>
          </div>

          <div className="rounded-md border border-border/60 bg-card/40 p-6">
            <p className="eyebrow">A quick note</p>
            <p className="mt-4 text-sm text-foreground/80 leading-relaxed">
              I read every message myself. I usually reply within a few days. For time-sensitive press, please mark your subject clearly.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.22em] text-foreground/70">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </label>
  );
}

function Social({ href, Icon, label, handle }: { href: string; Icon: typeof Mail; label: string; handle: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-3 text-foreground/80 hover:text-[color:var(--color-ember)] transition"
    >
      <Icon size={18} />
      <span className="text-foreground/85 group-hover:text-[color:var(--color-ember)]">{label}</span>
      <span className="text-xs text-muted-foreground">{handle}</span>
    </a>
  );
}
