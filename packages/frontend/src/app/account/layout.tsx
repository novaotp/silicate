
import Navigation from '@/components/Navigation';
import styles from './layout.module.scss';
import LayoutProps from '../interfaces';

/** The account related pages layout. */
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
