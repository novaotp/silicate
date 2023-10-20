
'use client';

// Internal
import { poppins } from '@/fonts';
import styles from './index.module.scss';

/** The {@link Button}'s props. */
interface ButtonProps {
  /** The button's text. */
  label: string;
  /** The button's onClick event. */
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /** An optional background color. */
  backgroundColor?: string;
}

/**
 * A custom button with an :
 * - `onClick` property
 * - an optional `backgroundColor` property (defaults to `blue`).
 */
const Button = ({ label, onClick, backgroundColor = "blue" }: ButtonProps): JSX.Element => {
  return (
    <button
      className={`${styles.button} ${poppins.className}`}
      type="button"
      onClick={onClick}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      {label}
    </button>
  )
}

export default Button;
