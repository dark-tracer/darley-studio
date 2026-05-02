export type VideoItem = {
  id: string;
  title: string;
  date: string;
  description: string;
  youtubeId: string; // for embed + thumbnail
  category: "music-video" | "lyric" | "live" | "bts";
};

export type EduVideo = {
  id: string;
  title: string;
  date: string;
  description: string;
  youtubeId: string;
  label: "Student Showcase" | "Competition" | "Class Session" | "Rehearsal";
};

export const musicVideos: VideoItem[] = [
  {
    id: "mv1",
    title: "Rescue Me — Official Visual",
    date: "Nov 2024",
    description: "Light, shadow, chains, and the slow return to the body.",
    youtubeId: "b-vSiwmfaoY",
    category: "music-video",
  },
  {
    id: "mv2",
    title: "Away — Lyric Video",
    date: "Jul 2024",
    description: "The full Twi and Ewe lyrics, written in light.",
    youtubeId: "5qap5aO4i9A",
    category: "lyric",
  },
  {
    id: "mv3",
    title: "Live at the Loft — Acoustic Set",
    date: "Mar 2024",
    description: "A stripped-down evening: voice, guitar, and a small room.",
    youtubeId: "jfKfPfyJRdk",
    category: "live",
  },
  {
    id: "mv4",
    title: "Behind 'Rescue Me'",
    date: "Oct 2024",
    description: "Studio sessions, vocal takes, and the night the song became itself.",
    youtubeId: "9bZkp7q19f0",
    category: "bts",
  },
];

export const eduVideos: EduVideo[] = [
  {
    id: "ed1",
    title: "Ghana Inter-School Festival — 1st Place",
    date: "2024",
    description: "My students winning gold for the second year in a row. I am still proud, still loud about it.",
    youtubeId: "kJQP7kiw5Fk",
    label: "Competition",
  },
  {
    id: "ed2",
    title: "Ghana Inter-School Festival — 1st Place",
    date: "2023",
    description: "The first win. The year they trusted the work and walked on stage like they belonged there.",
    youtubeId: "RgKAFK5djSk",
    label: "Competition",
  },
  {
    id: "ed3",
    title: "Peculiar International — End of Term Showcase",
    date: "Dec 2024",
    description: "A full ensemble piece choreographed and rehearsed across the term.",
    youtubeId: "OPf0YbXqDm0",
    label: "Student Showcase",
  },
  {
    id: "ed4",
    title: "Vocal Foundations — Class Session",
    date: "Sep 2024",
    description: "Breath, posture, tone. The first month is always about the body.",
    youtubeId: "fRh_vgS2dFE",
    label: "Class Session",
  },
  {
    id: "ed5",
    title: "Festival Routine — Final Rehearsal",
    date: "Jun 2024",
    description: "The night before. Cleaning the formations, holding the nerves.",
    youtubeId: "2vjPBrBU-TM",
    label: "Rehearsal",
  },
  {
    id: "ed6",
    title: "Cultural Movement Workshop",
    date: "Apr 2024",
    description: "An open session exploring traditional Ghanaian movement vocabulary.",
    youtubeId: "hT_nvWreIhg",
    label: "Class Session",
  },
];
