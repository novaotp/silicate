
// Next
import { Metadata } from "next";

// Internal
import { Notes } from "@components/note";

export const metadata: Metadata = {
  title: "My Notes - Silicate"
}

/** The notes page. */
const Page = async (): Promise<JSX.Element> => {
  return (
    <Notes />
  )
}

export default Page;
