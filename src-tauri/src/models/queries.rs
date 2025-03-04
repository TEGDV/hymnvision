use crate::models::types::Song;
use surrealdb::engine::local::Db;
use surrealdb::Surreal;
use tauri::State;

#[tauri::command]
pub async fn create_song(db: State<'_, Surreal<Db>>, body: Song) -> surrealdb::Result<()> {
    let db = db.inner();
    let created: Option<Song> = db
        .create("song")
        .content(body)
        .await
        .expect("Error to create Entry on DB");
    dbg!(created);
    Ok(())
}

#[tauri::command]
pub async fn query_all(db: State<'_, Surreal<Db>>) -> surrealdb::Result<()> {
    let db = db.inner();
    let created: Vec<Song> = db
        .select("song")
        .await
        .expect("Error to create Entry on DB");
    dbg!(created);
    Ok(())
}
