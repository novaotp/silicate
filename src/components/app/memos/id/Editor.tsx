
"use client";

import type { Dispatch, SetStateAction } from 'react';

interface EditorProps {
  content: string,
  setContent: Dispatch<SetStateAction<string>>,
  onKeyDown: React.KeyboardEventHandler
}

/** A custom Markdown-enhanced editor for the notes. */
export const Editor = ({ content, setContent, onKeyDown }: EditorProps): JSX.Element => {
  return (
    <div className="relative w-full flex-grow flex flex-col overflow-scroll">
      <textarea
        className="relative w-full h-full resize-none text-[14px]"
        name="content"
        value={content}
        onChange={event => setContent(event.target.value)}
        placeholder="Le contenu de mon mémo..."
        spellCheck="false"
        autoComplete='false'
        onKeyDown={onKeyDown}
      />
    </div>
  )
}
