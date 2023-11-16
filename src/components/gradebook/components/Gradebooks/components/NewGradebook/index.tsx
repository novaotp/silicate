
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
import { CreateGradebook } from '@/app/app/gradebooks/server';

interface NewGradebookProps {
  /** The reference to the dialog. */
  dialogRef: RefObject<HTMLDialogElement>;
}

/** Adds a new gradebook to the user's gradebook list. */
const NewGradebook = ({ dialogRef }: NewGradebookProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const ref = useRef<HTMLDialogElement>();
  const [range, setRange] = useState<Date | undefined>();
  const [gradeBookName, setGradeBookName] = useState<string | undefined>()
  const [gradeBookStartDate, setGradeBookStartDate] = useState<Date | undefined>()
  const [gradeBookEndDate, setGradeBookEndDate] = useState<Date | undefined>()

  const openPeriod = () => {

  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await CreateGradebook({ gradeBookName, gradeBookStartDate, gradeBookEndDate });
    
    window.location.reload();
  }

  const closeModal = (event: FormEvent) => {
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
          onChange={(evt: any) => {setGradeBookName(evt.target.value)}}
        />
        <button>
          Période
        </button>
        <InputField
          type="date"
          label="Début"
          name="startDate"
          placeholder="Entrez la date de début ici..."
          onChange={(evt: any) => {setGradeBookStartDate(evt.target.value)}}
        />
        <InputField
          type="date"
          label="Fin"
          name="endDate"
          placeholder="Entrez la date de fin ici..."
          onChange={(evt: any) => {setGradeBookEndDate(evt.target.value)}}
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
          <button className={`${styles.close} ${styles.button} ${poppins.className}`} onClick={closeModal} type='reset'>Close</button>
        </div>
      </form>
    </dialog>
  )
}

export default NewGradebook;
