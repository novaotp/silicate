
interface EditComponentProps {
  /** The note's id. */
  noteId: string;
  /** The user's id. */
  userID: number;
}

/** A note object in the [EditComponent](../index.tsx). */
interface Note {
  /** The id in the database. */
  id: number,
  /** The current title. */
  title: string,
  /** The current content. */
  content: string,
  /** The initial title. */
  initialTitle: string,
  /** The initial content. */
  initialContent: string,
  /** The creation date in milliseconds. */
  created_at: number;
  /** The last update date in milliseconds. */
  updated_at: number;
}

/** The return type of the [useNote](../hooks/useNote.ts) hook. */
interface UseNoteProps {
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

export type { EditComponentProps, Note, UseNoteProps };
