'use client';

import { GradeProps } from "@shared/interfaces"
import { NoGradesFound, RenderGrades } from "./components";
import BackLink from "../shared/BackLink";
import styles from './index.module.scss';

interface GradesComponentProps {
  grades: GradeProps[];
}

export default function GradesComponent({ grades }: GradesComponentProps) {  
  return (
    <div className={styles.window}>
      <BackLink />
      {grades.length > 0 && <RenderGrades grades={grades} />}
      {grades.length === 0 && <NoGradesFound />}
    </div>
  )
}