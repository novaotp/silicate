// serverErrorMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { verify } from '../utils/jwt';

export const serverErrorMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    req.userId = (await verify(req.headers.authorization!)).payload.userId;
    
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
    res.serverError = () => {
        res.status(500).send({ success: false, message: 'Internal Server Error' });
    };
    next();
};
