
"use client";

import { getCookie, setCookie, deleteCookie } from 'cookies-next';

interface SetCookieOptions {
  /** The key of the cookie. */
  key: string;
  /** The data to store in the cookie. */
  data: any;
  /** The expiration date of the cookie. */
  maxAge?: number;
}

/**
 * A intrisic class that provides methods
 * to handle cookies on the client-side.
 * 
 * @careful Only works in the CLIENT-SIDE
 */
class Cookies {
  /**
   * Gets a cookies with a specified key and returns its value if found, undefined otherwise.
   * @param key The key of the cookie to get
   * @returns The value of the cookie or `undefined`
   */
  static get(key: string): string | undefined {
    return getCookie(key)?.toString();
  }

  /**
   * Sets a cookie with a key and a value, with additional data if needed.
   * @param options The cookie's options 
   */
  static set(options: SetCookieOptions): void {
    const { key, data, maxAge } = options;

    setCookie(key, data, { maxAge })
  }

  /**
   * Deletes a cookie with a specified key.
   * @param key The key of the cookie to delete
   */
  static delete(key: string): void {
    deleteCookie(key);
  }
}

export default Cookies;
