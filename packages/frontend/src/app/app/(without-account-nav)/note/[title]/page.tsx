
// Next
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

// Internal
import useVerifyToken, { UseVerifyTokenReturnProps } from "@/core/hooks/useVerifyToken";
import { clientRoute } from "@shared/classes/routes";
import { EditComponent } from "@/services/note-service";

function getId(): string {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  return decodeURIComponent(pathname.split("/").at(-1)!);
}

export const metadata: Metadata = {
  title: `Editing note - Silicate`
}

export default async function Page() {
  const { success, result: tokenResponse }: UseVerifyTokenReturnProps = await useVerifyToken();

  if (!success) {
    redirect(clientRoute.app.notes.use());
  }

  const userID = tokenResponse.payload!.payload.userID;

  return (
    <EditComponent noteId={getId()} userID={userID} />
  )
}
