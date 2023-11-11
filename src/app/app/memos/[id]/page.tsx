
// Next
import { Metadata } from "next";

// Internal
import { Edit } from "./page.components";

export const metadata: Metadata = {
  title: "Editing memo - Silicate"
}

/** The editing memo page. */
const Page = async (): Promise<JSX.Element> => {
  return (
    <Edit />
  )
}

export default Page;
