import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import path from "path";

dotenv.config();

import { router as taskRoutes } from "./routes/task.routes.ts";
import { router as meRoutes } from "./routes/me.routes.ts";
import { router as memoRoutes } from "./routes/memo.routes.ts";
import { router as authRoutes } from "./routes/auth.routes.ts";

const app = express();

app.use(express.static(path.resolve('./public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.use("/auth", authRoutes);
app.use("/me", meRoutes);
app.use("/memos", memoRoutes);
app.use("/tasks", taskRoutes);

if (!process.env.BACKEND_PORT) {
    throw new Error("Set a backend port.")
}

app.listen(process.env.BACKEND_PORT, () => {
    console.log(`[Server] Running on port ${process.env.BACKEND_PORT}`);
});
