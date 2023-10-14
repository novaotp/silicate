
"use server";

// Internal
import Requests from "@classes/requests";
import { serverRoute } from "@shared/classes/routes";
import { TokenResponseProps } from "@shared/interfaces";
import VerifyReturnProps from "./interfaces";
import Cookies from "../cookies";

/** A static class to verify a JWT on the frontend. */
class TokenVerifier {
  /**
   * Verifies the auth state of the user and returns true or false appropriately.
   * 
   * Fetches the jwt from the cookie automatically.
   */
  public static async verify(): Promise<VerifyReturnProps>;

  /**
   * Verifies the auth state of the user and returns true or false appropriately.
   * @param jwt The jwt payload to check
   */
  public static async verify(jwt: string): Promise<VerifyReturnProps>;

  public static async verify(jwt?: string): Promise<VerifyReturnProps> {
    let token = jwt || Cookies.get('id');

    if (!token) {
      return {
        success: false,
        result: {
          success: false,
          message: "No token found"
        }
      };
    }

    const url = process.env.API_SERVER_URL + serverRoute.auth.verifyToken.use();
    const response = await Requests.noStorePost(url, { jwt: token });
    const result: TokenResponseProps = await response.json();

    return {
      success: result.success,
      result: result,
    }
  }
}

export type { VerifyReturnProps };
export default TokenVerifier;
