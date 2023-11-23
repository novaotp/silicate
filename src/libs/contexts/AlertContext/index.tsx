
"use client";

import { ChildrenProps } from '@/types/interfaces';
import React, { createContext, useState, useContext } from 'react';

interface AlertContextProps {
  show: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  showAlert: (message: string, onConfirm: () => void, onCancel: () => void) => void;
  closeAlert: () => void;
}

const AlertContext = createContext<AlertContextProps>({
  show: false,
  message: "",
  onConfirm: () => {},
  onCancel: () => {},
  showAlert: () => {},
  closeAlert: () => {}
});

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }: ChildrenProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});
  const [onCancel, setOnCancel] = useState<() => void>(() => {});

  const showAlert = (message: string, onConfirm: () => void, onCancel: () => void) => {
    setMessage(message);
    setShow(true);
    setOnConfirm(onConfirm);
    setOnCancel(onCancel);
  };

  const closeAlert = () => {
    setShow(false);
    setMessage("");
    setOnConfirm(() => {});
    setOnCancel(() => {});
  };

  return (
    <AlertContext.Provider value={{ show, message, onConfirm, onCancel, showAlert, closeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
