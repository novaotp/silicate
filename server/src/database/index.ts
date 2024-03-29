import dotenv from "dotenv";
import pg from 'pg';

dotenv.config();

if (!process.env.ENV || (process.env.ENV !== "test" && process.env.ENV !== "dev")) {
    throw new Error("Invalid environment ! You can choose between 'test' and 'dev'.")
}
 
console.log(`[Postgres] You are running the ${
    process.env.ENV === "dev" ? "developement" : "test"
} database.`)

export const db = new pg.Pool({
    database: process.env.ENV === "dev" ? process.env.DB_NAME : process.env.TEST_DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
});
