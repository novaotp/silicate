import GradebookComponent from "@/services/gradebook-service/frontend/components/Gradebooks"
import { GradebookProps } from "@shared/interfaces";
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gradebooks - Silicate"
}

export default async function Page() {
  const gradebooks: GradebookProps[] = [
    { name: "EPTM 2023-2024" },
    { name: "MATU 2023-2024" }
  ]; // TODO: await getGradebooks()

  return (
    <GradebookComponent gradebooks={gradebooks} />
  )
}