
// Next
import { Metadata } from "next"

// Internal
import { Gradebooks } from "@components/gradebook";
import { GradebookProps } from "@shared/interfaces";

export const metadata: Metadata = {
  title: "Gradebooks - Silicate"
}

/** The gradebooks page. */
const Page = () => {
  const gradebooks: GradebookProps[] = [
    { name: "EPTM 2023-2024" },
    { name: "MATU 2023-2024" }
  ]; // TODO: await getGradebooks()

  return (
    <Gradebooks gradebooks={gradebooks} />
  )
}

export default Page;
