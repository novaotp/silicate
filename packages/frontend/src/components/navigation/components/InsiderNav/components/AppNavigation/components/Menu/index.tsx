
"use client";

// Next
import Link from 'next/link';

// Internal
import styles from './index.module.scss';
import links from './links';

interface MenuProps {
  closeNav: () => void;
}

/** Custom menu for the app's navigation. */
const Menu = ({ closeNav }: MenuProps) => {
  return (
    <menu className={styles.navMenu}>
      <ul className={styles.linkList}>
        {
          links().map(({ href, label }) => {
            return (
              <li className={styles.li}>
                <Link
                  className={styles.link}
                  onClick={closeNav}
                  href={href}
                >
                  {label}
                </Link>
              </li>
            )
          })
        }
      </ul>
    </menu>
  )
}

export default Menu;
