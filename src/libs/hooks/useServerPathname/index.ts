
"use server";

import { headers } from "next/headers"

/**
 * A server-side way of getting the current pathname,
 * mimicking the behavior of `usePathname`.
 */
export const useServerPathname = (): string => {
  const heads = headers();

  return heads.get('next-url') ?? '';
}
