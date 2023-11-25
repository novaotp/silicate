
"use client";

// React
import { type MouseEvent } from 'react';

// Internal
import styles from './index.module.scss';
import { poppins } from '@/assets/fonts';

interface AddProps {
  label: string;
  onClick: (event: MouseEvent) => void;
}

export const Add = ({ label, onClick }: AddProps) => {
  return (
    <button onClick={onClick} className={`${styles.add} ${poppins.className}`}>
      {label}
    </button>
  )
}
