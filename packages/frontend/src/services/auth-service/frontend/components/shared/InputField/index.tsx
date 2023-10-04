
'use client';

// Internal
import { poppins } from '@/core/fonts';
import styles from './index.module.scss';

/** The {@link InputField}'s props. */
interface InputFieldProps {
  /** The type of the input. */
  type: "text" | "email" | "password";
  /** The label used for the input. */
  label: string;
  /** The input's placeholder. */
  placeholder: string;
  /** The name used for retrieval using {@link FormData}. */
  name: string;
}

/** Returns a custom input field with a label on top. */
const InputField = ({ type, label, placeholder, name }: InputFieldProps): JSX.Element => {
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
      />
    </div>
  )
}

export default InputField;
