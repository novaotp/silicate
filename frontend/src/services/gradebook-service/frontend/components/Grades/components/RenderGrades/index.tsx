import { GradeProps } from "@shared/interfaces";
import styles from './index.module.css';

interface RenderGradesProps {
  grades: GradeProps[];
}

export default function RenderGrades({ grades }: RenderGradesProps) {
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