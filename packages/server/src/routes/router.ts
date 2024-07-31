import express, { Router } from "express";
import path from "node:path";
import cors from "cors";
import { extendExpress } from "$middlewares/extend-express.js";
import { authenticated } from "$middlewares/authenticated.js";
import { authenticationRouter } from "./authentication/index.js";
import { memoRouter } from "./memo/index.js";
import { meRouter } from "./me/index.js";

/** The top-level router instance. */
export const router = Router();

router.use(express.static(path.resolve('./public')));
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
router.use(extendExpress);

router.use("/api/v1/authentication", authenticationRouter.v1);
router.use("/api/v1/memos", authenticated, memoRouter.v1);
router.use("/api/v1/me", authenticated, meRouter.v1);
