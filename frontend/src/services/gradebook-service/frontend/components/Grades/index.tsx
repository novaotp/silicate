'use client';

import { GradeProps } from "@shared/interfaces"

interface GradesComponentProps {
  grades: GradeProps[];
}

function RenderGrades({ grades }: { grades: GradeProps[] }) {
  return (
    <ul>
      {
        grades.map(grade => {
          return (
            <li key={grade.title}>
              {grade.title} : {grade.value}
            </li>
          )
        })
      }
    </ul>
  )
}

function NoGradesFound() {
  return (
    <>
      <p>No gradebooks found !</p>
      <p>You should create one.</p>
    </>
  )
}

export default function GradesComponent({ grades }: GradesComponentProps) {
  return (
    <div>
      {grades.length > 0 && <RenderGrades grades={grades} />}
      {grades.length === 0 && <NoGradesFound />}
    </div>
  )
}