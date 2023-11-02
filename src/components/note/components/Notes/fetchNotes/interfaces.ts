
import { NoteProps } from "@shared/interfaces";

interface FetchNotesReturnProps {
  /** The notes themselves or undefined. */
  notes: NoteProps[] | undefined;
  /** An error if the data fetching failed. */
  isError: any;
  /** A loading state if the data fetching is still pending. */
  isLoading: any;
}

export default FetchNotesReturnProps;
