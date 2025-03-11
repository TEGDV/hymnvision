export interface Section {
  section_type: SongSectionType; // Matches Rust's `#[serde(rename = "type")]`
  index: number;
  lines: string[];
  chord_pattern: string;
}

export interface Song {
  id?: string;
  title: string;
  author: string;
  album: string;
  genre: string;
  chord_patterns_id: string;
  original_tone: string;
  full_text: string;
  lyrics: Section[];
}

export enum SongSectionType {
  VERSE = "Verse",
  CHORUS = "Chorus",
  BRIDGE = "Bridge",
  INTERLUDE = "Interlude",
  INTRO = "Intro",
  OUTRO = "Outro",
  PRECHORUS = "Pre-Chorus",
  POSTCHORUS = "Post-Chorus",
  REFRAIN = "Refrain",
}
