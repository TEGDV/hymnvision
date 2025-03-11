mod models;

use models::queries::{create_song, query_all, query_one, search_song, update_song};
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

    // Define Indecies
    db.query(
        "
        DEFINE ANALYZER lower_ascii
                TOKENIZERS blank
                FILTERS lowercase, snowball(spanish), ngram(1,12);

        DEFINE INDEX lyrics
                ON TABLE song 
                COLUMNS full_text 
                SEARCH ANALYZER lower_ascii 
                HIGHLIGHTS BM25;",
    )
    .await
    .expect("Failed To Define Full Search Index");
    tauri::Builder::default()
        .manage(db)
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            create_song,
            query_all,
            query_one,
            update_song,
            search_song
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
