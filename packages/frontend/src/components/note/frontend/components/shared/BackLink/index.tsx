
'use client';

// MUI Icons
import WestIcon from '@mui/icons-material/West';

// Next
import Link from "next/link";
import { usePathname } from 'next/navigation';

// Internal
import styles from './index.module.scss';
import ClientRoute from '@shared/utils/routes/client.route';

/** The {@link BackLink}'s props. */
interface BackLinkProps {
  /** The text of the back link */
  title: string;
  /** An optional hyperlink target. Redirects to parent if not provided. */
  href?: string;
}

/** Returns a custom element for returning to parent or to another target. */
const BackLink = ({ title, href }: BackLinkProps): JSX.Element => {
  const hyperLink = href !== undefined ? href : ClientRoute.parent(usePathname());

  return (
    <div className={styles.wrapper}>
      <Link
        className={styles.link}
        href={hyperLink}
      >
        <WestIcon />&nbsp;&nbsp;&nbsp;{title}
      </Link>
    </div>
  )
}

export default BackLink;
