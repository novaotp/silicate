"use server";

import { db } from "@/database";
import { User } from "@/models/user";

/**
 * Fetches a user from the database using his email.
 * @param email The email address of the user to get the data from
 * @returns A {@link User | `User`} object or `undefined` if the user could not be found
 */
export const getUser = async (email: string): Promise<User | undefined> => {
    try {
        const client = await db.connect();

        const query = "SELECT * FROM public.user WHERE email = $1";
        const values = [email];

        const { rows } = await client.query(query, values);
        client.release();

        if (rows.length === 0) {
            return undefined;
        }

        return {
            id: rows[0].id,
            firstName: rows[0].firstName,
            lastName: rows[0].lastName,
            email: rows[0].email,
            password: rows[0].password,
        } as User;
    } catch (err) {
        console.error(
            "An error occured while checking if the user exists",
            err
        );
        return undefined;
    }
};
