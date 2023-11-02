
"use client";

// Next
import Image from 'next/image';

// Internal
import useAccount from "@hooks/useAccount";
import SilicateLogo from "@public/SilicateAppIconBlackVertical.png";
import styles from "./index.module.scss";
import Loading from '@/components/shared/Loading';

/** The main component of the dashboard page. */
const Dashboard = (): JSX.Element => {
  const { account, isError, isLoading } = useAccount();

  if (isError) return <p>An error occured while fetching the data...</p>
  if (isLoading) return <Loading text="Chargement de votre dashboard..." />

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

export default Dashboard;
