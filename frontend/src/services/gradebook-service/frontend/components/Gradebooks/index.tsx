import { GradebookProps } from "@shared/interfaces";
import { NoGradebooksFound, RenderGradebooks } from "./components";
import styles from './index.module.css';

interface GradebookComponentProps {
  gradebooks: GradebookProps[];
}

export default function GradebooksComponent({ gradebooks }: GradebookComponentProps) {
  return (
    <div className={styles.wrapper}>
      {gradebooks.length > 0 && <RenderGradebooks gradebooks={gradebooks} />}
      {gradebooks.length === 0 && <NoGradebooksFound />}
    </div>
  )
}