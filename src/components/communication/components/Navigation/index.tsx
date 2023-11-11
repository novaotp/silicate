
'use client';

// Next
import Link from 'next/link';

// Internal
import styles from './index.module.scss';
import { clientRoute } from '@shared/utils/routes';

/** The chat's pages navigation bar. */
const CommunicationNavigation = () => {
  return (
    <div className={styles.navBar}>
      <Link href={clientRoute.app.chat.use()}>Chat</Link>
      <Link href={clientRoute.app.friends.use()}>Friends</Link>
    </div>
  )
}

export default CommunicationNavigation;
