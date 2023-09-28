
"use client";

// React + Next
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

// Internal
import styles from './index.module.scss';
import { clientRoute } from '@shared/classes/route';
import AccountLink from './components/MenuItem';
import deleteCookie from './serverActions/deleteCookie';

interface AccountNavigationProps {
  /** The state of the app nav. */
  isAccountNavOpen: boolean;
}

const AccountNavigation = ({ isAccountNavOpen }: AccountNavigationProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleDisconnection = async (): Promise<void> => {
    const success = await deleteCookie();

    if (success) {
      router.push(clientRoute.auth.login.use());
    }
  }

  return (
    <div ref={menuRef} className={`${styles.nav} ${isAccountNavOpen ? styles.open : ""}`}>
      <ul className={styles.menu}>
        <AccountLink text='Settings' href={clientRoute.account.use()} />
        <AccountLink text='Disconnect' onClick={() => handleDisconnection()} color='white' backgroundColor='red' />
      </ul>
    </div>
  )
}

export default AccountNavigation;
