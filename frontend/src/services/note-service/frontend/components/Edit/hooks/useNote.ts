
"use client";

// React
import { useEffect, useState } from "react";

// SWR
import useSWR from "swr";

// Internal
import { serverRoute } from "@shared/classes/route";
import { NoteProps, NoteResponseProps, ReadNoteResponseProps } from "@shared/interfaces";
import { Note, UseNoteProps } from "../interfaces";
import Requests from "@/core/requests";

type CustomFetcherProps = [string, string, number];

/** A custom fetcher for the {@link useNote} hook. */
const customFetcher = async (props: CustomFetcherProps) => {
  const url = props[0];
  const noteId = props[1];
  const userID = props[2];

  const response = await Requests.post(url, { id: noteId, userID });
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

/**
 * Fetches a specific note's data, comes with error and loading handling.
 * @param noteId The note's id.
 * @param userID The user's id.
 * @returns A {@link UseNoteProps} object.
 */
const useNote = (noteId: string, userID: number): UseNoteProps => {
  const [note, setNote] = useState<Note>({
    id: Number(noteId),
    title: "",
    content: "",
    initialTitle: "",
    initialContent: "",
    created_at: 0,
    updated_at: 0
  });
  const url = process.env.NEXT_PUBLIC_API_SERVER_URL + serverRoute.notes.read.use();
  const { data, error, isLoading } = useSWR([url, noteId, userID], customFetcher);

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