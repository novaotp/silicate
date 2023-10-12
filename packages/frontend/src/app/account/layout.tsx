
import { InsiderNav } from '@components/navigation';
import styles from './layout.module.scss';
import LayoutProps from '../interfaces';

/** The account related pages' layout. */
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
