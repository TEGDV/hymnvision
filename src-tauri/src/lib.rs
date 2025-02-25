// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! This is the result!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, add])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
#[tauri::command]
fn add(num1: u8, num2: u8) -> u8 {
    let result: u8 = num1 + num2;
    println!("I was invoked from JavaScript! {}", &result);
    result
}
