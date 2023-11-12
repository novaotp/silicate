
"use server";

import { db } from "@/database";
import { useServerUserId } from "@libs/hooks/useUserId";
import { Memo } from "@/models/memo";

export const fetchMemos = async () => {
  try {
    const client = await db.connect();
    const userId = await useServerUserId();

    if (!userId) {
      return [];
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
    return [];

  }
}

export const createMemo = async (title: string, content: string) => {
  try {
    const client = await db.connect();
    const userId = await useServerUserId();

    if (!userId) {
      return null;
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
    return null;

  }
}
