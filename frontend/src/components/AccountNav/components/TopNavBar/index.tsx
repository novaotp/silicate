'use client'

import styles from './index.module.css'

interface TopNavBarProps {
  openNav: () => void;
}

export default function TopNavBar({ openNav }: TopNavBarProps) {
  return (
    <div className={styles.navBar}>
      <button className={styles.button} onClick={openNav}>
        Press me to open navigation menu
      </button>
    </div>
  )
}