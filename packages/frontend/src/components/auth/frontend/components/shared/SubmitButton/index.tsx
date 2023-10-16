
'use client';

// Internal
import { poppins } from '@/fonts';
import styles from './index.module.scss';

/** The {@link SubmitButton}'s props. */
interface SubmitButtonProps {
  /** The button's text. */
  label: string;
  /** An optional type for the button. */
  type?: 'button' | 'submit';
  /** An optional onClick event. */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /** An optional background color. */
  backgroundColor?: string;
}

/** A custom submit button. */
const SubmitButton = ({ label, type, onClick, backgroundColor }: SubmitButtonProps): JSX.Element => {
  return (
    <button
      className={`${styles.button} ${poppins.className}`}
      type={type ?? 'submit'}
      onClick={onClick}
      style={{
        backgroundColor: backgroundColor ?? "blue",
      }}
    >
      {label}
    </button>
  )
}

export default SubmitButton;
