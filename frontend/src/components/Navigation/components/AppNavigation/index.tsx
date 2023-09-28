
'use client';

// Internal
import styles from './index.module.scss';
import { Header, Menu } from "./components";

interface AppNavigationProps {
  /** The state of the app nav. */
  isAppNavOpen: boolean;
  /** Closes the nav. */
  closeNav: () => void;
}

const AppNavigation = ({ isAppNavOpen, closeNav }: AppNavigationProps) => {
  return (
    <div className={`${styles.nav} ${isAppNavOpen ? styles.open : ""}`}>
      <Header closeNav={closeNav} />
      <Menu closeNav={closeNav} />
    </div>
  )
}

export default AppNavigation;
