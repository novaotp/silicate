import { Request } from "express";
import { Attachment } from "../../../../libs/models/Task";

/**
 * Returns an array of {@link Attachment} objects, matching the files sent in the `multipart/form-data` request.
 * @param req The request object
 * @returns An array of {@link Attachment} or `null`
 */
export const getAttachments = (req: Request) => {
    let attachments: Attachment[] | null = null;
    if (req.files && (req.files.length as number) > 0) {
        attachments = [];

        for (const file of (req.files as Express.Multer.File[])) {
            attachments.push({ relativePathOnServer: file.path, name: file.originalname });
        }
    }

    return attachments;
}
