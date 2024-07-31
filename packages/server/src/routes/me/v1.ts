import { prisma } from "$services/db.js";
import { Router } from "express";
import type { tags } from "typia";
import typia from "typia";

export const v1 = Router();

v1.get("/", async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId!
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                bio: true,
                avatarPath: true,
                joinedOn: true
            }
        });

        if (!user) {
            return res.notFoundError("User not found");
        }

        return res.success("User read successfully", user);
    } catch (err) {
        console.error(`Something went wrong whilst fetching a user's data : ${err.message}`);
        return res.serverError();
    }
});

interface PatchUserBody {
    firstName: string & tags.MinLength<1>,
    lastName: string & tags.MinLength<1>,
    email: string & tags.Format<"email"> & tags.MinLength<1>,
    bio: string
}

v1.patch("/", async (req, res) => {
    try {
        const body = req.body;

        // Validate body.
        try {
            typia.assertGuardEquals<PatchUserBody>(body);
        } catch (error) {
            const typiaError = error as typia.TypeGuardError;
            return res.unprocessableEntityError(
                `Bad request on ${typiaError.path} : received ${typiaError.value}, expected ${typiaError.expected}`
            );
        }

        const doesUserExist = (await prisma.user.findUnique({
            where: {
                id: req.userId!
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                bio: true,
                avatarPath: true,
                joinedOn: true
            }
        })) !== null;

        if (!doesUserExist) {
            return res.notFoundError("User not found");
        }

        const user = await prisma.user.update({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                bio: body.bio
            },
            where: {
                id: req.userId!
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                bio: true,
                avatarPath: true,
                joinedOn: true
            }
        });

        return res.success("User updating successfully", user);
    } catch (err) {
        console.error(`Something went wrong whilst updating a user's data : ${err.message}`);
        return res.serverError();
    }
});

v1.delete("/", async (req, res) => {
    try {
        const doesUserExist = (await prisma.user.findUnique({
            where: {
                id: req.userId!
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                bio: true,
                avatarPath: true,
                joinedOn: true
            }
        })) !== null;

        if (!doesUserExist) {
            return res.notFoundError("User not found");
        }

        await prisma.user.delete({
            where: {
                id: req.userId!
            }
        });

        return res.success("User deleted successfully");
    } catch (err) {
        console.error(`Something went wrong whilst deleted a user : ${err.message}`);
        return res.serverError();
    }
});
