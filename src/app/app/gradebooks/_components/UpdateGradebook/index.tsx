
// React
import { useRef, type FormEvent, type RefObject, useState } from 'react';

// Day picker
import { DayPicker, type DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { frCH } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';

// Internal
import styles from './index.module.scss';
import { poppins } from '@/assets/fonts';
import InputField from '../InputField';
import { TextArea } from '../TextArea';
import { CreateGradebookProps, UpdateGradebookProps, createGradebook, deleteGradebook, updateGradebook } from '../../server';
import { usePathname, useRouter } from 'next/navigation';
import { reloadPage } from '@/utils/reloadPage';
import { Gradebook } from '@/models/gradebook';

interface UpdateGradebookProps2 {
  gradebook: Gradebook,
  dialogRef: RefObject<HTMLDialogElement>;
}

/** Adds a new gradebook to the user's gradebook list. */
export const UpdateGradebook = ({ gradebook, dialogRef }: UpdateGradebookProps2) => {
  const formRef = useRef<HTMLFormElement>(null);
  const periodRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState<string>(gradebook.name);
  const [description, setDescription] = useState<string>(gradebook.description);
  const [range, setRange] = useState<DateRange | undefined>({ from: gradebook.from, to: gradebook.to });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!name || !range?.from || !range?.to) {
      if (!name) {
        alert("Veuillez renseigner un nom pour votre carnet de note.");
      } else if (!range?.from) {
        alert("Veuillez renseigner une date de début pour votre carnet de note.");
      } else if (!range?.to) {
        alert("Veuillez renseigner une date de fin pour votre carnet de note.");
      }

      return;
    }

    const updategradebook: UpdateGradebookProps = {
      gradebookId: gradebook.id.toString(),
      name: name,
      description: description,
      from: range.from,
      to: range.to,
    }

    const success = await updateGradebook(updategradebook);

    if (!success) {
      alert("Une erreur est survenue lors de la création du carnet de note.");
      return;
    }

    dialogRef.current!.close();
    reloadPage();
  }

  const closeModal = () => {
    dialogRef.current!.close();
  }

  const openPeriodModal = () => {
    periodRef.current!.showModal();
  }

  const closePeriodModal = () => {
    periodRef.current!.close();
  }

  const formatDate = (date: Date) => {
    return format(date, 'dd.MM.yyyy');
  }

  const handleDelete = () => {
    dialogRef.current!.close();
    deleteGradebook(gradebook.id.toString());
    reloadPage();
  }

  return (
    <dialog className={styles.dialog} ref={dialogRef}>
      <button className={`${styles.delete} ${poppins.className}`} onClick={handleDelete}>Delete</button>
      <form ref={formRef} onSubmit={handleSubmit}>
        <InputField
          type='text'
          label='Nom'
          placeholder='Entrez le nom du carnet de notes ici...'
          value={name}
          setValue={setName}
        />
        <TextArea
          label='Description'
          placeholder='Entrez une description du carnet de notes ici...'
          value={description}
          setValue={setDescription}
        />
        <div className={styles.period}>
          <label htmlFor="period">Période</label>
          <button className={poppins.className} type="button" onClick={openPeriodModal}>
            {
              !range || !range.from || !range.to
                ? <p>Période indéfini</p>
                : <span>{formatDate(range.from)} - {formatDate(range.to)}</span>
            }
          </button>
        </div>
        <dialog className={styles.periodDialog} ref={periodRef}>
          <DayPicker
            mode="range"
            onSelect={event => setRange(event)}
            selected={range}
            fromYear={new Date().getFullYear() - 2}
            toYear={new Date().getFullYear() + 2}
            captionLayout='dropdown'
            showOutsideDays
            fixedWeeks
            locale={frCH}
          />
          <button className={`${styles.closePeriod} ${poppins.className}`} type="button" onClick={closePeriodModal}>
            Fermer
          </button>
        </dialog>
        <div className={styles.buttons}>
          <button className={`${styles.add} ${styles.button} ${poppins.className}`} type="submit">Modifier</button>
          <button className={`${styles.close} ${styles.button} ${poppins.className}`} type="button" onClick={closeModal}>Annuler</button>
        </div>
      </form>
    </dialog>
  )
}
