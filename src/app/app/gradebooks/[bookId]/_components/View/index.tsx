
"use client";

// React
import { useEffect, useMemo, useRef } from "react";

// Internal
import styles from "./index.module.scss";
import { useCustomSearchParams } from "@libs/hooks/useCustomSearchParams";
import { Subject } from "@/models/subject";

/// -- Components -- ///
import { Loading } from "@/app/_components/Loading";
import { EmptyView, SubjectCard } from "./_components";

interface ViewProps {
  subjects: Subject[] | undefined,
}

export const View = ({ subjects }: ViewProps): JSX.Element => {
  const ref = useRef<HTMLUListElement>(null);
  const { searchParams } = useCustomSearchParams();
  const searchQuery = searchParams.get('search') ?? '';

  const sortedAndFilteredSubjects = useMemo(() => {
    if (!subjects) return [];

    return subjects
      .filter(subjects => searchQuery === "" || subjects.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((subject1, subject2) => subject2.updated_at.getTime() - subject1.updated_at.getTime());
  }, [subjects, searchQuery]);

  return (
    <ul className={styles.notes} ref={ref}>
      {
        !subjects
          ? <Loading text="Chargement des branches..." />
          : sortedAndFilteredSubjects.length === 0
            ? <EmptyView isSearchQueryEmpty={searchQuery === ""} />
            : sortedAndFilteredSubjects.map((subject: Subject) => <SubjectCard key={subject.id} subject={subject} />)
      }
    </ul>
  );
}
