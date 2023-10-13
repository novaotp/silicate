
import { poppins } from '@/core/fonts';
import styles from './index.module.scss';

interface InputFieldProps {
  /** The type of the input field. */
  type: "text" | "email" | "password";
  /** The label for the input field. */
  label: string;
  /** The placeholder for the input field. */
  placeholder: string;
  /** The name of the input field. */
  name: string;
}

/** A text input field for the gradebokk pages. */
const InputField = ({ type, label, placeholder, name }: InputFieldProps) => {
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
