'use client';

// MUI Icons
import WestIcon from '@mui/icons-material/West';

// Next
import Link from "next/link";

// Internal
import styles from './index.module.css';
import SuperClientRoute from '@core/utils/route';

interface BackLinkProps {
  href: string;
}

export default function BackLink() {
  const href = SuperClientRoute.parent();

  return (
    <div className={styles.wrapper}>
      <Link className={styles.link} href={href}><WestIcon />&nbsp;&nbsp;&nbsp;Back</Link>
    </div>
  )
}