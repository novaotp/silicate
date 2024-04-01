export type LoginResponse = {
    success: false,
    message: string
} | {
    success: true,
    message: string,
    jwt: string,
    maxAge: number
};
