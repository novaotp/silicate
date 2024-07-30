import { Router } from "express";
import { authenticationRouter } from "./authentication/index.js";

/** The top-level router instance. */
export const router = Router();

router.use("/api", authenticationRouter)
