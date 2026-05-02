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
    youtubeId: "Oj2Nqpdl1WM",
    category: "lyric",
  },
  {
    id: "mv3",
    title: "Darley & Six Strings — Just Do It (Official Video)",
    date: "2024",
    description: "A collaboration with Six Strings — official video.",
    youtubeId: "okelPyuuSVE",
    category: "music-video",
  },
  {
    id: "mv4",
    title: "Yawa (Tekno) — Cover by Darley & First Inversion",
    date: "2024",
    description: "A reimagined cover with First Inversion.",
    youtubeId: "yURf8oeYwHs",
    category: "music-video",
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
