
import { ChildrenProps } from "@/app/interfaces";
import styles from './index.module.scss';

export const Window = ({ children }: ChildrenProps): JSX.Element => {
  return (
    <div className={styles.window}>
      {children}
    </div>
  )
}
