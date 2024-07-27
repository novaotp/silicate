import { Router, type Request } from "express";
import { taskUpload } from '../../middlewares/file-uploads.js';
import { getAttachments } from './utils.js';
import { query } from "../../database/utils.js";
import { stringifyOrNull } from "../../utils/stringifyOrNull.js";
import { type BuildPatchObject, buildPatchStatements, buildPatchValues } from '../../utils/dynamic-query-builder/index.js';
import type { Task } from '$common/models/task.js';

import { router as notificationsRouter } from "./notifications.js";
import { router as remindersRouter } from "./reminders.js";
import { router as attachmentsRouter } from "./attachments.js";

export const router = Router();

router.use('/notifications', notificationsRouter);
router.use('/:taskId(\\d+)/reminders', remindersRouter);
router.use('/:id(\\d+)/attachment', attachmentsRouter);

router.get('/:id(\\d+$)', async (req, res) => {
    try {
        const { first: task } = await query<Task>(`
            SELECT
                id,
                title,
                description,
                category,
                due,
                steps,
                attachments,
                archived
            FROM public.task
            WHERE id = $1 AND user_id = $2
            LIMIT 1;
        `, [req.params.id, req.userId]);

        if (!task) {
            return res.notFoundError("Task not found");
        }

        return res.success("Task read successfully", task);
    } catch (err) {
        console.error(`Something went wrong whilst fetching a task : ${err.message}`);
        return res.serverError;
    }
});

router.get('/', async (req, res) => {
    try {
        const { category, search, archived } = req.query;

        const { rows: tasks } = await query<Task>(`
            SELECT
                id,
                title,
                description,
                category,
                due,
                steps,
                attachments,
                archived
            FROM public.task
            WHERE
                user_id = $1
                ${category && category !== "" ? `AND category = '${category}'` : ""}
                ${search && search !== "" ? `AND title ILIKE '%${search}%'` : ""}
                ${archived && archived ? `AND archived is ${archived}` : ""}
            ORDER BY task.due ASC, task.updated_at DESC;
        `, [req.userId]);

        return res.success("Tasks read successfully", tasks);
    } catch (err) {
        console.error(`Something went wrong whilst fetching the tasks : ${err.message}`);
        return res.serverError();
    }
});

router.post('/', taskUpload.array("attachments"), async (req, res) => {
    try {
        const { category, title, description, due, steps, archived } = req.body;
        const attachments = getAttachments(req);

        const { first } = await query<{ id: number }>(`
            INSERT INTO public.task (user_id, category, title, description, due, steps, attachments, archived)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id;
        `, [req.userId, category, title, description, due, steps ? JSON.stringify(steps) : null, attachments ? JSON.stringify(attachments) : null, archived]);

        if (!first) {
            return res.notFoundError("Unable to find the created task");
        }

        return res.status(201).send({
            success: true,
            message: "Task created successfully",
            data: first.id
        });
    } catch (err) {
        console.error(`Something went wrong whilst creating a task : ${err.message}`);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.put('/:id', taskUpload.array("attachments"), async (req, res) => {
    try {
        const { category, title, description, due, steps, archived } = req.body;
        const attachments = getAttachments(req);

        await query(`
            UPDATE public.task
            SET category = $1,
                title = $2,
                description = $3,
                due = $4,
                steps = $5,
                attachments = $6,
                archived = $7
                updated_at = $8
            WHERE id = $9 AND user_id = $10;
        `, [category, title, description, due, steps ? JSON.stringify(steps) : null, attachments ? JSON.stringify(attachments) : null, archived, new Date(), req.params.id, req.userId]);

        return res.success("Task updated successfully");
    } catch (err) {
        console.error(`Something went wrong whilst updating a task : ${err.message}`);
        return res.serverError();
    }
});

router.patch('/:id', async (req, res) => {
    const buildPatchObjects = (req: Request): BuildPatchObject[] => {
        const { category, title, description, due, steps, archived } = req.body;

        const patchObjects: BuildPatchObject[] = [
            { column: "category", value: category },
            { column: "title", value: title },
            { column: "description", value: description },
            { column: "due", value: due },
            { column: "steps", value: stringifyOrNull(steps) },
            { column: "archived", value: archived },
            { column: "updated_at", value: new Date() }
        ];

        return patchObjects;
    }

    try {
        const patchObjects = buildPatchObjects(req);

        // eslint-disable-next-line prefer-const
        let { statements, id } = buildPatchStatements(patchObjects);
        const values = buildPatchValues(patchObjects);

        await query(`
            UPDATE public.task
            SET ${statements}
            WHERE id = $${id++} AND user_id = $${id++};
        `, [...values, req.params.id, req.userId]);

        return res.success("Task patched successfully");
    } catch (err) {
        console.error(`Something went wrong whilst patching a task : ${err.message}`);
        return res.serverError();
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await query(`
            DELETE FROM public.task
            WHERE id = $1 AND user_id = $2;
        `, [req.params.id, req.userId]);

        return res.success("Task deleted successfully");
    } catch (err) {
        console.error(`Something went wrong whilst deleting a task : ${err.message}`);
        return res.serverError();
    }
});

router.get("/categories", async (req, res) => {
    try {
        const { search, archived } = req.query;

        const { rows } = await query<{ category: string }>(`
            SELECT DISTINCT category
            FROM public.task
            WHERE title LIKE '%' || $1 || '%'¨
                AND archived = $2
                AND user_id = $3
                AND category IS NOT NULL;
        `, [search, archived === "true", req.userId]);

        return res.success("Categories read successfully", rows.map(row => row.category));
    } catch (err) {
        console.error(`Something went wrong whilst fetching the categories : ${err.message}`);
        return res.serverError();
    }
});
