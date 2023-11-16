
// Next
import { Metadata } from "next"

// Internal
import { Gradebooks } from "@components/gradebook";
import { Gradebook } from "@models/gradebook";
import { GetGradebooks } from "./server";

export const metadata: Metadata = {
  title: "Mes carnets de notes - Silicate"
}

/** The gradebooks page. */
const Page = async () => {
  const gradebooks: Gradebook[] = await GetGradebooks();
  
  return (
    <Gradebooks gradebooks={gradebooks}/>
  )
}

export default Page;
