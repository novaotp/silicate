
"use server";

import { cookies } from "next/headers";
import { key, value, maxAge } from "./config";

export const getServerSideTheme = (): string => {
  if (!cookies().has(key)) {
    cookies().set(key, value, { maxAge: maxAge });
  }

  return cookies().get(key)!.value;
}
