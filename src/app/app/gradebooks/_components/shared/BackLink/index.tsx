
'use client';

// MUI Icons
import WestIcon from '@mui/icons-material/West';

// Next
import Link from "next/link";
import { usePathname } from 'next/navigation';

// Internal
import styles from './index.module.scss';

/** A backlink for the gradebook pages. */
const BackLink = () => {
  const href = usePathname().split("/").at(-2)!;

  return (
    <div className={styles.wrapper}>
      <Link className={styles.link} href={href}><WestIcon />&nbsp;&nbsp;&nbsp;Back</Link>
    </div>
  )
}

export default BackLink;
