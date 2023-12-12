
"use client";

import type { Dispatch, SetStateAction } from 'react';

interface TitleProps {
  title: string,
  setTitle: Dispatch<SetStateAction<string>>,
}

/** Renders the input box for the title of the memo. */
export const Title = ({ title, setTitle }: TitleProps): JSX.Element => {
  return (
    <input
      className="relative w-full h-10 mb-3 text-2xl"
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
