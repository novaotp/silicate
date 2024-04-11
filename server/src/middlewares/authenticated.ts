import { Handler } from "express";
import { ApiResponse } from '../../../libs/types/ApiResponse';

/**
 * Validates or rejects a jwt.
 * @param jwt The jwt to validate.
 * @returns `true` if valid, `false` otherwise.
 */
const validate = async (jwt: string) => {
    const response = await fetch(`${process.env.APP_URL}/auth/validate`, {
        method: "POST",
        body: JSON.stringify({ jwt }),
        headers: {
            "content-type": "application/json"
        }
    });
    const { success }: ApiResponse = await response.json();

    return success;
}

/**
 * A middleware that interrupts the request if the `Authorization` header is undefined or if it is invalid.
 */
export const authenticated = (async (req, res, next) => {
    const jwt = req.headers.authorization;

    if (!jwt) {
        return res.status(401).send({
            success: false,
            message: "Unauthorized action : missing authorization header"
        });
    }

    if (!(await validate(jwt))) {
        return res.status(401).send({
            success: false,
            message: "Unauthorized action : invalid authorization header"
        });
    }

    next();
}) satisfies Handler;
