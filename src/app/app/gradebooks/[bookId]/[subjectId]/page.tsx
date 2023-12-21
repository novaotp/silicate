// Internal
import { Metadata } from "next";

// Internal
import { Grades } from "./page.components";

export const metadata: Metadata = {
    title: "Mon carnet de notes - Silicate",
};

/** The grades page. */
const Page = (): JSX.Element => {
    return <Grades />;
};

export default Page;
