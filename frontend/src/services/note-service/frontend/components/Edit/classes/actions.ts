
"use client";

// React
import { FormEvent } from "react";

// Internal
import { Note } from "../interfaces";
import { updateNoteController } from "@/services/note-service/backend/controllers";
import { EditNoteProps, ResponseProps } from "@shared/interfaces";

/** A class to handle the different actions in the edit component. */
class Actions {
  /** The note to handle */
  private note: Note;
  /**
   * A helper function to set values in the note.
   * @param key The key in the note to set.
   * @param value The new value of the key.
   */
  private updateNoteField: (key: keyof Note, value: string | number) => void;

  /**
   * Handles the different actions in the edit component, such as update, cancel and delete.
   * @param note The note to handle.
   * @param updateNoteField A helper function to set values in the note.
   */
  constructor(note: Note, updateNoteField: (key: keyof Note, value: string | number) => void) {
    this.note = note;
    this.updateNoteField = updateNoteField;
  }

  /**
   * Handles the update of the note on the form's submit.
   * @param event The form's event.
   */
  public update = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const data: Pick<EditNoteProps, 'id' | "title" | "content"> = {
      id: this.note.id,
      title: this.note.title,
      content: this.note.content
    }

    const response: ResponseProps = await updateNoteController(data);

    if (response.success) {
      this.updateNoteField('initialTitle', this.note.title);
      this.updateNoteField('initialContent', this.note.content);
    }
  }

  /** Cancels the changes and sets the value to the initial values. */
  public cancel = (): void => {
    this.updateNoteField('title', this.note.initialTitle);
    this.updateNoteField('content', this.note.initialContent);
  }
}

export default Actions;
