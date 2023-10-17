
// Next
import { Metadata } from "next";

// Internal
import useVerifyToken from "@hooks/useVerifyToken";
import { Notes } from "@components/note";
import Requests from "@utils/requests";
import { serverRoute } from "@shared/classes/routes";
import { NoteProps, NotesResponseProps } from "@shared/interfaces";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "My Notes - Silicate"
}

/** Fetches the notes. */
const fetchNotes = async (): Promise<NoteProps[]> => {
  const { success, result: tokenResponse } = await useVerifyToken();

  if (!success) {
    return [];
  }

  const url = process.env.API_SERVER_URL + serverRoute.notes.use();
  const response = await Requests.noStore.post(url, { userID: tokenResponse.payload!.payload.userID });

  const result: NotesResponseProps = await response.json();
  const notes: ({ user_id: number } & NoteProps)[] = JSON.parse(result.notes);

  const processedNotes: NoteProps[] = notes.map(({ user_id, ...rest }) => rest);

  return processedNotes;
}

/** The notes page. */
const Page = async (): Promise<JSX.Element> => {
  const notes: NoteProps[] = await fetchNotes();

  return (
    <Notes notes={notes} />
  )
}

export default Page;
