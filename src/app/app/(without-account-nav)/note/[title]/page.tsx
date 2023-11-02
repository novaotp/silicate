
// Next
import { Metadata } from "next";

// Internal
import { Edit } from "@components/note";

export const metadata: Metadata = {
  title: "Editing note - Silicate"
}

/** The editing note page. */
const Page = async (): Promise<JSX.Element> => {
  return (
    <Edit />
  )
}

export default Page;
