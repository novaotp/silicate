
"use client";

// React + Next
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Internal
import { fetchUser } from "./server";
import { useUserId } from "../useUserId";
import { User } from "./interfaces";

/** A client-side hook to get data on the account. */
export const useUser = (): User | undefined => {
  const router = useRouter();
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const userId = await useUserId();

        if (!userId) {
          router.push('/auth/log-in');
          return;
        }

        const fetchedUser = await fetchUser(userId);

        if (!fetchedUser) {
          router.push('/auth/log-in');
          return;
        }

        setUser(fetchedUser);

      } catch (err) {
        console.error(err);
        
      }
    })();
  }, []);

  return user;
}
