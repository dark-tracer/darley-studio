import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  fetchReleases,
  fetchMusicVideos,
  fetchEduVideos,
  fetchSiteAsset,
  uploadToBucket,
  type DbRelease,
  type DbMusicVideo,
  type DbEduVideo,
  type SiteAsset,
} from "@/lib/content";

type Tab = "music" | "videos" | "documents";

export function AdminDashboard({ onSignOut }: { onSignOut: () => void }) {
  const [tab, setTab] = useState<Tab>("music");

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="container-prose">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="eyebrow">Super admin</p>
            <h1 className="mt-3 font-display text-4xl md:text-5xl">Content console</h1>
          </div>
          <button
            onClick={onSignOut}
            className="text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-[color:var(--color-ember)]"
          >
            Sign out
          </button>
        </div>

        <div className="flex gap-2 mb-8 border-b border-border/60">
          {(["music", "videos", "documents"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-3 text-xs uppercase tracking-[0.22em] border-b-2 transition ${
                tab === t
                  ? "border-[color:var(--color-ember)] text-[color:var(--color-ember)]"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "music" && <MusicAdmin />}
        {tab === "videos" && <VideosAdmin />}
        {tab === "documents" && <DocumentsAdmin />}
      </div>
    </div>
  );
}

// ---------------- Music ----------------
const emptyRelease = (): Partial<DbRelease> => ({
  slug: "",
  title: "",
  release_date: new Date().toISOString().slice(0, 10),
  cover_url: "",
  short_description: "",
  story: "",
  lyrics_excerpt: "",
  spotify_url: "",
  apple_music_url: "",
  youtube_url: "",
  audiomack_url: "",
  boomplay_url: "",
  embed_src: "",
  preview_url: "",
  featured: false,
});

function MusicAdmin() {
  const [rows, setRows] = useState<DbRelease[]>([]);
  const [editing, setEditing] = useState<Partial<DbRelease> | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function reload() {
    setRows(await fetchReleases());
  }
  useEffect(() => {
    reload();
  }, []);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setBusy(true);
    setMsg("");
    const payload = {
      slug: editing.slug?.trim(),
      title: editing.title?.trim(),
      release_date: editing.release_date,
      cover_url: editing.cover_url?.trim(),
      short_description: editing.short_description ?? "",
      story: editing.story ?? "",
      lyrics_excerpt: editing.lyrics_excerpt || null,
      spotify_url: editing.spotify_url || null,
      apple_music_url: editing.apple_music_url || null,
      youtube_url: editing.youtube_url || null,
      audiomack_url: editing.audiomack_url || null,
      boomplay_url: editing.boomplay_url || null,
      embed_src: editing.embed_src || null,
      preview_url: editing.preview_url || null,
      featured: !!editing.featured,
    };
    const { error } = editing.id
      ? await supabase.from("releases").update(payload as any).eq("id", editing.id)
      : await supabase.from("releases").insert(payload as any);
    setBusy(false);
    if (error) {
      setMsg(error.message);
      return;
    }
    setEditing(null);
    setMsg("Saved.");
    reload();
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this release?")) return;
    const { error } = await supabase.from("releases").delete().eq("id", id);
    if (error) setMsg(error.message);
    else reload();
  }

  async function onUpload(kind: "cover" | "preview", file: File) {
    setBusy(true);
    try {
      const { url } = await uploadToBucket(kind === "cover" ? "covers" : "previews", file);
      setEditing((s) => ({ ...(s ?? {}), [kind === "cover" ? "cover_url" : "preview_url"]: url }));
    } catch (e: any) {
      setMsg(e.message ?? "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  if (editing) {
    const e = editing;
    return (
      <form onSubmit={onSave} className="space-y-4">
        <h2 className="font-display text-2xl">{e.id ? "Edit release" : "New release"}</h2>
        <Grid>
          <Field label="Title" required value={e.title ?? ""} onChange={(v) => setEditing({ ...e, title: v })} />
          <Field label="Slug (url-safe)" required value={e.slug ?? ""} onChange={(v) => setEditing({ ...e, slug: v })} />
          <Field label="Release date" required type="date" value={e.release_date ?? ""} onChange={(v) => setEditing({ ...e, release_date: v })} />
          <div className="flex items-center gap-2 pt-7">
            <input id="feat" type="checkbox" checked={!!e.featured} onChange={(ev) => setEditing({ ...e, featured: ev.target.checked })} />
            <label htmlFor="feat" className="text-sm">Featured</label>
          </div>
        </Grid>
        <UploadField
          label="Cover image"
          accept="image/*"
          urlValue={e.cover_url ?? ""}
          onUrlChange={(v) => setEditing({ ...e, cover_url: v })}
          onUpload={(f) => onUpload("cover", f)}
        />
        <Textarea label="Short description" value={e.short_description ?? ""} onChange={(v) => setEditing({ ...e, short_description: v })} />
        <Textarea label="Story" rows={5} value={e.story ?? ""} onChange={(v) => setEditing({ ...e, story: v })} />
        <Textarea label="Lyrics excerpt" rows={4} value={e.lyrics_excerpt ?? ""} onChange={(v) => setEditing({ ...e, lyrics_excerpt: v })} />
        <Grid>
          <Field label="Spotify URL" value={e.spotify_url ?? ""} onChange={(v) => setEditing({ ...e, spotify_url: v })} />
          <Field label="Apple Music URL" value={e.apple_music_url ?? ""} onChange={(v) => setEditing({ ...e, apple_music_url: v })} />
          <Field label="YouTube URL" value={e.youtube_url ?? ""} onChange={(v) => setEditing({ ...e, youtube_url: v })} />
          <Field label="Audiomack URL" value={e.audiomack_url ?? ""} onChange={(v) => setEditing({ ...e, audiomack_url: v })} />
          <Field label="Boomplay URL" value={e.boomplay_url ?? ""} onChange={(v) => setEditing({ ...e, boomplay_url: v })} />
          <Field label="Spotify embed src (optional)" value={e.embed_src ?? ""} onChange={(v) => setEditing({ ...e, embed_src: v })} />
        </Grid>
        <UploadField
          label="30s preview MP3 (optional)"
          accept="audio/*"
          urlValue={e.preview_url ?? ""}
          onUrlChange={(v) => setEditing({ ...e, preview_url: v })}
          onUpload={(f) => onUpload("preview", f)}
        />
        {msg && <p className="text-sm text-[color:var(--color-ember)]">{msg}</p>}
        <div className="flex gap-3">
          <button disabled={busy} className="btn-ember">{busy ? "Saving…" : "Save"}</button>
          <button type="button" onClick={() => setEditing(null)} className="btn-ghost">Cancel</button>
        </div>
      </form>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-2xl">Releases</h2>
        <button onClick={() => setEditing(emptyRelease())} className="btn-ember">+ New release</button>
      </div>
      {msg && <p className="text-sm text-[color:var(--color-ember)] mb-3">{msg}</p>}
      <ul className="divide-y divide-border/60 rounded-md border border-border/60">
        {rows.map((r) => (
          <li key={r.id} className="flex items-center gap-4 p-4">
            {r.cover_url && <img src={r.cover_url} alt="" className="h-14 w-14 object-cover rounded-sm" />}
            <div className="flex-1">
              <p className="font-display text-lg">{r.title}</p>
              <p className="text-xs text-muted-foreground">{r.release_date} · /{r.slug}</p>
            </div>
            <button onClick={() => setEditing(r)} className="text-xs uppercase tracking-[0.22em] text-foreground/80 hover:text-[color:var(--color-ember)]">Edit</button>
            <button onClick={() => onDelete(r.id)} className="text-xs uppercase tracking-[0.22em] text-destructive">Delete</button>
          </li>
        ))}
        {rows.length === 0 && <li className="p-6 text-sm text-muted-foreground">No releases yet.</li>}
      </ul>
    </div>
  );
}

// ---------------- Videos ----------------
function VideosAdmin() {
  return (
    <div className="space-y-12">
      <MusicVideosSection />
      <EduVideosSection />
    </div>
  );
}

function MusicVideosSection() {
  const [rows, setRows] = useState<DbMusicVideo[]>([]);
  const [editing, setEditing] = useState<Partial<DbMusicVideo> | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function reload() {
    setRows(await fetchMusicVideos());
  }
  useEffect(() => {
    reload();
  }, []);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setBusy(true);
    const payload = {
      title: editing.title?.trim() ?? "",
      date_label: editing.date_label?.trim() ?? "",
      description: editing.description ?? "",
      youtube_id: editing.youtube_id?.trim() ?? "",
      category: editing.category ?? "music-video",
      sort_order: editing.sort_order ?? 0,
    };
    const { error } = editing.id
      ? await supabase.from("music_videos").update(payload as any).eq("id", editing.id)
      : await supabase.from("music_videos").insert(payload as any);
    setBusy(false);
    if (error) setMsg(error.message);
    else {
      setEditing(null);
      reload();
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this video?")) return;
    await supabase.from("music_videos").delete().eq("id", id);
    reload();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-2xl">Music videos</h2>
        <button onClick={() => setEditing({ category: "music-video" })} className="btn-ember">+ New</button>
      </div>
      {editing && (
        <form onSubmit={onSave} className="mb-6 space-y-3 rounded-md border border-border/60 p-4">
          <Grid>
            <Field label="Title" required value={editing.title ?? ""} onChange={(v) => setEditing({ ...editing, title: v })} />
            <Field label="Date label (e.g. Nov 2024)" required value={editing.date_label ?? ""} onChange={(v) => setEditing({ ...editing, date_label: v })} />
            <Field label="YouTube video ID" required value={editing.youtube_id ?? ""} onChange={(v) => setEditing({ ...editing, youtube_id: v })} />
            <SelectField
              label="Category"
              value={editing.category ?? "music-video"}
              onChange={(v) => setEditing({ ...editing, category: v })}
              options={[
                { value: "music-video", label: "Music Video" },
                { value: "lyric", label: "Lyric Video" },
                { value: "live", label: "Live" },
                { value: "bts", label: "Behind the Scenes" },
              ]}
            />
          </Grid>
          <Textarea label="Description" value={editing.description ?? ""} onChange={(v) => setEditing({ ...editing, description: v })} />
          {msg && <p className="text-sm text-destructive">{msg}</p>}
          <div className="flex gap-3">
            <button disabled={busy} className="btn-ember">{busy ? "Saving…" : "Save"}</button>
            <button type="button" onClick={() => setEditing(null)} className="btn-ghost">Cancel</button>
          </div>
        </form>
      )}
      <ul className="divide-y divide-border/60 rounded-md border border-border/60">
        {rows.map((r) => (
          <li key={r.id} className="flex items-center gap-4 p-4">
            <img src={`https://i.ytimg.com/vi/${r.youtube_id}/default.jpg`} alt="" className="h-12 w-20 object-cover rounded-sm" />
            <div className="flex-1">
              <p className="font-display text-lg">{r.title}</p>
              <p className="text-xs text-muted-foreground">{r.date_label} · {r.category}</p>
            </div>
            <button onClick={() => setEditing(r)} className="text-xs uppercase tracking-[0.22em]">Edit</button>
            <button onClick={() => onDelete(r.id)} className="text-xs uppercase tracking-[0.22em] text-destructive">Delete</button>
          </li>
        ))}
        {rows.length === 0 && <li className="p-6 text-sm text-muted-foreground">No music videos yet.</li>}
      </ul>
    </div>
  );
}

function EduVideosSection() {
  const [rows, setRows] = useState<DbEduVideo[]>([]);
  const [editing, setEditing] = useState<Partial<DbEduVideo> | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function reload() {
    setRows(await fetchEduVideos());
  }
  useEffect(() => {
    reload();
  }, []);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setBusy(true);
    const payload = {
      title: editing.title?.trim() ?? "",
      date_label: editing.date_label?.trim() ?? "",
      description: editing.description ?? "",
      youtube_id: editing.youtube_id || null,
      src_url: editing.src_url || null,
      label: editing.label ?? "Student Showcase",
      sort_order: editing.sort_order ?? 0,
    };
    const { error } = editing.id
      ? await supabase.from("edu_videos").update(payload as any).eq("id", editing.id)
      : await supabase.from("edu_videos").insert(payload as any);
    setBusy(false);
    if (error) setMsg(error.message);
    else {
      setEditing(null);
      reload();
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this video?")) return;
    await supabase.from("edu_videos").delete().eq("id", id);
    reload();
  }

  async function onUploadMp4(file: File) {
    setBusy(true);
    try {
      const { url } = await uploadToBucket("edu-videos", file);
      setEditing((s) => ({ ...(s ?? {}), src_url: url, youtube_id: null }));
    } catch (e: any) {
      setMsg(e.message ?? "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-2xl">Education videos</h2>
        <button onClick={() => setEditing({ label: "Student Showcase" })} className="btn-ember">+ New</button>
      </div>
      {editing && (
        <form onSubmit={onSave} className="mb-6 space-y-3 rounded-md border border-border/60 p-4">
          <Grid>
            <Field label="Title" required value={editing.title ?? ""} onChange={(v) => setEditing({ ...editing, title: v })} />
            <Field label="Date label" required value={editing.date_label ?? ""} onChange={(v) => setEditing({ ...editing, date_label: v })} />
            <SelectField
              label="Label"
              value={editing.label ?? "Student Showcase"}
              onChange={(v) => setEditing({ ...editing, label: v })}
              options={[
                { value: "Student Showcase", label: "Student Showcase" },
                { value: "Competition", label: "Competition" },
                { value: "Class Session", label: "Class Session" },
                { value: "Rehearsal", label: "Rehearsal" },
              ]}
            />
            <Field label="YouTube ID (optional)" value={editing.youtube_id ?? ""} onChange={(v) => setEditing({ ...editing, youtube_id: v })} />
          </Grid>
          <UploadField
            label="Or upload an MP4"
            accept="video/*"
            urlValue={editing.src_url ?? ""}
            onUrlChange={(v) => setEditing({ ...editing, src_url: v })}
            onUpload={onUploadMp4}
          />
          <Textarea label="Description" value={editing.description ?? ""} onChange={(v) => setEditing({ ...editing, description: v })} />
          {msg && <p className="text-sm text-destructive">{msg}</p>}
          <div className="flex gap-3">
            <button disabled={busy} className="btn-ember">{busy ? "Saving…" : "Save"}</button>
            <button type="button" onClick={() => setEditing(null)} className="btn-ghost">Cancel</button>
          </div>
        </form>
      )}
      <ul className="divide-y divide-border/60 rounded-md border border-border/60">
        {rows.map((r) => (
          <li key={r.id} className="flex items-center gap-4 p-4">
            <div className="flex-1">
              <p className="font-display text-lg">{r.title}</p>
              <p className="text-xs text-muted-foreground">{r.date_label} · {r.label}</p>
            </div>
            <button onClick={() => setEditing(r)} className="text-xs uppercase tracking-[0.22em]">Edit</button>
            <button onClick={() => onDelete(r.id)} className="text-xs uppercase tracking-[0.22em] text-destructive">Delete</button>
          </li>
        ))}
        {rows.length === 0 && <li className="p-6 text-sm text-muted-foreground">No education videos yet.</li>}
      </ul>
    </div>
  );
}

// ---------------- Documents ----------------
function DocumentsAdmin() {
  const [cv, setCv] = useState<SiteAsset | null>(null);
  const [pk, setPk] = useState<SiteAsset | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState<"cv" | "press_kit" | null>(null);

  async function reload() {
    setCv(await fetchSiteAsset("cv"));
    setPk(await fetchSiteAsset("press_kit"));
  }
  useEffect(() => {
    reload();
  }, []);

  async function onUpload(kind: "cv" | "press_kit", file: File) {
    setBusy(kind);
    setMsg("");
    try {
      const { url } = await uploadToBucket("documents", file);
      const { error } = await supabase
        .from("site_assets")
        .upsert({ kind, file_url: url, file_name: file.name } as any, { onConflict: "kind" });
      if (error) throw error;
      setMsg(`${kind === "cv" ? "CV" : "Press kit"} updated.`);
      reload();
    } catch (e: any) {
      setMsg(e.message ?? "Failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-8">
      <DocCard
        title="CV"
        description="Replaces the downloadable CV linked on the Press Kit page."
        asset={cv}
        busy={busy === "cv"}
        onUpload={(f) => onUpload("cv", f)}
      />
      <DocCard
        title="Press kit"
        description="Replaces the press kit download button."
        asset={pk}
        busy={busy === "press_kit"}
        onUpload={(f) => onUpload("press_kit", f)}
      />
      {msg && <p className="text-sm text-[color:var(--color-ember)]">{msg}</p>}
    </div>
  );
}

function DocCard({
  title,
  description,
  asset,
  busy,
  onUpload,
}: {
  title: string;
  description: string;
  asset: SiteAsset | null;
  busy: boolean;
  onUpload: (f: File) => void;
}) {
  return (
    <div className="rounded-md border border-border/60 p-6">
      <p className="font-display text-xl">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      {asset ? (
        <p className="mt-3 text-xs">
          Current: <a href={asset.file_url} target="_blank" rel="noreferrer" className="text-[color:var(--color-ember)] underline">{asset.file_name ?? "file"}</a>{" "}
          <span className="text-muted-foreground">· updated {new Date(asset.updated_at).toLocaleString()}</span>
        </p>
      ) : (
        <p className="mt-3 text-xs text-muted-foreground">No file uploaded yet.</p>
      )}
      <label className="mt-4 inline-flex items-center gap-2 cursor-pointer rounded-sm border border-foreground/30 px-4 py-2 text-xs uppercase tracking-[0.22em] hover:border-[color:var(--color-ember)] hover:text-[color:var(--color-ember)]">
        <input
          type="file"
          className="hidden"
          accept=".pdf,.zip,.doc,.docx"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onUpload(f);
            e.target.value = "";
          }}
        />
        {busy ? "Uploading…" : "Upload new file"}
      </label>
    </div>
  );
}

// ---------------- Form bits ----------------
function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.22em] text-foreground/70 mb-2">{label}{required && " *"}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm bg-[color:var(--color-input)]/60 border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-[color:var(--color-ember)]"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.22em] text-foreground/70 mb-2">{label}</label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm bg-[color:var(--color-input)]/60 border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-[color:var(--color-ember)]"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.22em] text-foreground/70 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm bg-[color:var(--color-input)]/60 border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-[color:var(--color-ember)]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

function UploadField({
  label,
  accept,
  urlValue,
  onUrlChange,
  onUpload,
}: {
  label: string;
  accept: string;
  urlValue: string;
  onUrlChange: (v: string) => void;
  onUpload: (f: File) => void;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.22em] text-foreground/70 mb-2">{label}</label>
      <div className="flex gap-3 items-start">
        <input
          type="url"
          placeholder="https://… or upload →"
          value={urlValue}
          onChange={(e) => onUrlChange(e.target.value)}
          className="flex-1 rounded-sm bg-[color:var(--color-input)]/60 border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-[color:var(--color-ember)]"
        />
        <label className="shrink-0 inline-flex items-center cursor-pointer rounded-sm border border-foreground/30 px-3 py-2 text-xs uppercase tracking-[0.22em] hover:border-[color:var(--color-ember)] hover:text-[color:var(--color-ember)]">
          <input
            type="file"
            className="hidden"
            accept={accept}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onUpload(f);
              e.target.value = "";
            }}
          />
          Upload
        </label>
      </div>
      {urlValue && accept.startsWith("image") && (
        <img src={urlValue} alt="" className="mt-2 h-24 w-24 object-cover rounded-sm" />
      )}
    </div>
  );
}
