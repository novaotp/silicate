import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '$env/static/private';
import pg from 'pg';

export const db = new pg.Pool({
    database: DB_NAME,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: Number(DB_PORT)
});
