'use client'

import { SubjectProps } from "@shared/interfaces"
import { NoSubjectsFound, RenderSubjects } from "./components";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getParentLink } from "@core/functions";

interface SubjectComponentsProps {
  subjects: SubjectProps[];
}

export default function SubjectsComponents({ subjects }: SubjectComponentsProps) {
  const gradebookPathname = getParentLink();

  return (
    <div>
      <Link href={gradebookPathname}>Return</Link>
      {subjects.length > 0 && <RenderSubjects subjects={subjects} />}
      {subjects.length === 0 && <NoSubjectsFound />}
    </div>
  )
}