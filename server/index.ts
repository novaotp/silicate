import express from "express";
import { db } from "./database/index.ts";
import { User, type RawUser } from "../libs/models/User.ts";
import { hash } from "bcrypt";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/users', async (req, res) => {
    try {
        const client = await db.connect();

        const { rows } = await client.query<RawUser>('SELECT * FROM public.user;');

        client.release();

        return res.send({
            success: true,
            message: "Users read successfully",
            data: rows.map(row => {
                return {
                    id: row.id,
                    firstName: row.first_name,
                    lastName: row.last_name,
                    email: row.email,
                    joinedOn: row.created_at
                } as User;
            })
        });
    } catch (err) {
        console.error(`Something went wrong whilst fetching the users : ${err.message}`);
        return res.send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

app.post('/users', async (req, res) => {
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

app.put('/users/:id', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const client = await db.connect();

        await client.query<RawUser>(`
            UPDATE public.user
            SET first_name = $1,
                last_name = $2,
                email = $3,
                password = $4,
                updated_at = $5
            WHERE id = $6;
        `, [firstName, lastName, email, await hash(password, 15), new Date(), req.params.id]);

        client.release();

        return res.send({
            success: true,
            message: "User updated successfully"
        });
    } catch (err) {
        console.error(`Something went wrong whilst updating a user : ${err.message}`);
        return res.send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const client = await db.connect();

        await client.query<RawUser>(`
            DELETE FROM public.user
            WHERE id = $1;
        `, [req.params.id]);

        client.release();

        return res.send({
            success: true,
            message: "User deleted successfully"
        });
    } catch (err) {
        console.error(`Something went wrong whilst deleting a user : ${err.message}`);
        return res.send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

app.listen(4000, () => {
    console.log("Server running at port 4000")
});
