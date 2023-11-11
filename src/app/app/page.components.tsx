
"use client";

// Next
import Image from 'next/image';

// Internal
import { useUser } from "@libs/hooks/useAccount";
import SilicateLogo from "@public/SilicateAppIconBlackVertical.png";
import styles from "./page.module.scss";

/** The main component of the dashboard page. */
export const Dashboard = (): JSX.Element => {
  const account = useUser();

  return (
    <div className={styles.main}>
      <p className={styles.welcome}>Bonjour <span className={styles.name}>{account.firstName}</span></p>
      <Image
        src={SilicateLogo}
        alt="Silicate Logo"
        height={300}
      />
    </div>
  )
}
