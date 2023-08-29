import { SubjectProps } from "@shared/interfaces"
import { NoSubjectsFound, RenderSubjects } from "./components";

interface SubjectComponentsProps {
  subjects: SubjectProps[];
}

export default function SubjectsComponents({ subjects }: SubjectComponentsProps) {
  return (
    <div>
      {subjects.length > 0 && <RenderSubjects subjects={subjects} />}
      {subjects.length === 0 && <NoSubjectsFound />}
    </div>
  )
}