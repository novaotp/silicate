
import { ChildrenProps } from "@/types/interfaces";
import styles from './index.module.scss';

export const Main = ({ children }: ChildrenProps) => {
  return (
    <main className={styles.main}>
      {children}
    </main>
  )
}
