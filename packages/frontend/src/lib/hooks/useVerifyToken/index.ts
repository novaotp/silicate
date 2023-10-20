
"use server";

// Next
import { cookies } from "next/headers";

// Internal
import Requests from "@utils/requests";
import { serverRoute } from "@shared/utils/routes";
import { VerifyTokenResponseProps } from "@shared/interfaces";

/**
 * Verifies the auth state of the user and returns true or false appropriately.
 * 
 * Doesn't take a jwt string. See {@link useVerifyTokenWithJWT} for jwt as a parameter.
 * 
 * This is a SERVER-SIDE function.
 */
const useVerifyToken = async (): Promise<VerifyTokenResponseProps> => {
  const cookie = cookies().get('id');

  const url = process.env.API_SERVER_URL + serverRoute.auth.verifyToken.use();

  const response = await Requests.noStore.post(url, { jwt: cookie?.value });
  return await response.json();
}

/**
 * Verifies the auth state of the user and returns true or false appropriately.
 * 
 * Needs a jwt string. See {@link useVerifyToken} for jwt retrieval from cookie.
 * 
 * This is a SERVER-SIDE function.
 * @param jwt The jwt payload to check.
 */
const useVerifyTokenWithJWT = async (jwt: string): Promise<VerifyTokenResponseProps> => {
  const url = process.env.API_SERVER_URL + serverRoute.auth.verifyToken.use();

  const response = await Requests.noStore.post(url, { jwt });
  return await response.json();
}

export { useVerifyTokenWithJWT };
export default useVerifyToken;
