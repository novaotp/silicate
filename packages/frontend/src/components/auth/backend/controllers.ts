
'use server';

// Next
import { cookies } from "next/headers";

// Internal
import { AuthResponseProps, LoginProps, SignUpProps, } from "@shared/interfaces";
import { serverRoute } from "@shared/classes/routes";
import Requests from "@utils/requests";

/**
 * Calls the API with the given sign-up data and returns a response.
 * @param data The sign-up data.
 * @returns A promise of an {@link AuthResponseProps} object.
 */
export async function signUpController(data: SignUpProps): Promise<AuthResponseProps> {
  const url = process.env.API_SERVER_URL + serverRoute.auth.signup.use();

  const response = await Requests.noStore.post(url, data);
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
  
  const response = await Requests.noStore.post(url, data);
  const result: AuthResponseProps = await response.json();

  return result;
}
