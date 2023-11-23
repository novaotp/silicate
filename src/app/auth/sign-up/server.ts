
"use server";

import { hash } from "bcrypt";
import { db } from "@/database";

interface SignUpParams {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

const userExists = async (email: string): Promise<boolean> => {
  try {
    const client = await db.connect();

    const query = 'SELECT * FROM public.user WHERE email = $1';
    const values = [email];

    const { rows } = await client.query(query, values);
    client.release();

    if (rows.length === 0) {
      return false;
    }

    return true;
    
  } catch (err) {
    console.log("An error occured while checking if the user exists", err);
    return false;

  }
}

export const signUp = async ({ firstName, lastName, email, password }: SignUpParams): Promise<boolean> => {
  try {
    if (await userExists(email)) {
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
