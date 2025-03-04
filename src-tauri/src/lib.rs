mod models;

use models::queries::{create_song, query_all};
use surrealdb::engine::local::RocksDb;

use surrealdb::Surreal;

#[tokio::main]
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub async fn run() {
    let db = Surreal::new::<RocksDb>("db").await.unwrap();
    // Select a specific namespace / database
    db.use_ns("database")
        .use_db("song_database")
        .await
        .expect("Error connecting to Song Database");
    tauri::Builder::default()
        .manage(db)
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![create_song, query_all])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
