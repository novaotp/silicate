use crate::utils::get;

#[tauri::command]
pub async fn get_user(jwt: String) -> Result<String, String> {
    return get("http://localhost:4000/api/v1/me".to_string(), jwt).await;
}
