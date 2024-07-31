import { Router } from "express";
import { authenticationRouter } from "./authentication/index.js";
import { memoRouter } from "./memo/index.js";

/** The top-level router instance. */
export const router = Router();

router.use("/api/v1/authentication", authenticationRouter.v1);
router.use("/api/v1/memos", memoRouter.v1);
