
"use client";

// React
import { type Dispatch, type SetStateAction, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Internal
import styles from './index.module.scss';
import { poppins } from '@/assets/fonts';

interface EditorProps {
  content: string,
  updateContent: Dispatch<SetStateAction<string>>,
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
export const Editor = ({ content, updateContent }: EditorProps): JSX.Element => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = (before: string, after: string) => {
    const textarea = textAreaRef.current!;
    insertTextAtCursorPosition(textarea, before, after);
    updateContent(textarea.value);
  };

  return (
    <div className={styles.wrapper}>
      <textarea
        ref={textAreaRef}
        className={`${styles.content} ${poppins.className}`}
        name="content"
        value={content}
        onChange={event => updateContent(event.target.value)}
        placeholder="My memo's content..."
      />
      <div className={styles.markdownButtons}>
        <button type="button" onClick={() => insertMarkdown('**', '**')}>Bold</button>
        <button type="button" onClick={() => insertMarkdown('_', '_')}>Italic</button>
        <button type="button" onClick={() => insertMarkdown('<u>', '</u>')}>Underline</button>
        {/* ... other markdown styling buttons */}
      </div>
      <div className={styles.preview}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
