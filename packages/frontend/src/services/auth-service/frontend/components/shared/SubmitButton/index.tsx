
'use client';

// Internal
import { poppins } from '@/core/fonts';
import styles from './index.module.scss';

/** The {@link SubmitButton}'s props. */
interface SubmitButtonProps {
  /** The button's text. */
  label: string;
}

/** Returns a custom submit button. */
const SubmitButton = ({ label }: SubmitButtonProps): JSX.Element => {
  return (
    <button
      className={`${styles.button} ${poppins.className}`}
      type="submit"
    >
      {label}
    </button>
  )
}

export default SubmitButton;
