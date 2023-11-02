
"use client";

// React
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Internal
import { poppins } from '@/fonts';
import Note from '../../interfaces';
import styles from './index.module.scss';
import { useRef } from 'react';

interface EditorProps {
  /** The note to edit. */
  note: Note;
  /**
   * A helper function to set values in the note.
   * @param key The key in the note to set.
   * @param value The new value of the key.
   */
  updateNoteField: (key: keyof Note, value: string | number) => void;
}

function insertTextAtCursorPosition(textarea: HTMLTextAreaElement, before: string, after: string) {
  const { value, selectionStart, selectionEnd } = textarea;
  
  // A tender inquiry to see if a space has been selected
  const spaceSelected = value[selectionEnd - 1] === ' ';
  
  // The boundaries of selection, adjusted with care if a space is selected
  const adjustedSelectionStart = selectionStart;
  const adjustedSelectionEnd = spaceSelected ? selectionEnd - 1 : selectionEnd;
  
  // The text before the cursor or selection
  const textBefore = value.substring(0, adjustedSelectionStart);
  
  // The text after the cursor or selection
  const textAfter = value.substring(adjustedSelectionEnd);
  
  // The selected text, or an empty string if nothing is selected
  const selectedText = value.substring(adjustedSelectionStart, adjustedSelectionEnd);
  
  // Construct the new text
  const newText = `${textBefore}${before}${selectedText}${after}${textAfter}`;
  
  // Set the new text in the textarea
  textarea.value = newText;
  
  // Adjust the cursor position to be at the end of the inserted text
  const newCursorPosition = adjustedSelectionStart + before.length + selectedText.length + after.length;
  textarea.setSelectionRange(newCursorPosition, newCursorPosition);
  
  textarea.focus();
}

/** A custom Markdown-enhanced editor for the notes. */
const Editor = ({ note, updateNoteField }: EditorProps): JSX.Element => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = (before: string, after: string) => {
    const textarea = textAreaRef.current!;
    insertTextAtCursorPosition(textarea, before, after);
    updateNoteField('content', textarea.value);
  };

  return (
    <div className={styles.wrapper}>
      <textarea
        ref={textAreaRef}
        className={`${styles.content} ${poppins.className}`}
        name="content"
        value={note.content}
        onChange={e => updateNoteField('content', e.currentTarget.value)}
        placeholder="My Note's content..."
      />
      <div className={styles.markdownButtons}>
        <button type="button" onClick={() => insertMarkdown('**', '**')}>Bold</button>
        <button type="button" onClick={() => insertMarkdown('_', '_')}>Italic</button>
        <button type="button" onClick={() => insertMarkdown('<u>', '</u>')}>Underline</button>
        {/* ... other markdown styling buttons */}
      </div>
      <div className={styles.preview}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {note.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default Editor;
