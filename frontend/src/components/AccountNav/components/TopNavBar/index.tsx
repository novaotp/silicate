'use client'

import styles from './index.module.scss'
import MenuIcon from '@mui/icons-material/Menu';

interface TopNavBarProps {
  openNav: () => void;
}

export default function TopNavBar({ openNav }: TopNavBarProps) {
  return (
    <div className={styles.navBar}>
      <button className={styles.button} onClick={openNav}>
        <MenuIcon />
      </button>
    </div>
  )
}