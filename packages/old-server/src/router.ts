import { Router } from "express";
import express from "express";
import cors from "cors";
import path from "path";

import { router as taskRoutes } from "./routes/tasks/index.js";
import { router as meRoutes } from "./routes/me/index.js";
import { router as memoRoutes } from "./routes/memo.routes.js";
import { router as authRoutes } from "./routes/auth.routes.js";
import { router as markRoutes } from './routes/marks/index.js';

import { expressModuleAugmentations } from "./middlewares/express-module-augmentations.js";
import { authenticated } from "./middlewares/authenticated.js";

/** The main router instance. */
export const router = Router();

router.use(express.static(path.resolve('./public')));
router.use(expressModuleAugmentations)
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(cors({
    origin: process.env.FRONTEND_URL
}));

router.use("/api/v1/auth", authRoutes);
router.use(authenticated);
router.use("/api/v1/me", meRoutes);
router.use("/api/v1/memos", memoRoutes);
router.use("/api/v1/tasks", taskRoutes);
router.use("/api/v1/mark-books", markRoutes);
