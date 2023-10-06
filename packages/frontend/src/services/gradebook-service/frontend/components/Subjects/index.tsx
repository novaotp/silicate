'use client'

// React
import { useState } from "react";

// Internal
import { SubjectProps } from "@shared/interfaces"
import { NoSubjectsFound, RenderSubjects } from "./components";
import BackLink from "../shared/BackLink";
import SearchField from "../shared/SearchField";
import styles from './index.module.scss';

interface SubjectComponentsProps {
  subjects: SubjectProps[];
}

export default function SubjectsComponents({ subjects }: SubjectComponentsProps) {
  const [filter, setFilter] = useState<string>("");

  return (
    <div className={styles.window}>
      <BackLink />
      <SearchField filter={filter} setFilter={setFilter} />
      {subjects.length > 0 && <RenderSubjects filter={filter} subjects={subjects} />}
      {subjects.length === 0 && <NoSubjectsFound />}
    </div>
  )
}