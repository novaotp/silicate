import express from "express";
import { db } from "./database/index.ts";
import { User, type RawUser } from "../libs/models/User.ts";
import { hash } from "bcrypt";
import { Memo, RawMemo } from "../libs/models/Memo.ts";
import cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.get('/users/:id', async (req, res) => {
    try {
        const client = await db.connect();

        const { rows } = await client.query<RawUser>('SELECT * FROM public.user WHERE id = $1 LIMIT 1;', [req.params.id]);

        client.release();

        const user = rows[0];

        if (!user) {
            return res.send({
                success: false,
                message: "User not found"
            });
        }

        return res.send({
            success: true,
            message: "Users read successfully",
            data: {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                password: user.password,
                joinedOn: user.created_at
            } as User
        });
    } catch (err) {
        console.error(`Something went wrong whilst fetching the users : ${err.message}`);
        return res.send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

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
                    password: row.password,
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

        await client.query(`
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

        await client.query(`
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

app.get('/memos/:id', async (req, res) => {
    try {
        const client = await db.connect();

        const { rows } = await client.query<RawMemo>(`
            SELECT * 
            FROM public.memo
            WHERE id = $1
            LIMIT 1;`, [req.params.id]
        );

        client.release();

        const memo = rows[0];

        if (!memo) {
            return res.send({
                success: false,
                message: "Memo not found"
            });
        }

        return res.send({
            success: true,
            message: "Memo read successfully",
            data: {
                id: memo.id,
                tag: memo.tag,
                title: memo.title,
                content: memo.content,
                lastChange: memo.updated_at
            } as Memo
        });
    } catch (err) {
        console.error(`Something went wrong whilst fetching a memo : ${err.message}`);
        return res.send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

app.get('/memos', async (req, res) => {
    try {
        const client = await db.connect();

        const { rows } = await client.query<RawMemo>('SELECT * FROM public.memo;');

        client.release();

        return res.send({
            success: true,
            message: "Users read successfully",
            data: rows.map(row => {
                return {
                    id: row.id,
                    tag: row.tag,
                    title: row.title,
                    content: row.content,
                    lastChange: row.updated_at
                } as Memo;
            }).sort((a, b) => new Date(b.lastChange).getTime() - new Date(a.lastChange).getTime())
        });
    } catch (err) {
        console.error(`Something went wrong whilst fetching the memos : ${err.message}`);
        return res.send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

app.post('/memos', async (req, res) => {
    try {
        const { userId, tag, title, content } = req.body;
        const client = await db.connect();

        const { rows } = await client.query(`
            INSERT INTO public.memo (user_id, tag, title, content, updated_at)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id;
        `, [userId, tag, title, content, new Date()]);

        client.release();

        const id = rows[0].id;

        return res.send({
            success: true,
            message: "Memo created successfully",
            data: id
        });
    } catch (err) {
        console.error(`Something went wrong whilst creating a memo : ${err.message}`);
        return res.send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

app.put('/memos/:id', async (req, res) => {
    try {
        const { tag, title, content } = req.body;
        const client = await db.connect();

        await client.query(`
            UPDATE public.memo
            SET tag = $1,
                title = $2,
                content = $3,
                updated_at = $4
            WHERE id = $5;
        `, [tag, title, content, new Date(), req.params.id]);

        client.release();

        return res.send({
            success: true,
            message: "Memo updated successfully"
        });
    } catch (err) {
        console.error(`Something went wrong whilst updating a memo : ${err.message}`);
        return res.send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

app.delete('/memos/:id', async (req, res) => {
    try {
        const client = await db.connect();

        await client.query(`
            DELETE FROM public.memo
            WHERE id = $1;
        `, [req.params.id]);

        client.release();

        return res.send({
            success: true,
            message: "Memo deleted successfully"
        });
    } catch (err) {
        console.error(`Something went wrong whilst deleting a memo : ${err.message}`);
        return res.send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

app.listen(4000, () => {
    console.log("[Server] Running on port 4000");
});
