
// Next
import { Metadata } from "next";

// Internal
import useVerifyToken, { UseVerifyTokenReturnProps } from "@core/controllers/verifyToken";
import { NoteComponent } from "@/services/note-service";
import { serverRoute } from "@shared/classes/route";
import { NoteProps, NotesResponseProps } from "@shared/interfaces";
import Requests from "@/core/requests";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "My Notes - Silicate"
}

const fetchNotes = async (): Promise<NoteProps[]> => {
  const { success, result: tokenResponse }: UseVerifyTokenReturnProps = await useVerifyToken();

  if (!success) {
    return [];
  }

  const url = process.env.API_SERVER_URL + serverRoute.notes.use();
  const response = await Requests.noStorePost(url, { userID: tokenResponse.payload!.payload.userID });

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