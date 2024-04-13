import { Router } from "express";
import { db } from "../database";
import { Memo, RawMemo } from "../../../libs/models/Memo";
import { userIdFromAuthHeader } from "../utils/userIdFromAuthHeader";

export const router = Router();

router.get('/:id(\\d+$)', async (req, res) => {
    try {
        const client = await db.connect();

        const { rows } = await client.query<RawMemo>(`
            SELECT * 
            FROM public.memo
            WHERE
                id = $1
                AND
                user_id = $2
            LIMIT 1;`, [req.params.id, await userIdFromAuthHeader(req)]
        );

        client.release();

        const memo = rows[0];

        if (!memo) {
            return res.status(404).send({
                success: false,
                message: "Memo not found"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Memo read successfully",
            data: {
                id: memo.id,
                category: memo.category,
                title: memo.title,
                content: memo.content,
                lastChange: memo.updated_at
            } satisfies Memo
        });
    } catch (err) {
        console.error(`Something went wrong whilst fetching a memo : ${err.message}`);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const { category, search } = req.query;
        const client = await db.connect();

        const { rows } = await client.query<RawMemo>(`
            SELECT *
            FROM public.memo
            WHERE
                user_id = $1
                ${category && category !== "" ? `AND category = '${category}'` : ""}
                ${search && search !== "" ? `AND title ILIKE '%${search}%'` : ""}
        ;`, [await userIdFromAuthHeader(req)]);

        client.release();

        return res.status(200).send({
            success: true,
            message: "Memos read successfully",
            data: rows.map(row => {
                return {
                    id: row.id,
                    category: row.category,
                    title: row.title,
                    content: row.content,
                    lastChange: row.updated_at
                } satisfies Memo;
            }).sort((a, b) => new Date(b.lastChange).getTime() - new Date(a.lastChange).getTime())
        });
    } catch (err) {
        console.error(`Something went wrong whilst fetching the memos : ${err.message}`);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const { category, title, content } = req.body;
        const client = await db.connect();

        const { rows } = await client.query(`
            INSERT INTO public.memo (user_id, category, title, content)
            VALUES ($1, $2, $3, $4)
            RETURNING id;
        `, [await userIdFromAuthHeader(req), category, title, content]);

        client.release();

        const id = rows[0].id;

        return res.status(201).send({
            success: true,
            message: "Memo created successfully",
            data: id
        });
    } catch (err) {
        console.error(`Something went wrong whilst creating a memo : ${err.message}`);
        return res.send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { category, title, content } = req.body;
        const client = await db.connect();

        await client.query(`
            UPDATE public.memo
            SET tag = $1,
                title = $2,
                content = $3,
                updated_at = $4
            WHERE
                id = $5
                AND
                user_id = $6;
        `, [category, title, content, new Date(), req.params.id, await userIdFromAuthHeader(req)]);

        client.release();

        return res.status(200).send({
            success: true,
            message: "Memo updated successfully"
        });
    } catch (err) {
        console.error(`Something went wrong whilst updating a memo : ${err.message}`);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const client = await db.connect();

        await client.query(`
            DELETE FROM public.memo
            WHERE
                id = $1
                AND
                user_id = $2;
        `, [req.params.id, await userIdFromAuthHeader(req)]);

        client.release();

        return res.status(200).send({
            success: true,
            message: "Memo deleted successfully"
        });
    } catch (err) {
        console.error(`Something went wrong whilst deleting a memo : ${err.message}`);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.get("/categories", async (req, res) => {
    try {
        const client = await db.connect();

        const { rows } = await client.query<RawMemo>(`
            SELECT DISTINCT category
            FROM public.memo
            WHERE user_id = $1;
        `, [await userIdFromAuthHeader(req)]);

        client.release();

        return res.status(200).send({
            success: true,
            message: "Memo categories read successfully",
            data: rows.filter(row => row.category !== null).map(row => row.category) as string[]
        });
    } catch (err) {
        console.error(`Something went wrong whilst fetching the memos' categories : ${err.message}`);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
});
