
"use client";

// Next
import Image from 'next/image';

// Internal
import useAccount from "@hooks/useAccount";
import SilicateLogo from "@public/SilicateAppIconBlackVertical.png";
import styles from "./index.module.scss";

interface DashboardProps {
  userId: number;
}

/** The main component of the dashboard page. */
const Dashboard = ({ userId }: DashboardProps): JSX.Element => {
  const { account, isError, isLoading } = useAccount(userId);

  if (isError) return <p>An error occured while fetching the data...</p>
  if (isLoading) return <p>Fetching the data...</p>

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
