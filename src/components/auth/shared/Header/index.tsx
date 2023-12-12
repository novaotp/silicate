
"use client";

// Next
import Link from 'next/link';
import Image from 'next/image';

// Internal
import styles from './index.module.scss';
import SilicateLogo from 'public/SilicateAppIconBlackHorizontal.png';

interface HeaderProps {
  title: string,
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <h1>{title}</h1>
      <Link href="/" className={styles.link}>
        <Image
          src={SilicateLogo}
          alt="Silicate Logo"
          width={200}
          height={100}
        />
      </Link>
    </div>
  )
}
