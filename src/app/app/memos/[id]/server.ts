
"use server";

import { db } from "@/database";
import { useServerUserId } from "@/libs/hooks/useUserId";
import { Memo } from "@/models/memo";

export const fetchMemo = async (id: number): Promise<Memo | null> => {
  try {
    const client = await db.connect();
    const userId = await useServerUserId();

    if (!userId) {
      return null;
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
    };

  } catch (err) {
    console.error("An error occurred while fetching a note", err);
    return null;

  }
}

export const updateMemo = async (noteId: number, title: string, content: string): Promise<boolean> => {
  try {
    const client = await db.connect();
    const userId = await useServerUserId();

    if (!userId) {
      return false;
    }

    const now = new Date();
    const query = 'UPDATE public.memo SET title = $1, content = $2, updated_at = $3 WHERE id = $4 AND user_id = $5;';
    const values = [title, content, now, noteId, userId];

    await client.query(query, values);
    client.release();

    return true;

  } catch (err) {
    console.error("An error occurred while updating a memo", err);
    return false;

  }
}

export const deleteMemo = async (noteId: number): Promise<boolean> => {
  try {
    const client = await db.connect();
    const userId = await useServerUserId();

    if (!userId) {
      return false;
    }

    const query = 'DELETE FROM public.memo WHERE id = $1 AND user_id = $2;';
    const values = [noteId, userId];

    await client.query(query, values);
    client.release();
    return true;

  } catch (err) {
    console.error("An error occurred while deleting a memo", err);
    return false;

  }
}
