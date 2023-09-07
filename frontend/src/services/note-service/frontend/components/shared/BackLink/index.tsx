'use client';

// MUI Icons
import WestIcon from '@mui/icons-material/West';

// Next
import Link from "next/link";
import { usePathname } from 'next/navigation';

// Internal
import styles from './index.module.scss';
import ClientRoute from '@shared/classes/route/client.route';

interface BackLinkProps {
  title: string;
}

export default function BackLink({ title }: BackLinkProps) {
  const href = ClientRoute.parent(usePathname());

  return (
    <div className={styles.wrapper}>
      <Link className={styles.link} href={href}><WestIcon />&nbsp;&nbsp;&nbsp;{title}</Link>
    </div>
  )
}