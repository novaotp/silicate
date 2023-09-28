import Note from "../../interfaces";

type CustomFetcherProps = [string, string, number];

interface UseNoteProps {
  /** The note's id. */
  noteId: string;
  /** The user's id. */
  userID: number;
}

interface UseNoteReturnProps {
  /** The note itself or undefined. */
  note: Note | undefined;
  /**
   * A helper function to set values in the note.
   * @param key The key in the note to set.
   * @param value The new value of the key.
   */
  updateNoteField: (key: keyof Note, value: string | number) => void;
  /** An error if the data fetching failed. */
  isError: any;
  /** A loading state if the data fetching is still pending. */
  isLoading: any;
}

export type { CustomFetcherProps, UseNoteProps, UseNoteReturnProps };
export default Note;
