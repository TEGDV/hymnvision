use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Song {
    pub title: String,
    pub author: String,
    pub album: Option<String>,
    pub genre: Option<String>,
    pub chord_patterns_id: Option<String>,
    pub original_tone: Option<String>,
    #[serde(default)]
    pub full_text: String,
    pub lyrics: Vec<Section>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Section {
    pub section_type: String,
    pub index: u32,
    pub lines: Vec<String>,
    pub chord_pattern: String,
}
