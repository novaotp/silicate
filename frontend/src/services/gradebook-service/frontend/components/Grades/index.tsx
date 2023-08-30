'use client';

import { GradeProps } from "@shared/interfaces"
import { NoGradesFound, RenderGrades } from "./components";
import BackLink from "../shared/BackLink";
import styles from './index.module.css';
import route from "@utils/route";
import { usePathname } from "next/navigation";

interface GradesComponentProps {
  grades: GradeProps[];
}

export default function GradesComponent({ grades }: GradesComponentProps) {
  const bookName: string = usePathname().split("/").at(-2)!;
  const returnHref = route.app.gradebooks.book(bookName).use();
  
  return (
    <div className={styles.window}>
      <BackLink href={returnHref} />
      {grades.length > 0 && <RenderGrades grades={grades} />}
      {grades.length === 0 && <NoGradesFound />}
    </div>
  )
}