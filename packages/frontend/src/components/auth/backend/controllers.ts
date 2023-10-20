
'use server';

// Internal
import { SignUpRequestProps, SignUpResponseProps, LoginRequestProps, LoginResponseProps } from "@shared/interfaces";
import { serverRoute } from "@shared/utils/routes";
import Requests from "@utils/requests";

/**
 * A controller for handling auth requests.
 * @class
 */
class AuthController {
  /** Calls the API with the given sign-up data and returns a response. */
  public static async signUp(data: SignUpRequestProps): Promise<SignUpResponseProps> {
    const url = process.env.API_SERVER_URL + serverRoute.auth.signup.use();
    const response = await Requests.noStore.post(url, data);

    return await response.json();
  }

  /** Calls the API with the given log-in data and returns a response. */
  public static async login(data: LoginRequestProps): Promise<LoginResponseProps> {
    const url = process.env.API_SERVER_URL + serverRoute.auth.login.use();
    const response = await Requests.noStore.post(url, data);

    return await response.json();
  }
}

export default AuthController;
