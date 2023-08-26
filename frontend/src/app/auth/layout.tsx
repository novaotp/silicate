import styles from './layout.module.css'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.window}>
      {children}
    </div>
  )
}
