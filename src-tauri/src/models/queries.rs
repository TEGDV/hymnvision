use crate::models::types::Song;
use surrealdb::engine::local::Db;
use surrealdb::Surreal;
use tauri::State;

#[tauri::command]
pub async fn create_song(db: State<'_, Surreal<Db>>, mut body: Song) -> surrealdb::Result<()> {
    let db = db.inner();
    let full_text = body
        .lyrics
        .iter()
        .map(|section| section.lines.join("\n")) // Join lines within a section
        .collect::<Vec<_>>() // Collect into a Vec<String>
        .join(""); // Join sections with a double newline
                   // Assign the generated text to the field
    body.full_text = full_text;
    let created: Option<Song> = db
        .create("song")
        .content(body)
        .await
        .expect("Error to create Entry on DB");
    dbg!(created);
    Ok(())
}

#[tauri::command]
pub async fn query_all(db: State<'_, Surreal<Db>>) -> surrealdb::Result<Vec<Song>> {
    let db = db.inner();
    let entries: Vec<Song> = db
        .select("song")
        .await
        .expect("Error to create Entry on DB");
    dbg!(&entries);
    Ok(entries)
}

#[tauri::command]
pub async fn search_song(
    db: State<'_, Surreal<Db>>,
    query: String,
) -> surrealdb::Result<Vec<Song>> {
    let db = db.inner();

    // Split query into words (tokens)
    let words: Vec<&str> = query.split_whitespace().collect();

    // Generate WHERE clause dynamically
    let where_clause = words
        .iter()
        .map(|word| format!("full_text @@ '{}'", word)) // Format each token
        .collect::<Vec<String>>()
        .join(" OR ");
    let sql = format!(
        "SELECT * FROM song WHERE {} ORDER BY title DESC;",
        where_clause
    );

    let mut response = db.query(sql).await.expect("Error to create Entry on DB");
    let entries = response
        .take(0)
        .expect("Error during desirializing Song Search");
    dbg!(&entries);
    Ok(entries)
}
