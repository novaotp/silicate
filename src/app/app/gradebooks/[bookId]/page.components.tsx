
'use client';

// React
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Internal
import { BackLink } from "../_components";
import styles from './page.module.scss';
import { Meta, View, AddSubject } from "./_components";
import { fetchSubjects } from "./server";
import { Subject } from "@/models/subject";
import { poppins } from "@/fonts";

/** The main component of the subjects page. */
export const Subjects = () => {
  const gradebookId = useParams().bookId as string;
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [subjects, setSubjects] = useState<Subject[] | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const subjects = await fetchSubjects(gradebookId);

      if (!subjects) {
        router.push('/app/gradebooks');
        return;
      }

      setSubjects(subjects);
    })();
  }, []);

  const handleAddSubject = () => {
    dialogRef.current!.showModal();
  }

  return (
    <div className={styles.window}>
      <BackLink />
      <AddSubject dialogRef={dialogRef} />
      <Meta />
      <View subjects={subjects} />
      <button
        className={`${styles.add} ${poppins.className}`}
        onClick={handleAddSubject}
      >
        Ajouter une branche
      </button>
    </div>
  )
}
