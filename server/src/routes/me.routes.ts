import { Router } from "express";
import { db } from "../database";
import { RawUser, User } from "../../../libs/models/User";
import { hash } from "bcrypt";
import { authenticated } from "../middlewares/authenticated";
import { userIdFromAuthHeader } from "../utils/userIdFromAuthHeader";

export const router = Router();

router.use(authenticated);

router.get('/', async (req, res) => {
    try {
        const client = await db.connect();

        const { rows } = await client.query<RawUser>(`
            SELECT *
            FROM public.user
            WHERE id = $1
            LIMIT 1;
        `, [await userIdFromAuthHeader(req)]);

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
            message: "Users read successfully",
            data: {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                joinedOn: user.created_at
            } as User
        });
    } catch (err) {
        console.error(`Something went wrong whilst fetching the users : ${err.message}`);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.put('/', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const client = await db.connect();

        await client.query(`
            UPDATE public.user
            SET first_name = $1,
                last_name = $2,
                email = $3,
                password = $4,
                updated_at = $5
            WHERE id = $6;
        `, [firstName, lastName, email, await hash(password, 15), new Date(), await userIdFromAuthHeader(req)]);

        client.release();

        return res.status(200).send({
            success: true,
            message: "User updated successfully"
        });
    } catch (err) {
        console.error(`Something went wrong whilst updating a user : ${err.message}`);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.delete('/', async (req, res) => {
    try {
        const client = await db.connect();

        await client.query(`
            DELETE FROM public.user
            WHERE id = $1;
        `, [await userIdFromAuthHeader(req)]);

        client.release();

        return res.status(200).send({
            success: true,
            message: "User deleted successfully"
        });
    } catch (err) {
        console.error(`Something went wrong whilst deleting a user : ${err.message}`);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
});
