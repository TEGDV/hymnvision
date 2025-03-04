export interface Section {
  section_type: string; // Matches Rust's `#[serde(rename = "type")]`
  index: number;
  lines: string[];
  chord_pattern: string;
}

export interface Song {
  title: string;
  author: string;
  album: string;
  genre: string;
  chord_patterns_id: string;
  original_tone: string;
  lyrics: Section[];
}
