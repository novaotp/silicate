
'use client';

import { GradeProps } from "@shared/interfaces"
import { NoGradesFound, RenderGrades } from "./components";
import BackLink from "../shared/BackLink";
import styles from './index.module.scss';

interface GradesProps {
  grades: GradeProps[];
}

/** The main component of the grades page. */
const Grades = ({ grades }: GradesProps) => {
  return (
    <div className={styles.window}>
      <BackLink />
      {grades.length > 0 && <RenderGrades grades={grades} />}
      {grades.length === 0 && <NoGradesFound />}
    </div>
  )
}

export default Grades;
