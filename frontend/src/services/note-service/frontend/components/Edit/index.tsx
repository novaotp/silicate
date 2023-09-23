'use client';

// React
import {type FormEvent, useState} from 'react';

// Internal
import BackLink from "../shared/BackLink";
import styles from './index.module.scss';
import {AddNoteProps, EditNoteProps, NoteProps, ResponseProps} from '@shared/interfaces';
import {addNoteController, updateNoteController} from '@/services/note-service/backend/controllers';

interface EditComponentProps {
  note: NoteProps;
}

export default function EditComponent({ note: { id, title: fetchedTitle, content: fetchedContent } }: EditComponentProps) {
  const [title, setTitle] = useState<string>(fetchedTitle);
  const [content, setContent] = useState<string>(fetchedContent);

  const updateNote = async (): Promise<ResponseProps> => {
    const data: Omit<EditNoteProps, 'userID'> = {
      id: id,
      title: title,
      content: content
    }

    return await updateNoteController(data);
  }

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const response: ResponseProps = await updateNote();

    if (response.success) {
      alert("Updated successfully")
    }
  }

  return (
    <div className={styles.window}>
      <BackLink title="Mes Notes" />
      <form method="POST" onSubmit={handleFormSubmit}>
        <input type="text" name="title" value={title} onChange={e => setTitle(e.currentTarget.value)} placeholder="My Note's title..." />
        <textarea name="content" value={content} onChange={e => setContent(e.currentTarget.value)} placeholder="My Note's content..." />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}