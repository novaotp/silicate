'use server'

import { db } from "@/database"
import { verify } from "@/utils/jwt";
import { cookies } from "next/headers";

interface CreateGradeBookProps {
    gradeBookName: string | undefined,
    gradeBookStartDate: Date | undefined,
    gradeBookEndDate: Date | undefined
}

export async function CreateGradebook({ gradeBookName, gradeBookStartDate, gradeBookEndDate }: CreateGradeBookProps): Promise<boolean> {
    try {
        const cookie = cookies().get('id')?.value;

        if (!cookie) {
            return false;
        }

        const client = await db.connect();

        const query = 'INSERT INTO public.gradebook (user_id, name) VALUES ($1, $2)';

        const payload = await verify(cookie);
        
        if (Object.values(payload).length === 0) {
            return false;
        }

        const values = [(payload.payload as any).userID, gradeBookName];

        await client.query(query, values);

        client.release();

        return true;

    } catch (err) {
        console.log(err);
        
        return false;
    }
}

export async function GetGradebooks() {
    try {
        const client = await db.connect();

        const query = 'SELECT * FROM public.gradebook ORDER BY name';

        const result = await client.query(query);

        client.release();

        return result.rows;

    } catch (err) {
        return [];
    }
}