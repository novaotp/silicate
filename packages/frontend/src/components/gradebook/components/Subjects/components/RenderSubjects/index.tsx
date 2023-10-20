'use client';

// Next
import Link from "next/link";
import { usePathname } from "next/navigation";

// Internal
import { SubjectProps } from "@shared/interfaces";
import styles from './index.module.scss';

interface RenderSubjectsProps {
  filter: string;
  subjects: SubjectProps[];
}

export default function RenderSubjects({ filter, subjects }: RenderSubjectsProps) {
  return (
    <div>
      {
        subjects.map(subject => {
          const { name } = subject;

          if (name.toLowerCase().includes(filter)) {
            const href = `${usePathname()}/${name}`;

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