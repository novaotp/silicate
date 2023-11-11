
"use server";

import { hash } from "bcrypt";
import { db } from "@/database";

interface SignUpParams {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

export const signUp = async ({ firstName, lastName, email, password }: SignUpParams) => {
  try {
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
