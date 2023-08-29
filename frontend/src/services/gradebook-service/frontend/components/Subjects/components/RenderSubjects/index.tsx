'use client';

// Next
import Link from "next/link";
import { usePathname } from "next/navigation";

// Internal
import { SubjectProps } from "@shared/interfaces";
import styles from './index.module.css';

interface RenderSubjectsProps {
  subjects: SubjectProps[];
}

export default function RenderSubjects({ subjects }: RenderSubjectsProps) {
  const pathname = usePathname();

  return (
    <div>
      {
        subjects.map(subject => {
          return (
            <li key={subject.name}>
              <Link href={`${pathname}/${subject.name}`}>{subject.name}</Link>
            </li>
          )
        })
      }
    </div>
  )
}