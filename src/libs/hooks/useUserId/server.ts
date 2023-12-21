"use server";

// Next
import { cookies } from "next/headers";

// Internal
import { verify } from "@/utils/jwt";

/**
 * A server-side hook to get the user's id from the JWT.
 * @returns The id of the user, or `undefined` if not available
 */
export const useUserId = async (): Promise<number | undefined> => {
    try {
        const token = cookies().get("id")?.value;

        if (!token) {
            console.error("No JWT defined for the user id.");
            return undefined;
        }

        const payload = await verify(token);

        return (payload.payload as any).userID;
    } catch (err) {
        console.error(
            "An error occurred while getting the user ID on the server-side : ",
            err
        );
        return undefined;
    }
};
