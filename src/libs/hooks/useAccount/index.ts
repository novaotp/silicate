
"use client";

// React
import { useEffect, useState } from "react";

// Internal
import { fetchUser } from "./server";
import { useUserId } from "../useUserId";
import { User } from "./interfaces";

/** A client-side hook to get data on the account. */
export const useUser = (): User => {
  const [account, setAccount] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const userId = await useUserId();

        if (!userId) {
          return;
        }

        const user = await fetchUser(userId);

        if (!user) {
          return;
        }

        setAccount(user);

      } catch (err) {
        console.error(err);
        
      }
    })();
  }, []);

  return account;
}
