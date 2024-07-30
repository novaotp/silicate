declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_NAME: string;
            DB_HOST: string;
            DB_USER: string;
            DB_PASSWORD: string;
            DB_PORT: string;
            SERVER_PORT: string;
            SERVER_URL: string;
            FRONTEND_URL: string;
            JWT_SECRET: string;
        }
    }
}

export {};
