"use client";

// React + Next
import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Internal
import useAccount from "@hooks/useAccount";
import styles from "./page.module.scss";
import SilicateLogo from "@public/SilicateAppIconBlackVertical.png";
import styles from "./index.module.scss";
import Loading from '@/components/shared/Loading';
import { useUser } from "@libs/hooks/useUser";
import { Loading } from '../_components/Loading';

/** The main component of the dashboard page. */
export const Dashboard = (): JSX.Element => {
  const router = useRouter();
  const user = useUser();
  
  useEffect(() => {
    if (!user) {
      router.push('/auth/log-in');
    }
  }, [user]);

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

export default Dashboard;
