import { Router } from "express";
import { db } from "../database";
import { Memo, RawMemo } from "../../../libs/models/Memo";

export const router = Router();

router.get('/memos/:id', async (req, res) => {
    try {
        const client = await db.connect();

        const { rows } = await client.query<RawMemo>(`
            SELECT * 
            FROM public.memo
            WHERE id = $1
            LIMIT 1;`, [req.params.id]
        );

        client.release();

        const memo = rows[0];

        if (!memo) {
            return res.send({
                success: false,
                message: "Memo not found"
            });
        }

        return res.send({
            success: true,
            message: "Memo read successfully",
            data: {
                id: memo.id,
                tag: memo.tag,
                title: memo.title,
                content: memo.content,
                lastChange: memo.updated_at
            } as Memo
        });
    } catch (err) {
        console.error(`Something went wrong whilst fetching a memo : ${err.message}`);
        return res.send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.get('/memos', async (req, res) => {
    try {
        const client = await db.connect();

        const { rows } = await client.query<RawMemo>('SELECT * FROM public.memo;');

        client.release();

        return res.send({
            success: true,
            message: "Users read successfully",
            data: rows.map(row => {
                return {
                    id: row.id,
                    tag: row.tag,
                    title: row.title,
                    content: row.content,
                    lastChange: row.updated_at
                } as Memo;
            }).sort((a, b) => new Date(b.lastChange).getTime() - new Date(a.lastChange).getTime())
        });
    } catch (err) {
        console.error(`Something went wrong whilst fetching the memos : ${err.message}`);
        return res.send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.post('/memos', async (req, res) => {
    try {
        const { userId, tag, title, content } = req.body;
        const client = await db.connect();

        const { rows } = await client.query(`
            INSERT INTO public.memo (user_id, tag, title, content, updated_at)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id;
        `, [userId, tag, title, content, new Date()]);

        client.release();

        const id = rows[0].id;

        return res.send({
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

router.put('/memos/:id', async (req, res) => {
    try {
        const { tag, title, content } = req.body;
        const client = await db.connect();

        await client.query(`
            UPDATE public.memo
            SET tag = $1,
                title = $2,
                content = $3,
                updated_at = $4
            WHERE id = $5;
        `, [tag, title, content, new Date(), req.params.id]);

        client.release();

        return res.send({
            success: true,
            message: "Memo updated successfully"
        });
    } catch (err) {
        console.error(`Something went wrong whilst updating a memo : ${err.message}`);
        return res.send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.delete('/memos/:id', async (req, res) => {
    try {
        const client = await db.connect();

        await client.query(`
            DELETE FROM public.memo
            WHERE id = $1;
        `, [req.params.id]);

        client.release();

        return res.send({
            success: true,
            message: "Memo deleted successfully"
        });
    } catch (err) {
        console.error(`Something went wrong whilst deleting a memo : ${err.message}`);
        return res.send({
            success: false,
            message: "Internal Server Error"
        });
    }
});
