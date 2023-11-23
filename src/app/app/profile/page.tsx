
// Next
import { Metadata } from "next";

// Internal
import { Profile } from "./page.components";

export const metadata: Metadata = {
  title: "Mon profil - Silicate"
}

/** The profile page. */
const Page = (): JSX.Element => {
  return (
    <Profile />
  )
}

export default Page;