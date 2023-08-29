'use client';

// Next
import Link from "next/link";
import { usePathname } from "next/navigation";

// Internal
import styles from './index.module.css';
import { GradebookProps } from "@shared/interfaces";

interface RenderGradebooksProps {
  gradebooks: GradebookProps[];
}

export default function RenderGradebooks({ gradebooks }: RenderGradebooksProps) {
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