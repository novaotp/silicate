
// Next
import { Metadata } from "next";

// Internal
import useVerifyToken, { UseVerifyTokenReturnProps } from "@core/controllers/verifyToken";
import { NoteComponent } from "@/services/note-service";
import { serverRoute } from "@shared/classes/route";
import { NoteProps, NotesResponseProps } from "@shared/interfaces";

export const metadata: Metadata = {
  title: "My Notes - Silicate"
}

const fetchNotes = async (): Promise<NoteProps[]> => {
  const { success, result: tokenResponse }: UseVerifyTokenReturnProps = await useVerifyToken();

  if (!success) {
    return [];
  }

  const url = process.env.API_SERVER_URL + serverRoute.notes.use();
  const init: RequestInit = {
    method: "POST",
    body: JSON.stringify({ userID: tokenResponse.payload!.payload.userID }),
    headers: {
      'content-type': 'application/json'
    }
  }

  const response = await fetch(url, init);
  const result: NotesResponseProps = await response.json();
  const notes: ({ user_id: number } & NoteProps)[] = JSON.parse(result.notes);

  const processedNotes: NoteProps[] = notes.map(({ user_id, ...rest }) => rest);

  return processedNotes;
}

export default async function Page() {
  const notes: NoteProps[] = await fetchNotes();

  return (
      <NoteComponent notes={notes} />
  )
}