
// Next
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

// Internal
import useVerifyToken from "@hooks/useVerifyToken";
import { clientRoute } from "@shared/classes/routes";
import { Edit } from "@components/note";

function getId(): string {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  return decodeURIComponent(pathname.split("/").at(-1)!);
}

export const metadata: Metadata = {
  title: `Editing note - Silicate`
}

/** The editing note page. */
const Page = async (): Promise<JSX.Element> => {
  const { success, result: tokenResponse } = await useVerifyToken();

  if (!success) {
    redirect(clientRoute.app.notes.use());
  }

  const userID = tokenResponse.payload!.payload.userID;

  return (
    <Edit noteId={getId()} userID={userID} />
  )
}

export default Page;
