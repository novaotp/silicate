
"use server";

import { db } from "@/database";
import { useServerUserId } from "@/libs/hooks/useUserId/server";
import { Memo } from "@models/memo";

/**
 * Gets the user's memos from the database.
 * @returns An array of {@link Memo | `Memo`} if successful, `undefined` otherwise.
 */
export const getMemos = async (): Promise<Memo[] | undefined> => {
    try {
        const client = await db.connect();
        const userId = await useServerUserId();

        if (!userId) {
            return undefined;
        }

        const query = 'SELECT * FROM public.memo WHERE user_id = $1;';
        const values = [userId];

        const { rows } = await client.query(query, values);
        client.release(true);

        const notes: Memo[] = rows.map((row) => ({
            id: row.id,
            title: row.title,
            content: row.content,
            created_at: row.created_at,
            updated_at: row.updated_at,
        }));

        return notes;

    } catch (err) {
        console.error(err);
        return undefined;

    }
}

/**
* Fetches the memo associated with the given id.
* @param id The id of the memo to fetch
* @returns A {@link Memo | `Memo`} object or `undefined` if not found
*/
export const getMemo = async (id: number): Promise<Memo | undefined> => {
    try {
        const client = await db.connect();
        const userId = await useServerUserId();

        if (!userId) {
            return undefined;
        }

        const query = 'SELECT * FROM public.memo WHERE id = $1 AND user_id = $2 LIMIT 1;';
        const values = [id, userId];

        const { rows } = await client.query(query, values);
        client.release(true);

        return {
            id: rows[0].id,
            title: rows[0].title,
            content: rows[0].content,
            created_at: rows[0].created_at,
            updated_at: rows[0].updated_at,
        } as Memo;

    } catch (err) {
        console.error("An error occurred while fetching a note", err);
        return undefined;

    }
}

/**
 * Creates a new memo for the user in the database.
 * @param title The new title of the memo
 * @param content The new content of the memo
 * @returns The id of the newly created memo, or `undefined` if an error occurred.
 */
export const createMemo = async (title: string, content: string): Promise<number | undefined> => {
    try {
        const client = await db.connect();
        const userId = await useServerUserId();

        if (!userId) {
            return undefined;
        }

        const now = new Date();
        const query = 'INSERT INTO public.memo (user_id, title, content, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING id;';
        const values = [userId, title, content, now, now];

        const { rows } = await client.query(query, values);
        client.release();

        const noteId: number = rows[0].id;

        return noteId;

    } catch (err) {
        console.error("An error occurred while creating a note", err);
        return undefined;

    }
}

/**
 * Updates a memo in the database with the given data.
 * @param id The id of the memo to update
 * @param title The new title of the memo
 * @param content The new content of the memo
 * @returns A boolean indicating wether or not the update was successful
 */
export const updateMemo = async (id: number, title: string, content: string): Promise<boolean> => {
    try {
        const client = await db.connect();
        const userId = await useServerUserId();

        if (!userId) {
            return false;
        }

        const now = new Date();
        const query = 'UPDATE public.memo SET title = $1, content = $2, updated_at = $3 WHERE id = $4 AND user_id = $5;';
        const values = [title, content, now, id, userId];

        await client.query(query, values);
        client.release();

        return true;

    } catch (err) {
        console.error("An error occurred while updating a memo", err);
        return false;

    }
}

/**
 * Deletes a memo from the database that matches the given id.
 * @param id The id of the memo to delete
 * @returns A boolean indicating wether or not the deletion was successful
 */
export const deleteMemo = async (id: number): Promise<boolean> => {
    try {
        const client = await db.connect();
        const userId = await useServerUserId();

        if (!userId) {
            return false;
        }

        const query = 'DELETE FROM public.memo WHERE id = $1 AND user_id = $2;';
        const values = [id, userId];

        await client.query(query, values);
        client.release();

        return true;

    } catch (err) {
        console.error("An error occurred while deleting a memo", err);
        return false;

    }
}
