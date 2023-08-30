'use client';

// Next
import Link from "next/link";

// Internal
import { SubjectProps } from "@shared/interfaces";
import styles from './index.module.css';
import route from "@utils/route";
import { usePathname } from "next/navigation";

interface RenderSubjectsProps {
  filter: string;
  subjects: SubjectProps[];
}

export default function RenderSubjects({ filter, subjects }: RenderSubjectsProps) {
  const bookName: string = usePathname().split("/").at(-1)!;

  return (
    <div>
      {
        subjects.map(subject => {
          const { name } = subject;

          if (name.toLowerCase().includes(filter)) {
            const href = route.app.gradebooks.book(bookName).subject(name).use();

            return (
              <li key={name}>
                <Link href={href}>{name}</Link>
              </li>
            )
          }
        })
      }
    </div>
  )
}