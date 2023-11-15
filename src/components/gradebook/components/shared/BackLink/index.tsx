
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
  const pathName = usePathname().split('/')!;
  pathName.pop();
  const href = pathName.join('/');
  

  return (
    <div className={styles.wrapper}>
      <Link className={styles.link} href={href}><WestIcon />&nbsp;&nbsp;&nbsp;Back</Link>
    </div>
  )
}

export default BackLink;
