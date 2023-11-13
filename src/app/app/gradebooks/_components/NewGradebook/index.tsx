
// React
import { useRef, type FormEvent, type RefObject, useState } from 'react';

// Day picker
import { DayPicker, type DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';

// Internal
import styles from './index.module.scss';
import { poppins } from '@/assets/fonts';
import InputField from '../InputField';

interface NewGradebookProps {
  /** The reference to the dialog. */
  dialogRef: RefObject<HTMLDialogElement>;
}

/** Adds a new gradebook to the user's gradebook list. */
const NewGradebook = ({ dialogRef }: NewGradebookProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const periodRef = useRef<HTMLDialogElement>(null);
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  const openPeriod = () => {

  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
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
    return format(date, 'dd/MM/yyyy');
  }

  return (
    <dialog className={styles.dialog} ref={dialogRef}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <InputField
          type='text'
          label='Nom'
          name='name'
          placeholder='Entrez le nom du gradebook ici...'
        />
        <div>
          <label htmlFor="description">Description</label>
          <textarea name="description">
          
          </textarea>
        </div>
        <div>
          <label htmlFor="period">Période</label>
          <button type="button" onClick={openPeriodModal}>
            {
              !range || !range.from || !range.to
                ? <p>Période</p>
                : <span>{formatDate(range.from)} - {formatDate(range.to)}</span>
            }
          </button>
        </div>
        <dialog ref={periodRef}>
          <DayPicker
            mode="range"
            onSelect={(event) => {
              setRange(event);
              console.log(event);
            }}
            selected={range}
            fromYear={new Date().getFullYear() - 2}
            toYear={new Date().getFullYear() + 2}
            captionLayout='dropdown'
            showOutsideDays
            fixedWeeks
          />
          <button type="button" onClick={closePeriodModal}>
            Fermer
          </button>
        </dialog>
        <div className={styles.buttons}>
          <button className={`${styles.add} ${styles.button} ${poppins.className}`} onClick={closeModal} type="submit">Ajouter</button>
          <button className={`${styles.close} ${styles.button} ${poppins.className}`} onClick={closeModal}>Close</button>
        </div>
      </form>
    </dialog>
  )
}

export default NewGradebook;
