import { Router } from "express";
import { query } from "../database/utils";
import { RawUser } from "../../../libs/models/User";
import { compare, hash } from 'bcrypt';
import { sign, verify } from '../utils/jwt';

export const router = Router();

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const { first: user } = await query<RawUser>(`
            SELECT *
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

        return res.success("Users read successfully", { jwt: token, expires });
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

        const { first: user } = await query<RawUser>(`
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

        const { first: existingUser } = await query<RawUser>(`
            SELECT *
            FROM public.user
            WHERE email = $1
            LIMIT 1;
        `, [email]);

        if (existingUser) {
            return res.status(409).send({ message: "A user with the given email already exists." })
        }

        const { first: userId } = await query<{ id: number }>(`
            INSERT INTO public.user (first_name, last_name, email, password)
            VALUES ($1, $2, $3, $4)
            RETURNING id;
        `, [firstName, lastName, email, await hash(password, 15)]);

        return res.success("User created successfully", userId);
    } catch (err) {
        console.error(`Something went wrong whilst creating a user : ${err.message}`);
        return res.serverError();
    }
});
