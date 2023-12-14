
"use server";

import { db } from "..";

interface QueryResponse<T> {
    success: boolean;
    dataOrError: T | string;
};

interface QueryOptions {
    singleValue: boolean;
}

/**
 * A query helper to simplify the process of querying the database.
 * @param query The query to be executed
 * @param values The values to be passed to the query
 * @param options Some additional options for the query
 * @returns A {@link QueryResponse | `QueryResponse`} object
 */
export async function query<T>(query: string, values: any[], options?: Partial<QueryOptions>): Promise<QueryResponse<T>> {
    try {
        const client = await db.connect();

        const { rows } = await client.query(query, values);
        client.release();

        if (options?.singleValue) {
            return { success: true, dataOrError: rows[0] as T };
        }

        return { success: true, dataOrError: rows as T };

    } catch (error) {
        console.error("An error occurred while trying to query the database", error);
        return { success: false, dataOrError: "Internal Server Error" };

    }
}
