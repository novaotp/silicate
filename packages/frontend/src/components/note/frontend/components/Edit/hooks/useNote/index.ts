
"use client";

// React
import { useEffect, useState } from "react";

// SWR
import useSWR from "swr";

// Internal
import { newServerRoute as serverRoute } from "@shared/utils/routes";
import Note, { UseNoteReturnProps } from "./interfaces";
import getNoteId from "./getNoteId";
import fetcher from "./fetcher";

/** Fetches a specific note's data, comes with error and loading handling. */
const useNote = (): UseNoteReturnProps => {
  const id = getNoteId();
  const [note, setNote] = useState<Note>({
    id: id,
    title: "",
    content: "",
    initialTitle: "",
    initialContent: "",
    created_at: 0,
    updated_at: 0
  });
  const url = process.env.NEXT_PUBLIC_API_SERVER_URL + serverRoute.notes.read.client(id);
  const { data, error, isLoading } = useSWR([url, id], fetcher);

  // Set default data
  useEffect(() => {
    if (data) {
      updateNoteField('title', data.title);
      updateNoteField('content', data.content);
      updateNoteField('initialTitle', data.title);
      updateNoteField('initialContent', data.content);
      updateNoteField('created_at', data.created_at);
      updateNoteField('updated_at', data.updated_at);
    }
  }, [data]);

  /**
   * A helper function to set values in the note.
   * @param key The key in the note to set.
   * @param value The new value of the key.
   */
  const updateNoteField = (key: keyof Note, value: string | number): void => {
    setNote(prevNote => ({ ...prevNote, [key]: value }));
  };

  return {
    note,
    updateNoteField,
    isLoading,
    isError: error
  }
}

export default useNote;
