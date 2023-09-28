import Navigation from '@/components/Navigation';
import styles from './layout.module.scss'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navigation />
    
      <div className={styles.window}>
        {children}
      </div>
    </>
  )
}
