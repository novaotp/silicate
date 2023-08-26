'use client'

import Link from "next/link";
import styles from './index.module.css';

interface AlternativeLinkProps {
  text: string;
  href: string;
  linkLabel: string;
}

export default function AlternativeLink({ text, href, linkLabel }: AlternativeLinkProps) {
  return (
    <p className={styles.text}>
      {text}
      &nbsp;
      <Link className={styles.link} href={href}>
        {linkLabel}
      </Link>
    </p>
  )
}