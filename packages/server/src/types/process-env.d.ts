declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string;
            SERVER_PORT: string;
            SERVER_URL: string;
            FRONTEND_URL: string;
            JWT_SECRET: string;
        }
    }
}

export {};
