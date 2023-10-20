
"use client";

// SWR
import useSWR from "swr";

// Internal
import fetcher from "./fetcher";
import FetchNotesReturnProps from "./interfaces";
import { newServerRoute as serverRoute } from "@shared/utils/routes";

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
