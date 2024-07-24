export interface ApiResponse {
    success: boolean,
    message: string
}

export type ApiResponseWithData<T> = {
    success: true,
    message: string,
    data: T
} | {
    success: false,
    message: string
}
