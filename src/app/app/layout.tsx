
"use client";

// Next
import { usePathname } from 'next/navigation';

// Internal
import styles from './layout.module.scss'
import { InsiderNav } from './_components/InsiderNav';
import { ChildrenProps } from '@app/interfaces';

/** The app's layout. */
const Layout = ({ children }: ChildrenProps) => {
  const pathname = usePathname();
  const showNav = !pathname.startsWith('/app/memos/') || pathname === '/app/memos';

  return (
    <div className={styles.layout}>
      { showNav && <InsiderNav /> }
    
      <div className={`${styles.window} ${showNav ? styles.navActive : ''}`}>
        {children}
      </div>
    </div>
  )
}

export default Layout;
