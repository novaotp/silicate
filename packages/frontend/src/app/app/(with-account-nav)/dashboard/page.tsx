
// Next
import { Metadata } from "next";

// Internal
import { Dashboard } from "@/services/dashboard-service";

export const metadata: Metadata = {
  title: "Dashboard - Silicate"
}

/** The dashboard page. */
const Page = (): JSX.Element => {
  return (
    <Dashboard />
  )
}

export default Page;
