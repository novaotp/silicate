
// Next
import { Metadata } from "next";

// Internal
import { Memos } from "./page.components";

export const metadata: Metadata = {
  title: "Mes mémos - Silicate"
}

/** The notes page. */
const Page = (): JSX.Element => {
  return (
    <Memos />
  )
}

export default Page;
