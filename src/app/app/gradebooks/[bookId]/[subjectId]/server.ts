"use server";

import { db } from "@/database";

interface CreateGradeProps {
  gradebookID: string;
  subjectID: string;
  name: string;
  score: string;
  weight: number;
}

export const createGrade = async ({
  gradebookID,
  subjectID,
  name,
  score,
  weight
}: CreateGradeProps): Promise<boolean> => {
  try {
    const client = await db.connect();

    const query = "INSERT INTO public.grade (gradebook_id, subject_id, score, weight, name) VALUES ($1, $2, $3, $4, $5)";
    const values = [gradebookID, subjectID, score, weight, name];

    await client.query(query, values);
    client.release();

    return true;

  } catch (err) {
    console.log(err);
    return false;
    
  }
};

export const getGrades = async (subject_id: string, gradebook_id: string) => {
  try {
    const client = await db.connect();

    const query = `SELECT * FROM public.grade WHERE subject_id = $1 AND gradebook_id = $2 ORDER BY name`;
    const values = [subject_id, gradebook_id];

    const { rows } = await client.query(query);
    client.release();

    return rows;

  } catch (err) {
    return undefined;

  }
};
