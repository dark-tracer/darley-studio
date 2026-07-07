import { supabase } from "@/integrations/supabase/client";

export type DbRelease = {
  id: string;
  slug: string;
  title: string;
  release_date: string;
  cover_url: string;
  short_description: string;
  story: string;
  lyrics_excerpt: string | null;
  spotify_url: string | null;
  apple_music_url: string | null;
  youtube_url: string | null;
  audiomack_url: string | null;
  boomplay_url: string | null;
  embed_src: string | null;
  preview_url: string | null;
  featured: boolean;
};

export type DbMusicVideo = {
  id: string;
  title: string;
  date_label: string;
  description: string;
  youtube_id: string;
  category: string;
  sort_order: number;
};

export type DbEduVideo = {
  id: string;
  title: string;
  date_label: string;
  description: string;
  youtube_id: string | null;
  src_url: string | null;
  label: string;
  sort_order: number;
};

export type SiteAsset = {
  kind: string;
  file_url: string;
  file_name: string | null;
  updated_at: string;
};

export async function fetchReleases(): Promise<DbRelease[]> {
  const { data, error } = await supabase
    .from("releases")
    .select("*")
    .order("release_date", { ascending: false });
  if (error) throw error;
  return (data ?? []) as DbRelease[];
}

export async function fetchMusicVideos(): Promise<DbMusicVideo[]> {
  const { data, error } = await supabase
    .from("music_videos")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as DbMusicVideo[];
}

export async function fetchEduVideos(): Promise<DbEduVideo[]> {
  const { data, error } = await supabase
    .from("edu_videos")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as DbEduVideo[];
}

export async function fetchSiteAsset(kind: "cv" | "press_kit"): Promise<SiteAsset | null> {
  const { data, error } = await supabase
    .from("site_assets")
    .select("*")
    .eq("kind", kind)
    .maybeSingle();
  if (error) throw error;
  return (data as SiteAsset | null) ?? null;
}

// 100 years
const LONG_EXPIRY = 60 * 60 * 24 * 365 * 100;

export async function uploadToBucket(
  bucket: "covers" | "previews" | "edu-videos" | "documents",
  file: File,
): Promise<{ path: string; url: string }> {
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error: upErr } = await supabase.storage.from(bucket).upload(path, file, {
    upsert: false,
    contentType: file.type || undefined,
  });
  if (upErr) throw upErr;
  const { data: signed, error: signErr } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, LONG_EXPIRY);
  if (signErr) throw signErr;
  return { path, url: signed.signedUrl };
}
