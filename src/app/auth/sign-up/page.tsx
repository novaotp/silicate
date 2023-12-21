// Next
import type { Metadata } from "next";

// Internal
import { SignUp } from "@components/auth/sign-up";

export const metadata: Metadata = {
    title: "Inscription - Silicate",
};

/** The sign-up page. */
const Page = (): JSX.Element => {
    return <SignUp />;
};

export default Page;
