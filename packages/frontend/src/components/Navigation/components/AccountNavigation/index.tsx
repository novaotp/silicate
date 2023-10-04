
"use client";

// MUI Icons
import PersonIcon from '@mui/icons-material/Person';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import QuizIcon from '@mui/icons-material/Quiz';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';

// React + Next
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

// Internal
import styles from './index.module.scss';
import { clientRoute } from '@shared/classes/route';
import MenuItem from './components/MenuItem';
import deleteCookie from './serverActions/deleteCookie';
import useTheme from '@/core/hooks/useTheme';

interface AccountNavigationProps {
  /** The state of the account navigation. */
  isAccountNavOpen: boolean;
  /** Closes the account navigation. */
  closeNav: () => void;
}

const AccountNavigation = ({ isAccountNavOpen, closeNav }: AccountNavigationProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { theme, switchTheme } = useTheme();

  const handleDisconnection = async (): Promise<void> => {
    const success = await deleteCookie();

    if (success) {
      router.push(clientRoute.auth.login.use());
    }
  }

  return (
    <div ref={menuRef} className={`${styles.nav} ${isAccountNavOpen ? styles.open : ""}`}>
      <ul className={styles.menu}>
        <MenuItem icon={<PersonIcon />} text='My profile' href={clientRoute.account.profile.use()} onClick={closeNav} />
        <MenuItem icon={<ColorLensIcon />} text='Appearance' backgroundColor={theme === 'light' ? 'white' : 'green'} onClick={switchTheme} />
        <MenuItem icon={<AlternateEmailRoundedIcon />} text='Contact / Support' href={clientRoute.account.use()} onClick={closeNav} />
        <MenuItem icon={<QuizIcon />} text='FAQ' href={clientRoute.account.use()} onClick={closeNav} />
        <MenuItem icon={<LogoutRoundedIcon />} text='Disconnect' onClick={() => handleDisconnection()} color='white' backgroundColor='red' />
      </ul>
    </div>
  )
}

export default AccountNavigation;
