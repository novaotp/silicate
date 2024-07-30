import { prisma } from "$services/db.js";
import { sign } from "$services/jwt.js";
import { compare, hash } from "bcrypt";
import { Router } from "express";
import typia, { type tags } from "typia";

/** The v1 router instance for all authentication-related routes. */
export const v1 = Router();

interface RegistrationBody {
    firstName: string,
    lastName: string,
    email: string & tags.Format<"email">,
    password: string & tags.MinLength<8>
}

v1.post("/register", async (req, res) => {
    try {
        const body = req.body;

        // Validate registration body.
        try {
            typia.assertGuardEquals<RegistrationBody>(body);
        } catch (error) {
            const typiaError = error as typia.TypeGuardError;
            return res.unprocessableEntityError(
                `Bad request on ${typiaError.path} : received ${typiaError.value}, expected ${typiaError.expected}`
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });

        // Email is already used for another account.
        if (existingUser !== null) {
            return res.status(409).send({ success: false, message: "A user with the given email already exists." });
        }

        await prisma.user.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                password: await hash(body.password, 15)
            }
        });

        return res.success("User registered successfully");
    } catch (error) {
        console.error(`Something went wrong whilst registering a user : ${error.message}`);
        return res.serverError();
    }
});

interface LoginBody {
    email: string & tags.Format<"email">,
    password: string & tags.MinLength<8>
}

v1.post("/login", async (req, res) => {
    try {
        const body = req.body;

        // Validate login body.
        try {
            typia.assertGuardEquals<LoginBody>(body);
        } catch (error) {
            const typiaError = error as typia.TypeGuardError;
            return res.unprocessableEntityError(
                `Bad request on ${typiaError.path} : received ${typiaError.value}, expected ${typiaError.expected}`
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });

        // Cannot login to an account with the email not existing in the database.
        if (existingUser === null) {
            return res.notFoundError("Invalid credentials");
        }

        const isSamePassword = await compare(body.password, existingUser.password);
        if (!isSamePassword) {
            // Only show generic error like for email to avoid giving info.
            return res.notFoundError("Invalid credentials.");
        }

        const { token, expires } = await sign({ userId: existingUser.id });

        res.header("Set-Cookie", `token=${token}; HttpOnly; Secure; Expires=${new Date(expires)}`);
        return res.success("User logged in successfully");
    } catch (error) {
        console.error(`Something went wrong whilst logging in a user : ${error.message}`);
        return res.serverError();
    }
});
