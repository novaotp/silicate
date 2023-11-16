
import { poppins } from '@/assets/fonts';
import styles from './index.module.scss';

interface InputFieldProps {
  /** The type of the input field. */
  type: "text" | "email" | "password" | "date";
  /** The label for the input field. */
  label: string;
  /** The placeholder for the input field. */
  placeholder: string;
  /** The name of the input field. */
  name: string;
  /** The change callback of the input field */
  onChange?: React.ChangeEventHandler
}

/** A text input field for the gradebokk pages. */
const InputField = ({ type, label, placeholder, name, onChange }: InputFieldProps) => {
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
        onChange={onChange}
      />
    </div>
  )
}

export default InputField;
