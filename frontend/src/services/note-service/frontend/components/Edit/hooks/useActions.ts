
"use client";

// React
import { FormEvent } from "react";

// Internal
import type Note from "../interfaces";
import { updateNoteController } from "@/services/note-service/backend/controllers";
import ResponseProps, { EditNoteProps } from "@shared/interfaces";

interface UseActionsProps {
  /** The note to handle. */
  note: Note;
  /**
   * A helper function to set values in the note.
   * @param key The key in the note to set.
   * @param value The new value of the key.
   */
  updateNoteField: (key: keyof Note, value: string | number) => void;
}

interface UseActionsReturnProps {
  /**
   * Handles the update of the note on the form's submit.
   * @param event The form's event.
   */
  update: (event: FormEvent) => Promise<void>;
  /** Discards the changes and sets the value to the initial values. */
  discard: () => void;
}

/** A hook to handle the different actions in the edit component. */
const useActions = ({ note, updateNoteField }: UseActionsProps): UseActionsReturnProps => {
  /**
   * Handles the update of the note on the form's submit.
   * @param event The form's event.
   */
  const update = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const data: Pick<EditNoteProps, 'id' | "title" | "content"> = {
      id: note.id,
      title: note.title,
      content: note.content
    }

    const response: ResponseProps = await updateNoteController(data);

    if (response.success) {
      updateNoteField('initialTitle', note.title);
      updateNoteField('initialContent', note.content);
    }
  }

  /** Discards the changes and sets the value to the initial values. */
  const discard = (): void => {
    updateNoteField('title', note.initialTitle);
    updateNoteField('content', note.initialContent);
  }

  return {
    update,
    discard
  }
}

export default useActions;
