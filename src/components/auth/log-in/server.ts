"use server";

// BCrypt
import { compare } from "bcrypt";

// Internal
import { sign } from "@/utils/jwt";
import { getUser } from "../auth.server";

/**
 * Checks if the user's credentials are valid.
 * @param email The email address of the user to authenticate
 * @param password The password of the user to authenticate
 * @returns The JWT to store in the cookie if valid, otherwise `undefined`
 */
export const checkCredentials = async (
    email: string,
    password: string
): Promise<string | undefined> => {
    try {
        const user = await getUser(email);

        if (!user || !compare(password, user.password)) {
            return undefined;
        }

        return await sign({ userID: user.id });
    } catch (err) {
        console.error(err);
        return undefined;
    }
};
