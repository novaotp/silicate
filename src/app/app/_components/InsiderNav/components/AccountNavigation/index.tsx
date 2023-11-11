
"use client";

// MUI Icons
import PersonIcon from '@mui/icons-material/Person';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import QuizIcon from '@mui/icons-material/Quiz';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';

// React + Next
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

// Internal
import styles from './index.module.scss';
import MenuItem from './components/MenuItem';
import useTheme from '@libs/hooks/useTheme';

interface AccountNavigationProps {
  /** The state of the account navigation. */
  isAccountNavOpen: boolean;
  /** Closes the account navigation. */
  closeNav: () => void;
}

/** The navigation related to the account. */
const AccountNavigation = ({ isAccountNavOpen, closeNav }: AccountNavigationProps): JSX.Element => {
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { theme, switchTheme } = useTheme();

  return (
    <div ref={menuRef} className={`${styles.nav} ${isAccountNavOpen ? styles.open : ""}`}>
      <ul className={styles.menu}>
        <MenuItem icon={<PersonIcon />} text='Mon profil' href='/app/profile' onClick={closeNav} />
        <MenuItem icon={<ColorLensIcon />} text='Thème' backgroundColor={theme === 'light' ? 'white' : 'blue'} onClick={switchTheme} />
        <MenuItem icon={<AlternateEmailRoundedIcon />} text='Contact / Support' href='/app' onClick={closeNav} />
        <MenuItem icon={<QuizIcon />} text='FAQ' href='/app' onClick={closeNav} />
        <MenuItem icon={<LogoutRoundedIcon />} text='Déconnexion' href='/auth/log-out' color='white' backgroundColor='red' />
      </ul>
    </div>
  )
}

export default AccountNavigation;
