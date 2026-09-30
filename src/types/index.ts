export type UserRole = "gf" | "bf" | "together";

export interface QuestionOption {
  text: string;
  response: string;
  reaction?: string;
  points?: number;
}

export interface InteractiveQuestion {
  id: string;
  title: string;
  subtitle: string;
  category: "emotion" | "psychology" | "humor" | "love" | "code" | "care";
  options: QuestionOption[];
}

export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  annotation: string;
  tag: string;
  accent: string;
}

export interface LoreMilestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  loreSecret?: string;
}

export interface OpenWhenLetter {
  id: string;
  title: string;
  icon: string;
  preview: string;
  body: string;
  ps: string;
  forRole?: "gf" | "bf" | "both";
}

export interface VoucherItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  redeemed: boolean;
  forWhom: "Divija" | "Shrey";
}
