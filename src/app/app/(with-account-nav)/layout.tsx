
import { InsiderNav } from '@components/navigation';
import styles from './layout.module.scss'
import LayoutProps from '@app/interfaces';

/** The app's layout. */
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <InsiderNav />
    
      <div className={styles.window}>
        {children}
      </div>
    </>
  )
}

export default Layout;
