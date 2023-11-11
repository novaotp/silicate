
"use server";

// Next
import { cookies } from "next/headers";

// Internal
import { verify } from "@/utils/jwt";

/** A server-side hook to get the user's id from his JWT. */
export const useServerUserId = async (): Promise<number | null> => {
  try {
    const token = cookies().get('id')?.value;

    if (!token) {
      return null;
    }

    const payload = await verify(token);

    return (payload.payload as any).userID;

  } catch (err) {
    console.error("An error occurred while getting the user ID: ", err);
    return null;

  }
}
