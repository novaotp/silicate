
// React
import { RefObject } from "react";

// Internal
import { signUpController } from "@/services/auth-service/backend/controllers";
import { AuthResponseProps, SignUpProps } from "@shared/interfaces";

/**
 * Handles the signup process.
 * @param ref The form's reference.
 * @returns A promise of an {@link AuthResponseProps} object.
 */
const signUp = async (ref: RefObject<HTMLFormElement>): Promise<AuthResponseProps> => {
  const formData = new FormData(ref.current!);

  const data: SignUpProps = {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }

  const response: AuthResponseProps = await signUpController(data);

  return response;
}

export default signUp;
