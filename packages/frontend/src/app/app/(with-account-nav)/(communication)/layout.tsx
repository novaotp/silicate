
import Navigation from '@/components/Navigation';
import styles from './layout.module.scss'
import LayoutProps from '@/app/interfaces';
import { CommunicationNavigation } from '@/services/communication-service';

/** The app's layout. */
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className={styles.window}>
        {children}
      </div>

      <CommunicationNavigation />
    </>
  )
}

export default Layout;
