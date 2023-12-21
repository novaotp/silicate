"use server";

import { User } from "@/models/user";
import { useUserId } from "../useUserId";
import { getUser } from "./getUser";

/**
 * A server-side hook to access the current user's data.
 * @returns A {@link User | `User`} object, or `undefined` if an error occurred
 */
export const useUser = async (): Promise<User | null> => {
    const id = await useUserId();

    if (!id) {
        console.error(
            "An error occurred while trying to fetch the user on the server side."
        );
        return null;
    }

    return await getUser(id);
};
