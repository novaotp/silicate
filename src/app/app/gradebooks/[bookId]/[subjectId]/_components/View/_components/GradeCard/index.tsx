"use client";

// Next
import Link from "next/link";

// Internal
import styles from "./index.module.scss";
import { format } from "date-fns";
import { Grade } from "@/models/grade";
import { poppins } from "@/fonts";
import { useRef } from "react";
import { UpdateGrade } from "../../../UpdateGrade";

interface GradeCardProps {
    grade: Grade;
}

export const GradeCard = ({ grade }: GradeCardProps): JSX.Element => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const toTwoDigits = (number: number): string => {
        return number.toString().padStart(2, "0");
    };

    const formattedDate = (date: Date): string => {
        const today = new Date();
        const hours = toTwoDigits(date.getHours());
        const minutes = toTwoDigits(date.getMinutes());

        if (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
        ) {
            return `Aujourd'hui à ${hours}:${minutes}`;
        }

        const year = date.getFullYear();
        const month = toTwoDigits(date.getMonth() + 1);
        const day = toTwoDigits(date.getDate());

        return `${day}.${month}.${year} à ${hours}:${minutes}`;
    };

    const formatDate = (date: Date) => {
        return format(date, "dd.MM.yyyy");
    };

    return (
        <li className={styles.note}>
            <button
                className={`${styles.link} ${poppins.className}`}
                onClick={() => dialogRef.current!.showModal()}
            >
                <div className={styles.meta}>
                    <div className={styles.header}>
                        <span className={styles.title}>{grade.name}</span>
                        &nbsp; &nbsp;
                        <span className={styles.date}>
                            {formattedDate(grade.updated_at)}
                        </span>
                    </div>
                    <div className={styles.content}>{grade.comment}</div>
                </div>
                <div className={styles.score}>
                    <span>{grade.score}</span>
                </div>
            </button>
            <UpdateGrade grade={grade} dialogRef={dialogRef} />
        </li>
    );
};
