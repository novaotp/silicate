import { Router } from "express";
import { ApiResponseWithData } from "../../../../libs/types/ApiResponse";
import { Attachment, Task } from "../../../../libs/models/Task";
import { upload } from "../../middlewares/fileUploads";
import { db } from "../../database";
import { userIdFromAuthHeader } from "../../utils/userIdFromAuthHeader";
import mime from "mime";
import { getAttachments } from "./utils";

export const router = Router();

router.get('/:id/attachment', async (req, res) => {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/tasks/${req.params.id}`, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "authorization": req.headers.authorization!
            }
        });
        const result: ApiResponseWithData<Task> = await response.json();
    
        if (!result.success) {
            return res.status(response.status).send(result);
        }

        const task = result.data;
        const name = req.query.name as string;

        if (!task.attachments) {
            return res.status(404).send({ success: false, message: "No attachment found" })
        }

        const attachments: Attachment[] = JSON.parse(task.attachments);
        const attachment = attachments.find(a => a.name === name);

        if (!attachment) {
            return res.status(404).send({ success: false, message: "No attachment found" })
        }

        res.setHeader("Content-Type", mime.lookup(attachment.relativePathOnServer));

        return res.status(200).sendFile(attachment.relativePathOnServer, { root: "." });
    } catch (err) {
        console.error(`Something went wrong whilst fetching an attachment : ${err.message}`);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.post("/:id/attachment", upload.array("attachments"), async (req, res) => {
    try {
        const newAttachments = getAttachments(req);

        if (!newAttachments) {
            return res.status(418).send({ success: false, message: "Adding attachments without sending them..." })
        }

        const response = await fetch(`${process.env.BACKEND_URL}/tasks/${req.params.id}`, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "authorization": req.headers.authorization!
            }
        });
        const result: ApiResponseWithData<Task> = await response.json();
    
        if (!result.success) {
            return res.status(response.status).send(result);
        }

        const task = result.data;
        const client = await db.connect();

        const attachments = task.attachments ? JSON.parse(task.attachments) as Attachment[] : [];
        const mergedAttachments = [...attachments, ...newAttachments];

        await client.query(`
            UPDATE public.task
            SET
                attachments = $1,
                updated_at = $2
            WHERE
                id = $3
                AND
                user_id = $4;
        `, [JSON.stringify(mergedAttachments), new Date(), req.params.id, await userIdFromAuthHeader(req)]);

        client.release();

        return res.status(200).send({
            success: true,
            message: "Added attachments successfully",
            data: newAttachments
        })
    } catch (err) {
        console.error(`Something went wrong whilst adding an attachment : ${err.message}`);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

router.delete("/:id/attachment", async (req, res) => {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/tasks/${req.params.id}`, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "authorization": req.headers.authorization!
            }
        });
        const result: ApiResponseWithData<Task> = await response.json();
    
        if (!result.success) {
            return res.status(response.status).send(result);
        }

        const task = result.data;

        if (!task.attachments) {
            return res.status(418).send({ success: false, message: "How do you delete attachments when there are none ?" })
        }

        const name = req.query.name;
        const client = await db.connect();

        const attachments = JSON.parse(task.attachments) as Attachment[];
        const filteredAttachments = attachments.filter(a => a.name !== name);

        await client.query(`
            UPDATE public.task
            SET
                attachments = $1,
                updated_at = $2
            WHERE
                id = $3
                AND
                user_id = $4;
        `, [filteredAttachments.length > 0 ? JSON.stringify(filteredAttachments) : null, new Date(), req.params.id, await userIdFromAuthHeader(req)]);

        client.release();

        return res.status(200).send({ success: true, message: "Removed attachment successfully" })
    } catch (err) {
        console.error(`Something went wrong whilst adding an attachment : ${err.message}`);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});
