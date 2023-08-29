'use client'

import { GradebookProps } from "@shared/interfaces";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface GradebookComponentProps {
  gradebooks: GradebookProps[];
}

function RenderGradebooks({ gradebooks }: { gradebooks: GradebookProps[] }) {
  const pathname = usePathname();

  return (
    <ul>
      {
        gradebooks.map(gradebook => {
          return (
            <li key={gradebook.name}>
              <Link href={`${pathname}/${gradebook.name}`}>{gradebook.name}</Link>
            </li>
          )
        })
      }
    </ul>
  )
}

function NoGradebooksFound() {
  return (
    <>
      <p>No gradebooks found !</p>
      <p>You should create one.</p>
    </>
  )
}

export default function GradebooksComponent({ gradebooks }: GradebookComponentProps) {
  return (
    <div>
      {gradebooks.length > 0 && <RenderGradebooks gradebooks={gradebooks} />}
      {gradebooks.length === 0 && <NoGradebooksFound />}
    </div>
  )
}