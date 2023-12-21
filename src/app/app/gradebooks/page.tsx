// Next
import { Metadata } from "next";

// Internal
import { Gradebooks } from "./page.components";

export const metadata: Metadata = {
    title: "Mes carnets de notes - Silicate",
};

/** The gradebooks page. */
const Page = async () => {
    return <Gradebooks />;
};

export default Page;
