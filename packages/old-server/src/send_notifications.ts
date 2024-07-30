import { query } from './database/utils.js';
import type { Reminder, TaskNotification } from '$common/models/task.js';

type ReminderWithUserId = Reminder & { userId: number; taskTitle: string };

// Get reminders that should receive notifications now
// aka when the diff is less than 60s.
export const getTaskReminders = async (): Promise<ReminderWithUserId[]> => {
    const { rows: reminders } = await query<ReminderWithUserId>(`
        SELECT 
            task_reminder.id, 
            task.user_id AS "userId", 
            task.title AS "taskTitle", 
            task_reminder.task_id AS "taskId", 
            task_reminder.time
        FROM public.task_reminder
        INNER JOIN public.task ON task.id = task_reminder.task_id
        LEFT JOIN public.task_notification ON task_notification.task_reminder_id = task_reminder.id
        WHERE task_notification.task_reminder_id IS NULL AND
              ABS(EXTRACT(EPOCH FROM (NOW() - task_reminder.time))) < 60;
    `);

    return reminders;
};

export const createTaskNotification = async (reminder: ReminderWithUserId): Promise<TaskNotification | null> => {
    const { first: notification } = await query<TaskNotification>(`
        WITH new_notification AS (
            INSERT INTO public.task_notification (task_reminder_id, message)
            VALUES ($1, $2)
            RETURNING *
        )
        SELECT
            new_notification.id,
            task.user_id as "userId",
            new_notification.task_reminder_id as "taskReminderId",
            new_notification.message,
            new_notification.is_read as "isRead",
            new_notification.created_at as "createdAt"
        FROM new_notification
        INNER JOIN public.task_reminder ON task_reminder.id = new_notification.task_reminder_id
        INNER JOIN public.task ON task.id = task_reminder.task_id;
    `, [reminder.id, `Rappel : ${reminder.taskTitle} à venir bientôt`]);

    if (!notification) {
        console.warn("Something went wrong whilst creating a new task notification.");
    }

    return notification;
};

export const groupNotificationsByUserId = (notifications: TaskNotification[]): Record<string, TaskNotification[]> => {
    return notifications.reduce((acc, notification) => {
        const { userId } = notification;
        const userIdAsString = userId.toString();

        if (!acc[userIdAsString]) {
            acc[userIdAsString] = [];
        }

        acc[userIdAsString].push(notification);
        return acc;
    }, {} as Record<string, TaskNotification[]>);
};
