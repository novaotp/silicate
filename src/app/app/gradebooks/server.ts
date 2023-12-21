"use server";

import { db } from "@/database";
import { useServerUserId } from "@/libs/hooks/useUserId/server";
import { Gradebook } from "@/models/gradebook";

export interface CreateGradebookProps {
    name: string;
    description: string | undefined;
    from: Date;
    to: Date;
}

export const createGradebook = async ({
    name,
    description,
    from,
    to,
}: CreateGradebookProps): Promise<number> => {
    try {
        const userId = await useServerUserId();

        if (!userId) {
            return 0;
        }

        const client = await db.connect();

        const now = new Date();
        const query =
            "INSERT INTO public.gradebook (user_id, name, description, start_period, end_period, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id";
        const values = [userId, name, description, from, to, now, now];

        const { rows } = await client.query(query, values);
        client.release();

        return rows[0].id;
    } catch (err) {
        console.log(err);
        return 0;
    }
};

export interface UpdateGradebookProps {
    gradebookId: string;
    name: string;
    description: string | undefined;
    from: Date;
    to: Date;
}

export const updateGradebook = async ({
    gradebookId,
    name,
    description,
    from,
    to,
}: UpdateGradebookProps): Promise<boolean> => {
    try {
        const userId = await useServerUserId();

        if (!userId) {
            return false;
        }

        const client = await db.connect();

        const now = new Date();
        const query =
            "UPDATE public.gradebook SET name = $1, description = $2, start_period = $3, end_period = $4, updated_at = $5 WHERE user_id = $6 AND id = $7;";
        const values = [name, description, from, to, now, userId, gradebookId];

        const { rows } = await client.query(query, values);
        client.release();

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const deleteGradebook = async (
    gradebookId: string
): Promise<boolean> => {
    try {
        const userId = await useServerUserId();

        if (!userId) {
            return false;
        }

        const client = await db.connect();

        const query =
            "DELETE FROM public.gradebook WHERE id = $1 AND user_id = $2;";
        const values = [gradebookId, userId];

        await client.query(query, values);
        client.release();

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const fetchGradebooks = async (): Promise<Gradebook[] | null> => {
    try {
        const userId = await useServerUserId();

        if (!userId) {
            return null;
        }

        const client = await db.connect();

        const query =
            "SELECT * FROM public.gradebook WHERE user_id = $1 ORDER BY name";
        const values = [userId];

        const { rows } = await client.query(query, values);
        client.release();

        const gradebooks: Gradebook[] = rows.map((row) => ({
            id: row.id,
            name: row.name,
            description: row.description,
            from: row.start_period,
            to: row.end_period,
            created_at: row.created_at,
            updated_at: row.updated_at,
        }));

        return gradebooks;
    } catch (err) {
        return null;
    }
};
