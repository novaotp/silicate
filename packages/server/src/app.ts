import 'dotenv/config';
import express from "express";
import cors from "cors";
import path from "path";

import { router as taskRoutes } from "./routes/tasks/index.routes.ts";
import { router as meRoutes } from "./routes/me.routes.ts";
import { router as memoRoutes } from "./routes/memo.routes.ts";
import { router as authRoutes } from "./routes/auth.routes.ts";
import { authenticated } from './middlewares/authenticated';
import { expressModuleAugmentations } from './middlewares/express-module-augmentations.ts';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { authenticate } from './utils/jwt.ts';
import { createTaskNotification, getTaskReminders, groupNotificationsByUserId } from './send_notifications.ts';
import { TaskNotification } from '../../libs/models/Task.ts';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.use(express.static(path.resolve('./public')));
app.use(expressModuleAugmentations)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.use("/api/v1/auth", authRoutes);
app.use(authenticated);
app.use("/api/v1/me", meRoutes);
app.use("/api/v1/memos", memoRoutes);
app.use("/api/v1/tasks", taskRoutes);

io.on('connection', async (socket) => {
    const jwt = socket.handshake.query.jwt as string;
    const userId = await authenticate(jwt);

    if (!userId) {
        return socket.disconnect();
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
});

if (!process.env.SERVER_PORT) {
    throw new Error("Set a backend port.")
}

server.listen(process.env.SERVER_PORT, () => {
    console.log(`[Server] Running on port ${process.env.SERVER_PORT}`);
});
