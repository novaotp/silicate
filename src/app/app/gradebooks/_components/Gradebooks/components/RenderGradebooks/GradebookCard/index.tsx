'use client';

// Next
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Internal
import { GradebookProps } from '@shared/interfaces';
import styles from './index.module.scss';

interface GradebookCardProps {
  gradebook: GradebookProps;
}

export default function GradebookCard({ gradebook }: GradebookCardProps) {
  const { name } = gradebook;
  const href = `${usePathname()}/${name}`;

  return (
    <li className={styles.li} key={name}>
      <Link className={styles.link} href={href}>{name}</Link>
    </li>
  )
}