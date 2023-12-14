
// React
import { type FormEvent } from "react";

// Internal
import styles from './index.module.scss';
import { ChildrenProps } from "@/types/interfaces";

interface FormProps extends ChildrenProps {
  onSubmit: (event: FormEvent) => void,
}

export const Form = ({ children, onSubmit }: FormProps): JSX.Element => {
  return (
    <form onSubmit={onSubmit} className="relative w-full flex flex-col mb-5 overflow-x-hidden">
      {children}
    </form>
  )
}
