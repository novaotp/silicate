
// Next
import { Metadata } from "next";

// Internal
import { Dashboard } from "@components/dashboard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { clientRoute } from "@shared/utils/routes";
import TokenVerifier from "@utils/tokenVerifier";

export const metadata: Metadata = {
  title: "Dashboard - Silicate"
}

/** The dashboard page. */
const Page = async (): Promise<JSX.Element> => {
  const cookie = cookies().get('id');

  if (!cookie) {
    redirect(clientRoute.auth.login.use());
  }

  const { success, result } = await TokenVerifier.verify(cookie.value);

  if (!success) {
    redirect(clientRoute.auth.login.use());
  }

  return (
    <Dashboard userId={result.payload!.payload.userID} />
  )
}

export default Page;
