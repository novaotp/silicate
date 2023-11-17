
"use client";

// Next
import Link from "next/link";

// Internal
import styles from "./index.module.scss";
import { Gradebook } from "@/models/gradebook";

interface GradebookCardProps {
  gradebook: Gradebook
}

export const GradebookCard = ({ gradebook }: GradebookCardProps): JSX.Element => {
  const toTwoDigits = (number: number): string => {
    return number.toString().padStart(2, '0');
  }

  const formattedDate = (date: Date): string => {
    const today = new Date();
    const hours = toTwoDigits(date.getHours());
    const minutes = toTwoDigits(date.getMinutes());

    if  (date.getFullYear() === today.getFullYear() &&
         date.getMonth() === today.getMonth() &&
         date.getDate() === today.getDate()
    ) {
      return `Aujourd'hui à ${hours}:${minutes}`;
    }

    const year = date.getFullYear();
    const month = toTwoDigits(date.getMonth() + 1);
    const day = toTwoDigits(date.getDate());

    return `${day}.${month}.${year} à ${hours}:${minutes}`;
  }

  return (
    <li className={styles.note}>
      <Link href={`/app/gradebooks/${gradebook.id}`} className={styles.link}>
        <div className={styles.header}>
          <span className={styles.title}>{gradebook.name}</span>
          &nbsp;
          &nbsp;
          <span className={styles.date}>{formattedDate(gradebook.updated_at)}</span>
        </div>
        <div className={styles.content}>
          {gradebook.description}
        </div>
      </Link>
    </li>
  )
}
