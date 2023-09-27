
import { ResponseProps } from "./common";

interface Note {
  title: string;
  content: string;
}

export interface NoteProps extends Note {
  /** The note's id in the database */
  id: number;
  /** The creation date in milliseconds. */
  created_at: number;
  /** The last update date in milliseconds. */
  updated_at: number;
  /** The deletion date in milliseconds (e.g. for temporary recovery by user, for 30 days for example). */
  deleted_at?: number;
}

export interface AddNoteProps {
  userID: number;
  title: string;
  content: string;
}

export interface EditNoteProps extends NoteProps {
  userID: number;
}

export interface ReadNoteProps {
  id: number;
  userID: number;
}

export interface ReadNoteResponseProps extends ReadNoteProps, Note {
  /** The creation date in milliseconds. */
  created_at: number;
  /** The last update date in milliseconds. */
  updated_at: number;
  /** The deletion date in milliseconds (e.g. for temporary recovery by user, for 30 days for example). */
  deleted_at?: number;
}

export interface RemoveNoteProps {
  id: number;
  userID: number;
}

export interface NotesResponseProps extends ResponseProps {
  /** This is a stringified array, must use {@link JSON.parse} to use. */
  notes: string;
}

export interface NoteResponseProps extends ResponseProps {
  /** This is a stringified object, must use {@link JSON.parse} to use. */
  note: string;
}
