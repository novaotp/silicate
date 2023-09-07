'use client';

// React
import { type FormEvent, useRef } from 'react';

// Internal
import BackLink from "../shared/BackLink";
import styles from './index.module.scss';
import { AddNoteProps, ResponseProps } from '@shared/interfaces';
import { addNoteController } from '@/services/note-service/backend/controllers';

export default function AddComponent() {
  const form = useRef<HTMLFormElement>(null);

  const handleNewNote = async (): Promise<ResponseProps> => {
    const formData = new FormData(form.current!);

    const data: Pick<AddNoteProps, 'title' | 'content'> = {
      title: formData.get('title') as string,
      content: formData.get('content') as string
    }

    const response: ResponseProps = await addNoteController(data);

    return response;
  }

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const response: ResponseProps = await handleNewNote();

    if (response.success) {
      alert("potato")
    }
  }

  return (
    <div className={styles.window}>
      <BackLink title="Mes Notes" />
      <form ref={form} method="POST" onSubmit={handleFormSubmit}>
        <input type="text" name="title" placeholder="My Note's title..." />
        <textarea name="content" placeholder="My Note's content..." />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}