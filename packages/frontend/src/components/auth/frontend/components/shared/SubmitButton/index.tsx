
'use client';

// Internal
import { poppins } from '@/fonts';
import styles from './index.module.scss';

/** The {@link SubmitButton}'s props. */
interface SubmitButtonProps {
  /** The button's text. */
  label: string;
  /** If the submission is currently being handled. */
  isProcessing: boolean;
}

/**
 * A custom submit button with an `isProcessing` property.
 * 
 * `isProcessing` should be used when the form is being handled.
 * 
 * While processing :
 * - The text changes to `Chargement...`
 * - The color changes to `grey`
 */
const SubmitButton = ({ label, isProcessing }: SubmitButtonProps): JSX.Element => {
  return (
    <button
      className={`${styles.button} ${poppins.className}`}
      type='submit'
      style={{
        backgroundColor: isProcessing ? "grey" : "blue",
        cursor: isProcessing? "not-allowed" : "pointer"
      }}
    >
      {isProcessing ? "Chargement..." : label}
    </button>
  )
}

export default SubmitButton;
