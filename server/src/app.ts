import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import path from "path";

dotenv.config();

import { router as taskRoutes } from "./routes/tasks/index.routes.ts";
import { router as meRoutes } from "./routes/me.routes.ts";
import { router as memoRoutes } from "./routes/memo.routes.ts";
import { router as authRoutes } from "./routes/auth.routes.ts";
import { authenticated } from './middlewares/authenticated';

const app = express();

app.use(express.static(path.resolve('./public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL
}));

app.use("/auth", authRoutes);

app.use(authenticated);

app.use("/me", meRoutes);
app.use("/memos", memoRoutes);
app.use("/tasks", taskRoutes);

if (!process.env.APP_PORT) {
    throw new Error("Set a backend port.")
}

app.listen(process.env.APP_PORT, () => {
    console.log(`[Server] Running on port ${process.env.APP_PORT}`);
});
