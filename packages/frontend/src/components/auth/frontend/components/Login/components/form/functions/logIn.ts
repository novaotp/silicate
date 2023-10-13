
// React
import { RefObject } from "react";

// Internal
import { loginController } from "@components/auth/backend/controllers";
import { AuthResponseProps, LoginProps } from "@shared/interfaces";

/**
 * Handles the log-in process.
 * @param ref The form's reference.
 * @returns A promise of an {@link AuthResponseProps} object.
 */
const logIn = async (ref: RefObject<HTMLFormElement>): Promise<AuthResponseProps> => {
  const formData = new FormData(ref.current!);

  const data: LoginProps = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }

  const response: AuthResponseProps = await loginController(data);

  return response;
}

export default logIn;
