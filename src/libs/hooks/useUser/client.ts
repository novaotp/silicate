"use client";

// React + Next
import { useEffect, useState } from "react";

// Internal
import { useUser } from "./server";
import { User } from "@models/user";

/**
 * A client-side hook to access the current user's data.
 * @returns A {@link User | `User`} object, or `undefined` if an error occurred
 */
export const useUserSync = (): User | null | undefined => {
    const [user, setUser] = useState<User | null | undefined>(undefined);

    useEffect(() => {
        (async () => {
            try {
                const fetchedUser: User | null = await useUser();

                setUser(fetchedUser);
            } catch (err) {
                console.error(
                    "An error occurred while trying to fetch the user on the client-side",
                    err
                );
                setUser(null);
            }
        })();
    }, []);

    return user;
};
