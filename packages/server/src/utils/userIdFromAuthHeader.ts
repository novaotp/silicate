import { Request } from "express";
import { verify } from "./jwt";

export const userIdFromAuthHeader = async (req: Request) => {
    return (await verify(req.headers.authorization!)).payload.userId;
}
