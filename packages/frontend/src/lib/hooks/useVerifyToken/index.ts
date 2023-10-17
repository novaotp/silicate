
"use server";

// Next
import { cookies } from "next/headers";

// Internal
import Requests from "@utils/requests";
import UseVerifyTokenReturnProps from "./interfaces";
import { serverRoute } from "@shared/utils/routes";
import { TokenResponseProps } from "@shared/interfaces";

/**
 * Verifies the auth state of the user and returns true or false appropriately.
 * 
 * Doesn't take a jwt string. See {@link useVerifyTokenWithJWT} for jwt as a parameter.
 * 
 * This is a SERVER-SIDE function.
 */
const useVerifyToken = async (): Promise<UseVerifyTokenReturnProps> => {
  const cookie = cookies().get('id');

  if (!cookie) {
    return {
      success: false,
      result: {
        success: false,
        message: "No cookie <id> found"
      }
    };
  }

  const url = process.env.API_SERVER_URL + serverRoute.auth.verifyToken.use();

  const response = await Requests.noStore.post(url, { jwt: cookie.value });
  const result: TokenResponseProps = await response.json();

  return {
    success: result.success,
    result: result,
  }
}

/**
 * Verifies the auth state of the user and returns true or false appropriately.
 * 
 * Needs a jwt string. See {@link useVerifyToken} for jwt retrieval from cookie.
 * 
 * This is a SERVER-SIDE function.
 * @param jwt The jwt payload to check.
 */
const useVerifyTokenWithJWT = async (jwt: string): Promise<UseVerifyTokenReturnProps> => {
  const url = process.env.API_SERVER_URL + serverRoute.auth.verifyToken.use();

  const response = await Requests.noStore.post(url, { jwt });
  const result: TokenResponseProps = await response.json();

  return {
    success: result.success,
    result: result,
  }
}

export type { UseVerifyTokenReturnProps };
export { useVerifyTokenWithJWT };
export default useVerifyToken;
