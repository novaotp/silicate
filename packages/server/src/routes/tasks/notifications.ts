import { Router } from "express";
import { query } from "../../database/utils.js";
import type { TaskNotification } from "$common/models/task.js";

export const router = Router();

router.get("/notifications", async (req, res) => {
    try {
        const { rows: notifications } = await query<TaskNotification>(`
            SELECT
                task_notification.id,
                task.user_id as "userId",
                task_notification.task_reminder_id as "taskReminderId",
                task_notification.message,
                task_notification.is_read as "isRead",
                task_notification.created_at as "createdAt"
            FROM public.task_notification
            INNER JOIN public.task_reminder ON task_reminder.id = task_notification.task_reminder_id
            INNER JOIN public.task ON task.id = task_reminder.task_id
            WHERE task.user_id = $1
            ORDER BY task_notification.created_at DESC;
        `, [req.userId]);

        return res.success("Notifications retrieved successfully", notifications);
    } catch (err) {
        console.error(err);
        return res.serverError();
    }
});

// Sets all given notifications as read
router.put("/notifications", async (req, res) => {
    try {
        const notificationIds = req.body.notificationIds;

        await query(`
            UPDATE public.task_notification
            SET is_read = true
            WHERE id = ANY($1);
        `, [notificationIds]);

        return res.success("Notifications set as read successfully");
    } catch (err) {
        console.error(err);
        return res.serverError();
    }
});
