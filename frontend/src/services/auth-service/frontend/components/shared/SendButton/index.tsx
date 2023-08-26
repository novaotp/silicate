import { poppins } from '@/core/fonts';
import styles from './index.module.css';

interface SubmitButtonProps {
  label: string;
}

export default function SubmitButton({ label }: SubmitButtonProps) {
  return (
    <button className={`${styles.button} ${poppins.className}`} type="submit">
      {label}
    </button>
  )
}