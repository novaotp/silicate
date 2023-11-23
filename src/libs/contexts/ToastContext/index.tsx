
"use client";

import { ChildrenProps } from '@/types/interfaces';
import React, { createContext, useState, useContext, useRef } from 'react';

type ToastState = "success" | "error" | "warning" | "info";

interface ToastContextProps {
  message: string,
  progress: number,
  state: ToastState,
  /**
   * Shows a message to the user for 3 seconds or until the user dismisses the toast.
   * @param message The message to display
   */
  showToast: (message: string, state: ToastState) => void,
  /** Immediately dismisses the toast. */
  hideToast: () => void
}

const ToastContext = createContext<ToastContextProps>({ message: '', progress: 0, state: "info", showToast: () => {}, hideToast: () => {} });

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: ChildrenProps) => {
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(100);
  const [state, setState] = useState<ToastState>("info");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (message: string, state: ToastState) => {
    setMessage(message);
    setProgress(100);
    setState(state);
    clearInterval(intervalRef.current!);

    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev <= -10) {
          clearInterval(intervalRef.current!);
          setMessage('');
          return 0;
        }

        return prev - 1; // Decrease progress over time
      });
    }, 30); // Adjust time for progress decrement
  };

  const hideToast = () => {
    clearInterval(intervalRef.current!);
    setMessage('');
  };

  return (
    <ToastContext.Provider value={{ message, progress, state, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};
