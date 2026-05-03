// Single source of truth for releases — easy to extend.
import rescueArt from "@/assets/rescue-me.jpg";
import awayArt from "@/assets/away.jpg";
import justDoItArt from "@/assets/just-do-it.jpg";

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
  previewUrl?: string; // 30s preview mp3
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
      "No one knows the battle i fight \neveryday  \n| No one knows \nlittle by little I'm going insane |\nPretending I'm ok now in the four walls of my body |\nYou see me smile \nBut if only you knew ",
    links: {
      spotify: "https://open.spotify.com/track/1KYoio6k80W5pfcnlXdAOz?si=433dee23a0bd4a62",
      appleMusic: "https://music.apple.com/gh/album/rescue-me-feat-lily-bruce-appiah/1849203474?i=1849203475",
      youtube: "https://youtu.be/b-vSiwmfaoY?si=nEat6plJ253KoIZI",
    },
    embed: { type: "spotify", src: "https://open.spotify.com/embed/track/1KYoio6k80W5pfcnlXdAOz?utm_source=generator&theme=0" },
    previewUrl: "https://p.scdn.co/mp3-preview/e61a7e69f6f75ccca23a8f0c89b91de3c2ed6f21",
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
      spotify: "https://open.spotify.com/track/5fY7TJ9eW00QPR0L0lIjyq?si=f813fe910c1a4b08",
      appleMusic: "https://music.apple.com/gh/album/away/1807441447?i=1807441449",
      youtube: "https://youtu.be/Oj2Nqpdl1WM?si=CHKUoGBFp-fL-KbH",
      audiomack: "https://audiomack.com/darleymusik/song/away?share-user-id=22535805",
    },
    embed: { type: "spotify", src: "https://open.spotify.com/embed/track/5fY7TJ9eW00QPR0L0lIjyq?utm_source=generator&theme=0" },
    featured: true,
  },
  {
    slug: "just-do-it",
    title: "Just Do It",
    releaseDate: "2020-03-13",
    cover: justDoItArt,
    shortDescription:
      "A collaboration with Six Strings — a nudge to stop overthinking and move. The song is the push.",
    story:
      "Just Do It came out of a season of hesitation — the kind where you keep waiting for the perfect moment that never arrives. Built with Six Strings, it leans into warm guitar work and a steady, encouraging pulse. It is the voice in your head on a good day, finally winning.",
    links: {
      spotify: "https://open.spotify.com/track/4REcZZJz0LOmbqGJ901rp9?si=3fff34e1c0744b19",
      appleMusic: "https://music.apple.com/gh/album/just-do-it/1503231576?i=1503231579",
      audiomack: "https://music.apple.com/gh/album/just-do-it/1503231576?i=1503231579",
      youtube: "https://youtu.be/okelPyuuSVE?si=cthLaVTW9noRD2G3",
    },
    embed: { type: "spotify", src: "https://open.spotify.com/embed/track/4REcZZJz0LOmbqGJ901rp9?utm_source=generator&theme=0" },
  },
];
