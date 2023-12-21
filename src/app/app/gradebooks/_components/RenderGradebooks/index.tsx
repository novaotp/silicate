"use client";

import styles from "./index.module.scss";
import { GradebookProps } from "@shared/interfaces";
import GradebookCard from "./GradebookCard";

interface RenderGradebooksProps {
    gradebooks: GradebookProps[];
}

export default function RenderGradebooks({
    gradebooks,
}: RenderGradebooksProps) {
    return (
        <ul className={styles.ul}>
            {gradebooks.map((gradebook) => {
                return (
                    <GradebookCard key={gradebook.name} gradebook={gradebook} />
                );
            })}
        </ul>
    );
}
