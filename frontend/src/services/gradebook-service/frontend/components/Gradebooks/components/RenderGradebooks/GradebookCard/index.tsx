'use client';

// Next
import Link from 'next/link';

// Internal
import { GradebookProps } from '@shared/interfaces';
import styles from './index.module.css';
import SuperClientRoute from '@/core/utils/route';

interface GradebookCardProps {
  gradebook: GradebookProps;
}

export default function GradebookCard({ gradebook }: GradebookCardProps) {
  const { name } = gradebook;
  const href = SuperClientRoute.addToPath(name);

  return (
    <li className={styles.li} key={name}>
      <Link className={styles.link} href={href}>{name}</Link>
    </li>
  )
}