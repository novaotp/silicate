import 'dotenv/config';
import express from "express";
import cors from "cors";
import path from "path";

import { router as taskRoutes } from "./routes/tasks/index.routes.ts";
import { router as meRoutes } from "./routes/me.routes.ts";
import { router as memoRoutes } from "./routes/memo.routes.ts";
import { router as authRoutes } from "./routes/auth.routes.ts";
import { authenticated } from './middlewares/authenticated';
import { serverErrorMiddleware } from './middlewares/express-module-augmentations.ts';

const app = express();

app.use(express.static(path.resolve('./public')));
app.use(serverErrorMiddleware)
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

if (!process.env.SERVER_PORT) {
    throw new Error("Set a backend port.")
}

app.listen(process.env.SERVER_PORT, () => {
    console.log(`[Server] Running on port ${process.env.SERVER_PORT}`);
});

process.on('uncaughtException', function (exception) {
    console.log("Exception : ", exception);
});
