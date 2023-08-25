import styles from './index.module.css';

interface InputFieldProps {
  type: "text" | "email" | "password";
  placeholder: string;
  name: string;
}

export default function InputField({ type, placeholder, name }: InputFieldProps) {
  return (
    <div>
      <input
        type={type}
        className={styles.input}
        placeholder={placeholder}
        name={name}
        autoComplete="off"
        required={true}
      />
    </div>
  )
}