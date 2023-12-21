import { Metadata } from "next";
import { Schedule } from "./page.components";

export const metadata: Metadata = {
    title: "Mes horaires - Silicate",
};

const Page = () => {
    return <Schedule />;
};

export default Page;
