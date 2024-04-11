declare global {
    namespace NodeJS {
        interface ProcessEnv {
            JWT_SECRET: string;
            ENV: 'test' | 'dev';
            APP_PORT: string;
            APP_URL: string;
            FRONTEND_URL: string;
            DB_HOST: string;
            DB_USER: string;
            DB_NAME: string;
            DB_PASSWORD: string;
            DB_PORT: string;
        }
    }
}

export {};
