
"use client";

import styles from './index.module.scss';
import NavMenuLinkProps from './interfaces';
import RecursiveLink from './RecursiveLinks';
import { clientRoute } from '@shared/utils/routes';

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
    {
      href: clientRoute.app.chat.use(),
      label: 'Chat',
    },
  ]

  return links;
}

/** Custom menu for the app's navigation. */
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
