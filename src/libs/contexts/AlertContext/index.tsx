
"use client";

import { ChildrenProps } from '@/types/interfaces';
import React, { createContext, useState, useContext, useRef, RefObject } from 'react';

interface AlertContextProps {
  alertRef: RefObject<HTMLDialogElement> | null,
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  showAlert: (message: string, onConfirm: () => void, onCancel: () => void) => void;
  closeAlert: () => void;
}

const AlertContext = createContext<AlertContextProps>({
  alertRef: null,
  message: "",
  onConfirm: () => {},
  onCancel: () => {},
  showAlert: () => {},
  closeAlert: () => {}
});

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }: ChildrenProps) => {
  const alertRef = useRef<HTMLDialogElement | null>(null);
  const [message, setMessage] = useState<string>("");
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});
  const [onCancel, setOnCancel] = useState<() => void>(() => {});

  const showAlert = (message: string, onConfirm: () => void, onCancel: () => void) => {
    setMessage(message);
    setOnConfirm(onConfirm);
    setOnCancel(onCancel);
    if (alertRef) alertRef.current!.showModal();
  };

  const closeAlert = () => {
    setMessage("");
    setOnConfirm(() => {});
    setOnCancel(() => {});
    if (alertRef) alertRef.current!.close();
  };

  return (
    <AlertContext.Provider value={{ message, onConfirm, onCancel, showAlert, closeAlert, alertRef }}>
      {children}
    </AlertContext.Provider>
  );
};
