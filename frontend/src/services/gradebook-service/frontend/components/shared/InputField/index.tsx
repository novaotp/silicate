import { poppins } from '@/core/fonts';
import styles from './index.module.scss';

interface InputFieldProps {
  type: "text" | "email" | "password";
  label: string;
  placeholder: string;
  name: string;
}

export default function InputField({ type, label, placeholder, name }: InputFieldProps) {
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