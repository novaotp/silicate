
"use client";

// React
import { type Dispatch, type SetStateAction } from 'react';

// Internal
import styles from './index.module.scss';
import { poppins } from '@/assets/fonts';

interface EditorProps {
  content: string,
  setContent: Dispatch<SetStateAction<string>>,
}

/** A custom Markdown-enhanced editor for the notes. */
export const Editor = ({ content, setContent }: EditorProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <textarea
        className={`${styles.content} ${poppins.className}`}
        name="content"
        value={content}
        onChange={event => setContent(event.target.value)}
        placeholder="Le contenu de mon mémo..."
        spellCheck="false"
        autoComplete='false'
      />
    </div>
  )
}
