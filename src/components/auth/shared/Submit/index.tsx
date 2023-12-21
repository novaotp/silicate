"use client";

// Internal
import { poppins } from "@/fonts";
import styles from "./index.module.scss";

/** The {@link Button}'s props. */
interface SubmitProps {
    label: string;
}

export const Submit = ({ label }: SubmitProps): JSX.Element => {
    return (
        <button
            type='submit'
            className={`${styles.button} ${poppins.className}`}
        >
            {label}
        </button>
    );
};
