
"use client";

// React + Next
import { useEffect, useState } from "react";
import { redirect, usePathname, useRouter } from "next/navigation";

// SWR
import useSWR from "swr";

// Internal
import Requests from "@utils/requests";
import { clientRoute, newServerRoute as serverRoute } from "@shared/utils/routes";
import Note, { UseNoteReturnProps } from "./interfaces";
import { NoteProps, ReadNoteResponseProps } from "@shared/interfaces";

/** Returns the note id from the url casted as an int. */
const getNoteId = (): number => {
  return Number(usePathname().split('/').pop()!);
}

/** A custom fetcher for the {@link useNote} hook. */
const fetcher = async (url: string): Promise<ReadNoteResponseProps> => {
  const response = await Requests.noStore.get(url);
  return await response.json();
};

/** Fetches a specific note's data, comes with error and loading handling. */
const useNote = (): UseNoteReturnProps => {
  const id = getNoteId();
  const router = useRouter();
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
  const { data: response, error, isLoading } = useSWR(url, fetcher);

  // Set default data
  useEffect(() => {
    if (response) {
      if (!response.success) {
        redirect(clientRoute.app.notes.use());
      }

      if (response.note) {
        const data = response!.note;

        updateNoteField('title', data.title);
        updateNoteField('content', data.content);
        updateNoteField('initialTitle', data.title);
        updateNoteField('initialContent', data.content);
        updateNoteField('created_at', data.created_at);
        updateNoteField('updated_at', data.updated_at);
      }
    }
  }, [response]);

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
