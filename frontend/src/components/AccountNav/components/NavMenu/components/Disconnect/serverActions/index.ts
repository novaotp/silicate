
"use server";

import { cookies } from "next/headers"

/** Deletes the 'id' cookie and returns true. */
const deleteCookie = async (): Promise<boolean> => {
  cookies().delete('id');
  return true;
}

export default deleteCookie;
