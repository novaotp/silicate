
"use server";

import { db } from "@/database";
import { User } from "./interfaces";

export const fetchUser = async (id: number): Promise<User | null> => {
  try{
    const client = await db.connect();

    const query = 'SELECT * FROM public.user WHERE id = $1 LIMIT 1;';
    const values = [id];

    const { rows } = await client.query(query, values);
    client.release(true);

    const user = rows[0];

    if (!user) {
      return null;
    }

    return {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
    } as User;
    
  } catch (err) {
    console.error(err);
    return null;
  
  }
}
