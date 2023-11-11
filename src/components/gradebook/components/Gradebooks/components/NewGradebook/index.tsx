
// React
import { useRef, type FormEvent, type RefObject, useState } from 'react';

// Day picker
import { DayPicker, type DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';

// Internal
import styles from './index.module.scss';
import { poppins } from '@/assets/fonts';
import InputField from '../../../shared/InputField';

interface NewGradebookProps {
  /** The reference to the dialog. */
  dialogRef: RefObject<HTMLDialogElement>;
}

/** Adds a new gradebook to the user's gradebook list. */
const NewGradebook = ({ dialogRef }: NewGradebookProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const ref = useRef<HTMLDialogElement>();
  const [range, setRange] = useState<Date | undefined>();

  const openPeriod = () => {

  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  }

  const closeModal = () => {
    dialogRef.current!.close();
  }

  return (
    <dialog className={styles.dialog} ref={dialogRef}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <InputField
          type='text'
          label='Nom du gradebook'
          name='name'
          placeholder='Entrez le nom du gradebook ici...'
        />
        <button>
          Période
        </button>
        <InputField
          type="date"
          label="Début"
          name="startDate"
          placeholder="Entrez la date de début ici..."
        />
        <InputField
          type="date"
          label="Fin"
          name="endDate"
          placeholder="Entrez la date de fin ici..."
        />
        <DayPicker
          mode="single"
          onSelect={setRange}
          selected={range}
          fromYear={new Date().getFullYear() - 2}
          toYear={new Date().getFullYear() + 2}
          captionLayout='dropdown'
          showOutsideDays
          fixedWeeks
        />
        <div className={styles.buttons}>
          <button className={`${styles.add} ${styles.button} ${poppins.className}`} onClick={closeModal} type="submit">Ajouter</button>
          <button className={`${styles.close} ${styles.button} ${poppins.className}`} onClick={closeModal}>Close</button>
        </div>
      </form>
    </dialog>
  )
}

export default NewGradebook;
