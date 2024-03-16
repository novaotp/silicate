import { Router } from "express";
import { db } from "../database";
import { Category, Priority, RawTask, Status, Task } from "../../libs/models/Task";

export const router = Router();

router.get('/:id(d+)', async (req, res) => {
    try {
        const client = await db.connect();

        console.log(`Id : ${req.params.id}`)

        const { rows } = await client.query<RawTask>(`
            SELECT
                task.id,
                task.user_id,
                priority.name as "priority",
                status.name as "status",
                task.category,
                task.title,
                task.description,
                task.due,
                task.created_at,
                task.updated_at
            FROM public.task
            LEFT JOIN public.priority ON task.priority_id = priority.id
            LEFT JOIN public.status ON task.status_id = status.id
            WHERE task.id = $1
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
    const handleQuery = (search: unknown | undefined, category: unknown | undefined, status: unknown | undefined, priority: unknown | undefined) => {
        const query: string[] = [];
        let paramId = 1;

        const useParamId = () => {
            const temp = paramId;
            paramId++;
            return temp;
        }

        if (search !== "") {
            query.push(`task.title ILIKE %$${useParamId()}%`);
        }

        if (category !== "All") {
            query.push(`task.category = $${useParamId()}`);
        }

        if (status !== "All") {
            query.push(`status.name = $${useParamId()}`);
        }

        if (priority !== "All") {
            query.push(`priority.name = $${useParamId()}`);
        }

        return query.length > 0 ? `WHERE ${query.join(" AND ")}` : "";
    }

    const handleBinding = (search: unknown | undefined, category: unknown | undefined, status: unknown | undefined, priority: unknown | undefined) => {
        const binding: string[] = [];

        if (search !== "") {
            binding.push(search as string);
        }

        if (category !== "All") {
            binding.push(category as string);
        }

        if (status !== "All") {
            binding.push(status as string);
        }

        if (priority !== "All") {
            binding.push(priority as string);
        }

        return binding;
    }

    try {
        const { search, category, status, priority } = req.query;
        const client = await db.connect();

        const { rows } = await client.query<RawTask>(`
            SELECT
                task.id,
                task.user_id,
                priority.name as "priority",
                status.name as "status",
                task.category,
                task.title,
                task.description,
                task.due,
                task.created_at,
                task.updated_at
            FROM public.task
            LEFT JOIN public.priority ON task.priority_id = priority.id
            LEFT JOIN public.status ON task.status_id = status.id
            ${handleQuery(search, category, status, priority)}
            `, handleBinding(search, category, status, priority)
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

router.get("/statuses", async (req, res) => {
    try {
        const client = await db.connect();

        const { rows } = await client.query<Status>('SELECT name as "value" FROM public.status;');

        client.release();

        return res.send({
            success: true,
            message: "Statuses read successfully",
            data: rows
        });
    } catch (err) {
        console.error(`Something went wrong whilst fetching the statuses : ${err.message}`);
        return res.send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.get("/priorities", async (req, res) => {
    try {
        const client = await db.connect();

        const { rows } = await client.query<Priority>('SELECT name as "value" FROM public.priority;');

        client.release();

        return res.send({
            success: true,
            message: "Priorities read successfully",
            data: rows
        });
    } catch (err) {
        console.error(`Something went wrong whilst fetching the priorities : ${err.message}`);
        return res.send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.get("/categories", async (req, res) => {
    try {
        const client = await db.connect();

        const { rows } = await client.query<Category>('SELECT category as "value" FROM public.task;');

        client.release();

        return res.send({
            success: true,
            message: "Categories read successfully",
            data: rows.filter(category => category.value !== null)
        });
    } catch (err) {
        console.error(`Something went wrong whilst fetching the categories : ${err.message}`);
        return res.send({
            success: false,
            message: "Internal Server Error"
        });
    }
});
