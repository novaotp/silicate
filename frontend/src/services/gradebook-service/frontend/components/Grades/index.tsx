import { GradeProps } from "@shared/interfaces"
import { NoGradesFound, RenderGrades } from "./components";

interface GradesComponentProps {
  grades: GradeProps[];
}

export default function GradesComponent({ grades }: GradesComponentProps) {
  return (
    <div>
      {grades.length > 0 && <RenderGrades grades={grades} />}
      {grades.length === 0 && <NoGradesFound />}
    </div>
  )
}