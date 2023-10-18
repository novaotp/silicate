
import Requests from "@utils/requests";
import { NoteProps, NotesResponseProps } from "@shared/interfaces";

const fetcher = async (url: string): Promise<NoteProps[]> => {
  const response = await Requests.noStore.get(url);
  const result: NotesResponseProps = await response.json();
  const notes: ({ user_id: number } & NoteProps)[] = JSON.parse(result.notes);

  const processedNotes: NoteProps[] = notes.map(({ user_id, ...rest }) => rest);

  return processedNotes;
};

export default fetcher;
