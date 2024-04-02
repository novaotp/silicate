import { Router } from "express";
import { db } from "../database";
import { RawCategory, RawTask, Task } from "../../../libs/models/Task";
import { authenticated } from "../middlewares/authenticated";
import { userIdFromAuthHeader } from "../utils/userIdFromAuthHeader";

export const router = Router();

router.use(authenticated);

router.get('/:id(d+)', async (req, res) => {
    try {
        const client = await db.connect();

        const { rows } = await client.query<RawTask>(`
            SELECT *
            FROM public.task
            WHERE
                id = $1
                AND
                user_id = $2
            LIMIT 1;`, [req.params.id, await userIdFromAuthHeader(req)]
        );

        client.release();

        const task = rows[0];

        if (!task) {
            return res.status(404).send({
                success: false,
                message: "Task not found"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Task read successfully",
            data: {
                id: task.id,
                title: task.title,
                description: task.description,
                category: task.category,
                due: task.due,
                steps: task.steps
            } as Task
        });
    } catch (err) {
        console.error(`Something went wrong whilst fetching a task : ${err.message}`);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const { category, search }= req.query;
        const client = await db.connect();
        
        const { rows } = await client.query<RawTask>(`
            SELECT *
            FROM public.task
            WHERE
                user_id = $1
                ${category && category !== "" ? `AND category = '${category}'` : ""}
                ${search && search !== "" ? `AND title ILIKE '%${search}%'` : ""}
            ORDER BY task.due ASC, task.updated_at DESC;
        `, [await userIdFromAuthHeader(req)]);

        client.release();

        return res.status(200).send({
            success: true,
            message: "Tasks read successfully",
            data: rows.map(row => {
                return {
                    id: row.id,
                    title: row.title,
                    description: row.description,
                    category: row.category,
                    due: row.due,
                    steps: row.steps
                } as Task
            })
        });
    } catch (err) {
        console.error(`Something went wrong whilst fetching the tasks : ${err.message}`);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const { category, title, description, due, steps } = req.body;
        const client = await db.connect();

        const { rows } = await client.query(`
            INSERT INTO public.task (user_id, category, title, description, due, steps)
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6
            )
            RETURNING id;
        `, [await userIdFromAuthHeader(req), category, title, description, due, steps]);

        client.release();

        const id = rows[0].id;

        return res.status(201).send({
            success: true,
            message: "Task created successfully",
            data: id
        });
    } catch (err) {
        console.error(`Something went wrong whilst creating a task : ${err.message}`);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { category, title, description, due, steps } = req.body;
        const client = await db.connect();

        await client.query(`
            UPDATE public.task
            SET category = $1,
                title = $2,
                description = $3,
                due = $4,
                steps = $5,
                updated_at = $6
            WHERE
                id = $7
                AND
                user_id = $8;
        `, [category, title, description, due, steps, new Date(), req.params.id, await userIdFromAuthHeader(req)]);

        client.release();

        return res.status(200).send({
            success: true,
            message: "Task updated successfully"
        });
    } catch (err) {
        console.error(`Something went wrong whilst updating a task : ${err.message}`);
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
            DELETE FROM public.task
            WHERE
                id = $1
                AND
                user_id = $2;
        `, [req.params.id, await userIdFromAuthHeader(req)]);

        client.release();

        return res.status(200).send({
            success: true,
            message: "Task deleted successfully"
        });
    } catch (err) {
        console.error(`Something went wrong whilst deleting a task : ${err.message}`);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.get("/categories", async (req, res) => {
    try {
        const client = await db.connect();

        const { rows } = await client.query<RawCategory>('SELECT DISTINCT category FROM public.task;');

        client.release();

        return res.status(200).send({
            success: true,
            message: "Categories read successfully",
            data: rows.filter(row => row.category !== null).map(row => row.category) as string[]
        });
    } catch (err) {
        console.error(`Something went wrong whilst fetching the categories : ${err.message}`);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
});
