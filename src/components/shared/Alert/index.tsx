
"use client";

import { poppins } from '@fonts';
import styles from './index.module.scss';
import { useAlert } from "@libs/contexts/AlertContext";

export const Alert = () => {
  const { alertRef, message, onConfirm, onCancel, closeAlert } = useAlert();

  const handleConfirm = async () => {
    if (onConfirm) await onConfirm();
    closeAlert();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    closeAlert();
  };

  return (
    <dialog ref={alertRef} className={styles.alert}>
      <p className={styles.text}>{message}</p>
      <div className={styles.confirm}>
        <button onClick={handleConfirm} className={`${styles.actions} ${styles.yes} ${poppins.className}`}>Oui</button>
        <button onClick={handleCancel} className={`${styles.actions} ${styles.no} ${poppins.className}`}>Non</button>
      </div>
    </dialog>
  );
};
