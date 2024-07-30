import { Router } from "express";
import { v1 } from "./v1.js";

/** The router instance for all authentication-related routes. */
export const authenticationRouter = Router();

authenticationRouter.use("/api/v1/authentication", v1);
