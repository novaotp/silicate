
"use client";

// React
import { useEffect, useMemo, useRef } from "react";

// Internal
import styles from "./index.module.scss";
import { useCustomSearchParams } from "@libs/hooks/useCustomSearchParams";
import { Memo } from "@/models/memo";

/// -- Components -- ///
import { Loading } from "@/app/_components/Loading";
import { EmptyView, GradebookCard } from "./_components";
import { Gradebook } from "@/models/gradebook";

interface ViewProps {
  gradebooks: Gradebook[] | undefined,
}

export const View = ({ gradebooks }: ViewProps): JSX.Element => {
  const ref = useRef<HTMLUListElement>(null);
  const { searchParams } = useCustomSearchParams();
  const searchQuery = searchParams.get('search') ?? '';

  const sortedAndFilteredGradebooks = useMemo(() => {
    if (!gradebooks) return [];

    return gradebooks
      .filter(gradebooks => searchQuery === "" || gradebooks.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((gradebook1, gradebook2) => gradebook2.updated_at.getTime() - gradebook1.updated_at.getTime());
  }, [gradebooks, searchQuery]);

  return (
    <ul className={styles.notes} ref={ref}>
      {
        !gradebooks
          ? <Loading text="Chargement de tes carnets de notes..." />
          : sortedAndFilteredGradebooks.length === 0
            ? <EmptyView isSearchQueryEmpty={searchQuery === ""} />
            : sortedAndFilteredGradebooks.map((gradebook: Gradebook) => <GradebookCard key={gradebook.id} gradebook={gradebook} />)
      }
    </ul>
  );
}
