import { Request, Router } from "express";
import { db } from "../../database";
import { RawCategory, RawTask, Task, Attachment } from '../../../../libs/models/Task';
import { userIdFromAuthHeader } from "../../utils/userIdFromAuthHeader";
import { upload } from '../../middlewares/fileUploads';
import { router as attachmentRoutes } from "./attachment.routes";
import { getAttachments } from './utils';
import { type BuildPatchObject, buildPatchStatements, buildPatchValues } from '../../utils/dynamic-query-builder/dynamicQueryBuilder';

export const router = Router();

router.get('/:id(\\d+$)', async (req, res) => {
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
                steps: task.steps,
                attachments: task.attachments,
                archived: task.archived
            } satisfies Task
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
        const { category, search, archived } = req.query;
        const client = await db.connect();

        const { rows } = await client.query<RawTask>(`
            SELECT *
            FROM public.task
            WHERE
                user_id = $1
                ${category && category !== "" ? `AND category = '${category}'` : ""}
                ${search && search !== "" ? `AND title ILIKE '%${search}%'` : ""}
                ${archived && archived ? `AND archived is ${archived}` : ""}
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
                    steps: row.steps,
                    attachments: row.attachments,
                    archived: row.archived
                } satisfies Task
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

router.post('/', upload.array("attachments"), async (req, res) => {
    try {
        const { category, title, description, due, steps, archived } = req.body;
        const client = await db.connect();

        const attachments = getAttachments(req);

        const { rows } = await client.query(`
            INSERT INTO public.task (user_id, category, title, description, due, steps, attachments, archived)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id;
        `, [await userIdFromAuthHeader(req), category, title, description, due, steps ? JSON.stringify(steps) : null, attachments ? JSON.stringify(attachments) : null, archived]);

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

router.put('/:id', upload.array("attachments"), async (req, res) => {
    try {
        const { category, title, description, due, steps, archived } = req.body;
        const client = await db.connect();

        const attachments = getAttachments(req);

        await client.query(`
            UPDATE public.task
            SET category = $1,
                title = $2,
                description = $3,
                due = $4,
                steps = $5,
                attachments = $6,
                archived = $7
                updated_at = $8
            WHERE
                id = $9
                AND
                user_id = $10;
        `, [category, title, description, due, steps ? JSON.stringify(steps) : null, attachments ? JSON.stringify(attachments) : null, archived, new Date(), req.params.id, await userIdFromAuthHeader(req)]);

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

router.patch('/:id', upload.array("attachments"), async (req, res) => {
    const buildPatchObjects = (req: Request, attachments: Attachment[] | null): BuildPatchObject[] => {
        const { category, title, description, due, steps, archived } = req.body;

        const patchObjects: BuildPatchObject[] = [
            { column: "category", value: category },
            { column: "title", value: title },
            { column: "description", value: description },
            { column: "due", value: due },
            { column: "steps", value: steps },
            { column: "archived", value: archived },
            { column: "attachments", value: attachments },
            { column: "updated_at", value: new Date() }
        ];

        return patchObjects;
    }

    try {
        const attachments = getAttachments(req);
        const patchObjects = buildPatchObjects(req, attachments);
        const client = await db.connect();

        // eslint-disable-next-line prefer-const
        let { statements, id } = buildPatchStatements(patchObjects);
        const values = buildPatchValues(patchObjects);

        await client.query(`
            UPDATE public.task
            SET ${statements}
            WHERE
                id = $${id++}
                AND
                user_id = $${id++};
        `, [...values, req.params.id, await userIdFromAuthHeader(req)]);

        client.release();

        return res.status(200).send({
            success: true,
            message: "Task patched successfully"
        });
    } catch (err) {
        console.error(`Something went wrong whilst patching a task : ${err.message}`);
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
        const { archived } = req.query;
        const client = await db.connect();

        const { rows } = await client.query<RawCategory>(`
            SELECT DISTINCT category
            FROM public.task
            WHERE
                archived is ${archived}
                AND
                user_id = $1;
        `, [await userIdFromAuthHeader(req)]);

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

router.use("/", attachmentRoutes);
