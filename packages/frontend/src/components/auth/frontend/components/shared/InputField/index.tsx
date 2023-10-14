
'use client';

// React
import { type ChangeEvent, type SetStateAction } from 'react';

// Internal
import { poppins } from '@/core/fonts';
import styles from './index.module.scss';

interface InputFieldProps {
  /** The type of the input. */
  type: "text" | "email" | "password";
  /** The label used for the input. */
  label: string;
  /** The input's placeholder. */
  placeholder: string;
  /** The input's name. */
  name: string;
  /** The controlled value. */
  value: string;
  /** The value's onChange handler. */
  onChange: React.Dispatch<SetStateAction<string>>;
}

/**
 * A custom controlled input field with a label on top.
 * 
 * - Autocomplete : Off
 * - Required : True
 */
const InputField = ({ type, label, placeholder, name, value, onChange }: InputFieldProps): JSX.Element => {
  return (
    <div className={styles.field}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        className={`${styles.input} ${poppins.className}`}
        placeholder={placeholder}
        name={name}
        autoComplete="off"
        required={true}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
      />
    </div>
  )
}

export default InputField;
