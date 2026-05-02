// Single source of truth for releases — easy to extend.
import rescueArt from "@/assets/rescue-me.jpg";
import awayArt from "@/assets/away.jpg";

export type Release = {
  slug: string;
  title: string;
  releaseDate: string; // ISO
  cover: string;
  shortDescription: string;
  story: string;
  lyricsExcerpt?: string;
  links: {
    spotify?: string;
    appleMusic?: string;
    youtube?: string;
    audiomack?: string;
    boomplay?: string;
  };
  embed?: { type: "spotify" | "youtube"; src: string };
  featured?: boolean;
};

export const releases: Release[] = [
  {
    slug: "rescue-me",
    title: "Rescue Me",
    releaseDate: "2024-11-08",
    cover: rescueArt,
    shortDescription:
      "A prayer whispered in the dark. About surrender, longing, and the moment light finally breaks in.",
    story:
      "Rescue Me lives in the space between drowning and being pulled out of the water. I wrote it on a night when I had nothing left to perform — no version of myself I could put together. The visual identity — the chains, the shadows, the shaft of gold — is exactly how it felt: heavy on every side, then suddenly, quietly, held.",
    lyricsExcerpt:
      "I am tired of the running / save a place for me in the light / hold my name 'til I remember it / rescue me, rescue me tonight.",
    links: {
      spotify: "https://open.spotify.com/track/1KYoio6k80W5pfcnlXdAOz?si=433dee23a0bd4a62",
      appleMusic: "https://music.apple.com/gh/album/rescue-me-feat-lily-bruce-appiah/1849203474?i=1849203475",
      youtube: "https://youtube.com/",
    },
    embed: { type: "spotify", src: "https://open.spotify.com/embed/track/1KYoio6k80W5pfcnlXdAOz?utm_source=generator&theme=0" },
    featured: true,
  },
  {
    slug: "away",
    title: "Away",
    releaseDate: "2024-06-21",
    cover: awayArt,
    shortDescription:
      "A Twi and Ewe-laced meditation on imbalance — and the courage it takes to walk away from cycles that keep taking.",
    story:
      "Away is sung partly in Twi and Ewe because some things only land in the language they were born in. It is about the moment you finally name the imbalance — that you have been the one carrying, forgiving, returning — and decide that leaving is not betrayal. It is breath.",
    links: {
      spotify: "https://open.spotify.com/",
      appleMusic: "https://music.apple.com/",
      youtube: "https://youtube.com/",
      audiomack: "https://audiomack.com/",
    },
    embed: { type: "spotify", src: "https://open.spotify.com/embed/track/0VjIjW4GlUZAMYd2vXMi3b?utm_source=generator&theme=0" },
    featured: true,
  },
];
