
"use client";

import { getCookie } from "cookies-next";
import { verify } from "@/utils/jwt";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

/**
 * A client-side hook to get the user's id from his JWT.
 */
export const useUserId = async (): Promise<number | undefined> => {
  const router = useRouter();
  const [userId, setUserId] = useState<number | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const token = getCookie('id')?.toString();
    
        if (!token) {
          console.error("No JWT defined for the user id.");
          router.push('/auth/log-out');
          return;
        }
    
        const payload = await verify(token);
    
        setUserId((payload.payload as any).userID);
    
      } catch (err) {
        console.error("An error occurred while getting the user ID on the client-side : ", err);
        return undefined;
    
      }
    })();
  }, []);

  return userId;
}
