
// Next
import { Metadata } from "next"

// Internal
import { Gradebooks } from "@components/gradebook";
import { GradebookProps } from "@shared/interfaces";
import { GetGradebooks } from "./server";

export const metadata: Metadata = {
  title: "Mes carnets de notes - Silicate"
}

/** The gradebooks page. */
const Page = async () => {
  const gradebooks: GradebookProps[] = await GetGradebooks();
  
  return (
    <Gradebooks />
  )
}

export default Page;
