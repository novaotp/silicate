
"use server";

import { compare } from "bcrypt";
import { db } from "@/database";
import { sign } from "@/utils/jwt";

export const logIn = async (email: string, password: string): Promise<string | undefined> => {
  try {
    const client = await db.connect();

    const query = 'SELECT * FROM public.user WHERE email = $1 LIMIT 1';
    const values = [email];

    const { rows } = await client.query(query, values);
    const user = rows[0];

    if (!user || !compare(password, user.password)) {
      return undefined;
    }

    client.release(true);

    return await sign({ userID: user.id });

  } catch (err) {
    console.error(err);

    return undefined;
  }
}
