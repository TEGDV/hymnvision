use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Song {
    pub title: String,
    pub author: String,
    pub album: String,
    pub genre: String,
    pub chord_patterns_id: String,
    pub original_tone: String,
    pub lyrics: Vec<Section>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Section {
    pub section_type: String,
    pub index: u32,
    pub lines: Vec<String>,
    pub chord_pattern: String,
}
