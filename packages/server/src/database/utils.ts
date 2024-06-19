import { db } from ".";
import pg from 'pg';

type QueryReturn<T> = {
    rows: T[],
    first: T | null
};

/**
 * Convenient helper to query the database while handling the open/close connection.
 * @param statement The SQL statement to execute.
 * @param values The values to pass in the statement (optional).
 */
export async function query<T>(statement: string, values: unknown[] = []): Promise<QueryReturn<T>> {
    let client: pg.PoolClient | null = null;
    let data: QueryReturn<T> = {
        rows: [],
        first: null
    };

    try {
        client = await db.connect();

        const { rows } = await client.query(statement, values);

        data = {
            rows: rows as T[],
            first: rows.length > 0 ? rows.at(0) : null
        };
    } catch (err) {
        console.error("An error occurred whilst querying the database : ", err);
    } finally {
        if (client) {
            client.release();
        }
    }

    return data;
}
