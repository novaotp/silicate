
"use client";

// Next
import Link from "next/link";

// Internal
import styles from "./index.module.scss";
import { Gradebook } from "@/models/gradebook";
import { format } from "date-fns";
import { Subject } from "@/models/subject";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { UpdateSubject } from "../../../UpdateSubject";

interface SubjectCardProps {
  subject: Subject
}

export const SubjectCard = ({ subject }: SubjectCardProps): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const gradebookId = Number(useParams().bookId as string);

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

  const formatDate = (date: Date) => {
    return format(date, 'dd.MM.yyyy');
  }

  return (
    <li className={styles.note}>
      <Link href={`/app/gradebooks/${gradebookId}/${subject.id}`} className={styles.link}>
        <div>
          <div className={styles.header}>
            <span className={styles.title}>{subject.name}</span>
            &nbsp;
            &nbsp;
            <span className={styles.date}>{formattedDate(subject.updated_at)}</span>
          </div>
          <div className={styles.content}>
            {subject.description}
          </div>
        </div>
      </Link>
      <button onClick={() => dialogRef.current!.showModal()}>:</button>
      <UpdateSubject subject={subject} dialogRef={dialogRef} />
    </li>
  )
}
