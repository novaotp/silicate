
import Navigation from '@/components/Navigation';
import styles from './layout.module.scss'
import LayoutProps from '@/app/interfaces';

/** The app's layout. */
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navigation />
    
      <div className={styles.window}>
        {children}
      </div>
    </>
  )
}

export default Layout;
