
"use client";

// React
import { useEffect } from "react";

// Internal
import useWebSocket from "@/core/websockets";
import useAccount from "@hooks/useAccount";

/** The main component of the dashboard page. */
const Dashboard = (): JSX.Element => {
  const { socket, ensureSocketConnected } = useWebSocket();
  const { account, isError, isLoading } = useAccount();

  if (isError) return <p>An error occured while fetching the data...</p>
  if (isLoading) return <p>Fetching the data...</p>

  return (
    <p>Bonjour {account.firstName} {account.lastName}</p>
  )
}

export default Dashboard;
