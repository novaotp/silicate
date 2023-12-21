"use client";

// React
import { useEffect, useMemo, useRef } from "react";

// Internal
import styles from "./index.module.scss";
import { useCustomSearchParams } from "@libs/hooks/useCustomSearchParams";

/// -- Components -- ///
import { Loading } from "@/app/_components/Loading";
import { EmptyView, GradeCard } from "./_components";
import { Grade } from "@/models/grade";

interface ViewProps {
    grades: Grade[] | undefined;
}

export const View = ({ grades }: ViewProps): JSX.Element => {
    const ref = useRef<HTMLUListElement>(null);
    const { searchParams } = useCustomSearchParams();
    const searchQuery = searchParams.get("search") ?? "";

    const sortedAndFilteredGrades = useMemo(() => {
        if (!grades) return [];

        return grades
            .filter(
                (grades) =>
                    searchQuery === "" ||
                    grades.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            )
            .sort(
                (grade1, grade2) =>
                    grade2.updated_at.getTime() - grade1.updated_at.getTime()
            );
    }, [grades, searchQuery]);

    return (
        <ul className={styles.notes} ref={ref}>
            {!grades ? (
                <Loading text='Chargement de tes notes...' />
            ) : sortedAndFilteredGrades.length === 0 ? (
                <EmptyView isSearchQueryEmpty={searchQuery === ""} />
            ) : (
                sortedAndFilteredGrades.map((grade: Grade) => (
                    <GradeCard key={grade.id} grade={grade} />
                ))
            )}
        </ul>
    );
};
