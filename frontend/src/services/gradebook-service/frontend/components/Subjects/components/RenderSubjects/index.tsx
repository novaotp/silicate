'use client';

// Next
import Link from "next/link";

// Internal
import { SubjectProps } from "@shared/interfaces";
import styles from './index.module.css';
import route from "@utils/route";

interface RenderSubjectsProps {
  subjects: SubjectProps[];
}

export default function RenderSubjects({ subjects }: RenderSubjectsProps) {
  return (
    <div>
      {
        subjects.map(subject => {
          const { name } = subject;
          const href = route.app.gradebooks.book(name).use();

          return (
            <li key={name}>
              <Link href={href}>{name}</Link>
            </li>
          )
        })
      }
    </div>
  )
}