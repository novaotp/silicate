
import { Dispatch, SetStateAction } from 'react';
import { poppins } from '@/fonts';
import styles from './index.module.scss';

interface InputFieldProps {
  type: "text" | "email" | "password" | "date";
  label: string;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>
}

/** A text input field for the gradebokk pages. */
const InputField = ({ type, label, placeholder, value, setValue }: InputFieldProps) => {
  const name = label.split(" ")[0].toLowerCase();

  return (
    <div className={styles.field}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        className={`${styles.input} ${poppins.className}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={event => setValue(event.target.value)}
        autoComplete="off"
        required={true}
      />
    </div>
  )
}

export default InputField;
