# Tauri + SolidJS + Typescript + SurrealDb


# Development notes

Learnings and common issues

How to connect SurrealDb embedded Database
---
Snippet to connect db with tauire backend. `DONT SAVE THE LOCAL FILE DB INSIDE PROJECT FOLDER` until you blacklist from HRM

```rust

use surrealdb::engine::local::{Db, Mem, RocksDb};

#[tokio::main]
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub async fn run() {
    let db = Surreal::new::<RocksDb>("~/surreal.db").await.unwrap();
    // Select a specific namespace / database
    db.use_ns("database")
        .use_db("song_database")
        .await
        .expect("Error connecting to Song Database");
    tauri::Builder::default()
        .manage(db) // Database Context
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![create_song, query_all])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn create_song(db: State<'_, Surreal<Db>>) -> surrealdb::Result<()> {
    // We have to receive the DB context as Surreal<Db> type
    let db = db.inner();
    let created: Option<Song> = db
        .create("song")
        .content(Song {
            title: "Socorro".to_string(),
            author: "Un Corazon".to_string(),
        })
        .await
        .expect("Error to create Entry on DB");
    dbg!(created);
    Ok(())
}
```
