use crate::utils::{delete, get, patch, post};

#[tauri::command]
pub async fn get_tasks(category: String, search: String, archived: String, jwt: String) -> Result<String, String> {
    return get(format!("http://localhost:4000/api/v1/tasks?category={}&search={}&archived={}", category, search, archived), jwt).await;
}

#[tauri::command]
pub async fn get_categories(archived: String, jwt: String) -> Result<String, String> {
    return get(format!("http://localhost:4000/api/v1/tasks/categories?archived={}", archived), jwt).await;
}

#[tauri::command]
pub async fn get_task(id: u32, jwt: String) -> Result<String, String> {
    return get(format!("http://localhost:4000/api/v1/tasks/{}", id), jwt).await;
}

#[tauri::command]
pub async fn get_attachment(id: u32, name: String, jwt: String) -> Result<String, String> {
    return get(format!("http://localhost:4000/api/v1/tasks/{}/attachment?name={}", id, name), jwt).await;
}

#[tauri::command]
pub async fn create_default_task(data: String, jwt: String) -> Result<String, String> {
    return post("http://localhost:4000/api/v1/tasks".to_string(), data, jwt).await;
}

#[tauri::command]
pub async fn update_task(id: u32, data: String, jwt: String) -> Result<String, String> {
    return patch(format!("http://localhost:4000/api/v1/tasks/{}", id), data, jwt).await;
}

#[tauri::command]
pub async fn update_category(id: u32, data: String, jwt: String) -> Result<String, String> {
    return patch(format!("http://localhost:4000/api/v1/tasks/{}", id), data, jwt).await;
}

#[tauri::command]
pub async fn delete_attachment(id: u32, name: String, jwt: String) -> Result<String, String> {
    return delete(format!("http://localhost:4000/api/v1/tasks/{}/attachment?name={}", id, name), jwt).await;
}
