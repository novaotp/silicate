import { Router } from "express";
import { db } from "../database";
import { RawUser } from "../../../libs/models/User";
import { compare, hash } from 'bcrypt';
import { sign, verify } from '../utils/jwt';
import { LoginResponse } from '../../../libs/types/AuthResponse';

export const router = Router();

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const client = await db.connect();

        const { rows } = await client.query<RawUser>(`
            SELECT *
            FROM public.user
            WHERE email = $1
            LIMIT 1;
        `, [email]);

        client.release();

        const user = rows[0];

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            } as LoginResponse);
        }

        if (!(await compare(password, user.password))) {
            return res.status(401).send({
                success: false,
                message: "User not found"
            } as LoginResponse);
        }

        const { token, expires } = await sign({ userId: user.id });

        return res.status(200).send({
            success: true,
            message: "Users read successfully",
            jwt: token,
            expires
        } satisfies LoginResponse);
    } catch (err) {
        console.error(`Something went wrong whilst login a user : ${err.message}`);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.post("/validate", async (req, res) => {
    try {
        const { jwt } = req.body;
        const client = await db.connect();

        const userId = (await verify(jwt)).payload.userId;

        console.log(userId)

        if (!userId) {
            return res.status(401).send({
                success: false,
                message: "Invalid token"
            });
        }

        const { rows } = await client.query<RawUser>(`
            SELECT *
            FROM public.user
            WHERE id = $1
            LIMIT 1;
        `, [userId]);

        client.release();

        const user = rows[0];

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Users read successfully"
        });
    } catch (err) {
        console.error(`Something went wrong whilst validating a jwt : ${err.message}`);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const client = await db.connect();

        const { rows } = await client.query<RawUser>(`
            INSERT INTO public.user (first_name, last_name, email, password)
            VALUES ($1, $2, $3, $4)
            RETURNING id;
        `, [firstName, lastName, email, await hash(password, 15)]);

        client.release();

        const id = rows[0].id;

        return res.send({
            success: true,
            message: "User created successfully",
            data: id
        });
    } catch (err) {
        console.error(`Something went wrong whilst creating a user : ${err.message}`);
        return res.send({
            success: false,
            message: "Internal Server Error"
        });
    }
});
