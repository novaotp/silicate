
"use server";

import { db } from "@/database";
import { useServerUserId } from "@/libs/hooks/useUserId";
import { Grade } from "@/models/grade";

export interface CreateGradeProps {
  subjectId: string;
  name: string;
  score: string;
  weight: number;
  comment: string;
}

export const createGrade = async ({
  subjectId,
  name,
  score,
  weight,
  comment
}: CreateGradeProps): Promise<boolean> => {
  try {
    const userId = await useServerUserId();

    if (!userId) {
      return false;
    }

    const client = await db.connect();

    const now = new Date();
    const query = "INSERT INTO public.grade (user_id, subject_id, name, score, weight, comment, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
    const values = [userId, subjectId, name, score, weight, comment, now, now];

    await client.query(query, values);
    client.release();

    return true;

  } catch (err) {
    console.log(err);
    return false;
    
  }
};

export const getGrades = async (subjectId: string) => {
  try {
    const userId = await useServerUserId();

    if (!userId) {
      return null;
    }

    const client = await db.connect();

    const query = `SELECT * FROM public.grade WHERE subject_id = $1 AND user_id = $2 ORDER BY name`;
    const values = [subjectId, userId];

    const { rows } = await client.query(query, values);
    client.release();

    const grades: Grade[] = rows.map((row) => ({
      id: row.id,
      name: row.name,
      score: row.score,
      weight: row.weight,
      comment: row.comment,
      created_at: row.created_at,
      updated_at: row.updated_at
    }));

    return grades;

  } catch (err) {
    return null;

  }
};
