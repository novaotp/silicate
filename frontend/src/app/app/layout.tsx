import AccountNavigation from '@/components/AccountNav'
import styles from './layout.module.scss'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AccountNavigation />
    
      <div className={styles.window}>
        {children}
      </div>
    </>
  )
}
