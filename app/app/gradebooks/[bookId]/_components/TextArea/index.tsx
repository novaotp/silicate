
import { poppins } from '@/fonts';
import styles from './index.module.scss';
import { Dispatch, SetStateAction } from 'react';

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>
}

/** A controlled textarea. */
export const TextArea = ({ label, placeholder, value, setValue }: InputFieldProps) => {
  const name = label.split(" ")[0].toLowerCase();

  return (
    <div className={styles.field}>
      <label htmlFor={name}>{label}</label>
      <textarea
        className={`${styles.input} ${poppins.className}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={event => setValue(event.target.value)}
        autoComplete="off"
        rows={4}
      ></textarea>
    </div>
  )
}
