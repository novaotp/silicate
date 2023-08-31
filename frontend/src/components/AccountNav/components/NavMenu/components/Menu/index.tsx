import NavMenuLinkProps from '@/components/AccountNav/interfaces';
import RecursiveLink from './RecursiveLinks';
import styles from './index.module.css'

interface MenuProps {
  closeNav: () => void;
}

function getNavMenuLinks(): NavMenuLinkProps[] {
  const links: NavMenuLinkProps[] = [
    {
      href: '/account/dashboard',
      label: 'Dashboard',
    },
    {
      href: '/account/gradebooks',
      label: 'Gradebooks',
      subLinks: [
        {
          href: '/account/dashboard',
          label: 'Dashboard',
        },
        {
          href: '/account/gradebooks',
          label: 'Gradebooks',
          subLinks: [
            {
              href: '/account/gradebooks',
              label: 'Gradebooks',
              subLinks: [
                {
                  href: '/account/dashboard',
                  label: 'Dashboard',
                },
                {
                  href: '/account/gradebooks',
                  label: 'Gradebooks'
                }
              ]
            },
          ]
        }
      ]
    },
    {
      href: '/account/dashboard',
      label: 'Dashboard',
    },
  ]

  return links;
}

export default function Menu({ closeNav }: MenuProps) {
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