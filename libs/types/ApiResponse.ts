export interface ApiResponse {
    success: boolean,
    message: string
}

export interface ApiResponseWithData<T> extends ApiResponse {
    data: T
}
