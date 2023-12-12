
"use client";

// React + Next
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Internal
import { getUser } from "./getUser";
import { useUserId } from "../useUserId/client";
import { User } from "@models/user";

/**
 * A server-side hook to access the current user's data.
 * @returns A {@link User | `User`} object, or `undefined` if an error occurred
 */
export const useUser = (): User | undefined => {
  const router = useRouter();
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const userId = await useUserId();

        if (!userId) {
          router.push('/auth/log-out');
          return;
        }

        const fetchedUser = await getUser(userId);

        if (!fetchedUser) {
          router.push('/auth/log-out');
          return;
        }

        setUser(fetchedUser);

      } catch (err) {
        console.error("An error occurred while trying to fetch the user on the client-side", err);
        
      }
    })();
  }, []);

  return user;
}
