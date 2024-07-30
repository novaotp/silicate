import { Router } from "express";
import { v1 } from "./v1.js";

/** The router instance for all authentication-related routes. */
export const memoRouter = Router();

memoRouter.use("/v1/memos", v1);
