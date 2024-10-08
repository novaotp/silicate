import { Router } from "express";
import { query } from "../database/utils";
import { Memo } from "../../../libs/models/Memo";
import { userIdFromAuthHeader } from "../utils/userIdFromAuthHeader";

export const router = Router();

router.get('/:id(\\d+$)', async (req, res) => {
    try {
        const { first: memo } = await query<Memo>(`
            SELECT
                id,
                category,
                title,
                content,
                updated_at AS "lastChange",
                pinned
            FROM public.memo
            WHERE id = $1 AND user_id = $2
            LIMIT 1;`, [req.params.id, await userIdFromAuthHeader(req)]);

        if (!memo) {
            return res.notFoundError("Memo not found");
        }

        return res.success("Memo read successfully", memo);
    } catch (err) {
        console.error(`Something went wrong whilst fetching a memo : ${err.message}`);
        return res.serverError();
    }
});

router.get('/', async (req, res) => {
    try {
        const { category, search } = req.query;

        const { rows: memos } = await query<Memo>(`
            SELECT
                id,
                category,
                title,
                content,
                updated_at AS "lastChange",
                pinned
            FROM public.memo
            WHERE
                user_id = $1
                ${category && category !== "" ? `AND category = '${category}'` : ""}
                ${search && search !== "" ? `AND title ILIKE '%${search}%'` : ""}
            ORDER BY updated_at DESC;
        ;`, [await userIdFromAuthHeader(req)]);

        return res.success("Memos read successfully", memos);
    } catch (err) {
        console.error(`Something went wrong whilst fetching the memos : ${err.message}`);
        return res.serverError();
    }
});

router.post('/', async (req, res) => {
    try {
        // eslint-disable-next-line prefer-const
        let { category, title, content, pinned } = req.body;

        if (category === "" || !category) {
            category = null;
        }

        const { first } = await query<{ id: number }>(`
            INSERT INTO public.memo (user_id, category, title, content, pinned)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id;
        `, [await userIdFromAuthHeader(req), category, title, content, pinned]);

        return res.success("Memo created successfully", first!.id);
    } catch (err) {
        console.error(`Something went wrong whilst creating a memo : ${err.message}`);
        return res.serverError();
    }
});

router.put('/:id', async (req, res) => {
    try {
        // eslint-disable-next-line prefer-const
        let { category, title, content, pinned } = req.body;

        if (category === "" || !category) {
            category = null;
        }

        await query(`
            UPDATE public.memo
            SET category = $1,
                title = $2,
                content = $3,
                pinned = $4,
                updated_at = $5
            WHERE id = $6 AND user_id = $7;
        `, [category, title, content, pinned, new Date(), req.params.id, await userIdFromAuthHeader(req)]);

        return res.success("Memo updated successfully");
    } catch (err) {
        console.error(`Something went wrong whilst updating a memo : ${err.message}`);
        return res.serverError();
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await query(`
            DELETE FROM public.memo
            WHERE id = $1 AND user_id = $2;
        `, [req.params.id, await userIdFromAuthHeader(req)]);

        return res.success("Memo deleted successfully");
    } catch (err) {
        console.error(`Something went wrong whilst deleting a memo : ${err.message}`);
        return res.serverError();
    }
});

router.get("/categories", async (req, res) => {
    try {
        const { rows } = await query<{ category: string }>(`
            SELECT DISTINCT category
            FROM public.memo
            WHERE user_id = $1 AND category IS NOT NULL;
        `, [await userIdFromAuthHeader(req)]);

        return res.success("Memo categories read successfully", rows.map(row => row.category));
    } catch (err) {
        console.error(`Something went wrong whilst fetching the memos' categories : ${err.message}`);
        return res.serverError();
    }
});
