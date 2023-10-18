
import Requests from "@utils/requests";
import { NoteResponseProps, ReadNoteResponseProps, NoteProps } from "@shared/interfaces";
import { CustomFetcherProps } from "./interfaces";

/** A custom fetcher for the {@link import('./index.ts').useNote} hook. */
const fetcher = async (props: CustomFetcherProps) => {
  const url = props[0];
  const noteId = props[1];

  const response = await Requests.noStore.get(url);
  const result: NoteResponseProps = await response.json();
  const note: ReadNoteResponseProps = JSON.parse(result.note);

  const processedNote: NoteProps = {
    id: note.id,
    title: note.title,
    content: note.content,
    created_at: note.created_at,
    updated_at: note.updated_at,
    deleted_at: note.deleted_at
  };

  return processedNote;
};

export default fetcher;
