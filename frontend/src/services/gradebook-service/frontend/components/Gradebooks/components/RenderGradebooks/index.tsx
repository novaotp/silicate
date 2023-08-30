'use client';

// Next
import { usePathname } from "next/navigation";

// Internal
import styles from './index.module.css';
import { GradebookProps } from "@shared/interfaces";
import GradebookCard from "./GradebookCard";

interface RenderGradebooksProps {
  gradebooks: GradebookProps[];
}

export default function RenderGradebooks({ gradebooks }: RenderGradebooksProps) {
  const pathname = usePathname();

  return (
    <ul className={styles.ul}>
      {
        gradebooks.map(gradebook => {
          return (
            <GradebookCard key={gradebook.name} pathname={pathname} gradebook={gradebook} />
          )
        })
      }
    </ul>
  )
}