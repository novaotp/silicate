'use client'

import { clientRoute } from "@shared/classes/route";
import { NoteProps } from "@shared/interfaces";
import Link from "next/link";

interface RenderNotesProps {
  notes: NoteProps[]
}

export default function RenderNotes({ notes }: RenderNotesProps) {
  return (
    <div>
      {
        notes.map(note => {
          const href = clientRoute.app.notes.note.edit(note.id).use();

          return (
            <Link
              key={note.id}
              href={href}
            >
              {note.id} | {note.title}
            </Link>
          )
        })
      }
    </div>
  )
}