
'use server';

// Next
import { cookies } from "next/headers";

// Internal
import { AuthResponseProps, LoginProps, SignUpProps, } from "@shared/interfaces";
import { serverRoute } from "@shared/classes/routes";
import Requests from "@/core/classes/requests";

/**
 * Calls the API with the given sign-up data and returns a response.
 * @param data The sign-up data.
 * @returns A promise of an {@link AuthResponseProps} object.
 */
export async function signUpController(data: SignUpProps): Promise<AuthResponseProps> {
  const url = process.env.API_SERVER_URL + serverRoute.auth.signup.use();

  const response = await Requests.noStorePost(url, data);
  const result: AuthResponseProps = await response.json();

  return result;
}

/**
 * Calls the API with the given log-in data and returns a response.
 * @param data The log-in data.
 * @returns A promise of an {@link AuthResponseProps} object.
 */
export async function loginController(data: LoginProps): Promise<AuthResponseProps> {
  const url = process.env.API_SERVER_URL + serverRoute.auth.login.use();
  
  const response = await Requests.noStorePost(url, data);
  const result: AuthResponseProps = await response.json();

  return result;
}

/**
 * Creates a new cookie with a more concise syntax.
 * See {@link cookies} for the actual method.
 * @param key The key of the cookie.
 * @param value The value of the cookie.
 * @param expires The expiration date in MS of the cookie.
 */
export async function newCookie(key: string, value: string, expires: number) {
  'use server';

  cookies().set(key, value, { expires: expires });
}
