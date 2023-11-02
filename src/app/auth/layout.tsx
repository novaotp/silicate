
import LayoutProps from '@app/interfaces';
import styles from './layout.module.scss';

/** The layout of the `/auth` route. */
const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className={styles.window}>
      {children}
    </div>
  )
}

export default Layout;
