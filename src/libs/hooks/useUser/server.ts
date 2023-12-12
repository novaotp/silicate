
"use server";

import { User } from "@/models/user";
import { useServerUserId } from "../useUserId/server";
import { getUser } from "./getUser"

/**
 * A server-side hook to access the current user's data.
 * @returns A {@link User | `User`} object, or `undefined` if an error occurred
 */
export const useUser = async (): Promise<User | undefined> => {
  const id = await useServerUserId();

  if (!id) {
    console.error("An error occurred while trying to fetch the user on the server side.");
    return;
  }

  return await getUser(id);
}
