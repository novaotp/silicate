import { getUserId } from '../services/jwt.js';
import type { Request, Response, NextFunction } from 'express';

/**
 * ! MUST BE THE FIRST MIDDLEWARE, AS OTHER MIDDLEWARES AND ROUTES RELY ON IT.
 * 
 * Extends express `Request` and `Response` objects with convenient helpers.
 */
export const extendExpress = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    req.jwt = authHeader ? token(authHeader) : null;
    req.userId = req.jwt ? await getUserId(req.jwt) : null;
    
    res.success = (message: string, data?: unknown) => {
        if (data) {
            res.status(200).send({ success: true, message, data });
        } else {
            res.status(200).send({ success: true, message });
        }
    };
    res.notFoundError = (message: string) => {
        res.status(404).send({ success: false, message });
    };
    res.unprocessableEntityError = (message: string) => {
        res.status(422).send({ success: false, message });
    };
    res.serverError = () => {
        res.status(500).send({ success: false, message: 'Internal Server Error' });
    };
    next();
};

/** Retrieves the JWT token from the given header. */
const token = (authHeader: string): string => {
    return authHeader.split(" ").at(1)!;
}
