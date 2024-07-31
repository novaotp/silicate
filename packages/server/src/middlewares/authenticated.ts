import type { Request, Response, NextFunction } from "express";

/**
 * A middleware that interrupts the request if the `Authorization` header is undefined or invalid.
 * @description Returns `401 Unauthorized action` or pases the request to the next handler.
 */
export const authenticated = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.jwt) {
        return res.status(401).send({
            success: false,
            message: "Unauthorized action : missing authorization header"
        });
    }

    if (req.userId === null) {
        return res.status(401).send({
            success: false,
            message: "Unauthorized action : invalid authorization header"
        });
    }

    next();
};
