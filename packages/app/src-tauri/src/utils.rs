use serde::{Deserialize,Serialize};
use tauri_plugin_http::reqwest;

#[derive(Debug, Deserialize, Serialize)]
pub struct User {
    pub id: i32,
    pub firstName: String,
    pub lastName: String,
    pub email: String,
    pub joinedOn: String,
}

#[derive(Deserialize, Debug, Serialize)]
struct ApiResponseWithoutData {
    success: bool,
    message: String,
}

#[derive(Deserialize, Debug, Serialize)]
struct ApiResponseWithData<T> {
    success: bool,
    message: String,
    data: T,
}

#[derive(Deserialize, Debug, Serialize)]
enum ApiResponse<T> {
    TypeA(ApiResponseWithoutData),
    TypeB(ApiResponseWithData<T>),
}

impl ApiResponseWithoutData {
    pub fn to_string(&self) -> String {
        serde_json::to_string(self).unwrap_or_else(|_| "Failed to serialize".to_string())
    }
}

/// Convenience method for making a get request with jwt.
pub async fn get(url: String, jwt: String) -> Result<String, String> {
    let client = reqwest::Client::new();
    let response = client
        .get(url)
        .header("Authorization", jwt)
        .header("Accept", "application/json")
        .send()
        .await;

    match response {
        Ok(response) => {
            let body = response.text().await;

            match body {
                Ok(body_text) => {        
                    return Ok(body_text);
                }
                Err(err) => Err(ApiResponseWithoutData {
                    success: false,
                    message: format!("Failed to read response body: {:?}", err),
                }.to_string()),
            }
        }
        Err(err) => Err(ApiResponseWithoutData {
            success: false,
            message: format!("Request failed: {:?}", err),
        }.to_string()),
    }
}

/// Convenience method for making a post request with jwt.
/// 
/// Make sure the data is a string.
pub async fn post(url: String, data: String, jwt: String) -> Result<String, String> {
    let client = reqwest::Client::new();
    let response = client
        .post(url)
        .body(data)
        .header("Authorization", jwt)
        .header("Accept", "application/json")
        .header("Content-Type", "application/json")
        .send()
        .await;

    match response {
        Ok(response) => {
            let body = response.text().await;

            match body {
                Ok(body_text) => {        
                    return Ok(body_text);
                }
                Err(err) => Err(ApiResponseWithoutData {
                    success: false,
                    message: format!("Failed to read response body: {:?}", err),
                }.to_string()),
            }
        }
        Err(err) => Err(ApiResponseWithoutData {
            success: false,
            message: format!("Request failed: {:?}", err),
        }.to_string()),
    }
}

/// Convenience method for making a put request with jwt.
/// 
/// Make sure the data is a string.
pub async fn put(url: String, data: String, jwt: String) -> Result<String, String> {
    let client = reqwest::Client::new();
    let response = client
        .patch(url)
        .body(data)
        .header("Authorization", jwt)
        .header("Accept", "application/json")
        .header("Content-Type", "application/json")
        .send()
        .await;

    match response {
        Ok(response) => {
            let body = response.text().await;

            match body {
                Ok(body_text) => {        
                    return Ok(body_text);
                }
                Err(err) => Err(ApiResponseWithoutData {
                    success: false,
                    message: format!("Failed to read response body: {:?}", err),
                }.to_string()),
            }
        }
        Err(err) => Err(ApiResponseWithoutData {
            success: false,
            message: format!("Request failed: {:?}", err),
        }.to_string()),
    }
}

/// Convenience method for making a patch request with jwt.
/// 
/// Make sure the data is a string.
pub async fn patch(url: String, data: String, jwt: String) -> Result<String, String> {
    let client = reqwest::Client::new();
    let response = client
        .patch(url)
        .body(data)
        .header("Authorization", jwt)
        .header("Accept", "application/json")
        .header("Content-Type", "application/json")
        .send()
        .await;

    match response {
        Ok(response) => {
            let body = response.text().await;

            match body {
                Ok(body_text) => {        
                    return Ok(body_text);
                }
                Err(err) => Err(ApiResponseWithoutData {
                    success: false,
                    message: format!("Failed to read response body: {:?}", err),
                }.to_string()),
            }
        }
        Err(err) => Err(ApiResponseWithoutData {
            success: false,
            message: format!("Request failed: {:?}", err),
        }.to_string()),
    }
}

/// Convenience method for making a delete request with jwt.
pub async fn delete(url: String, jwt: String) -> Result<String, String> {
    let client = reqwest::Client::new();
    let response = client
        .delete(url)
        .header("Authorization", jwt)
        .header("Content-Type", "application/json")
        .send()
        .await;

    match response {
        Ok(response) => {
            let body = response.text().await;

            match body {
                Ok(body_text) => {        
                    return Ok(body_text);
                }
                Err(err) => Err(ApiResponseWithoutData {
                    success: false,
                    message: format!("Failed to read response body: {:?}", err),
                }.to_string()),
            }
        }
        Err(err) => Err(ApiResponseWithoutData {
            success: false,
            message: format!("Request failed: {:?}", err),
        }.to_string()),
    }
}
