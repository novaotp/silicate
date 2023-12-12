
"use server";

// BCrypt
import { hash } from "bcrypt";

// Internal
import { db } from "@/database";
import { getUser } from "../auth.server";
import { CreateAccountParams } from "./interface";

/**
 * Creates a new account in the database if it doesn't already exist.
 * @returns `True` if the account creation was successful, `false` otherwise
 */
export const createAccount = async ({ firstName, lastName, email, password }: CreateAccountParams): Promise<boolean> => {
  try {
    if (await getUser(email)) {
      return false;
    }

    const client = await db.connect();

    const query = 'INSERT INTO public.user (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)';
    const values = [firstName, lastName, email, await hash(password, 15)];

    await client.query(query, values);

    client.release();

    return true;

  } catch (err) {
    console.log("An error occured while signing up: ", err);
    return false;

  }
}
