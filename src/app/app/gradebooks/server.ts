
'use server';

import { db } from "@/database"
import { useServerUserId } from "@/libs/hooks/useUserId";
import { Gradebook } from "@/models/gradebook";

export interface CreateGradebookProps {
  name: string,
  description: string | undefined,
  from: Date,
  to: Date
}

export const createGradebook = async ({ name, description, from, to }: CreateGradebookProps): Promise<boolean> => {
  try {
    const userId = await useServerUserId();

    if (!userId) {
      return false;
    }

    const client = await db.connect();

    const now = new Date();
    const query = 'INSERT INTO public.gradebook (user_id, name, description, from, to, created_at, updated_at) VALUES ($1, $2)';
    const values = [userId, name, description, from, to, now, now];

    await client.query(query, values);
    client.release();

    return true;

  } catch (err) {
    console.log(err);
    return false;

  }
}

export const fetchGradebooks = async (): Promise<Gradebook[] | null> => {
  try {
    const userId = await useServerUserId();

    if (!userId) {
      return null;
    }

    const client = await db.connect();

    const query = 'SELECT * FROM public.gradebook WHERE user_id = $1 ORDER BY name';
    const values = [userId];

    const { rows } = await client.query(query, values);
    client.release();

    const gradebooks: Gradebook[] = rows.map((row) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      from: row.from,
      to: row.to,
      created_at: row.created_at,
      updated_at: row.updated_at
    }));

    return gradebooks;

  } catch (err) {
    return null;

  }
}
