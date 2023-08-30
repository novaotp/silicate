'use client';

// Next
import Link from 'next/link';

// Internal
import { GradebookProps } from '@shared/interfaces';
import styles from './index.module.css';

interface GradebookCardProps {
  gradebook: GradebookProps;
  pathname: string;
}

export default function GradebookCard({ gradebook, pathname }: GradebookCardProps) {
  const { name } = gradebook;

  return (
    <li className={styles.li} key={gradebook.name}>
      <Link className={styles.link} href={`${pathname}/${name}`}>{name}</Link>
    </li>
  )
}