'use server'

import { db } from "@/database"
import { useServerUserId } from "@/libs/hooks/useUserId";
import { Subject } from "@/models/subject";

export interface CreateSubjectProps {
  gradebookId: string,
  name: string;
  description: string;
}

export const createSubject = async ({ gradebookId, name, description }: CreateSubjectProps): Promise<number> => {
  try {
    const userId = await useServerUserId();

    if (!userId) {
      return 0;
    }

    const client = await db.connect();

    const now = new Date();
    const query = 'INSERT INTO public.subject (user_id, gradebook_id, name, description, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
    const values = [userId, gradebookId, name, description, now, now];

    const { rows } = await client.query(query, values);
    client.release();

    return rows[0].id;

  } catch (err) {
    console.log(err);
    return 0;

  }
}

export const fetchSubjects = async (gradebookId: string): Promise<Subject[] | null> => {
  try {
    const userId = await useServerUserId();

    if (!userId) {
      return null;
    }

    const client = await db.connect();

    const query = `SELECT * FROM public.subject WHERE user_id = $1 AND gradebook_id = $2 ORDER BY name`;
    const values = [userId, gradebookId];

    const { rows } = await client.query(query, values);
    client.release();

    const subjects: Subject[] = rows.map((row) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));

    return subjects;

  } catch (err) {
    console.log(err);
    return null;

  }
}