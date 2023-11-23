
"use client";

// MUI Icons
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

// Internal
import styles from './index.module.scss';
import { useToast } from '@/libs/contexts/ToastContext';

export const Toast = () => {
  const { message, progress, state, hideToast } = useToast();

  if (!message) return null;

  const getToastColor = () => {
    switch (state) {
      case "success":
        return "green";
      case "error":
        return "red";
      case "warning":
        return "orange";
      case "info":
        return "lightblue";
      default:
        return "lightblue";
    }
  }

  return (
    <div className={styles.toast} style={{ backgroundColor: getToastColor() }}>
      <span className={styles.message}>{message}</span>
      <button onClick={hideToast} className={styles.close}><CloseRoundedIcon /></button>
      <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
    </div>
  )
};
