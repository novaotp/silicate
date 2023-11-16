'use server'

import { db } from "@/database"

interface CreateSubjectProps {
    subjectName: string;
    subjectAbbrev: string;
}

export async function CreateSubject({ subjectName, subjectAbbrev }: CreateSubjectProps): Promise<boolean> {
    try {

        const client = await db.connect();

        const query = 'INSERT INTO public.subject (user_id, name) VALUES ($1, $2)';

        const values = [subjectName, subjectAbbrev];

        await client.query(query, values);

        client.release();

        return true;

    } catch (err) {
        console.log(err);
        
        return false;
    }
}

export async function GetSubjects() {
    try {
        const client = await db.connect();

        const query = 'SELECT * FROM public.subject ORDER BY name';

        const result = await client.query(query);

        client.release();

        return result.rows;

    } catch (err) {
        return [];
    }
}