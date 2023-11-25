
"use client";

// MUI Icons
import PersonIcon from '@mui/icons-material/Person';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import QuizIcon from '@mui/icons-material/Quiz';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';

// React + Next
import { useTheme } from 'next-themes';

// Internal
import styles from './index.module.scss';
import MenuItem from './components/MenuItem';

interface AccountNavigationProps {
  /** The state of the account navigation. */
  isAccountNavOpen: boolean;
  /** Closes the account navigation. */
  closeNav: () => void;
}

/** The navigation related to the account. */
export const AccountNavigation = ({ isAccountNavOpen, closeNav }: AccountNavigationProps): JSX.Element => {
  const { theme, setTheme } = useTheme();

  const switchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className={`${styles.nav} ${isAccountNavOpen ? styles.open : ""}`}>
      <ul className={styles.menu}>
        <MenuItem icon={<PersonIcon />} text='Mon profil' href='/app/profile' onClick={closeNav} />
        <MenuItem icon={<ColorLensIcon />} text='Thème' onClick={switchTheme} />
        <MenuItem icon={<AlternateEmailRoundedIcon />} text='Contact / Support' href='/app' onClick={closeNav} />
        <MenuItem icon={<QuizIcon />} text='FAQ' href='/app' onClick={closeNav} />
        <MenuItem icon={<LogoutRoundedIcon />} text='Déconnexion' href='/auth/log-out' color='white' backgroundColor='red' />
      </ul>
    </div>
  )
}
