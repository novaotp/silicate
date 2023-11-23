
"use client";

import styles from './index.module.scss';
import { useAlert } from "@/libs/contexts/AlertContext";

export const Alert = () => {
  const { show, message, onConfirm, onCancel, closeAlert } = useAlert();

  if (!show) return null;

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    closeAlert();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    closeAlert();
  };

  return (
    <dialog className={styles.alertModal}>
      <p className={styles.text}>{message}</p>
      <button onClick={handleConfirm} className={`${styles.actions} ${styles.yes}`}>Yes</button>
      <button onClick={handleCancel} className={`${styles.actions} ${styles.no}`}>No</button>
    </dialog>
  );
};
