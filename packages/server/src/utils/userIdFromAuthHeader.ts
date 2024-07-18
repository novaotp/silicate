import { Request } from "express";
import { verify } from "./jwt";

/**
 * @deprecated Use `req.userId` instead, added using module augmentation.
 */
export const userIdFromAuthHeader = async (req: Request) => {
    return (await verify(req.jwt!)).payload.userId;
}
