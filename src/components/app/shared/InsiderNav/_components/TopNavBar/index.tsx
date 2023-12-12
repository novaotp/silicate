
'use client';

// MUI Icons
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// React
import { Dispatch, SetStateAction } from 'react';

// Internal
import styles from './index.module.scss'

interface TopNavBarProps {
  /** Opens the app nav. */
  openAppNav: () => void;
  /** The dispatch for handling the account nav state. */
  setAccountNavOpen: Dispatch<SetStateAction<boolean>>;
}

const TopNavBar = ({ openAppNav, setAccountNavOpen }: TopNavBarProps) => {
  return (
    <nav className={styles.navBar}>
      <button
        className={styles.button}
        onClick={() => {
          openAppNav();
          setAccountNavOpen(false);
        }}
      >
        <MenuIcon />
      </button>
      <button
        className={styles.button}
        onClick={() => {
          setAccountNavOpen(prevState => !prevState);
        }}
      >
        <AccountCircleIcon />
      </button>
    </nav>
  )
}

export default TopNavBar;
