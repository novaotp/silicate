
"use client";

import NavMenuLinkProps from '../../interfaces';
import RecursiveLink from './RecursiveLinks';
import styles from './index.module.scss'
import { clientRoute } from '@shared/classes/route';

interface MenuProps {
  closeNav: () => void;
}

function getNavMenuLinks(): NavMenuLinkProps[] {
  const links: NavMenuLinkProps[] = [
    {
      href: clientRoute.app.dashboard.use(),
      label: 'Dashboard',
    },
    {
      href: clientRoute.app.gradebooks.use(),
      label: 'Gradebooks',
    },
    {
      href: clientRoute.app.notes.use(),
      label: 'Notes',
    },
  ]

  return links;
}

/** Returns a custom menu for the app's navigation. */
const Menu = ({ closeNav }: MenuProps) => {
  const links = getNavMenuLinks();

  return (
    <menu className={styles.navMenu}>
      <ul className={styles.linkList}>
        {
          links.map((link: NavMenuLinkProps) => <RecursiveLink key={link.href} link={link} closeNav={closeNav} />)
        }
      </ul>
    </menu>
  )
}

export default Menu;
