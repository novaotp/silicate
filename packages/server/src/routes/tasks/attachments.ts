import { Router } from "express";
import mime from "mime";
import { taskUpload } from "../../middlewares/file-uploads.js";
import { getAttachments } from "./utils.js";
import { query } from "../../database/utils.js";
import type { Task, Attachment } from "$common/models/task.js";

export const router = Router();

router.get<'/', { id: string }, unknown, unknown, qs.ParsedQs, Record<string, unknown>>('/', async (req, res) => {
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
        
        const name = req.query.name as string;

        if (!task.attachments) {
            return res.status(404).send({ success: false, message: "No attachments exist for the given task id." })
        }

        const attachments: Attachment[] = JSON.parse(task.attachments);
        const attachment = attachments.find(a => a.name === name);

        if (!attachment) {
            return res.status(404).send({ success: false, message: "No attachment found with the given name." })
        }

        res.setHeader("Content-Type", mime.lookup(attachment.relativePathOnServer));

        return res.status(200).sendFile(attachment.relativePathOnServer, { root: "." });
    } catch (err) {
        console.error(`Something went wrong whilst fetching an attachment : ${err.message}`);
        return res.serverError();
    }
});

router.post<'/', { id: string }, unknown, unknown, qs.ParsedQs, Record<string, unknown>>("/", taskUpload.array("attachments"), async (req, res) => {
    try {
        const newAttachments = getAttachments(req);

        if (!newAttachments) {
            return res.status(418).send({ success: false, message: "No attachments were sent..." })
        }

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

        const attachments = task.attachments ? JSON.parse(task.attachments) as Attachment[] : [];
        const mergedAttachments = [...attachments, ...newAttachments];

        await query(`
            UPDATE public.task
            SET attachments = $1, updated_at = $2
            WHERE id = $3 AND user_id = $4;
        `, [JSON.stringify(mergedAttachments), new Date(), req.params.id, req.userId]);

        return res.success("Added attachments successfully", newAttachments);
    } catch (err) {
        console.error(`Something went wrong whilst adding an attachment : ${err.message}`);
        return res.serverError();
    }
});

router.delete<'/', { id: string }, unknown, unknown, qs.ParsedQs, Record<string, unknown>>("/", async (req, res) => {
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

        if (!task.attachments) {
            return res.status(418).send({ success: false, message: "Cannot delete an attachment on a task that has no attachments..." })
        }

        const name = req.query.name;

        const attachments = JSON.parse(task.attachments) as Attachment[];

        // Avoid querying the database when it doesn't change anything.
        if (attachments.find(a => a.name === name) === undefined) {
            return res.notFoundError("No attachment with the given name was found.");
        }

        const filteredAttachments = attachments.filter(a => a.name !== name);

        await query(`
            UPDATE public.task
            SET
                attachments = $1,
                updated_at = $2
            WHERE id = $3 AND user_id = $4;
        `, [filteredAttachments.length > 0 ? JSON.stringify(filteredAttachments) : null, new Date(), req.params.id, req.userId]);

        return res.success("Removed attachment successfully");
    } catch (err) {
        console.error(`Something went wrong whilst adding an attachment : ${err.message}`);
        return res.serverError();
    }
});
