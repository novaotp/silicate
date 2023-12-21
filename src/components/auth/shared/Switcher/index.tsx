// React
import { type ReactElement, useState } from "react";

// Internal
import styles from "./index.module.scss";
import { poppins } from "@/fonts";
import { Submit } from "..";

interface SwitcherProps {
    children: [ReactElement<HTMLDivElement>, ReactElement<HTMLDivElement>];
}

export const Switcher = ({ children }: SwitcherProps) => {
    const [toggle, setToggle] = useState<boolean>(false);

    return (
        <div className={`${styles.switcher} ${toggle ? styles.active : ""}`}>
            <div className={styles.wrapper}>
                {children[0]}
                <button
                    className={`${styles.toggle} ${styles.continue} ${poppins.className}`}
                    type='button'
                    onClick={() => setToggle(true)}
                >
                    Continuer
                </button>
            </div>
            <div className={styles.wrapper}>
                {children[1]}
                <button
                    className={`${styles.toggle} ${styles.return} ${poppins.className}`}
                    type='button'
                    onClick={() => setToggle(false)}
                >
                    Revenir
                </button>
                <Submit label='Créer mon compte' />
            </div>
        </div>
    );
};
