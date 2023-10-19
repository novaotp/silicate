
import { ResponseProps } from "./common";

/**
 * The data of a note :
 * - title : The title of the note
 * - content : The content of the note
 */
interface Note {
  /** The title of the note. */
  title: string;
  /** The content of the note. */
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

/** An request interface for creating a note. */
export interface CreateNoteRequestProps extends Note { }

/** An response interface for creating a note. */
export interface CreateNoteResponseProps extends ResponseProps {
  /** The id of the newly created note. */
  noteId?: string;
}

/** A request interface for updating a note. */
export interface UpdateNoteRequestProps extends Note { }

/** A response interface for updating a note. */
export interface UpdateNoteResponseProps extends ResponseProps { }

/** A response interface for deleting a note. */
export interface DeleteNoteResponseProps extends ResponseProps { }

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
