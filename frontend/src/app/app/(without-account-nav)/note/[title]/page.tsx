// Next
import {Metadata} from "next";
import {cookies, headers} from "next/headers";

// Internal
import VerifyToken from "@core/controllers/verifyToken";
import {clientRoute, serverRoute} from "@shared/classes/route";
import {NoteProps, NotesResponseProps, TokenResponseProps} from "@shared/interfaces";
import EditComponent from "@/services/note-service/frontend/components/Edit";
import {redirect} from "next/navigation";

function getId(): string {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  return decodeURIComponent(pathname.split("/").at(-1)!);
}

export const metadata: Metadata = {
  title: `Editing note - Silicate`
}

const fetchNote = async (): Promise<NoteProps | undefined> => {
  const tokenResponse: TokenResponseProps = await VerifyToken.api({ jwt: cookies().get('id')?.value });

  if (!tokenResponse.success) {
    return undefined;
  }

  const id = getId();
  const url = process.env.API_SERVER_URL + serverRoute.notes.read.use();
  const init: RequestInit = {
    method: "POST",
    body: JSON.stringify({ id: id, userID: tokenResponse.payload!.payload.userID }),
    headers: {
      'content-type': 'application/json'
    }
  }

  const response = await fetch(url, init);
  const result: NotesResponseProps = await response.json();
  const note: { user_id: number } & NoteProps = JSON.parse(result.notes);

  const processedNote: NoteProps = {
    id: note.id,
    title: note.title,
    content: note.content
  };

  return processedNote;
}

export default async function Page() {
  const note: NoteProps | undefined = await fetchNote();

  if (!note) {
    redirect(clientRoute.app.notes.use());
  }

  return (
    <EditComponent note={note} />
  )
}