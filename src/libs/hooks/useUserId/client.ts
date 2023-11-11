
import { getCookie } from "cookies-next";
import { verify } from "@/utils/jwt";

/** A client-side hook to get the user's id from his JWT. */
export const useUserId = async (): Promise<number | null> => {
  try {
    const token = getCookie('id')?.toString();

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
