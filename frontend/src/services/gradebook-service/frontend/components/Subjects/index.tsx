'use client'

// Next
import Link from "next/link";

// Internal
import { SubjectProps } from "@shared/interfaces"
import { NoSubjectsFound, RenderSubjects } from "./components";
import route from "@utils/route";

interface SubjectComponentsProps {
  subjects: SubjectProps[];
}

export default function SubjectsComponents({ subjects }: SubjectComponentsProps) {
  const returnHref = route.app.gradebooks.use();

  return (
    <div>
      <Link href={returnHref}>Return</Link>
      {subjects.length > 0 && <RenderSubjects subjects={subjects} />}
      {subjects.length === 0 && <NoSubjectsFound />}
    </div>
  )
}