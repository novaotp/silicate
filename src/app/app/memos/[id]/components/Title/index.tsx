
"use client";

// React
import type { Dispatch, SetStateAction } from 'react';

// Internal
import styles from './index.module.scss';
import { poppins } from '@/assets/fonts';

interface TitleProps {
  title: string,
  setTitle: Dispatch<SetStateAction<string>>,
}

export const Title = ({ title, setTitle }: TitleProps): JSX.Element => {
  return (
    <input
      className={`${styles.title} ${poppins.className}`}
      type="text"
      name="title"
      value={title}
      onChange={(event) => setTitle(event.target.value)}
      placeholder="Le titre de mon mémo..."
      spellCheck="false"
      autoComplete='false'
      required
    />
  )
}
