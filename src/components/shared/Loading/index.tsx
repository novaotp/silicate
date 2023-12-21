// Next
import Image from "next/image";

// Internal
import styles from "./index.module.scss";
import SilicateLogo from "@public/SilicateAppIconBlackVertical.png";

interface LoadingProps {
    /** An optional text to display. Defaults to `Chargement...` */
    text?: string;
}

/** A basic loading screen. */
export const Loading = ({
    text = "Chargement...",
}: LoadingProps): JSX.Element => {
    return (
        <div className={styles.wrapper}>
            <Image src={SilicateLogo} alt='Silicate Logo' height={250} />
            <p>{text}</p>
        </div>
    );
};
