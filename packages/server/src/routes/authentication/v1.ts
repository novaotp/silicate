import { prisma } from "$services/db.js";
import { hash } from "bcrypt";
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
