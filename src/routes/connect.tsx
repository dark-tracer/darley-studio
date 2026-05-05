import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, Instagram, Youtube, Music2 } from "lucide-react";
import { PageHeader } from "./music";
import { SaveCardButton } from "@/components/SaveCardButton";

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
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

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
    setErrorMessage("");
    const { name, email, subject, message } = result.data;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:darleynarh@gmail.com?subject=${encodeURIComponent(`[${subject}] ${name}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setStatus("sent");
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
            Open in email app
          </button>
          {status === "sent" && (
            <p className="text-sm text-[color:var(--color-ember)]">
              Your email app should open with the message ready to send. If nothing happens, email darleynarh@gmail.com directly.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-destructive">
              {errorMessage || "Could not send your message. Please try again, or email darleynarh@gmail.com directly."}
            </p>
          )}
        </form>

        <aside className="space-y-8">
          <div>
            <p className="eyebrow">Direct</p>
            <a
              href="mailto:darleynarh@gmail.com"
              className="mt-4 inline-flex items-center gap-3 font-display text-2xl text-foreground hover:text-[color:var(--color-ember)] transition"
            >
              <Mail size={20} /> darleynarh@gmail.com
            </a>
          </div>

          <div>
            <p className="eyebrow">Follow</p>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Social href="https://www.instagram.com/darley_musik" Icon={Instagram} label="Instagram" handle="@darley_musik" />
              <Social href="https://youtube.com/@darleymusik" Icon={Youtube} label="YouTube" handle="@darleymusik" />
              <Social href="https://open.spotify.com/artist/2dy1sWEQieJNbkj43DCT6x" Icon={Music2} label="Spotify" handle="Darley" />
              <Social href="https://music.apple.com/gh/artist/darley/1811108221" Icon={Music2} label="Apple Music" handle="Darley" />
            </div>
          </div>

          <div className="rounded-md border border-border/60 bg-card/40 p-6">
            <p className="eyebrow">A quick note</p>
            <p className="mt-4 text-sm text-foreground/80 leading-relaxed">
              I read every message myself. I usually reply within a few days. For time-sensitive press, please mark your subject clearly.
            </p>
          </div>

          <div className="rounded-md border border-border/60 bg-card/40 p-6">
            <p className="eyebrow">Keep in Touch</p>
            <p className="mt-4 text-sm text-foreground/80 leading-relaxed">
              Download Darley's digital card and save her details directly to your phone or contacts.
            </p>
            <div className="mt-5">
              <SaveCardButton />
            </div>
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
