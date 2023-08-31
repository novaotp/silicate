'use client'

import { useState } from "react";

import route from "@/core/utils/route";
import { SubjectProps } from "@shared/interfaces"
import { NoSubjectsFound, RenderSubjects } from "./components";
import BackLink from "../shared/BackLink";
import SearchField from "../shared/SearchField";
import styles from './index.module.css';

interface SubjectComponentsProps {
  subjects: SubjectProps[];
}

export default function SubjectsComponents({ subjects }: SubjectComponentsProps) {
  const [filter, setFilter] = useState<string>("");
  const returnHref = route.app.gradebooks.use();

  return (
    <div className={styles.window}>
      <BackLink href={returnHref} />
      <SearchField filter={filter} setFilter={setFilter} />
      {subjects.length > 0 && <RenderSubjects filter={filter} subjects={subjects} />}
      {subjects.length === 0 && <NoSubjectsFound />}
    </div>
  )
}