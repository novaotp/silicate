import { ProfileComponent } from "@/services/account-service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile - Silicate"
}

/** Returns the profile page. */
const Page = (): JSX.Element => {
  return (
    <ProfileComponent />
  )
}

export default Page;
