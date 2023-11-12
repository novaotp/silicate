
"use client";

// React
import { type Dispatch, type SetStateAction } from 'react';

// Internal
import { poppins } from '@/fonts';
import Note from '../../interfaces';
import styles from './index.module.scss';
import { useRef } from 'react';

interface EditorProps {
  content: string;
  updateContent: Dispatch<SetStateAction<string>>;
}

export const Editor = ({ content, updateContent }: EditorProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <textarea
        spellCheck="false"
        value={content}
        onChange={event => updateContent(event.target.value)}
        className={`${styles.content} ${poppins.className}`}
      ></textarea>
    </div>
  );
};
