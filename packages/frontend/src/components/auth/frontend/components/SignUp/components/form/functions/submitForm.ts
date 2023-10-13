
// React + Next
import { RefObject } from "react";

// Internal
import { newCookie } from "@components/auth/backend/controllers";
import { clientRoute } from "@shared/classes/routes";
import { AuthResponseProps } from "@shared/interfaces";
import signUp from "./signUp";
import { type UseVerifyTokenReturnProps, useVerifyTokenWithJWT } from "@/core/hooks/useVerifyToken";
import { useRouter } from "next/navigation";

/**
 * Handles the form submission, including the account creation, alerting on error and redirections.
 * @param ref The form's reference.
 * @param router A {@link AppRouterInstance | router instance} for redirection on user authentication error.
 */
const submitForm = async (ref: RefObject<HTMLFormElement>, router: ReturnType<typeof useRouter>): Promise<void> => {
  const authResponse: AuthResponseProps = await signUp(ref);

  if (!authResponse.success) {
    return alert(authResponse.message);
  }

  const { success, result: tokenResponse }: UseVerifyTokenReturnProps = await useVerifyTokenWithJWT(authResponse.jwt!);

  if (!success) {
    router.push(clientRoute.auth.login.use());
  }

  await newCookie("id", authResponse.jwt!, tokenResponse.payload!.exp! * 1000);

  router.push(clientRoute.app.use());
}

export default submitForm;
