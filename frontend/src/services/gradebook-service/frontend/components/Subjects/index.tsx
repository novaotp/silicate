'use client';

import { SubjectProps } from "@shared/interfaces"
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SubjectComponentsProps {
  subjects: SubjectProps[];
}

function RenderSubjects({ subjects }: { subjects: SubjectProps[] }) {
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

function NoSubjectsFound() {
  return (
    <>
      <p>No gradebooks found !</p>
      <p>You should create one.</p>
    </>
  )
}

export default function SubjectsComponents({ subjects }: SubjectComponentsProps) {
  return (
    <div>
      {subjects.length > 0 && <RenderSubjects subjects={subjects} />}
      {subjects.length === 0 && <NoSubjectsFound />}
    </div>
  )
}