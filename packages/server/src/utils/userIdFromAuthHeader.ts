import { verify } from "./jwt.js";
import type { Request } from "express";

/**
 * @deprecated Use `req.userId` instead, added using module augmentation.
 */
export const userIdFromAuthHeader = async (req: Request) => {
    return (await verify(req.jwt!)).payload.userId;
}
