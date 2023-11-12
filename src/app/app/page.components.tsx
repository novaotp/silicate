
"use client";

// Next
import Image from 'next/image';

// Internal
import { useUser } from "@libs/hooks/useAccount";
import SilicateLogo from "@public/SilicateAppIconBlackVertical.png";
import styles from "./page.module.scss";
import { Loading } from '../_components/Loading';

/** The main component of the dashboard page. */
export const Dashboard = (): JSX.Element => {
  const user = useUser();

  return (
    <div className={styles.main}>
      {
        !user
          ? <Loading text="Chargement de l'utilisateur..." />
          : <>
              <p className={styles.welcome}>Bonjour <span className={styles.name}>{user.firstName}</span></p>
              <Image
                src={SilicateLogo}
                alt="Silicate Logo"
                height={300}
              />
            </>
      }
    </div>
  )
}
