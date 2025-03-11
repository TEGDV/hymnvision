use serde::{Deserialize, Serialize};
use surrealdb::sql::Thing;

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
pub struct SongId {
    #[serde(alias = "id", deserialize_with = "deserialize_surreal_id")]
    pub id: String,
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

fn deserialize_surreal_id<'de, D>(deserializer: D) -> Result<String, D::Error>
where
    D: serde::Deserializer<'de>,
{
    let thing = Thing::deserialize(deserializer)?; // ✅ Deserialize `Thing`
    Ok(thing.id.to_string()) // ✅ Convert `Thing` to a plain string
}
