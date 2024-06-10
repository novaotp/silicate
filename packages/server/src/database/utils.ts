import { db } from ".";
import pg from 'pg';

type QueryReturn<T> = {
    rows: T[],
    first: T | null
};

/**
 * Queries the database while handling the open/close connection.
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
            first: rows.at(0)!
        };
    } catch (err) {
        console.error("An error occurred : ", err);
    } finally {
        if (client) {
            client.release();
        }
    }

    return data;
}
