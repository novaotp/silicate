
"use server";

import JWT from "../jwt";

/**
 * Verifies the JWT token and returns its payload and a message.
 * @param token The jwt payload to check
 */
export const verify = async (token: string): Promise<{ message: string, data: any | undefined }> => {
  try {
    return { message: "", data: await JWT.verify(token) };

  } catch (err: any) {
    console.error(`An error occurred while verifying the JWT : ${err}`)

    if (err.code === 'ERR_JWS_INVALID') {
      return { message: "Invalid Token", data: undefined };
    }

    return { message: "Internal Server Error", data: undefined };
  }
}
