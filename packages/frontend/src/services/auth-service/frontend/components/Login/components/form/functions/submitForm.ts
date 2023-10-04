
// React + Next
import { RefObject } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

// Internal
import { newCookie } from "@/services/auth-service/backend/controllers";
import { clientRoute } from "@shared/classes/route";
import { AuthResponseProps } from "@shared/interfaces";
import { type UseVerifyTokenReturnProps, useVerifyTokenWithJWT } from "@/core/controllers/verifyToken";
import logIn from "./logIn";

/**
 * Handles the form submission, including the account credentials check, alerting on error and redirections.
 * @param ref The form's reference.
 * @param router A {@link AppRouterInstance | router instance} for redirection on user authentication error.
 */
const submitForm = async (ref: RefObject<HTMLFormElement>, router: AppRouterInstance): Promise<void> => {
  const authResponse: AuthResponseProps = await logIn(ref);

  if (!authResponse.success) {
    return alert(authResponse.message);
  }

  const { success, result: tokenResponse }: UseVerifyTokenReturnProps = await useVerifyTokenWithJWT(authResponse.jwt!);

  if (!success) {
    router.push(clientRoute.auth.login.use())
  }

  await newCookie("id", authResponse.jwt!, tokenResponse.payload!.exp! * 1000);

  router.push(clientRoute.app.use());
}

export default submitForm;
