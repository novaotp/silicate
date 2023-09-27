
"use server";

// Next
import { cookies } from "next/headers";

// Internal
import { serverRoute } from "@shared/classes/route";
import { TokenResponseProps } from "@shared/interfaces";
import Requests from "../requests";

/** The return props of {@link useVerifyToken} and {@link useVerifyTokenWithJWT}. */
interface UseVerifyTokenReturnProps {
  /**
   * The state of the auth, true if it succeeded, false otherwise.
   * 
   * Shorthand for result.success - see {@link result}.
   */
  success: boolean;
  /**
   * The {@link TokenResponseProps | response object} itself.
   * 
   * If succeeded, contains a payload.
   */
  result: TokenResponseProps
}

/**
 * Verifies the auth state of the user and returns true or false appropriately.
 * 
 * Doesn't take a jwt string. See {@link useVerifyTokenWithJWT} for jwt as a parameter.
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

  const response = await Requests.noStorePost(url, { jwt: cookie.value });
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
 * @param jwt The jwt.
 */
const useVerifyTokenWithJWT = async (jwt: string): Promise<UseVerifyTokenReturnProps> => {
  const url = process.env.API_SERVER_URL + serverRoute.auth.verifyToken.use();

  const response = await Requests.noStorePost(url, { jwt });
  const result: TokenResponseProps = await response.json();

  return {
    success: result.success,
    result: result,
  }
}

export type { UseVerifyTokenReturnProps };
export { useVerifyTokenWithJWT };
export default useVerifyToken;
