
"use client";

import { Grade } from "@/models/grade"
import { useParams } from "next/navigation";
import { FormEvent, RefObject, useRef, useState } from "react";
import { UpdateGradeProps, deleteGrade, updateGrade } from "../../server";
import { reloadPage } from "@/utils/reloadPage";
import styles from "./index.module.scss";
import { InputField, TextArea } from "..";
import { poppins } from "@/assets/fonts";

export const UpdateGrade = ({ grade, dialogRef }: { grade: Grade, dialogRef: RefObject<HTMLDialogElement> }): JSX.Element => {
  const params = useParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState<string>(grade.name);
  const [score, setScore] = useState<string>(grade.score);
  const [weight, setWeight] = useState<number>(grade.weight);
  const [comment, setComment] = useState<string>(grade.comment);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!name) {
      alert("Veuillez renseigner un nom pour votre note.");
      return;
    }

    const updatedgrade: UpdateGradeProps = {
      gradeId: grade.id,
      subjectId: params.subjectId as string,
      name: name,
      score: score,
      weight: weight,
      comment: comment,
    }

    const success = await updateGrade(updatedgrade);

    if (!success) {
      alert("Une erreur est survenue lors de l'édition de la note.");
      return;
    }

    dialogRef.current!.close();
    reloadPage();
  }

  const closeModal = () => {
    dialogRef.current!.close();
  }

  const handleDelete = () => {
    dialogRef.current!.close();
    deleteGrade(grade.id, params.subjectId as string);
    reloadPage();
  }

  return (
    <dialog className={styles.dialog} ref={dialogRef}>
      <button className={`${styles.delete} ${poppins.className}`} onClick={handleDelete}>Delete</button>
      <form ref={formRef} onSubmit={handleSubmit}>
        <InputField
          type='text'
          label='Nom'
          placeholder={'Entrez le titre de l\'examen ici...'}
          value={name}
          setValue={setName}
        />
        <InputField
          type='number'
          label='Score'
          placeholder={'Entrez le résultat de l\'examen ici...'}
          value={score}
          setValue={setScore}
        />
        <InputField
          type='text'
          label='Poids'
          placeholder={'Entrez le poids de l\'examen ici...'}
          value={weight}
          setValue={setWeight}
        />
        <TextArea
          label='Commentaire'
          placeholder='Entrez un commentaire ici...'
          value={comment}
          setValue={setComment}
        />
        <div className={styles.buttons}>
          <button className={`${styles.add} ${styles.button} ${poppins.className}`} type="submit">Modifier</button>
          <button className={`${styles.close} ${styles.button} ${poppins.className}`} type="button" onClick={closeModal}>Annuler</button>
        </div>
      </form>
    </dialog>
  )
}
