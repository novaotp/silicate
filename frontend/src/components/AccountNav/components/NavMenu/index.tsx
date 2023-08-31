'use client';

import styles from './index.module.css';
import Header from './components/Header';
import Menu from './components/Menu';

interface NavMenuProps {
  isNavOpen: boolean;
  closeNav: () => void;
}

export default function NavMenu({ isNavOpen, closeNav }: NavMenuProps) {
  return (
    <div className={`${styles.nav} ${isNavOpen ? styles.open : ""}`}>
      <Header closeNav={closeNav} />
      <Menu closeNav={closeNav} />
    </div>
  )
}