import { Router } from "express";
import { db } from "../database";
import { RawTask, Task } from "../../libs/models/Task";

export const router = Router();

router.get('/:id', async (req, res) => {
    try {
        const client = await db.connect();

        const { rows } = await client.query<RawTask>(`
            SELECT
                public.task.id,
                public.task.user_id,
                public.priority.name as "priority",
                public.status.name as "status",
                public.task.category,
                public.task.title,
                public.task.description,
                public.task.due,
                public.task.created_at,
                public.task.updated_at
            FROM public.task
            JOIN public.priority ON public.task.priority_id = public.priority.id
            JOIN public.status ON public.task.status_id = public.status.id
            WHERE public.task.id = $1
            LIMIT 1;`, [req.params.id]
        );

        client.release();

        const task = rows[0];

        if (!task) {
            return res.send({
                success: false,
                message: "Task not found"
            });
        }

        return res.send({
            success: true,
            message: "Task read successfully",
            data: {
                id: task.id,
                priority: task.priority,
                status: task.status,
                title: task.title,
                description: task.description,
                category: task.category,
                due: task.due
            } as Task
        });
    } catch (err) {
        console.error(`Something went wrong whilst fetching a task : ${err.message}`);
        return res.send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const client = await db.connect();

        const { rows } = await client.query<RawTask>(`
            SELECT
                public.task.id,
                public.task.user_id,
                public.priority.name as "priority",
                public.status.name as "status",
                public.task.category,
                public.task.title,
                public.task.description,
                public.task.due,
                public.task.created_at,
                public.task.updated_at
            FROM public.task
            JOIN public.priority ON public.task.priority_id = public.priority.id
            JOIN public.status ON public.task.status_id = public.status.id`
        );

        client.release();

        return res.send({
            success: true,
            message: "Tasks read successfully",
            data: rows.map(row => {
                return {
                    id: row.id,
                    priority: row.priority,
                    status: row.status,
                    title: row.title,
                    description: row.description,
                    category: row.category,
                    due: row.due
                } as Task
            })
        });
    } catch (err) {
        console.error(`Something went wrong whilst fetching the tasks : ${err.message}`);
        return res.send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const { userId, priority, status, category, title, description, due } = req.body;
        const client = await db.connect();

        const { rows } = await client.query(`
            INSERT INTO public.task (user_id, priority_id, status_id, category, title, description, due)
            VALUES (
                $1,
                (SELECT id from public.priority WHERE name = $2),
                (SELECT id from public.status WHERE name = $3),
                $4,
                $5,
                $6,
                $7
            )
            RETURNING id;
        `, [userId, priority, status, category, title, description, due]);

        client.release();

        const id = rows[0].id;

        return res.send({
            success: true,
            message: "Task created successfully",
            data: id
        });
    } catch (err) {
        console.error(`Something went wrong whilst creating a task : ${err.message}`);
        return res.send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { priority, status, category, title, description, due } = req.body;
        const client = await db.connect();

        await client.query(`
            UPDATE public.memo
            SET priority = (SELECT id from public.priority WHERE name = $1),
                status = (SELECT id from public.priority WHERE name = $2),
                category = $3,
                title = $4,
                description = $5,
                due = $6,
                updated_at = $7
            WHERE id = $8;
        `, [priority, status, category, title, description, due, new Date(), req.params.id]);

        client.release();

        return res.send({
            success: true,
            message: "Task updated successfully"
        });
    } catch (err) {
        console.error(`Something went wrong whilst updating a task : ${err.message}`);
        return res.send({
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
            WHERE id = $1;
        `, [req.params.id]);

        client.release();

        return res.send({
            success: true,
            message: "Task deleted successfully"
        });
    } catch (err) {
        console.error(`Something went wrong whilst deleting a task : ${err.message}`);
        return res.send({
            success: false,
            message: "Internal Server Error"
        });
    }
});
