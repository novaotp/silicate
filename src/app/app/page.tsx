
// Next
import { Metadata } from "next";

// Internal
import { Dashboard } from "./page.components";

export const metadata: Metadata = {
  title: "Dashboard - Silicate"
}

/** The dashboard page. */
const Page = async (): Promise<JSX.Element> => {
  return (
    <Dashboard />
  )
}

export default Page;
