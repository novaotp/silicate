import verifyTokenController from "@core/controllers/verifyToken";
import { NoteComponent } from "@/services/note-service";
import { serverRoute } from "@shared/classes/route";
import { NoteProps, NotesResponseProps, TokenResponseProps } from "@shared/interfaces";
import { Metadata } from "next";
import { cookies } from "next/headers";
import VerifyToken from "@core/controllers/verifyToken";

export const metadata: Metadata = {
  title: "My Notes - Silicate"
}

const fetchNotes = async (): Promise<NoteProps[]> => {
  const tokenResponse: TokenResponseProps = await VerifyToken.api({ jwt: cookies().get('id')?.value });

  if (!tokenResponse.success) {
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