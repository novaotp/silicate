
"use client";

// SWR
import useSWR from "swr";

// Internal
import Requests from "@utils/requests";
import FetchNotesReturnProps from "./interfaces";
import { newServerRoute as serverRoute } from "@shared/utils/routes";
import { NoteProps, ReadAllNotesResponseProps } from "@shared/interfaces";

const fetcher = async (url: string): Promise<NoteProps[] | undefined> => {
  const response = await Requests.noStore.get(url);
  const result: ReadAllNotesResponseProps = await response.json();

  return result.notes;
};

/** Fetches the notes. */
const fetchNotes = (): FetchNotesReturnProps => {
  const url = process.env.NEXT_PUBLIC_API_SERVER_URL + serverRoute.notes.readAll.client();
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    notes: data,
    isError: error,
    isLoading
  }
}

export default fetchNotes;
