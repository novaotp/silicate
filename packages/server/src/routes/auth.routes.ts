import { Router } from "express";
import { compare, hash } from 'bcrypt';
import { query } from "../database/utils.js";
import { sign, verify } from '../utils/jwt.js';
import type { User } from "$common/models/user.js";

export const router = Router();

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const { first: user } = await query<User & { password: string }>(`
            SELECT
                id,
                first_name as "firstName",
                last_name as "lastName",
                email,
                password,
                avatar_path as "avatarPath",
                bio,
                created_at as "joinedOn"
            FROM public.user
            WHERE email = $1
            LIMIT 1;
        `, [email]);

        if (!user) {
            return res.notFoundError("User not found");
        }

        if (!(await compare(password, user.password))) {
            // 404 to not unveil the existence of a user
            return res.notFoundError("User not found");
        }

        const { token, expires } = await sign({ userId: user.id });

        return res.success(
            "User logged in successfully",
            {
                jwt: token,
                expires,
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    avatar: user.avatar,
                    bio: user.bio,
                    joinedOn: user.joinedOn
                } satisfies User
            }
        );
    } catch (err) {
        console.error(`Something went wrong whilst login a user : ${err.message}`);
        return res.serverError();
    }
});

router.post("/validate", async (req, res) => {
    try {
        const { jwt } = req.body;

        const userId = (await verify(jwt)).payload.userId;

        if (!userId) {
            return res.status(401).send({
                success: false,
                message: "Invalid token"
            });
        }

        const { first: user } = await query<User>(`
            SELECT *
            FROM public.user
            WHERE id = $1
            LIMIT 1;
        `, [userId]);

        if (!user) {
            return res.notFoundError("User not found");
        }

        return res.success("Users read successfully");
    } catch (err) {
        console.error(`Something went wrong whilst validating a jwt : ${err.message}`);
        return res.serverError();
    }
});

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const { first: existingUser } = await query<User>(`
            SELECT *
            FROM public.user
            WHERE email = $1
            LIMIT 1;
        `, [email]);

        if (existingUser) {
            return res.status(409).send({ success: false, message: "A user with the given email already exists." })
        }

        const { first: user } = await query<User>(`
            INSERT INTO public.user (first_name, last_name, email, password)
            VALUES ($1, $2, $3, $4)
            RETURNING
                id,
                first_name as "firstName",
                last_name as "lastName",
                email,
                avatar_path as "avatarPath",
                bio,
                created_at as "joinedOn";
        `, [firstName, lastName, email, await hash(password, 15)]);

        return res.success("User created successfully", user);
    } catch (err) {
        console.error(`Something went wrong whilst creating a user : ${err.message}`);
        return res.serverError();
    }
});
