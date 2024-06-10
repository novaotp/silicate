import pg from 'pg';
 
console.log(`[Postgres] Running on port ${process.env.DB_PORT}`)

export const db = new pg.Pool({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
});
