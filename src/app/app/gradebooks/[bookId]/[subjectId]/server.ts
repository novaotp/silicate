'use server'

import { db } from "@/database"

interface CreateGradeProps {
    title: string;
    value: string;
}

export async function CreateSubject({ title, value }: CreateGradeProps): Promise<boolean> {
    try {

        const client = await db.connect();

        const query = 'INSERT INTO public.subject (title, value) VALUES ($1, $2)';

        const values = [title, value];

        await client.query(query, values);

        client.release();

        return true;

    } catch (err) {
        console.log(err);
        
        return false;
    }
}

export async function GetGrades(subject_id: string, gradebook_id: string){
    try {
        const client = await db.connect();

        const query = `SELECT * FROM public.grade WHERE subject_id = ${subject_id} AND gradebook_id = ${gradebook_id} ORDER BY name`;

        const result = await client.query(query);

        client.release();

        return result.rows;

    } catch (err) {
        return [];
    }
}