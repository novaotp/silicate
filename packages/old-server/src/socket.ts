import { getTaskReminders, createTaskNotification, groupNotificationsByUserId } from "./send_notifications.js";
import { authenticate } from "./utils/jwt.js";
import type { Socket } from "socket.io";
import type { TaskNotification } from "$common/models/task.js";

export const onSocketConnection = async (socket: Socket) => {
    const jwt = socket.handshake.query.jwt as string;
    const userId = await authenticate(jwt);

    if (!userId) {
        socket.disconnect();
        return;
    }
    
    const userRoom = userId.toString();
    socket.join(userRoom)

    const CHECK_TASK_DUE_MS = 60000;
    const interval = setInterval(async () => {
        const reminders = await getTaskReminders();
        const taskNotifications: TaskNotification[] = [];

        for (const reminder of reminders) {
            const notification = await createTaskNotification(reminder);

            if (notification) {
                taskNotifications.push(notification);
            }
        }

        for (const [userId, notifications] of Object.entries(groupNotificationsByUserId(taskNotifications))) {
            socket.to(userId).emit("new_notifications", notifications)
        }
    }, CHECK_TASK_DUE_MS);

    socket.on('disconnect', () => {
        clearInterval(interval);
        socket.leave(userRoom);
    });
}
