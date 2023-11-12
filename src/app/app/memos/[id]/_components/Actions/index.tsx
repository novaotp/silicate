
"use client";

import styles from './index.module.scss';
import { poppins } from '@/assets/fonts';

interface ActionsProps {
  discard: () => void,
  disabled: boolean,
}

export const Actions = ({ discard, disabled }: ActionsProps): JSX.Element => {
  return (
    <div className={styles.actions}>
      <button
        className={`${styles.button} ${styles.cancel} ${poppins.className}`}
        type="button"
        onClick={discard}
        disabled={disabled}
      >
        Annuler
      </button>
      <button
        className={`${styles.button} ${styles.save} ${poppins.className}`}
        type="submit"
        disabled={disabled}
      >
        Sauvegarder
      </button>
    </div>
  )
}
